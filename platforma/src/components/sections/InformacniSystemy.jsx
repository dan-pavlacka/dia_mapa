'use client';

import { useState, useMemo } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import SearchBar from '@/components/ui/SearchBar';
import DataTable from '@/components/ui/DataTable';
import PaginationControls from '@/components/ui/PaginationControls';
import FilterButton from '@/components/ui/FilterButton';
import ISVSData from '@/data/ISVS.json';
import DetailModal from '@/components/ui/DetailModal';

import { getLabelForValue } from '@/utils/valueStyleMappings';

export default function InformacniSystemy({ ovm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState([{ key: 'nazev', direction: 'desc' }]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [columnFilters, setColumnFilters] = useState({});

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'nazev', label: 'Název ISVS', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wider'},
    { key: 'zkratka', label: 'Zkratka', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'popis', label: 'Popis', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wide' },
    { key: 'identifikator_isvs', label: 'ID', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false },
  ];

  const getCellClass = () => '';

  const filterAttributes = [];

  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? String(parseInt(match[1], 10)) : null;
  };

  const filteredData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return ISVSData.filter((item) => {
      if (!ovm) return false;

      const belongsToOvm = extractOvmIdNumber(item.id_spravce_isvs) === extractOvmIdNumber(ovm.id_ovm);
      if (!belongsToOvm) return false;

      const matchesSearch =
        item.nazev?.toLowerCase().includes(lowerSearch) ||
        (item.zkratka?.toLowerCase() || '').includes(lowerSearch);

      const matchesFilter =
        selectedFilter === 'all' || item[selectedFilter] === true;

      const matchesColumnFilters = Object.entries(columnFilters).every(([key, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(item[key]);
      });

      return matchesSearch && matchesFilter && matchesColumnFilters;
    });
  }, [searchTerm, selectedFilter, columnFilters, ovm]);

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
    const sorts = Array.isArray(sortConfig) ? sortConfig : [sortConfig];
    const validSorts = sorts.filter(s => s && typeof s.key === 'string');
    const dataCopy = [...filteredData];
    dataCopy.sort((a, b) => {
      for (const { key, direction } of validSorts) {
        const res = safeCompare(a[key], b[key], key);
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
      let newFilters;

      if (isCheckedOrClear) {
        newFilters = [...currentFilters, value];
      } else {
        newFilters = currentFilters.filter(v => v !== value);
      }

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

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  return (
    <div>
      <SectionTitle
        sectionName="Informační systémy"
        ovm={ovm}
        subtitle={{
          before: 'Přehled ISVS, kde je ',
          after: ' správcem. ',
          linkText: ''
        }}
        subtitleURL=""
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Zadejte název, klíčové slovo"
      />

      {filterAttributes.length > 0 && (
        <FilterButton
          allCount={ISVSData.length}
          filters={filterAttributes}
          data={ISVSData}
          selectedFilter={selectedFilter}
          onChange={(filter) => {
            setSelectedFilter(filter);
            setCurrentPage(1);
          }}
          ovmId={extractOvmIdNumber(ovm?.id_ovm)}
        />
      )}

      <DataTable
        data={pagedData}
        columns={columns}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        filteredCount={filteredData.length}
        searchTerm={searchTerm}
        allData={ISVSData}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        getCellClass={getCellClass}
        rowClickable={true}
        onRowClick={handleRowClick}
        getLabelForValue={getLabelForValue} 
      />

      <PaginationControls
        totalRecords={filteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail ISVS"
        rows={
          selectedRow
            ? [
              { label: 'Název', value: selectedRow.nazev },
              { label: 'Zkratka', value: selectedRow.zkratka },
              { label: 'ID', value: selectedRow.identifikator_isvs },
              { label: 'Popis', value: selectedRow.popis },
              { label: 'Komentář', value: selectedRow.komentar },
              { label: 'Správce', value: selectedRow.spravce_nazev },
              { label: 'Provozovatel', value: selectedRow.provozovatel_isvs },
              { label: 'Agendy', value: selectedRow.agendy_nazvy },
              { label: 'Ustanovení e-sbírka', value: selectedRow.isvs_esbirka },
              ]
            : []
        }
      />
    </div>
  );
}
