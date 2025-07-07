'use client';

import { useState, useMemo } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import SearchBar from '@/components/ui/SearchBar';
import DataTable from '@/components/ui/DataTable';
import PaginationControls from '@/components/ui/PaginationControls';
import FilterButton from '@/components/ui/FilterButton';
import konzultaceData from '@/data/konzultace.json';

import { getStavKonzultaceInfo, getLabelForValue  } from '@/utils/valueStyleMappings';

export default function Konzultace({ ovm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState([{ key: 'id_konzultace', direction: 'desc' }]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [columnFilters, setColumnFilters] = useState({});

  const columns = [
    { key: 'nazev_konzultace', label: 'Název konzultace', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false, width: 'wider' },
    { key: 'id_konzultace', label: 'ID konzultace', sortable: true, filterableOptions: false, className: "colURL", useWrapper: false },
    { key: 'produkt_kc', label: 'Produkt', sortable: false, filterableOptions: true, useWrapper: false, width: 'wider' },
    { key: 'delivery', label: 'Delivery', sortable: false, filterableOptions: true, className: "colBasic", useWrapper: false },
    { key: 'stav_konzultace', label: 'Stav', sortable: false, filterableOptions: true, useWrapper: true },
    { key: 'pocet_schuzek', label: 'Počet schůzek', sortable: true, filterableOptions: false, className: "colBasic", useWrapper: false },
    { key: 'id_zameru', label: 'ID záměru', sortable: true, filterableOptions: false, className: "colURL", useWrapper: false }
  ];

  const getCellClass = (columnKey, value) => {
    if (columnKey === 'stav_konzultace') {
      return getStavKonzultaceInfo(value).className;  // vrací např. 'stav_modra'
    }
    return '';
  };

  const filterAttributes = [
    { label: 'Prioritní', attribute: 'prioritni' }
  ];

  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? String(parseInt(match[1], 10)) : null;
  };

  const filteredData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    return konzultaceData.filter(item => {
      if (!ovm) return false;

      const belongsToOvm = extractOvmIdNumber(item.id_ovm) === extractOvmIdNumber(ovm.id_ovm);
      if (!belongsToOvm) return false;

      const matchesSearch =
        item.nazev_konzultace?.toLowerCase().includes(lowerSearch) ||
        item.id_konzultace?.toLowerCase().includes(lowerSearch) ||
        item.produkt_kc?.toLowerCase().includes(lowerSearch);

      const matchesBooleanFilter =
        selectedFilter === 'all' || item[selectedFilter] === true;

      const matchesColumnFilters = Object.entries(columnFilters).every(([key, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        return filterValues.includes(item[key]);
      });

      return matchesSearch && matchesBooleanFilter && matchesColumnFilters;
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
        const updated = { ...prev };
        delete updated[columnKey];
        return updated;
      }

      const current = prev[columnKey] || [];
      let updatedValues;
      if (isCheckedOrClear) {
        updatedValues = [...current, value];
      } else {
        updatedValues = current.filter(v => v !== value);
      }

      const updated = { ...prev };
      if (updatedValues.length === 0) {
        delete updated[columnKey];
      } else {
        updated[columnKey] = updatedValues;
      }
      return updated;
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <SectionTitle
        icon="/assets/icons/konzultace.svg"
        sectionName="Konzultace"
        ovm={ovm}
      />

      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Zadejte název, ID konzultace, produktu"
      />

      <FilterButton
        allCount={konzultaceData.length}
        filters={filterAttributes}
        data={konzultaceData}
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
        allData={konzultaceData}
        columnFilters={columnFilters}
        onColumnFilterChange={handleColumnFilterChange}
        getCellClass={getCellClass}  // ⬅️ Tady to pošleme → DataTable použije globální CSS třídy
        getLabelForValue={getLabelForValue}
        ovmId={extractOvmIdNumber(ovm?.id_ovm)}
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
