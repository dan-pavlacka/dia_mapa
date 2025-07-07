'use client';

import AddRecordButton from '@/components/ui/AddRecordButton';  // ← přidáš import

export default function SectionTitle({ icon, sectionName, subtitle, subtitleUrl, ovm, addButton }) {
  return (
    <div className={"sectionTitleWrapper"}>
      <div className={"sectionTitleRow"}>  {/* nový wrapper pro zarovnání */}
        <div className={"sectionTitle"}>
          {icon && <img src={icon} alt="" className={"sectionIcon"} />}
          <h1 className={"name"}>
            {sectionName}
            {ovm && ovm.zkratka && <span className={"abbr"}>{ovm.zkratka}</span>}
          </h1>
        </div>

        {addButton && (
          <AddRecordButton text={addButton.text} onClick={addButton.onClick} />
        )}
      </div>

      {subtitle && (
        <div className={"subtitle"}>
          {subtitle.before}
          {ovm && ovm.zkratka}
          {subtitle.after}{' '}
          <a className={"subtitleUrl"} href={subtitleUrl} target="_blank" rel="noopener noreferrer">
            {subtitle.linkText}
          </a>
        </div>
      )}
    </div>
  );
}
