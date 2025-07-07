'use client';

import { useState, useMemo, useEffect } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import SearchBar from '@/components/ui/SearchBar';
import DataTable from '@/components/ui/DataTable';
import PaginationControls from '@/components/ui/PaginationControls';
import FilterButton from '@/components/ui/FilterButton';
import Modal from '@/components/ui/Modal';
import GenericForm from '@/components/forms/GenericForm';

import ModalHeader from '@/components/ui/ModalHeader';

import poznatekFormSchema from '@/forms/schemas/poznatek.schema.json';

import { getLabelForValue } from '@/utils/valueStyleMappings';

export default function InterniPoznatky({ ovm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState([{ key: 'nazev_poznatku', direction: 'desc' }]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [columnFilters, setColumnFilters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [poznatkyData, setPoznatkyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/poznatky');
      const data = await res.json();
      console.log('✅ načteno poznatkyData:', data);
      setPoznatkyData(data);
    };
    fetchData();
  }, []);

  const handleAddNewPoznatek = async (newData) => {
    const finalData = {
      id_ovm: ovm?.id_ovm || '',
      nazev_poznatku: newData.nazev_poznatku,
      poznatek: newData.poznatek,
      id_konzultace: newData.id_konzultace || '',
      id_zameru: newData.id_zameru || '',
      pridano: new Date().toLocaleDateString('cs-CZ'),  // "23.7.2025"
      autor: newData.autor,
      aktualni: true    // výchozí true (nebo false, jak chceš)
    };
  
    const res = await fetch('/api/poznatky', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    });
  
    const result = await res.json();
  
    if (result.success) {
      console.log('✅ Poznatek uložen:', result.newItem);
      const res2 = await fetch('/api/poznatky');
      const data2 = await res2.json();
      setPoznatkyData(data2);
      setShowModal(false);
    }
  };
  

  const columns = [
    { key: 'nazev_poznatku', label: 'Název poznatku', sortable: false, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'poznatek', label: 'Poznatek', sortable: false, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wide' },
    { key: 'id_konzultace', label: 'ID konzultace', sortable: true, filterableOptions: false, className: "colURL", useWrapper: false },
    { key: 'id_zameru', label: 'ID záměru', sortable: true, filterableOptions: false, className: "colURL", useWrapper: false },
    { key: 'pridano', label: 'Přidáno', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'autor', label: 'Autor', sortable: false, filterableOptions: true, className: "colBasic", useWrapper: false },
  ];

  const getCellClass = () => '';

  const filterAttributes = [
    { label: 'Aktuální', attribute: 'aktualni' }
  ];

  const extractOvmIdNumber = (id_ovm) => {
    if (!id_ovm) return null;
    const match = id_ovm.match(/\/?(\d+)$/);
    return match ? String(parseInt(match[1], 10)) : null;
  };

  const filteredData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return poznatkyData.filter((item) => {
      if (!ovm) return false;

      const belongsToOvm = extractOvmIdNumber(item.id_ovm) === extractOvmIdNumber(ovm.id_ovm);
      if (!belongsToOvm) return false;

      const matchesSearch =
        item.nazev_poznatku?.toLowerCase().includes(lowerSearch) ||
        item.poznatek?.toLowerCase().includes(lowerSearch);

      const matchesFilter =
        selectedFilter === 'all' || item[selectedFilter] === true;

      const matchesColumnFilters = Object.entries(columnFilters).every(([key, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(item[key]);
      });

      return matchesSearch && matchesFilter && matchesColumnFilters;
    });
  }, [poznatkyData, searchTerm, selectedFilter, columnFilters, ovm]);

  const safeCompare = (a, b) => {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b, 'cs', { sensitivity: 'base' });
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const sortedData = useMemo(() => {
    const validSorts = Array.isArray(sortConfig) ? sortConfig.filter(s => s && typeof s.key === 'string') : [];
    const dataCopy = [...filteredData];
    dataCopy.sort((a, b) => {
      for (const { key, direction } of validSorts) {
        const res = safeCompare(a[key], b[key]);
        if (res !== 0) return direction === 'desc' ? -res : res;
      }
      return 0;
    });
    return dataCopy;
  }, [filteredData, sortConfig]);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (num) => {
    setRowsPerPage(num);
    setCurrentPage(1);
  };

  const handleColumnFilterChange = (columnKey, value, isCheckedOrClear) => {
    setColumnFilters(prev => {
      if (value === null && isCheckedOrClear === true) {
        const updatedFilters = { ...prev };
        delete updatedFilters[columnKey];
        return updatedFilters;
      }

      const currentFilters = prev[columnKey] || [];
      const newFilters = isCheckedOrClear
        ? [...currentFilters, value]
        : currentFilters.filter(v => v !== value);

      const updatedFilters = { ...prev };
      if (newFilters.length === 0) {
        delete updatedFilters[columnKey];
      } else {
        updatedFilters[columnKey] = newFilters;
      }

      return updatedFilters;
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <SectionTitle
        icon="/assets/icons/interniPoznatky.svg"
        sectionName="Interní poznatky"
        ovm={ovm}
        addButton={{
          text: 'Přidat poznatek',
          onClick: () => setShowModal(true)
        }}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Zadejte název, klíčové slovo"
      />

      <FilterButton
        allCount={poznatkyData.length}
        filters={filterAttributes}
        data={poznatkyData}
        selectedFilter={selectedFilter}
        onChange={(filter) => {
          setSelectedFilter(filter);
          setCurrentPage(1);
        }}
        ovmId={extractOvmIdNumber(ovm?.id_ovm)}
      />

      <DataTable
        data={pagedData}
        columns={columns}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        filteredCount={filteredData.length}
        searchTerm={searchTerm}
        allData={poznatkyData}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        getCellClass={getCellClass}
        expandable={true}
        expandableColumns={['nazev_poznatku', 'poznatek', 'pridano']}
        emptyStateMessage="Zatím nebyl přidán žádný poznatek."
        emptyStateButtonText="Přidat poznatek"
        emptyStateButtonOnClick={() => setShowModal(true)}
        getLabelForValue={getLabelForValue}
        addButton={{
          text: 'Přidat poznatek',
          onClick: () => setShowModal(true)
        }}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} hideDefaultCloseIcon>
        <ModalHeader
          titleIcon="/assets/icons/novyPoznatek.svg"
          titleText="Nový poznatek"
          onClose={() => setShowModal(false)}
        />
        
        <GenericForm
          schema={poznatekFormSchema}
          onSubmit={handleAddNewPoznatek}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
      

      <PaginationControls
        totalRecords={filteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
}
