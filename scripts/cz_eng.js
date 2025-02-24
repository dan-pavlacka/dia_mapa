




const translations = {
    cs: {
        sidebar_header: "Index digitalizace", 
        pane1_icon_tooltip: "Index digitalizace",
        pane2_icon_tooltip: "Vrstvy EU",
        pane3_icon_tooltip: "Informace o kraji",
        pane4_icon_tooltip: "Informace o indexech",
        pane5_icon_tooltip: "Export do PDF",
        pane6_icon_tooltip: "Informace o aplikaci",
        jazyk: "English", 
        pane1_sticky: "Na mapě je znázorněna úroveň digitalizace státní správy.",
        pane2_sticky: "Na mapě je znázorněna úroveň digitalizace členských států EU.",
        vic_info: "Více info."

    },
    en: {
        sidebar_header: "Digitalisation index", 
        pane1_icon_tooltip: "Digitalisation index",
        pane2_icon_tooltip: "EU layers",
        pane3_icon_tooltip: "Information about the region",
        pane4_icon_tooltip: "Information abou indexes",
        pane5_icon_tooltip: "Export to PDF",
        pane6_icon_tooltip: "Information about the application",
        jazyk: "Čeština",
        pane1_sticky: "The map shows the level of digitalisation of the public administration.",
        pane2_sticky: "The map shows the level of digitalisation in the EU Member States.",
        vic_info: "More info."



    }
};

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
        const key = el.getAttribute("data-tooltip-key"); // Přidáme nový atribut pro identifikaci
        if (key && translations[lang][key]) {
            el.setAttribute("data-tooltip", translations[lang][key]);
        }
    });

    // Přepnutí tlačítka pro změnu jazyka
    const langButton = document.querySelector("[data-key='jazyk']");
    if (langButton) {
        if (lang === "en") {
            
            langButton.setAttribute("onclick", "changeLanguage('cs')");
        } else {
            
            langButton.setAttribute("onclick", "changeLanguage('en')");
        }
    }
}

// Výchozí jazyk
changeLanguage("cs");
