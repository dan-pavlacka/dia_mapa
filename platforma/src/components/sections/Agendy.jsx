'use client';

import { useState, useMemo } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import SearchBar from '@/components/ui/SearchBar';
import DataTable from '@/components/ui/DataTable';
import PaginationControls from '@/components/ui/PaginationControls';
import FilterButton from '@/components/ui/FilterButton';
import agendyData from '@/data/agendy.json';
import DetailModal from '@/components/ui/DetailModal';
import {getLabelForValue } from '@/utils/valueStyleMappings';

export default function Agendy({ ovm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState([{ key: 'identifikator', direction: 'desc' }]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [columnFilters, setColumnFilters] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? String(parseInt(match[1], 10)) : null;
  };

  const currentOvmId = extractOvmIdNumber(ovm?.id_ovm);

  const safeCompare = (a, b, key) => {
    if (key === 'identifikator') {
      return a?.localeCompare?.(b, 'cs', { sensitivity: 'base' }) || 0;
    }

    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b, 'cs', { sensitivity: 'base' });
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const columns = [
    { key: 'identifikator', label: 'Kód', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'nazev', label: 'Název agendy', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wide' },
    { key: 'ustanoveni', label: 'Hlavní právní předpis', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wider' },
  ];

  const getCellClass = () => '';

  const filterAttributes = [];

  const filteredData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return agendyData.filter((item) => {
      if (!ovm) return false;

      const belongsToOvm = extractOvmIdNumber(item.id_ovm_ohlasovatel) === currentOvmId;
      if (!belongsToOvm) return false;

      const matchesSearch =
        item.nazev?.toLowerCase().includes(lowerSearch) ||
        (item.identifikator?.toLowerCase() || '').includes(lowerSearch);

      const matchesFilter =
        selectedFilter === 'all' || item[selectedFilter] === true;

      const matchesColumnFilters = Object.entries(columnFilters).every(([key, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(item[key]);
      });

      return matchesSearch && matchesFilter && matchesColumnFilters;
    });
  }, [searchTerm, selectedFilter, columnFilters, ovm]);

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

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
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
      <SectionTitle
        sectionName="Agendy"
        ovm={ovm}
        subtitle={{
          before: 'Seznam agend, kde je ',
          after: ' ohlašovatelem. Podrobnější vyhledávání ',
          linkText: 'zde.'
        }}
        subtitleUrl="https://archi.gov.cz/reporty:katalog_sluzeb"
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Zadejte název, kód"
      />

      {filterAttributes.length > 0 && (
        <FilterButton
          allCount={agendyData.length}
          filters={filterAttributes}
          data={agendyData}
          selectedFilter={selectedFilter}
          onChange={(filter) => {
            setSelectedFilter(filter);
            setCurrentPage(1);
          }}
          ovmId={currentOvmId}
        />
      )}

      <DataTable
        data={pagedData}
        columns={columns}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        filteredCount={filteredData.length}
        searchTerm={searchTerm}
        getCellClass={getCellClass}
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
                { label: 'ID agendy', value: selectedRow.identifikator },
                { label: 'AIS', value: selectedRow.ais },
                { label: 'Ohlašovatel', value: selectedRow.nazev_ovm_ohlasovatel },
                { label: 'Hlavní právní předpis', value: selectedRow.ustanoveni },
              ]
            : []
        }
      />
    </div>
  );
}
