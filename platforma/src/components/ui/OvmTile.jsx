'use client';


export default function OvmTile({ ovm, onClick, konzultaceCount, projektyCount, isvsCount }) {
  return (
    <div
              className={"ovmCard"}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className={"ovmCardContent"}>
        <div className={"titleRow"}>
          <h2 className={"ovmTitle"}>{ovm.nazev}</h2>
          <img
            src="/assets/icons/chevron_right_green.svg"
            alt="Detail"
            className={"chevronIcon"}
          />
        </div>

        <div className={"counts"}>
          <p className={"countsRow"}>
            Konzultace ({konzultaceCount}), Projekty ({projektyCount}), ISVS ({isvsCount})
          </p>
        </div>
      </div>
    </div>
  );
}
