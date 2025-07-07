'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import HeaderOVM from '@/components/ui/HeaderOVM';
import ClientOnly from '@/components/ClientOnly';
import Menu from '@/components/ui/Menu';
import Projekty from '@/components/sections/Projekty';
import Konzultace from '@/components/sections/Konzultace';
import Poznatky from '@/components/sections/InterniPoznatky';
import Systemy from '@/components/sections/InformacniSystemy';
import Agendy from '@/components/sections/Agendy';
import Dokumenty from '@/components/sections/Dokumenty';
import Contacts from '@/components/contacts/Contacts';
import data from '@/data/ovm.json';
import Link from 'next/link';

export default function KartaOvmPage({ params }) {
  const router = useRouter();
  const { idOVM, section } = use(params);

  const [ovmData, setOvmData] = useState(null);

  const extractOvmIdNumber = (id_ovm) => {
    const match = id_ovm?.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  };

  useEffect(() => {
    const selected = data.find(item => extractOvmIdNumber(item.id_ovm) === Number(idOVM));

    if (selected) {
      setOvmData(selected);
    } else {
      console.error(`OVM s id_ovm → ${idOVM} nebylo nalezeno`);
      setOvmData(null);
    }
  }, [idOVM]);

  const handleSectionChange = (newSection) => {
    router.push(`/kartaOVM/${idOVM}/${encodeURIComponent(newSection)}`);
  };

  const renderContent = () => {
    switch (section) {
      case 'Projekty':
        return <Projekty ovm={ovmData} />;
      case 'Konzultace':
        return <Konzultace ovm={ovmData} />;
      case 'Interni_poznatky':
        return <Poznatky ovm={ovmData} />;
      case 'Informacni_systemy':
        return <Systemy ovm={ovmData} />;
      case 'Agendy':
        return <Agendy ovm={ovmData} />;
      case 'Dokumenty':
        return <Dokumenty ovm={ovmData} />;
      default:
        return <div>Vyberte sekci</div>;
    }
  };

  return (
    <ClientOnly>
      <gov-container>
        <div className="react-main-center">
        <div className="headerOVM">
          <gov-breadcrumbs accessible-label="Seznam úrovní">
            <ul>
              <li>
                <Link style={{ color: 'var(--green-primary)' }} href="/">
                  Domů
                </Link>
              </li>
              <li>
                <gov-icon type="components" name="chevron-right"></gov-icon>
                <Link style={{ color: 'var(--green-primary)' }} href="/centralniDashboard">
                  Centrální dashboard
                </Link>
              </li>
              {ovmData?.nazev && (
                <li>
                  <gov-icon type="components" name="chevron-right"></gov-icon>
                  <strong>{ovmData.nazev}</strong>
                </li>
              )}
            </ul>
          </gov-breadcrumbs>

          {ovmData ? (
            <HeaderOVM key={idOVM} ovm={ovmData} />
          ) : (
            <p>Načítám data...</p>
          )}
        </div>

        <div className="menu">
          <Menu activeItem={section} onSelect={handleSectionChange} />
        </div>

        <div className="mainContent">
          {renderContent()}
        </div>

        <div className="contacts">
          <Contacts ovm={ovmData} />
        </div>
        </div>
      </gov-container>
    </ClientOnly>
  );
}
