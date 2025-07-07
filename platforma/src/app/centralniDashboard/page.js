'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { fetchOvmList, fetchKonzultace, fetchProjekty, fetchISVS } from '@/lib/api';

import Link from 'next/link';
import ClientOnly from '@/components/ClientOnly';

import HeaderOVM from '@/components/ui/HeaderOVM';
import SectionTitle from '@/components/ui/SectionTitle';
import OvmTile from '@/components/ui/OvmTile';
import LandingSearchBar from '@/components/ui/LandingSearchBar';


export default function CentralniDashboardPage() {
  const router = useRouter();

  const [ovmData, setOvmData] = useState([]);
  const [konzultaceData, setKonzultaceData] = useState([]);
  const [projektyData, setProjektyData] = useState([]);
  const [ISVSData, setISVSData] = useState([]);
  const [showAllOvm, setShowAllOvm] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [ovm, konz, proj, isvs] = await Promise.all([
        fetchOvmList(),
        fetchKonzultace(),
        fetchProjekty(),
        fetchISVS()
      ]);

      setOvmData(ovm);
      setKonzultaceData(konz);
      setProjektyData(proj);
      setISVSData(isvs);
    }

    loadData();
  }, []);

  useEffect(() => {
    // Add event listener for gov-button
    const handleGovClick = (event) => {
      if (event.target.dataset.action === 'showAll') {
        setShowAllOvm(true);
      }
    };

    document.addEventListener('gov-click', handleGovClick);
    
    return () => {
      document.removeEventListener('gov-click', handleGovClick);
    };
  }, []);

  const handleSelectOvm = (ovmItem) => {
    const ovmIdNumber = extractOvmIdNumber(ovmItem.id_ovm);
    router.push(`/kartaOVM/${ovmIdNumber}/Projekty`);
  };

  const dummyOvm = {
    nazev: 'Informace o aktivitách OVM',
    zkratka: '',
    zodpovednyDelivery: '',
    zmocnenecJmeno: '',
    rozpocet_konecny: 0
  };

  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  const ovmOrder = [
    'Digitální a informační agentura',
    'Ministerstvo dopravy',
    'Ministerstvo financí',
    'Ministerstvo kultury',
    'Ministerstvo obrany',
    'Ministerstvo práce a sociálních věcí',
    'Ministerstvo pro místní rozvoj',
    'Ministerstvo průmyslu a obchodu',
    'Ministerstvo spravedlnosti',
    'Ministerstvo školství, mládeže a tělovýchovy',
    'Ministerstvo vnitra',
    'Ministerstvo zahraničních věcí',
    'Ministerstvo zdravotnictví',
    'Ministerstvo zemědělství',
    'Ministerstvo životního prostředí',
    'Český báňský úřad',
    'Český statistický úřad',
    'Český telekomunikační úřad',
    'Český úřad zeměměřický a katastrální',
    'Energetický regulační úřad',
    'Národní bezpečnostní úřad',
    'Národní sportovní agentura',
    'Národní úřad pro kybernetickou a informační bezpečnost',
    'Rada pro rozhlasové a televizní vysílání',
    'Správa státních hmotných rezerv',
    'Státní úřad pro jadernou bezpečnost',
    'Úřad pro dohled nad hospodařením politických stran a politických hnutí',
    'Úřad pro ochranu hospodářské soutěže',
    'Úřad pro ochranu osobních údajů',
    'Úřad průmyslového vlastnictví',
    'Úřad vlády České republiky',
    'ČESKÁ NÁRODNÍ BANKA'
  ];

  const sortedData = [...ovmData].sort((a, b) => {
    const indexA = ovmOrder.indexOf(a.nazev);
    const indexB = ovmOrder.indexOf(b.nazev);
    
    // If an OVM is not found in ovmOrder, put it at the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  const ovmToShow = showAllOvm ? sortedData : sortedData.slice(0, 6);

  return (
    <ClientOnly>
      <gov-container>
        <div className="react-main-center">
        <div className="headerOVM">
          <gov-breadcrumbs accessible-label="Seznam úrovní">
            <ul>
              <li>
                <Link href="/" style={{ color: 'var(--green-primary)' }}>
                  Domů
                </Link>
              </li>
              <li>
                <gov-icon type="components" name="chevron-right"></gov-icon>
                <strong>Centrální dashboard</strong>
              </li>
            </ul>
          </gov-breadcrumbs>

          <HeaderOVM ovm={dummyOvm} showSubtitle={false} showCards={false} />
        </div>

        <LandingSearchBar
          data={ovmData}
          placeholder="Zadejte název OVM, ID záměru / projektu, ID konzultace, název ISVS..."
          onSelect={handleSelectOvm}
        />

        <div className="mainContent mainContentOVM">
          <SectionTitle sectionName="Orgány veřejné moci" />

          <div className="grid">
            {ovmToShow.map((ovm) => {
              const ovmIdNumber = extractOvmIdNumber(ovm.id_ovm);

              const konzultaceCount = konzultaceData.filter(item => extractOvmIdNumber(item.id_ovm) === ovmIdNumber).length;
              const projektyCount = projektyData.filter(item => extractOvmIdNumber(item.id_ovm) === ovmIdNumber).length;
              const isvsCount = ISVSData.filter(item => extractOvmIdNumber(item.id_spravce_isvs) === ovmIdNumber).length;

              return (
                <OvmTile
                  key={ovm.id_ovm}
                  ovm={ovm}
                  onClick={() => handleSelectOvm(ovm)}
                  konzultaceCount={konzultaceCount}
                  projektyCount={projektyCount}
                  isvsCount={isvsCount}
                />
              );
            })}
          </div>

          {!showAllOvm && ovmData.length > 6 && (
            <gov-flex className="gov-flex" gap="l" direction="row">
          
              <gov-button
                size="m"
                type="outlined"
                color="primary"
                data-action="showAll"
                className="showMoreButton"
              >
                Zobrazit vše ({ovmData.length})
              </gov-button>
            </gov-flex>
          )}
        </div>
        </div>
      </gov-container>
    </ClientOnly>
  );
}
