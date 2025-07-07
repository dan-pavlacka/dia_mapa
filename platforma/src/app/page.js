import Link from 'next/link';
import ClientOnly from '@/components/ClientOnly';

import Banner from '@/components/banner/Banner';
import CardSection2col from '@/components/cardSection/CardSection2col';
import BannerSmallIcon from '@/components/bannerSmallIcon/BannerSmallIcon';
import CardSection3Col from '@/components/cardSection/CardSection3Col';
import CardHomepage from '@/components/cardSection/CardHomepage';
import CardNews from '@/components/cardSection/CardNews';
import Contacts from '@/components/contacts/Contacts';
import CardEvent from '@/components/cardSection/CardEvent';
import SectionHeading from '@/components/cardSection/SectionHeading';
import SectionHeadingWithLink from '@/components/cardSection/SectionHeadingWithLink';
import LoginHint from '@/components/login/LoginHint';


export default function HomePage() {
  const cardsAktivity = [
    {
      id: 'ak1',
      icon: 'Confusion',
      title: 'Zapojení občanů do digitalizace státu',
      description: 'Diskusní fórum a hlasování o tématech digitalizace.',
      buttonLabel: 'Chci se zapojit',
      buttonHref: '#'
    },
    {
      id: 'ak2',
      icon: 'Region',
      title: 'Prostorové zobrazení digitalizace ČR',
      description: 'Zobrazení míry digitalizace České republiky a katalog geoportálů.',
      buttonLabel: 'Více o prostorových informacích',
      buttonHref: '#'
    },
    {
      id: 'ak3',
      icon: 'News',
      title: 'Projektový guideline',
      description: 'Vývojový diagram zobrazující výstupy a aktivity životního cyklu modelového projektu na časové osy.',
      buttonLabel: 'Více o guideline',
      buttonHref: '#'
    },
    {
      id: 'ak4',
      icon: 'doc-agreement',
      title: 'Metodiky',
      description: 'Metodické dokumenty, doporučení a příklady dobré praxe pro agendy spravované DIA.',
      buttonLabel: 'Zobrazit metodiky',
      buttonHref: '#'
    }
  ];

  const cardsZnalosti = [
    {
      id: 'inf1',
      icon: 'Chat',
      title: 'Informace o aktivitách OVM',
      description: 'Databáze informací o orgánech veřejné správy, jejich projektech a konzultacích Kompetenčních center DIA:',
      buttonLabel: 'Přejít na centrální dashboard',
      buttonHref: '/centralniDashboard'
    },
    {
      id: 'inf1',
      icon: 'doc-agreement',
      title: 'Znalostní báze Kompetenčních center',
      description: 'Znalostní báze pro činnost Kompetenčních center DIA. Sdružuje informace o aktivitách KC.',
      buttonLabel: 'Přejít do znalostní báze',
      buttonHref: '#'
    }
  ];

  const newsCards = [
    {
      title: 'Nový datový portál spuštěn',
      text: 'Zprovoznili jsme nový portál pro otevřená data, který přináší vyšší transparentnost.',
      date: '1. 7. 2025',
    },
    {
      title: 'Konference o digitalizaci 2025',
      text: 'Zúčastněte se národní konference zaměřené na trendy v digitalizaci veřejné správy.',
      date: '28. 6. 2025',
    },
    {
      title: 'Změna kontaktních údajů',
      text: 'Aktualizovali jsme informace o regionálních pobočkách a kontaktech.',
      date: '25. 6. 2025',
    },
  ];

  const cardsEvent = [
    {
      id: 'event1',
      title: 'Plánovaná odstávka ISSP',
      details: [
        {
          icon: 'buildings',
          label: 'MFČR',
          value: 'MFČR'
        },
        {
          icon: 'calendar-event',
          label: '11. dubna 2025',
          value: '11. dubna 2025'
        },
        {
          icon: 'clock',
          label: '9:00 - 10:00',
          value: '9:00 - 10:00'
        },
        {
          icon: 'gear_',
          label: 'ROB, ROS, JIP/KAAS ',
          value: 'ROB, ROS, JIP/KAAS '
        }
      ],
      text: 'Všechny systémy IISSP budou nedostupné od 11.04. od 19:00 do 13.04.2025 do 23:00'
    },
    {
      id: 'event2',
      title: 'Konference Informační systémy veřejné správy (ISSS)',
      details: [
        {
          icon: 'buildings',
          label: 'Triada spol. s.r.o.',
          value: 'Triada spol. s.r.o.'
        },
        {
          icon: 'calendar-event',
          label: '12.- 13. května 2025',
          value: '11. dubna 2025'
        },
        {
          icon: 'clock',
          label: '9:00 - 10:00',
          value: '9:00 - 10:00'
        }
      ],
      text: 'Jedna z předních konferencí systémů státní správy konaná v Hradci Králové.'
    },
    {
      id: 'event3',
      title: 'Pravidelný release',
      details: [
        {
          icon: 'buildings',
          label: 'DIA',
          value: 'DIA'
        },
        {
          icon: 'calendar-event',
          label: '2. dubna 2025',
          value: '2. dubna 2025'
        },
        {
          icon: 'clock',
          label: '9:00 - 10:00',
          value: '9:00 - 10:00'
        },
        {
          icon: 'gear_',
          label: 'ROB, ROS, JIP/KAAS ',
          value: 'ROB, ROS, JIP/KAAS '
        }
      ],
      text: 'Pravidelný release - provozní úpravy.'
    }
  ];
  

  return (
    <ClientOnly>
      <main id="main">
        <gov-container>
          
          {/*Horní velký banner*/}
          <Banner
            headline="Kompetenční centra DIA spojují experty na digitalizaci"
            description="Snažíme se pomáhat úřadům řešit složité výzvy, sdílet zkušenosti, testovat řešení a připravovat nové agendy digitální transformace."
            buttonLabel="Více o konzultační činnosti"
            buttonHref="#"
          />

          <gov-flex className="gov-mb--3xl" />

          {/**/}
          <gov-flex direction="column" gap="l">
            <SectionHeading id="aktivity-kc" heading="Aktivity kompetenčních center" />

            <CardSection2col cards={cardsAktivity} CardComponent={CardHomepage} />
          </gov-flex>

          <gov-flex className="gov-mb--3xl" />

          {/**/}
          <BannerSmallIcon
            headline="Chcete se vzdělávat v oblasti státní správy?"
            description="Tvoříme vzdělávací portál veřejné správy určený pro úředníky i pro veřejnost."
            buttonLabel="Přejít do eAkademie"
            buttonHref="https://eakademie.dia.gov.cz/"
            individualClass="gov-banner--homepage"
          />

          <gov-flex className="gov-mb--3xl" />

          {/*U událostí dodělat štítky a potom předělat podle dat*/}
          <gov-flex direction="column" gap="l">
            <SectionHeadingWithLink
              id="events-section"
              heading="Plánované události z e-governmentu"
              linkHref="/kalendar"
              linkLabel="Přejít na kalendář událostí"
            />

            <LoginHint textBeforeLink="Pro zobrazení všech událostí se" />

            <CardSection3Col
              cards={cardsEvent}
              CardComponent={CardEvent}
            />
          </gov-flex>

          <gov-flex className="gov-mb--3xl" />

          {/**/}
          <gov-flex direction="column" gap="l">
            <SectionHeading id="sdileni-znalosti" heading="Sdílení znalostí o digitalizaci" />

            <CardSection2col cards={cardsZnalosti} CardComponent={CardHomepage} />
          </gov-flex>

          <gov-flex className="gov-mb--3xl" />

          {/**/}
          <gov-flex direction="column" gap="l">
          <SectionHeadingWithLink
              id="events-section"
              heading="Novinky z portálu"
              linkHref="/novinky"
              linkLabel="Přejít na všechny novinky"
            />

            <CardSection3Col
              cards={newsCards}
              CardComponent={CardNews}
            />
          </gov-flex>

          <gov-flex className="gov-mb--3xl" />
          
          {/**/}
          <Contacts
            staticData={{
              osoba_v_cele: 'Hynek Bistrý',
              digi_zmocnenec: 'Martin Mesršmíd',
              digi_zmocnenec_funkce: '',
              digi_zmocnenec_email: 'martin.mesrsmid@dia.gov.cz',
              datova_schranka: 'yukd8p7',
              identifikator: '17651921',
              nazev: 'Digitální a informační agentura',
              adresa_ulice: 'Na vápence č.p. 915/14',
              adresa_mesto_psc: '13000 Praha 3 - Žižkov',
              labels: {
                osoba_v_cele: 'Ředitel KC',
                digi_zmocnenec: 'Ředitel DIA'
              }
            }}
          />
        </gov-container>
      </main>
    </ClientOnly>
  );
}
