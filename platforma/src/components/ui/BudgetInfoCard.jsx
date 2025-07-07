'use client';

import { useState } from 'react';
import BudgetModal from '@/components/ui/BudgetModal';

const formatCzechNumber = (num) => {
  if (typeof num !== 'number') return num;

  const parts = [];

  const billion = Math.floor(num / 1_000_000_000);
  if (billion > 0) {
    parts.push(`${billion} mld`);
    num -= billion * 1_000_000_000;
  }

  const million = Math.floor(num / 1_000_000);
  if (million > 0) {
    parts.push(`${million} mil`);
    num -= million * 1_000_000;
  }

  const thousand = Math.floor(num / 1_000);
  if (thousand > 0) {
    parts.push(`${thousand} tis`);
    num -= thousand * 1_000;
  }

  if (parts.length === 0 && num > 0) {
    parts.push(num.toString());
  }

  return parts.join(' ');
};

export default function BudgetInfoCard({ icon, label, value, ovm }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={"budgetCard"}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className={"budgetCardContent"}>
          <div className={"iconContainer"}>
            <img src={icon} alt="" className={"budgetIcon"} />
          </div>
          <div className={"textContainer"}>
                      <p className={"budgetLabel"}>{label}</p>
          <p className={"budgetValue"}>{formatCzechNumber(value)}</p>
          </div>
          <div className={"arrowButton"}>
            <img src="/assets/icons/chevron_right.svg" alt="Zobrazit detail" className={"arrowIcon"} />
          </div>
        </div>
      </div>

      {isModalOpen && ovm && (
        <BudgetModal onClose={() => setIsModalOpen(false)} ovm={ovm} />
      )}
    </>
  );
}
