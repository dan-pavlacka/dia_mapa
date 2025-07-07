'use client';

import { useState, useMemo } from 'react';
import budgetData from '@/data/rozpocet.json';

export default function BudgetModal({ onClose, ovm }) {
  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? String(parseInt(match[1], 10)) : null;
  };

  const years = useMemo(() => {
    const ovmBudgetData = budgetData.filter(
      item => extractOvmIdNumber(item.id_ovm) === extractOvmIdNumber(ovm.id_ovm)
    );
    return Array.from(new Set(ovmBudgetData.map(item => item.rok))).sort((a, b) => a - b);
  }, [ovm]);

  const [selectedYear, setSelectedYear] = useState(() => {
    const allYears = budgetData
      .filter(item => extractOvmIdNumber(item.id_ovm) === extractOvmIdNumber(ovm.id_ovm))
      .map(item => item.rok);
    return allYears.length > 0 ? Math.max(...allYears) : null;
  });

  const rowsToDisplay = [
    'Pořízení dlouhodobého hmotného majetku',
    'Pořízení dlouhodobého nehmotného majetku',
    'Výdaje na nákup služeb',
    'Celkový součet'
  ];

  const filteredData = budgetData.filter(
    item =>
      extractOvmIdNumber(item.id_ovm) === extractOvmIdNumber(ovm.id_ovm) &&
      item.rok === selectedYear &&
      rowsToDisplay.includes(item.podseskupeni)
  );

  const formatMoney = (value) => {
    if (value === 0) return '0 Kč';

    if (value >= 1_000_000) {
      const mil = value / 1_000_000;
      return `${mil.toFixed(2).replace('.', ',')} mil Kč`;
    } else if (value >= 1_000) {
      const tis = value / 1_000;
      return `${tis.toFixed(0)} tis Kč`;
    } else {
      return `${value} Kč`;
    }
  };

  return (
          <div className={"budgetModalOverlay"} onClick={onClose}>
              <div className={"budgetModalContent"} onClick={(e) => e.stopPropagation()}>
        {/* Ikona krizek vpravo nahoře */}
        <img
          src="/assets/icons/krizek.svg"
          alt="Zavřít"
          className={"closeIcon"}
          onClick={onClose}
        />

        <h2>Rozpočet na digitalizaci</h2>

        {/* Divider nad yearSelector */}
        <div className={"divider"}></div>

        {/* YearSelector */}
        <div className={"yearSelector"}>
          {years.map(year => (
            <button
              key={year}
              className={`${"yearButton"} ${year === selectedYear ? "active" : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        {/* ContentWrapper → tabulka + button */}
        <div className={"contentWrapper"}>
          <table className={"budgetTable"}>
            <thead>
              <tr>
                <th></th>
                <th>Schválený rozpočet</th>
                <th>Rozpočet po změnách</th>
                <th>Konečný rozpočet</th>
                <th>Výsledek od počátku roku</th>
              </tr>
            </thead>
            <tbody>
              {rowsToDisplay.map(rowName => {
                const rowData = filteredData.find(item => item.podseskupeni === rowName);

                return (
                  <tr key={rowName}>
                    <td>{rowName}</td>
                    <td>{rowData ? formatMoney(rowData.schvaleny_rozpocet) : '-'}</td>
                    <td>{rowData ? formatMoney(rowData.rozpocet_po_zmenach) : '-'}</td>
                    <td>{rowData ? formatMoney(rowData.konecny_rozpocet) : '-'}</td>
                    <td>{rowData ? formatMoney(rowData.vysledek_od_pocatku_roku) : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Divider nad zavrit buttonem */}
          <div className={"divider"}></div>

          {/* Zavřít button */}
          <button className={"budgetCloseButton"} onClick={onClose}>
            Zavřít
          </button>
        </div>
      </div>
    </div>
  );
}
