'use client';

import { useState } from 'react';
import NoResultsBanner from '@/components/ui/NoResultsBanner';
import EmptyStateBanner from '@/components/ui/EmptyStateBanner';
import DataTableFilterDropdown from '@/components/ui/DataTableFilterDropdown';

export default function DataTable({
  data,
  allData,
  columns,
  sortConfig,
  onSortChange,
  filteredCount,
  searchTerm,
  columnFilters,
  onColumnFilterChange,
  getCellClass,
  getLabelForValue,
  ovmId,
  expandable = false,
  expandableColumns = [],
  rowClickable = false,
  onRowClick = null,
  emptyStateMessage,
  emptyStateButtonText,
  emptyStateButtonOnClick
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);

  const toggleRowExpanded = (rowIdx) => {
    setExpandedRowIndex((prev) => (prev === rowIdx ? null : rowIdx));
  };

  const formatZaznam = (count) => {
    if (count === 1) return `${count} záznam`;
    if (count >= 2 && count <= 4) return `${count} záznamy`;
    return `${count} záznamů`;
  };

  const getUniqueValues = (columnKey) => {
    const source = allData || data;

    const otherFilters = Object.entries(columnFilters).filter(([key]) => key !== columnKey);

    const filteredSource = source.filter((item) => {
      const belongsToOvm = ovmId ? item.id_ovm?.includes(ovmId) : true;
      if (!belongsToOvm) return false;

      return otherFilters.every(([key, values]) => {
        if (!values || values.length === 0) return true;
        return values.includes(item[key]);
      });
    });

    const unique = [
      ...new Set(
        filteredSource
          .map((item) => item[columnKey])
          .filter((val) => {
            if (val === null || val === undefined) return false;
            const label = getLabelForValue ? getLabelForValue(columnKey, val) : val;
            return typeof label === 'string' ? label.trim() !== '' : true;
          })
      )
    ];
    return unique.sort((a, b) => {
      const labelA = getLabelForValue ? getLabelForValue(columnKey, a) : a;
      const labelB = getLabelForValue ? getLabelForValue(columnKey, b) : b;
      return labelA.localeCompare(labelB, 'cs', { sensitivity: 'base' });
    });
  };

  const safeCompare = (a, b) => {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b, 'cs', { sensitivity: 'base' });
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };

  const sortedData = [...data];
  if (sortConfig?.length > 0) {
    sortedData.sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        const res = safeCompare(a[key], b[key]);
        if (res !== 0) return direction === 'desc' ? -res : res;
      }
      return 0;
    });
  }

  const countToShow = filteredCount ?? sortedData.length;

  const highlightText = (text, searchTerm) => {
    if (!searchTerm || typeof text !== 'string') return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part)
        ? <span key={index} className="highlight">{part}</span>
        : part
    );
  };

  const handleSortToggle = (key) => {
    if (!sortConfig?.length || sortConfig[0].key !== key) {
      onSortChange([{ key, direction: 'asc' }]);
    } else if (sortConfig[0].direction === 'asc') {
      onSortChange([{ key, direction: 'desc' }]);
    } else {
      onSortChange(null);
    }
  };

  const handleHeaderClick = (col, event) => {
    if (col.filterableOptions) {
      event.stopPropagation();
      setOpenDropdown(openDropdown === col.key ? null : col.key);
    } else if (col.sortable) {
      handleSortToggle(col.key);
    }
  };

  const handleCheckboxChange = (columnKey, value, isChecked) => {
    if (onColumnFilterChange) {
      onColumnFilterChange(columnKey, value, isChecked);
    }
  };

  const handleClearSelection = (columnKey) => {
    if (onColumnFilterChange) {
      onColumnFilterChange(columnKey, null, true);
    }
  };

  const activeSort = Array.isArray(sortConfig) && sortConfig.length > 0 ? sortConfig[0] : null;

  return (
    <div className="tableWrapper">
      <div className="tableHeader">
        <span className="counter">{formatZaznam(countToShow)}</span>
      </div>

      <div className="tableContainer">
        <table className="table">
          <colgroup>
            {columns.map((col) => {
              let colClass = "otherColumn";
              if (col.width === 'wide') colClass = "wideColumn";
              else if (col.width === 'wider') colClass = "widerColumn";
              return <col key={col.key} className={colClass} />;
            })}
          </colgroup>
          <thead>
            <tr>
              {columns.map((col) => {
                const isActive = activeSort?.key === col.key;
                const direction = isActive ? activeSort.direction : null;
                let iconSrc = '/assets/icons/sort.svg';
                if (isActive && direction === 'asc') iconSrc = '/assets/icons/sort_up.svg';
                else if (isActive && direction === 'desc') iconSrc = '/assets/icons/sort_down.svg';

                const uniqueValues = col.filterableOptions ? getUniqueValues(col.key) : [];
                const isDropdownOpen = openDropdown === col.key;
                const currentFilter = columnFilters?.[col.key];
                const isFilterActive = currentFilter?.length > 0;

                return (
                  <th
                    key={col.key}
                    data-column-key={col.key}
                    onClick={(e) => handleHeaderClick(col, e)}
                    className={col.sortable || col.filterableOptions ? "sortableHeader" : ''}
                    style={{ position: 'relative' }}
                  >
                    <div className="headerFlex">
                      {col.filterableOptions && (
                        <img
                          src={isFilterActive ? '/assets/icons/filterActive.svg' : '/assets/icons/filter.svg'}
                          alt=""
                          className="sortIcon"
                        />
                      )}
                      <span>{col.label}</span>
                      {col.sortable && !col.filterableOptions && (
                        <img src={iconSrc} alt="" className="sortIcon" />
                      )}
                    </div>

                    {col.filterableOptions && isDropdownOpen && (
                      <DataTableFilterDropdown
                        columnKey={col.key}
                        uniqueValues={uniqueValues}
                        currentFilter={currentFilter}
                        onCheckboxChange={handleCheckboxChange}
                        onClearSelection={handleClearSelection}
                        getLabelForValue={getLabelForValue}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {countToShow > 0 && (
            <tbody>
              {sortedData.map((item, idx) => {
                const isExpanded = expandedRowIndex === idx;

                return (
                  <tr
                    key={idx}
                    className={isExpanded ? "expandedRow" : ''}
                    onClick={rowClickable && onRowClick ? () => onRowClick(item) : undefined}
                    style={rowClickable ? { cursor: 'pointer' } : {}}
                  >
                    {columns.map((col, colIdx) => {
                      const cellValue = item[col.key];
                      const displayValue = getLabelForValue(col.key, cellValue);
                      const isHighlighted = typeof displayValue === 'string' && searchTerm && displayValue.toLowerCase().includes(searchTerm.toLowerCase());
                      const cellContent = isHighlighted
                        ? highlightText(displayValue, searchTerm)
                        : displayValue;

                      const extraClassName = getCellClass(col.key, item[col.key]) || '';
                      const isExpandableCell = expandable && expandableColumns.includes(col.key);
                      const isTooltipCell = col.width === 'wider';
                      const baseClass = isTooltipCell ? "truncateCell" : "genericCell";

                      return (
                        <td
                          key={col.key}
                          className={`${baseClass} ${col.className || ''}`}
                          data-tooltip={isTooltipCell && typeof cellValue === 'string' ? cellValue : undefined}
                          onClick={
                            isExpandableCell
                              ? (e) => {
                                  e.stopPropagation();
                                  toggleRowExpanded(idx);
                                }
                              : undefined
                          }
                        >
                          <div className={isExpandableCell ? "expandableCellContent" : undefined}>
                            {expandable && colIdx === 0 && (
                              <img
                                src={isExpanded ? '/assets/icons/arrowUp.svg' : '/assets/icons/arrowDown.svg'}
                                alt={isExpanded ? 'Sbalit řádek' : 'Rozbalit řádek'}
                                className="expandableToggleIcon"
                              />
                            )}
                            {col.useWrapper ? (
                              <span className={`truncateGeneric tagWrapper ${extraClassName}`}>
                                {cellContent}
                              </span>
                            ) : (
                              <span className={`truncateGeneric ${isExpanded ? "expandedContent" : ''}`}>
                                {cellContent}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {countToShow === 0 && (
          searchTerm ? (
            <NoResultsBanner searchTerm={searchTerm} />
          ) : (
            <EmptyStateBanner
              message={emptyStateMessage}
              buttonText={emptyStateButtonText}
              onButtonClick={emptyStateButtonOnClick}
            />
          )
        )}
      </div>

      {openDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}
