'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamické importy komponent z @gov-design-system
const GovFormCheckbox = dynamic(() => import('@gov-design-system-ce/react/dist/GovFormCheckbox'), { ssr: false });
const GovFormLabel = dynamic(() => import('@gov-design-system-ce/react/dist/GovFormLabel'), { ssr: false });
const GovFormCheckboxGroup = dynamic(() => import('@gov-design-system-ce/react/dist/GovFormCheckboxGroup'), { ssr: false });



export default function DataTableFilterDropdown({
  columnKey,
  uniqueValues,
  currentFilter,
  onCheckboxChange,
  onClearSelection,
  alignRight,
  getLabelForValue
}) {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const isFilterActive = currentFilter && currentFilter.length > 0;

  useEffect(() => {
    const updatePosition = () => {
      const headerCell = document.querySelector(`th[data-column-key="${columnKey}"]`);
      if (headerCell) {
        const rect = headerCell.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom,
          left: alignRight ? rect.right - 320 : rect.left
        });
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [columnKey, alignRight]);

  // Handler pro změnu checkbox group
  const handleGroupChange = (e) => {
    const newValues = e.detail.value;
    const oldValues = currentFilter || [];

    const added = newValues.find(v => !oldValues.includes(v));
    const removed = oldValues.find(v => !newValues.includes(v));

    if (added) onCheckboxChange(columnKey, added, true);
    if (removed) onCheckboxChange(columnKey, removed, false);
  };

  return (
    <div
      className={`dropdownBox ${alignRight ? 'alignRight' : ''}`}
      style={{
        position: 'fixed',
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        zIndex: 1001
      }}
      onClick={(e) => e.stopPropagation()}
    >
      
      <GovFormCheckboxGroup value={currentFilter || []} onGovChange={handleGroupChange} gap="s">
        {uniqueValues.map((value) => {
          if (value == null || value === '') return null; // skryj null/empty

          const label = getLabelForValue ? getLabelForValue(columnKey, value) : value;

          return (
            <GovFormCheckbox key={value} value={value} size="m">
              <GovFormLabel size="m" slot="label">{label}</GovFormLabel>
            </GovFormCheckbox>
          );
        })}
      </GovFormCheckboxGroup>

      {isFilterActive && (
        <div
          className="dropdownOption clearSelection"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClearSelection(columnKey);
          }}
        >
          <img
            src="/assets/icons/removeSelection.svg"
            alt="Smazat výběr"
            style={{ width: '16px', height: '16px' }}
          />
          <span>Smazat výběr</span>
        </div>
      )}
    </div>
  );
}
