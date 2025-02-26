const translations = {
    cs: {
        sidebar_header: "Index digitalizace", 
        pane1_icon_tooltip: "Index digitalizace",
        pane2_icon_tooltip: "Vrstvy EU",
        pane3_icon_tooltip: "Informace o kraji",
        pane4_icon_tooltip: "Informace o indexech",
        pane5_icon_tooltip: "Export do PDF",
        pane6_icon_tooltip: "Informace o aplikaci",
        jazyk: "CZ", 
        pane1_sticky: "Na mapě je znázorněna úroveň digitalizace státní správy.",
        pane2_sticky: "Na mapě je znázorněna úroveň digitalizace členských států EU.",
        pane3_sticky: "Zde naleznete doplňující odkazy k jednotlivým krajům. Pro zobrazení informací ke konkrétnímu kraji klikněte v mapě na kraj.",
        pane4_sticky: "Indexy digitalizace pro kraje ČR byly navrženy na základě evropského indexu DESI.",
        pane5_sticky: "Zde je možné exportovat mapu do pdf. Rozměr pdf a obsah mapy bude přizpůsoben vašemu aktuálnímu pohledu na mapu.",
        pane6_sticky: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.", //lorem ipsum v informacích o aplikaci
        jak_pracovat: "Jak s aplikací pracovat",
        jak_pracovat_text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.", //lorem ipsum v informacích o aplikaci
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
        sub_sluzby: "Subindex poskytované služby",
        sub_pristupnost: "Subindex přístupnosti",
        sub_dovednosti: "Subindex digitální dovednosti",
        sub_infrastruktura: "Subindex digitální infrastruktura", 
        index_digitalizace_: "Celkový index digitalizace:",
        sub_sluzby_: "Subindex poskytované služby:",
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
        sub_sluzby_popis: "Stanoven jako procentuální podíl vybraných digitálních služeb, poskytovaných krajem. Hodnocené služby jsou:",
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
        //popisky jednotlivých indikátorů
        pristupnost_desktop: "Přístupnost desktop",
        pristupnost_mobile: "Přístupnost mobile",
        seo_desktop: "SEO desktop",
        seo_mobile: "SEO mobile",
        pocet_kmvs: "Počet Czech POINTŮ na 1000 obyvatel (normalizováno)",
        osoby_internet_denne: "Podíl osob, které denně využívají internet",
        osoby_soc_site: "Podíl osob, využívajících sociální sítě",
        osoby_bankovnictvi: "Podíl osob, využívajících internetové bankovnictví",
        studenti_ICT: "Podíl studentů ICT oborů na VŠ (dle trvalého bydliště)",
        absolventi_ICT: "Podíl ICT absolventů (dle trvalého bydliště)",
        odbornici_ICT: "Podíl ICT odborníků (dle CZ-NACE)",
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
        uredni_hodiny: "Úřední hodiny:", 
        po: "PO:", 
        ut: "ÚT:", 
        st: "ST:",
        ct: "ČT:", 
        pa: "PÁ:",  

        desi_index_: "DESI Index: ",
        lidsky_kapital_: "Lidský kapitál:",
        digitalni_infrastruktura_: "Digitální infrastruktura:",
        konektivita_: "Digitalizace veřejné služby:",
        integrace_ICT_: "Integrace digitálních technologií:",
        //tooltipy
        digitalizace_v_krajich_tooltip: "Indexy digitalizace",
        digitalni_verejne_sluzby_tooltip: "Seznam digitálních služeb",
        bodova_data_tooltip: "Ovládání vrstev s bodovými daty",

        celkovy_index_tooltip: "Výsledný index digitalizace je vypočítán vážením dílčích subindexů",
        podkladove_mapy_tooltip: "Podkladové mapy",
        zoom_na_cr_tooltip: "Podle aktivního obsahu mapy přiblíží na ČR nebo na EU",
        zakladni: "Základní",
        letecka: "Letecká", 
        bez_podkladu: "Bez podkladu"
        
        
        
        
        
        //data-key="pristupnost_desktop"
        
    },

    en: {
        sidebar_header: "Digitalisation index", 
        pane1_icon_tooltip: "Digitalisation index",
        pane2_icon_tooltip: "EU layers",
        pane3_icon_tooltip: "Information about the region",
        pane4_icon_tooltip: "Information abou indices",
        pane5_icon_tooltip: "Export to PDF",
        pane6_icon_tooltip: "Information about the application",
        jazyk: "EN",
        pane1_sticky: "The map shows the level of digitalisation of the public administration.",
        pane2_sticky: "The map shows the level of digitalisation in the EU Member States.",
        pane3_sticky: "Here you can find additional links for each region. To view information for a specific region, click on the regoion in the map.",
        pane4_sticky: "The digitalisation indices for the regions of the Czech Republic were designed on the basis of the European DESI index.",
        pane5_sticky: "Here you can export the map to pdf. The size of the pdf and the content of the map will be adapted to your current view of the map.",
        pane6_sticky: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.", //lorem ipsum v informacích o aplikaci
        jak_pracovat: "How to work with the application",
        jak_pracovat_text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.", //lorem ipsum v informacích o aplikaci
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
        sub_sluzby: "Service Provided Subindex",
        sub_pristupnost: "Accessibility Subindex",
        sub_dovednosti: "Digital Skills Subindex",
        sub_infrastruktura: "Digital Infrastructure Subindex",
        index_digitalizace_: "Overall Digitalisation index:",
        sub_sluzby_: "Service Provided Subindex:",
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
        sub_sluzby_popis: "Determined as the percentage share of selected digital services provided by the region. The evaluated services are:",
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
        pristupnost_desktop: "Desktop Accessibility",
        pristupnost_mobile: "Mobile Accessibility",
        seo_desktop: "SEO Desktop",
        seo_mobile: "SEO Mobile",
        pocet_kmvs: "Number of Czech POINTs per 1,000 inhabitants (normalized)",
        osoby_internet_denne: "Share of people using the internet daily",
        osoby_soc_site: "Share of people using social networks",
        osoby_bankovnictvi: "Share of people using online banking",
        studenti_ICT: "Share of ICT students at universities (by permanent residence)",
        absolventi_ICT: "Share of ICT graduates (by permanent residence)",
        odbornici_ICT: "Share of ICT professionals (by CZ-NACE classification)",
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
        uredni_hodiny: "Office hours:",        
        po: "Mon:", 
        ut: "Tue:", 
        st: "Wed:",
        ct: "Thu:", 
        pa: "Fri:", 

        desi_index_: "DESI Index: ",
        lidsky_kapital_: "Human Capital:",
        digitalni_infrastruktura_: "Digital Infrastructure:",
        konektivita_: "Digitalization of Public Services:",
        integrace_ICT_: "Integration of Digital Technologies:",
        //tooltipy
        digitalizace_v_krajich_tooltip: "Digitalization Indices",
        digitalni_verejne_sluzby_tooltip: "List of Digital Services",
        bodova_data_tooltip: "Layer Control for Point Data",

        celkovy_index_tooltip: "The resulting digitisation index is calculated by weighting the sub-indices",
        podkladove_mapy_tooltip: "Base maps",
        zoom_na_cr_tooltip: "Depending on the active content of the map, it will zoom in on the Czech Republic or the EU",
        zakladni: "Basic", 
        letecka: "Aerial", 
        bez_podkladu: "No basemap"

    },

    ua: {
        sidebar_header: "Індекс цифровізації",
        pane1_icon_tooltip: "Індекс цифровізації",
        pane2_icon_tooltip: "Шари ЄС",
        pane3_icon_tooltip: "Інформація про область",
        pane4_icon_tooltip: "Інформація про індекси",
        pane5_icon_tooltip: "Експорт у PDF",
        pane6_icon_tooltip: "Інформація про застосунок",
        jazyk: "UA",
        pane1_sticky: "На карті показано рівень цифровізації державного управління.",
        pane2_sticky: "На карті показано рівень цифровізації держав-членів ЄС.",
        pane3_sticky: "Тут ви знайдете додаткові посилання на окремі області. Для перегляду інформації про конкретну область натисніть на неї на карті.",
        pane4_sticky: "Індекси цифровізації для областей Чеської Республіки були розроблені на основі європейського індексу DESI.",
        pane5_sticky: "Тут можна експортувати карту у формат PDF. Розмір PDF і вміст карти буде адаптовано до вашого поточного перегляду карти.",
        pane6_sticky: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
        jak_pracovat: "Як працювати із застосунком",
        jak_pracovat_text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
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
        sub_sluzby: "Субіндекс наданих послуг",
        sub_pristupnost: "Субіндекс доступності",
        sub_dovednosti: "Субіндекс цифрових навичок",
        sub_infrastruktura: "Субіндекс цифрової інфраструктури",
        index_digitalizace_: "Загальний індекс цифровізації:",
        sub_sluzby_: "Субіндекс наданих послуг:",
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
        sub_sluzby_popis: "Визначається як відсоткове співвідношення обраних цифрових послуг, що надаються областю. Оцінювані послуги:",
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

        kraj_dostupna_sluzba: "послуга доступна",
        odkaz_nedostupny: "Посилання на послугу недоступне.",
        a_vice: "та більше",
        mene_nez: "менше ніж",
        mapTitle_placeholder: "Введіть заголовок карти",
        zadny_kraj: "Жодна область не вибрана",
        zadny_kraj_text: "Виберіть область зі списку або натисніть на карту, щоб переглянути індекси цифровізації в області.",
        zavreno: "закрито",
        uredni_hodiny: "Офіційні години:",
        po: "ПН:",
        ut: "ВТ:",
        st: "СР:",
        ct: "ЧТ:",
        pa: "ПТ:",

        digitalizace_v_krajich_tooltip: "Індекси цифровізації",
        digitalni_verejne_sluzby_tooltip: "Список цифрових послуг",
        bodova_data_tooltip: "Керування шарами точкових даних"


}}



function changeLanguage(lang) {
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



function toggleMenu() {
    const menu = document.getElementById("language-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

