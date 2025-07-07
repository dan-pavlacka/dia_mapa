'use client';


import InfoCard from '@/components/ui/InfoCard';
import BudgetInfoCard from '@/components/ui/BudgetInfoCard';

export default function HeaderOVM({ ovm, showSubtitle = true, showCards = true }) {
  if (!ovm) {
    console.log("HeaderOVM → ovm je undefined nebo null");
    return <p>Načítám OVM…</p>;
  }

  console.log("HeaderOVM → ovm je", ovm);

  return (
    <div className={"titleOVM"}>
      <h1 className={"heading"}>{ovm.nazev}</h1>

      {showSubtitle && (
        <p className={"subtitle"}>Zkratka: {ovm.zkratka}</p>
      )}

      {showCards && (
        <div className={"cardRow"}>
          <InfoCard 
            icon="/assets/icons/delivery.svg"
            label="Odpovědný delivery manager"
            value={ovm.zodpovedny_delivery}
          />
          <InfoCard 
            icon="/assets/icons/zmocnenec.svg"
            label="Digitální zmocněnec"
            value={ovm.digi_zmocnenec}
          />
          <BudgetInfoCard
            icon="/assets/icons/rozpocet.svg"
            label="Rozpočet na digitalizaci"
            value={ovm.rozpocet_konecny}
            ovm={ovm}
          />
        </div>
      )}
    </div>
  );
}
