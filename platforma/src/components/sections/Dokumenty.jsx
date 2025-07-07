'use client';

import { useState, useMemo } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';

import SearchBar from '@/components/ui/SearchBar';
import DataTable from '@/components/ui/DataTable';
import PaginationControls from '@/components/ui/PaginationControls';
import FilterButton from '@/components/ui/FilterButton';
import dokumentyData from '@/data/dokumenty.json';

import { getLabelForValue } from '@/utils/valueStyleMappings';

export default function Dokumenty({ ovm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState([{ key: 'datum_vlozeni', direction: 'desc' }]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [columnFilters, setColumnFilters] = useState({});

  const columns = [
    { key: 'dokument_nazev', label: 'Název dokumentu', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'dokument_popis', label: 'Popis', sortable: false, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wide' },
    { key: 'vlozil', label: 'Přidáno', sortable: false, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'datum_vlozeni', label: 'Datum vložení', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wider' }
  ];

  const getCellClass = () => '';

  const filterAttributes = [];

  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? String(parseInt(match[1], 10)) : null;
  };

  const filteredData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return dokumentyData.filter((item) => {
      if (!ovm) return false;

      const belongsToOvm = extractOvmIdNumber(item.id_ovm) === extractOvmIdNumber(ovm.id_ovm);
      if (!belongsToOvm) return false;

      const matchesSearch =
        item.dokument_nazev?.toLowerCase().includes(lowerSearch) ||
        item.dokument_popis?.toLowerCase().includes(lowerSearch);

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

  return (
    <div>
      <SectionTitle sectionName="Dokumenty" ovm={ovm} />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Zadejte název, popis"
      />

      {filterAttributes.length > 0 && (
        <FilterButton
          allCount={dokumentyData.length}
          filters={filterAttributes}
          data={dokumentyData}
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
        allData={dokumentyData}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        getCellClass={getCellClass}
        expandable={true}
        expandableColumns={['dokument_nazev', 'dokument_popis', 'datum_vlozeni']}
        emptyStateMessage="Zatím nebyl přidán žádný dokument."
        emptyStateButtonText="Přidat dokument"
        emptyStateButtonOnClick={() => console.log('Klik na přidat dokument')}
        getLabelForValue={getLabelForValue} 
      />

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
