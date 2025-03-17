const translations = {
    cs: {
        title: "KPC | Mapa digitalizace",
        sidebar_header: "Prostorová data", 
        pane1_icon_tooltip: "Index digitalizace",
        pane2_icon_tooltip: "Vrstvy EU",
        pane3_icon_tooltip: "Informace o kraji",
        pane4_icon_tooltip: "Informace o indexech",
        pane5_icon_tooltip: "Export do PDF",
        pane6_icon_tooltip: "Informace o aplikaci",
        jazyk: "CZ", 
        pane1_sticky: "Na mapě je znázorněna úroveň digitalizace státní správy.",
        pane2_sticky: "Na mapě je znázorněna úroveň digitalizace členských států EU.",
        pane3_sticky: "Zde naleznete doplňující odkazy informace k jednotlivým krajům. Pro zobrazení informací ke konkrétnímu kraji klikněte v mapě na kraj nebo vyberte z nabídky níže.",
        pane4_sticky: "Indexy digitalizace pro kraje ČR byly navrženy na základě evropského indexu DESI.",
        pane5_sticky: "Zde je možné exportovat mapu do pdf. Rozměr pdf a obsah mapy bude přizpůsoben vašemu aktuálnímu pohledu na mapu.",
        
        pane6_sticky: "Zobrazení míry digitalizace České republiky na interaktivní mapě.", //lorem ipsum v informacích o aplikaci
        jak_pracovat: "Jak s aplikací pracovat",
        jak_pracovat_text: "Tato aplikace umožňuje snadné zobrazení míry digitalizace a dalších relevantních dat. Uživatelé si mohou zobrazit konkrétní informace dvěma způsoby:", //lorem ipsum v informacích o aplikaci
        vyberem_parametru: "Výběrem parametru",
        vyberem_parametru_text: " – Pomocí filtrů si zvolte požadovaný ukazatel a zobrazte odpovídající data.",
        kliknutim_do_mapy: "Kliknutím do mapy",
        kliknutim_do_mapy_text: " – Kliknutím na konkrétní oblast získáte podrobnosti o digitalizaci a souvisejících ukazatelích.",
        o_aplikaci: "O aplikaci",
        o_aplikaci_text: "Vytvořeno v rámci projektu ROPIM – Reforma pro optimalizaci, implementaci a metodické řízení digitalizovaných služeb vč. jejich kapacitního plánování a komunikaci informací klientům veřejné správy, financovaného Evropskou unií NextGeneration.",
        cislo_projektu: "Reg. č.: CZ.31.5.0/0.0/0.0/23_106/0008503",
        dia: "2024 © Digitální a informační agentura",
        paticka_text1: "Informace jsou poskytovány v souladu se zákonem č. 106/1999 Sb., o svobodném přístupu k informacím.",
        paticka_text2: "Verze 2.0.2105.9856 | Využit Design system 4.2",

        pane1_h2:"Mapa digitalizace ČR",
        pane2_h2:"Mapa digitalizace EU",
        pane3_h2:"Informace o krajích",
        pane4_h2:"Indexy digitalizace ČR",
        pane5_h2_stahnout_mapu:"Stáhnout mapu",
        pane6_h2:"Informace o aplikaci",
        vic_info: "Více info.",
        vycistit_mapu: "Vyčistit mapu",
        schema_indexu: "Schéma indexu",
        digitalizace_v_krajich: "Digitalizace v krajích",
        digitalni_sluzby: "Digitální služby",
        bodova_data: "Bodová data",
        index_digitalizace: "Celkový index digitalizace",
        
        sub_portaly: "Subindex webové portály",
        sub_sluzby: "Subindex digitální služby", 
        sub_pristupnost: "Subindex přístupnosti služeb",

        sub_dovednosti: "Subindex digitální dovednosti",
        sub_infrastruktura: "Subindex digitální infrastruktura", 
        
        index_digitalizace_: "Celkový index digitalizace:",
        sub_portaly_: "Subindex webové portály:",
        sub_sluzby_: "Subindex digitální služby:",
        sub_pristupnost_: "Subindex přístupnosti:",
        sub_dovednosti_: "Subindex digitální dovednosti:",
        sub_infrastruktura_: "Subindex digitální infrastruktura:", 
        
        czech_point: "Czech POINT",
        krajsky_urad: "Krajský úřad",
        odebrat_index: "Odebrat index",
        odebrat_sluzbu: "Odebrat službu",
        odebrat_body: "Odebrat body", 
        desi_index: "DESI Index",
        desi_index22: "DESI Index 2022",
        desi_index21: "DESI Index 2021",
        desi_index20: "DESI Index 2020", 
        co_je_DESI: "Co to je Index DESI?",
        co_je_DESI_text: "Evropský index DESI (Digital Economy and Society Index) je každoroční hodnocení digitální konkurenceschopnosti členských států EU. Více informací naleznete zde.",
        k_cemu_slouzi: "K čemu slouží?",
        k_cemu_slouzi_text: "Index DESI pomáhá porovnávat digitální pokrok jednotlivých zemí EU a určovat oblasti, které je třeba zlepšit.",
        podle_ceho_se_meri: "Podle čeho se měří",
        podle_ceho_se_meri_text: "Měří pokrok v digitalizaci na základě několika klíčových oblastí:",
        konektivita: "Konektivita",
        konektivita_text: " – dostupnost a kvalita širokopásmového připojení (pevného i mobilního).", 
        lidsky_kapital: "Lidský kapitál",
        lidsky_kapital_text: " – digitální dovednosti obyvatel a odborníků v oblasti IT.",
        integrace_ICT: "Integrace digitálních technologií",
        integrace_ICT_text: " – digitalizace firem a využívání technologií (např. cloud, umělá inteligence, e-commerce).",
        digitalni_sluzby: "Digitální veřejné služby",
        digitalni_sluzby_text: " – úroveň e-governmentu a digitálních služeb státní správy.", 

        overall_index_popis: "Index je stavoven vážením dílčích subindexů. Váhy jsou stanoveny rovnoměrně.",
        
        sub_portaly_popis: "Stanoven jako procentuální podíl vybraných digitálních služeb, poskytovaných krajem. Hodnocené služby jsou:", 
        sub_sluzby_popis: "Stanoven jako průměrná hodnota vybraných ukazatelů, které byly předem normalizovány.",
        
        sub_pristupnost_popis: "Stanoven jako průměrná hodnota vybraných ukazatelů. Přístupnost webových stránek a SEO bylo měřeno nástrojem Lighthouse accessibility scoring, dne 12.2.2025, pro webové stránky krajů.",
        sub_dovednosti_popis: "Stanoven jako průměrná hodnota vybraných ukazatelů, které byly předem normalizovány.",
        sub_infrastruktura_popis: "Stanoven jako průměrná hodnota vybraných ukazatelů, které byly předem normalizovány",
        //překlady služeb pro znovupoužití v JS výpisech
        platebni_portal: "Platební portál",
        rozklikavaci_rozpocet: "Rozklikávací rozpočet",
        integrovany_dopravni_system: "Integrovaný dopravní systém",
        geoportal: "Geoportál",
        portal_otevrenych_dat: "Portál otevřených dat",
        katalog_soc_sluzeb: "Katalog sociálních služeb",
        portal_kriz_rizeni: "Portál krizového řízení",
        dotacni_portal: "Dotační portál",
        turisticky_portal: "Turistický portál",
        portal_pacienta: "Portál pacienta",
        ePodatelna: "ePodatelna",
        skolsky_portal: "Školský portál",
        portal_prispevkovych_organizaci: "Portál příspěvkových organizací",





        //popisky jednotlivých indikátorů
        pristupnost_desktop: "Přístupnost desktop",
        pristupnost_mobile: "Přístupnost mobile",
        seo_desktop: "SEO desktop",
        seo_mobile: "SEO mobile",
        pocet_kmvs: "Počet Czech POINTŮ na 1000 obyvatel (normalizováno)",
        pocet_kmvs_: "Počet Czech POINTŮ na 1000 obyvatel",
        lekar_online_objednani: "Podíl ordinací, kde se lze přihlásit online k vyšetření",
        lekar_elektronicka_dokumentace: "Podíl ordinací, které vedou zdravotnickou dokumentaci elektronicky",
        lekar_web: "Podíl ordinací, které mají vlastní web",

        osoby_internet_denne: "Podíl osob, které denně využívají internet",
        osoby_soc_site: "Podíl osob, využívajících sociální sítě",
        osoby_bankovnictvi: "Podíl osob, využívajících internetové bankovnictví",
        studenti_ICT: "Podíl studentů ICT oborů na VŠ (dle trvalého bydliště)",
        absolventi_ICT: "Podíl ICT absolventů (dle trvalého bydliště)",
        odbornici_ICT: "Podíl ICT odborníků (dle CZ-NACE)",

        PC_ZS: "Počet počítačů na 100 žáků ZŠ",
        PC_ZS_2: "Počet počítačů na 100 žáků SŠ",
        PC_SS: "Počet počítačů starých do 2 let na 100 žáků SŠ",
        PC_SS_2: "Počet počítačů starých do 2 let na 100 žáků ZŠ",

        domacnosti_internet: "Podíl domácností s připojením k internetu",
        osoby_internet_tel: "Podíl osob využívajících internet na telefonu",
        pokryti_30mb: "Pokrytí infrastrukturou 30 Mbit/s (% ZSJ >80%)",
        pokryti_100mb: "Pokrytí infrastrukturou 100 Mbit/s (% ZSJ >80%)",
        //javascript
        kraj_dostupna_sluzba: "služba dostupná",
        odkaz_nedostupny: "Odkaz na službu není dostupný.",
        a_vice: "a více", 
        mene_nez: "méně než",
        mapTitle_placeholder: "Zadejte titulek mapy",
        zadny_kraj: "Žádný vybraný kraj", 
        zadny_kraj_text: "Výběrem kraje ze seznamu nebo kliknutím na mapu si zobrazíte indexy digitalizace v kraji.",
        zavreno: "zavřeno", 
        ICO: "IČO:",
        uredni_hodiny: "Úřední hodiny:", 
        po: "Po: ", 
        ut: "Út: ", 
        st: "St: ",
        ct: "Čt: ", 
        pa: "Pá: ",  

        desi_index_: "DESI Index: ",
        lidsky_kapital_: "Lidský kapitál:",
        digitalni_infrastruktura_: "Digitální infrastruktura:",
        konektivita_: "Digitalizace veřejné služby:",
        integrace_ICT_: "Integrace digitálních technologií:",
        //tooltipy
        digitalizace_v_krajich_tooltip: "Indexy digitalizace",
        digitalni_verejne_sluzby_tooltip: "Seznam digitálních služeb",
        bodova_data_tooltip: "Ovládání vrstev s bodovými daty",

        schema_tooltip: "Otevře schéma indexu v novém okně",

        celkovy_index_tooltip: "Výsledný index digitalizace je vypočítán vážením dílčích subindexů",
        podkladove_mapy_tooltip: "Podkladové mapy",
        zoom_na_cr_tooltip: "Podle aktivního obsahu mapy přiblíží na ČR nebo na EU",
        
        index_sluzba_tooltip: "Hodnocení kvality a dostupnosti digitálních služeb poskytovaných veřejnou správou",
        index_portaly_tooltip: "Hodnocení webových portálů",

        index_pristupnost_tooltip: "Míra dostupnosti digitálních služeb pro všechny uživatele, včetně osob se specifickými potřebami",
        index_dovednost_tooltip: "Úroveň digitálních znalostí a schopností občanů a zaměstnanců veřejné správy",
        index_infrastruktura_tooltip: "Stav a kvalita technického zázemí pro digitální služby, jako je konektivita a bezpečnost",
        
        platebni_portal_tooltip: "Online systém pro platby veřejné správě",
        rozklikavaci_rozpocet_tooltip: "Interaktivní přehled příjmů a výdajů veřejného rozpočtu",
        integrovany_dopravni_system_tooltip: "Propojení různých druhů dopravy do jednoho systému",
        geoportal_tooltip: "Mapová platforma pro prostorová data a informace",
        portal_otevrenych_dat_tooltip: "Přístup k veřejným datům ke stažení a dalšímu využití",
        katalog_soc_sluzeb_tooltip: "Přehled poskytovatelů sociálních služeb",
        portal_kriz_rizeni_tooltip: "Informace a nástroje pro krizové situace",
        dotacni_portal_tooltip: "Přehled dotací a možností financování",
        turisticky_portal_tooltip: "Informace a služby pro turisty v regionu",
        portal_pacienta_tooltip: "Online přístup k zdravotním záznamům a službám",
        ePodatelna_tooltip: "Elektronické podání dokumentů pro veřejnou správu",
        skolsky_portal_tooltip: "Informace a nástroje pro školy, učitele a studenty",
        portal_prispevkovych_organizaci_tooltip: "Správa a podpora příspěvkových organizací",       
        
        czech_point_tooltip: "Kontaktní místo pro ověřené výpisy a podání",
        krajsky_urad_tooltip: "Správní orgán kraje zajišťující veřejné služby",
        
        
        
        zakladni: "Základní",
        letecka: "Letecká", 
        bez_podkladu: "Bez podkladu"        
    },

    en: {
        title: "KPC | Digitalization Map",
        sidebar_header: "Spatial data", 
        pane1_icon_tooltip: "Digitalisation index",
        pane2_icon_tooltip: "EU layers",
        pane3_icon_tooltip: "Information about the region",
        pane4_icon_tooltip: "Information abou indices",
        pane5_icon_tooltip: "Export to PDF",
        pane6_icon_tooltip: "Information about the application",
        jazyk: "EN",
        pane1_sticky: "The map shows the level of digitalisation of the public administration.",
        pane2_sticky: "The map shows the level of digitalisation in the EU Member States.",
        pane3_sticky: "Here you will find additional links and information for individual regions. To view information for a specific region, click on the region on the map or select it from the menu below.",
        pane4_sticky: "The digitalisation indices for the regions of the Czech Republic were designed on the basis of the European DESI index.",
        pane5_sticky: "Here you can export the map to pdf. The size of the pdf and the content of the map will be adapted to your current view of the map.",
        pane6_sticky: "Displaying the level of digitization of the Czech Republic on an interactive map.",
        jak_pracovat: "How to use the application",
        jak_pracovat_text: "This application allows easy display of the level of digitization and other relevant data. Users can access specific information in two ways:",
        vyberem_parametru: "By selecting a parameter",
        vyberem_parametru_text: " – Use filters to choose the desired indicator and display the corresponding data.",
        kliknutim_do_mapy: "By clicking on the map",
        kliknutim_do_mapy_text: " – Click on a specific area to get details about digitization and related indicators.",
        o_aplikaci: "About the application",
        o_aplikaci_text: "Created as part of the ROPIM project – Reform for Optimization, Implementation, and Methodological Management of Digitalized Services, including their capacity planning and communication of information to public administration clients, funded by the European Union NextGeneration.",
        cislo_projektu: "Reg. No.: CZ.31.5.0/0.0/0.0/23_106/0008503",
        dia: "2024 © Digital and Information Agency",
        paticka_text1: "Information is provided in accordance with Act No. 106/1999 Coll., on free access to information.",
        paticka_text2: "Version 2.0.2105.9856 | Using Design System 4.2",

        pane1_h2:"Map of digitalisation of the Czech Republic",
        pane2_h2:"Map of EU digitalisation",
        pane3_h2:"Information about the regions",
        pane4_h2:"Czech digitalisation indices",
        pane5_h2_stahnout_mapu:"Download map",
        pane6_h2:"Information about the application",
        vic_info: "More info.",
        vycistit_mapu: "Clear map",
        schema_indexu: "Index scheme",
        digitalizace_v_krajich: "Digitisation in the regions",
        digitalni_sluzby: "Digital services",
        bodova_data: "Point data",
        index_digitalizace: "Overall Digitalisation index",
        sub_portaly: "Subindex of web portals",
        sub_sluzby: "Subindex of digital services",
        sub_pristupnost: "Accessibility Subindex",
        sub_dovednosti: "Digital Skills Subindex",
        sub_infrastruktura: "Digital Infrastructure Subindex",
        index_digitalizace_: "Overall Digitalisation index:",
        sub_sluzby_: "Digital services Subindex:",
        sub_portaly_: "Web portals Subindex:",
        sub_pristupnost_: "Accessibility Subindex:",
        sub_dovednosti_: "Digital Skills Subindex:",
        sub_infrastruktura_: "Digital Infrastructure Subindex:",

        czech_point: "Czech POINT",
        krajsky_urad: "Regional Office",
        odebrat_index: "Remove index",
        odebrat_sluzbu: "Remove service",
        odebrat_body: "Remove points", 
        desi_index: "DESI Index", 
        desi_index22: "DESI Index 2022",
        desi_index21: "DESI Index 2021",
        desi_index20: "DESI Index 2020",
        co_je_DESI: "What is the DESI Index?",
        co_je_DESI_text: "The European DESI Index (Digital Economy and Society Index) is an annual assessment of the digital competitiveness of EU member states. More information can be found here.",
        k_cemu_slouzi: "What is it used for?",
        k_cemu_slouzi_text: "The DESI Index helps compare the digital progress of EU countries and identify areas that need improvement.",
        podle_ceho_se_meri: "How is it measured?",
        podle_ceho_se_meri_text: "It measures digitalization progress based on several key areas:",
        konektivita: "Connectivity",
        konektivita_text: " – availability and quality of broadband access (both fixed and mobile).",
        lidsky_kapital: "Human Capital",
        lidsky_kapital_text: " – digital skills of citizens and IT professionals.",
        integrace_ICT: "Integration of Digital Technologies",
        integrace_ICT_text: " – digitalization of businesses and the use of technologies (e.g., cloud computing, artificial intelligence, e-commerce).",
        digitalni_sluzby: "Digital Public Services",
        digitalni_sluzby_text: " – level of e-government and digital services in public administration.",
        overall_index_popis: "The index is determined by weighting individual subindexes. The weights are assigned evenly.",
        sub_portaly_popis: "Defined as the percentage share of selected digital services provided by the region. The evaluated services are:",
        sub_sluzby_popis: "Defined as the average value of selected indicators that have been pre-normalized.",
        sub_pristupnost_popis: "Determined as the average value of selected indicators. Website accessibility and SEO were measured using the Lighthouse accessibility scoring tool on February 12, 2025, for regional websites.",
        sub_dovednosti_popis: "Determined as the average value of selected indicators, which were pre-normalized.",
        sub_infrastruktura_popis: "Determined as the average value of selected indicators, which were pre-normalized.",
        // Translations of services for reuse in JS outputs
        platebni_portal: "Payment Portal",
        rozklikavaci_rozpocet: "Expandable Budget",
        integrovany_dopravni_system: "Integrated Transport System",
        geoportal: "Geoportal",
        portal_otevrenych_dat: "Open Data Portal",
        katalog_soc_sluzeb: "Social Services Catalog",
        portal_kriz_rizeni: "Crisis Management Portal",
        dotacni_portal: "Subsidy Portal", 
        turisticky_portal: "Tourist Portal",
        portal_pacienta: "Patient Portal",
        ePodatelna: "eSubmissions",
        skolsky_portal: "School Portal",
        portal_prispevkovych_organizaci: "Contributory Organizations Portal",


        pristupnost_desktop: "Desktop Accessibility",
        pristupnost_mobile: "Mobile Accessibility",
        seo_desktop: "SEO Desktop",
        seo_mobile: "SEO Mobile",
        pocet_kmvs: "Number of Czech POINTs per 1,000 inhabitants (normalized)",
        pocet_kmvs_: "Number of Czech POINTs per 1,000 inhabitants",
        lekar_online_objednani: "Share of clinics where online appointment booking is available",
        lekar_elektronicka_dokumentace: "Share of clinics that maintain electronic medical records",
        lekar_web: "Share of clinics that have their own website",

        osoby_internet_denne: "Share of people using the internet daily",
        osoby_soc_site: "Share of people using social networks",
        osoby_bankovnictvi: "Share of people using online banking",
        studenti_ICT: "Share of ICT students at universities (by permanent residence)",
        absolventi_ICT: "Share of ICT graduates (by permanent residence)",
        odbornici_ICT: "Share of ICT professionals (by CZ-NACE classification)",
        PC_ZS: "Number of computers per 100 primary school students",
        PC_ZS_2: "Number of computers per 100 secondary school students",
        PC_SS: "Number of computers less than 2 years old per 100 secondary school students",
        PC_SS_2: "Number of computers less than 2 years old per 100 primary school students",

        domacnosti_internet: "Share of households with internet access",
        osoby_internet_tel: "Share of people using the internet on their phone",
        pokryti_30mb: "Coverage with 30 Mbit/s infrastructure (% of localities >80%)",
        pokryti_100mb: "Coverage with 100 Mbit/s infrastructure (% of localities >80%)",
        //js
        kraj_dostupna_sluzba: "service available",
        odkaz_nedostupny: "Service link is not available.",
        a_vice: "and more", 
        mene_nez: "less than", 
        mapTitle_placeholder: "Enter map title",
        zadny_kraj: "No region selected", 
        zadny_kraj_text: "Select a region from the list or click on the map to view the digitalisation indices in the region.", 
        zavreno: "closed", 
        ICO: "IČO",
        uredni_hodiny: "Office hours:",        
        po: "Mon: ", 
        ut: "Tue: ", 
        st: "Wed: ",
        ct: "Thu: ", 
        pa: "Fri: ", 

        desi_index_: "DESI Index: ",
        lidsky_kapital_: "Human Capital:",
        digitalni_infrastruktura_: "Digital Infrastructure:",
        konektivita_: "Digitalization of Public Services:",
        integrace_ICT_: "Integration of Digital Technologies:",
        //tooltipy
        digitalizace_v_krajich_tooltip: "Digitalization Indices",
        digitalni_verejne_sluzby_tooltip: "List of Digital Services",
        bodova_data_tooltip: "Layer Control for Point Data",

        schema_tooltip: "Opens the index schema in a new window",

        celkovy_index_tooltip: "The resulting digitisation index is calculated by weighting the sub-indices",
        podkladove_mapy_tooltip: "Base maps",
        zoom_na_cr_tooltip: "Depending on the active content of the map, it will zoom in on the Czech Republic or the EU",
        
        index_sluzba_tooltip: "Evaluation of the quality and availability of digital services provided by public administration",
        index_portaly_tooltip: "Evaluation of web portals",
        index_pristupnost_tooltip: "Accessibility of digital services for all users, including people with specific needs",
        index_dovednost_tooltip: "Level of digital knowledge and skills of citizens and public administration employees",
        index_infrastruktura_tooltip: "State and quality of technical infrastructure for digital services, such as connectivity and security",

        platebni_portal_tooltip: "Online system for payments to public administration",
        rozklikavaci_rozpocet_tooltip: "Interactive overview of public budget revenues and expenditures",
        integrovany_dopravni_system_tooltip: "Integration of different types of transport into one system",
        geoportal_tooltip: "Mapping platform for spatial data and information",
        portal_otevrenych_dat_tooltip: "Access to public data for download and further use",
        katalog_soc_sluzeb_tooltip: "Directory of social service providers",
        portal_kriz_rizeni_tooltip: "Information and tools for crisis situations",
        dotacni_portal_tooltip: "Overview of grants and funding opportunities",
        turisticky_portal_tooltip: "Information and services for tourists in the region",
        portal_pacienta_tooltip: "Online access to medical records and services",
        ePodatelna_tooltip: "Electronic submission of documents for public administration",
        skolsky_portal_tooltip: "Information and tools for schools, teachers, and students",
        portal_prispevkovych_organizaci_tooltip: "Management and support of contributory organizations",
        
        czech_point_tooltip: "Contact point for verified extracts and submissions",
        krajsky_urad_tooltip: "Regional authority providing public services",

        
        zakladni: "Basic", 
        letecka: "Aerial", 
        bez_podkladu: "No basemap"

    },

    ua: {
        title: "KPC | Карта цифровізації",
        sidebar_header: "Просторові дані",
        pane1_icon_tooltip: "Індекс цифровізації",
        pane2_icon_tooltip: "Шари ЄС",
        pane3_icon_tooltip: "Інформація про область",
        pane4_icon_tooltip: "Інформація про індекси",
        pane5_icon_tooltip: "Експорт у PDF",
        pane6_icon_tooltip: "Інформація про застосунок",
        jazyk: "UA",
        pane1_sticky: "На карті показано рівень цифровізації державного управління.",
        pane2_sticky: "На карті показано рівень цифровізації держав-членів ЄС.",
        pane3_sticky: "Тут ви знайдете додаткові посилання та інформацію про окремі регіони. Щоб переглянути інформацію про конкретний регіон, натисніть на нього на карті або виберіть зі списку нижче.",
        pane4_sticky: "Індекси цифровізації для областей Чеської Республіки були розроблені на основі європейського індексу DESI.",
        pane5_sticky: "Тут можна експортувати карту у формат PDF. Розмір PDF і вміст карти буде адаптовано до вашого поточного перегляду карти.",
        pane6_sticky: "Відображення рівня цифровізації Чехії на інтерактивній карті.",
        jak_pracovat: "Як користуватися додатком",
        jak_pracovat_text: "Цей додаток дозволяє легко відображати рівень цифровізації та інші відповідні дані. Користувачі можуть отримати конкретну інформацію двома способами:",
        vyberem_parametru: "Вибором параметра",
        vyberem_parametru_text: " – Використовуйте фільтри для вибору бажаного показника та відображення відповідних даних.",
        kliknutim_do_mapy: "Натисканням на карту",
        kliknutim_do_mapy_text: " – Натисніть на конкретну область, щоб отримати детальну інформацію про цифровізацію та пов'язані показники.",
        o_aplikaci: "Про додаток",
        o_aplikaci_text: "Створено в рамках проєкту ROPIM – Реформа для оптимізації, впровадження та методологічного управління цифровими послугами, включаючи їхнє планування потужностей та комунікацію інформації клієнтам державного управління, фінансованого Європейським Союзом NextGeneration.",
        cislo_projektu: "Реєстр. №: CZ.31.5.0/0.0/0.0/23_106/0008503",
        dia: "2024 © Агенція цифрової та інформаційної політики",
        paticka_text1: "Інформація надається відповідно до Закону № 106/1999 Зб., про вільний доступ до інформації.",
        paticka_text2: "Версія 2.0.2105.9856 | Використовується Design System 4.2",

        pane1_h2:"Карта цифровізації ЧР",
        pane2_h2:"Карта цифровізації ЄС",
        pane3_h2:"Інформація про області",
        pane4_h2:"Індекси цифровізації ЧР",
        pane5_h2_stahnout_mapu:"Завантажити карту",
        pane6_h2:"Інформація про застосунок",
        vic_info: "Більше інформації",
        vycistit_mapu: "Очистити карту",
        schema_indexu: "Схема індексу",
        digitalizace_v_krajich: "Цифровізація в областях",
        digitalni_sluzby: "Цифрові послуги",
        bodova_data: "Точкові дані",
        index_digitalizace: "Загальний індекс цифровізації",
        sub_portaly: "Субіндекс веб-порталів",
        sub_sluzby: "Субіндекс цифрових послуг",
        sub_pristupnost: "Субіндекс доступності",
        sub_dovednosti: "Субіндекс цифрових навичок",
        sub_infrastruktura: "Субіндекс цифрової інфраструктури",
        index_digitalizace_: "Загальний індекс цифровізації:",
        sub_sluzby_: "Субіндекс цифрових послуг:",
        sub_portaly_: "Субіндекс веб-порталів:",
        sub_pristupnost_: "Субіндекс доступності:",
        sub_dovednosti_: "Субіндекс цифрових навичок:",
        sub_infrastruktura_: "Субіндекс цифрової інфраструктури:",

        czech_point: "Czech POINT",
        krajsky_urad: "Обласна адміністрація",
        odebrat_index: "Видалити індекс",
        odebrat_sluzbu: "Видалити послугу",
        odebrat_body: "Видалити точки",
        desi_index: "DESI Індекс",
        desi_index22: "DESI Індекс 2022",
        desi_index21: "DESI Індекс 2021",
        desi_index20: "DESI Індекс 2020",
        co_je_DESI: "Що таке індекс DESI?",
        co_je_DESI_text: "Європейський індекс DESI (Digital Economy and Society Index) — це щорічна оцінка цифрової конкурентоспроможності держав-членів ЄС. Більше інформації можна знайти тут.",
        k_cemu_slouzi: "Для чого він?",
        k_cemu_slouzi_text: "Індекс DESI допомагає порівнювати цифровий розвиток окремих країн ЄС і визначати сфери, які потрібно покращити.",
        podle_ceho_se_meri: "За якими критеріями вимірюється",
        podle_ceho_se_meri_text: "Прогрес цифровізації вимірюється на основі кількох ключових сфер:",
        konektivita: "Зв'язок",
        konektivita_text: " – доступність та якість широкосмугового інтернет-з'єднання (дротового та мобільного).",
        lidsky_kapital: "Людський капітал",
        lidsky_kapital_text: " – цифрові навички населення та ІТ-фахівців.",
        integrace_ICT: "Інтеграція цифрових технологій",
        integrace_ICT_text: " – цифровізація підприємств і використання технологій (наприклад, хмара, штучний інтелект, електронна комерція).",
        digitalni_sluzby: "Цифрові державні послуги",
        digitalni_sluzby_text: " – рівень електронного уряду та цифрових послуг державного управління.",

        overall_index_popis: "Індекс визначається шляхом зважування окремих субіндексів. Ваги розподілені рівномірно.",
        sub_portaly_popis: "Визначено як відсоткову частку вибраних цифрових послуг, що надаються регіоном. Оцінювані послуги є:",
        sub_sluzby_popis: "Визначено як середнє значення вибраних показників, які були попередньо нормалізовані.",
        sub_pristupnost_popis: "Визначається як середнє значення обраних показників. Доступність вебсайтів і SEO вимірювалися інструментом Lighthouse accessibility scoring 12.02.2025 для сайтів областей.",
        sub_dovednosti_popis: "Визначається як середнє значення обраних показників, які були попередньо нормалізовані.",
        sub_infrastruktura_popis: "Визначається як середнє значення обраних показників, які були попередньо нормалізовані.",

        platebni_portal: "Платіжний портал",
        rozklikavaci_rozpocet: "Інтерактивний бюджет",
        integrovany_dopravni_system: "Інтегрована транспортна система",
        geoportal: "Геопортал",
        portal_otevrenych_dat: "Портал відкритих даних",
        katalog_soc_sluzeb: "Каталог соціальних послуг",
        portal_kriz_rizeni: "Портал кризового управління",
        dotacni_portal: "Грантовий портал",
        turisticky_portal: "Туристичний портал",
        portal_pacienta: "Портал пацієнта",
        ePodatelna: "еПодатальна",
        skolsky_portal: "Шкільний портал",
        portal_prispevkovych_organizaci: "Портал бюджетних організацій",

        pristupnost_desktop: "Доступність для настільних пристроїв",
        pristupnost_mobile: "Доступність для мобільних пристроїв",
        seo_desktop: "SEO для настільних пристроїв",
        seo_mobile: "SEO для мобільних пристроїв",
        pocet_kmvs: "Кількість Czech POINT на 1 000 жителів (нормалізовано)",
        pocet_kmvs_: "Кількість Czech POINT на 1 000 жителів",
        lekar_online_objednani: "Частка клінік, де доступне онлайн-запис на прийом",
        lekar_elektronicka_dokumentace: "Частка клінік, що ведуть медичну документацію в електронному вигляді",
        lekar_web: "Частка клінік, що мають власний веб-сайт",

        osoby_internet_denne: "Частка людей, які користуються інтернетом щодня",
        osoby_soc_site: "Частка людей, які користуються соціальними мережами",
        osoby_bankovnictvi: "Частка людей, які користуються інтернет-банкінгом",
        studenti_ICT: "Частка студентів ІКТ в університетах (за місцем проживання)",
        absolventi_ICT: "Частка випускників ІКТ (за місцем проживання)",
        odbornici_ICT: "Частка ІКТ-фахівців (за класифікацією CZ-NACE)",
        PC_ZS: "Кількість комп'ютерів на 100 учнів початкової школи",
        PC_ZS_2: "Кількість комп'ютерів на 100 учнів середньої школи",
        PC_SS: "Кількість комп'ютерів віком до 2 років на 100 учнів середньої школи",
        PC_SS_2: "Кількість комп'ютерів віком до 2 років на 100 учнів початкової школи",
        domacnosti_internet: "Частка домогосподарств з доступом до інтернету",
        osoby_internet_tel: "Частка людей, які користуються інтернетом на телефоні",
        pokryti_30mb: "Покриття інфраструктурою 30 Мбіт/с (% населених пунктів >80%)",
        pokryti_100mb: "Покриття інфраструктурою 100 Мбіт/с (% населених пунктів >80%)",

        kraj_dostupna_sluzba: "послуга доступна",
        odkaz_nedostupny: "Посилання на послугу недоступне.",
        a_vice: "та більше",
        mene_nez: "менше ніж",
        mapTitle_placeholder: " Введіть заголовок карти",
        zadny_kraj: "Жодна область не вибрана",
        zadny_kraj_text: "Виберіть область зі списку або натисніть на карту, щоб переглянути індекси цифровізації в області.",
        zavreno: "закрито",
        ICO: "IČO",
        uredni_hodiny: "Офіційні години:",
        po: "ПН: ",
        ut: "ВТ: ",
        st: "СР: ",
        ct: "ЧТ: ",
        pa: "ПТ: ",

        desi_index_: "DESI Індекс: ",
        lidsky_kapital_: "Людський капітал:",
        digitalni_infrastruktura_: "Цифрова інфраструктура:",
        konektivita_: "Цифровізація державних послуг:",
        integrace_ICT_: "Інтеграція цифрових технологій:",
        //підказки
        digitalizace_v_krajich_tooltip: "Індекси цифровізації",
        digitalni_verejne_sluzby_tooltip: "Список цифрових послуг",
        bodova_data_tooltip: "Керування шарами з точковими даними",
    
        celkovy_index_tooltip: "Підсумковий індекс цифровізації розраховується шляхом зважування окремих субіндексів",
        podkladove_mapy_tooltip: "Базові карти",
        zoom_na_cr_tooltip: "Залежно від активного вмісту карти наближує Чехію або ЄС",

        schema_tooltip: "Відкриває схему індексу в новому вікні",
        
        index_sluzba_tooltip: "Оцінка якості та доступності цифрових послуг, що надаються державною адміністрацією",
        index_portaly_tooltip: "Оцінка веб-порталів",
        index_pristupnost_tooltip: "Доступність цифрових послуг для всіх користувачів, включаючи людей зі специфічними потребами",
        index_dovednost_tooltip: "Рівень цифрових знань і навичок громадян і працівників державної адміністрації",
        index_infrastruktura_tooltip: "Стан і якість технічної інфраструктури для цифрових послуг, таких як підключення та безпека",

        platebni_portal_tooltip: "Онлайн-система для платежів до державного управління",
        rozklikavaci_rozpocet_tooltip: "Інтерактивний огляд доходів і видатків державного бюджету",
        integrovany_dopravni_system_tooltip: "Інтеграція різних видів транспорту в одну систему",
        geoportal_tooltip: "Картографічна платформа для просторових даних та інформації",
        portal_otevrenych_dat_tooltip: "Доступ до відкритих державних даних для завантаження та подальшого використання",
        katalog_soc_sluzeb_tooltip: "Каталог постачальників соціальних послуг",
        portal_kriz_rizeni_tooltip: "Інформація та інструменти для кризових ситуацій",
        dotacni_portal_tooltip: "Огляд грантів та можливостей фінансування",
        turisticky_portal_tooltip: "Інформація та послуги для туристів у регіоні",
        portal_pacienta_tooltip: "Онлайн-доступ до медичних записів і послуг",
        ePodatelna_tooltip: "Електронне подання документів для державного управління",
        skolsky_portal_tooltip: "Інформація та інструменти для шкіл, вчителів і студентів",
        portal_prispevkovych_organizaci_tooltip: "Управління та підтримка бюджетних організацій",
            
        czech_point_tooltip: "Контактний пункт для перевірених виписок та подань",
        krajsky_urad_tooltip: "Регіональна влада, що надає державні послуги",
        
        zakladni: "Базова",
        letecka: "Аерофотознімки",
        bez_podkladu: "Без фону"

}}



function changeLanguage(lang) {
    //nastavení <html lang="">
    document.documentElement.setAttribute('lang', lang);
       
    // Přepis HTML textů podle data-key
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Přepis tooltipů
    document.querySelectorAll("[data-tooltip]").forEach(el => {
        const key = el.getAttribute("data-tooltip-key");
        if (key && translations[lang][key]) {
            el.setAttribute("data-tooltip", translations[lang][key]);
        }
    });
    
    // Překlad placeholderu pro pole s ID "mapTitle"
    const mapTitleInput = document.getElementById("mapTitle");
    if (mapTitleInput) {
        mapTitleInput.placeholder = translations[lang]["mapTitle_placeholder"] || "Zadejte titulek mapy";
    }
    // Uložení aktuálního jazyka do globální proměnné
    window.currentLanguage = lang;
    setScrollableHeight();
    
    
    document.getElementById("language-menu").style.display = "none";

    const buttons = document.querySelectorAll("#language-menu button");
        
    // Odstraníme třídu active ze všech tlačítek
    buttons.forEach(button => button.classList.remove("active"));

    // Přidáme třídu active jen k tomu, které odpovídá zvolenému jazyku
    document.querySelector(`#language-menu button[onclick="changeLanguage('${lang}')"]`).classList.add("active");

}

function applyTranslationToElement(element, lang) {
    // Najít všechny elementy s data-key uvnitř zadaného elementu
    element.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Podobně pro tooltipy
    element.querySelectorAll("[data-tooltip]").forEach(el => {
        const key = el.getAttribute("data-tooltip-key");
        if (key && translations[lang][key]) {
            el.setAttribute("data-tooltip", translations[lang][key]);
        }
    });


}

// Výchozí jazyk
changeLanguage("cs");



// Vylepšená funkce toggleMenu
// Vylepšená funkce toggleMenu
function toggleMenu() {
    const menu = document.getElementById("language-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";

    let button = document.querySelector(".menu-icon-jazyk svg"); // Správně vybere SVG šipku

    menu.classList.toggle("open");

    if (menu.classList.contains("open")) {
        button.style.transform = "rotate(180deg)";
    } else {
        button.style.transform = "rotate(0deg)";
    }
}

// Přidání event listeneru pro zavírání menu kliknutím mimo
document.addEventListener("click", function(event) {
    const menu = document.getElementById("language-menu");
    const menuButton = document.querySelector(".menu-icon-jazyk");
    
    // Kontrola zda kliknutí nebylo na menu nebo tlačítko menu
    if (menu.classList.contains("open") && 
        !menu.contains(event.target) && 
        !menuButton.contains(event.target)) {
        
        closeMenu();
    }
});

// Zavření menu při výběru jazyka
document.querySelectorAll("#language-menu button").forEach(button => {
    button.addEventListener("click", function() {
        closeMenu();
    });
});

// Funkce pro zavření menu a resetování šipky
function closeMenu() {
    const menu = document.getElementById("language-menu");
    const button = document.querySelector(".menu-icon-jazyk svg");

    menu.style.display = "none";
    menu.classList.remove("open");
    button.style.transform = "rotate(0deg)";
}





