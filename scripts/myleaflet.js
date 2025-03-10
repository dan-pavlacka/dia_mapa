//zoomlevel podle šířky monitoru
let zoomLev;

//výpočet výšky scrollable části v sidebaru
let viewportHeight;
let activeSidebar;
function setScrollableHeight() {
    viewportHeight = window.innerHeight;
    // Najdeme aktuálně aktivní sidebar (pokud nějaký existuje)
    setTimeout(() => {
    activeSidebar = document.querySelector('.sidebar-pane.active');
    scrollableHeightSize()
    },30);

    
}


function scrollableHeightSize(){
    if (activeSidebar) {
        let sidebarSticky = activeSidebar.querySelector('.sidebar-sticky');
        if (sidebarSticky) {
            const sidebarStickyHeight = sidebarSticky.offsetHeight || 0; // Získáme aktuální výšku .sidebar-sticky
            const adjustedHeight = viewportHeight - 56 - sidebarStickyHeight - 15; // Odečteme 56px a výšku .sidebar-sticky           
            const scrollable = activeSidebar.querySelector('.scrollable');
            if (scrollable) {
                scrollable.style.height = `${adjustedHeight}px`; // Nastaví výšku pro tento aktivní sidebar                
            }
        }
    }

}

// Aktualizace výšky při změně velikosti okna
window.addEventListener('resize', setScrollableHeight);
window.addEventListener('load', setScrollableHeight);




if (window.innerWidth > 1800) {
    zoomLev = 9;
} else {
    zoomLev = 8;
};

let bounds = [
    [34.5, -35],  // Jihozápadní roh (SWW)
    [71.5, 45]    // Severovýchodní roh (NEE)
];

//jiný zoom podle aktuálního zoom levelu











//definice mapy, výchozí bod, a omezení zoom levelu
const map = L.map('map',{   minZoom:4, 
                            maxZoom:19,
                            zoomSnap:0.25, //jemnější zoom pro kolečko myši
                            zoomDelta:0.25,   //jemnější zoom pro +-
                            maxBounds: bounds, // Omezení na dané souřadnice
                            maxBoundsViscosity: 1.0, // Určuje "sílu" omezení (1 = nikdy nepřeskočí)
                            zoomControl: false
                        }).setView([49.8, 14.85],zoomLev);

map.options.wheelPxPerZoomLevel = 150;  // jinak nefunguje zoomSnap
//měřítko
let meritko = L.control.scale({
	position:'bottomright',
	metric: true, 
	imperial: false
});

let meritkoExport =  L.control.scale({
	position:'bottomleft',
	metric: true, 
	imperial: false
});

meritko.addTo(map);

let zoomButton = L.control.zoom({
    position: 'bottomright' // Umístění tlačítek
});

zoomButton.addTo(map);

function zoomCR(){
    map.setView([49.8, 14.85],zoomLev)
}

function zoomEU(){
    map.setView([50.8503, 4.3517],4)
}

//podkladové mapy
	const OSM_base = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
	
	const Orto_base = L.tileLayer.wms("https://ags.cuzk.cz/arcgis1/services/ORTOFOTO/MapServer/WMSServer", {
		layers: '0', // Identifikátor vrstvy (z XML je to <Name>0</Name>)
		format: 'image/png', // Formát dat
		transparent: true, // Průhledné pozadí
		version: '1.3.0', // Verze WMS
		crs: L.CRS.EPSG3857 // Souřadnicový systém (např. EPSG:3857)
	  });

//definování barevných stupnic pro kartogramy	
	function getColorModra(d) {
		return 	d >= 75 ? 	'#2362a2':
				d >= 60 ? 	'#599bd7':
				d >= 45 ? 	'#93bde6':
				d < 45  ? 	'#c5dbf2':
							'#c5dbf2';
	};	

	function getColorOranzova(d) {
		return 	d >= 85 ? 	'#C76300':
				d >= 70 ? 	'#DB8543':
				d >= 55 ? 	'#EEB086':
				d < 55 ? 	'#F9D2B9':
							'#F9D2B9';
	};

	function getColorZelena(d) {
		return 	d >= 75 ? 	'#008040':
				d >= 50 ? 	'#499861':
				d >= 25 ? 	'#82B78F':
				d < 25 ? 	'#B2D3B9':
							'#B2D3B9';
	};

	function getColorFialova(d) {
		return 	d >= 75 ? 	'#800080':
				d >= 60 ? 	'#973E95':
				d >= 45 ? 	'#AE66AA':
				d < 45 ?  	'#C187BC':
						  	'#C187BC';
	};

	function getColorCervena(d) {
		return 	d > 90  ? 	'#FF0000':
				d >= 85 ? 	'#FF603E':
				d >= 80 ? 	'#FF9B7E':
				d >= 75 ? 	'#FFCCBA':
				d < 75 ? 	'#FFE8E0':
						  	'#FFE8E0';
	};

	function getColorVinova(d) {
		return 	d > 65  ? 	'#800040':
				d >= 60 ? 	'#983b5c':
				d >= 55 ? 	'#af637b':
				d >= 50 ? 	'#c68c9c':
				d < 50  ? 	'#dab0bb':
						  	'#dab0bb';
	};

//definování stylů polygonových vrstev a příslušných atributů
function indexDigitalizace(feature) {
	return {
		fillColor: getColorModra(feature.properties.j_index_digitalizace),
		weight: 2,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.9
	};
};

	function indexSluzby(feature) {
		return {
			fillColor: getColorOranzova(feature.properties.j_index_sluzby),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};

	function indexDovednosti(feature) {
		return {
			fillColor: getColorZelena(feature.properties.j_index_dovednosti),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};

	function indexInfrastruktura(feature) {
		return {
			fillColor: getColorFialova(feature.properties.j_index_infrastruktura),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};

	function indexPristupnost(feature) {
		return {
			fillColor: getColorCervena(feature.properties.j_index_dostupnost),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};
	
	function DESIIndex22(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI22),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};

    function DESIIndex21(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI21),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};

    function DESIIndex20(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI20),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.9
		};
	};

//------------výběr služby
// Data pro radio buttony na výběr služby
const sluzbyData = [
    { id: "sl1", labelKey: "platebni_portal", tooltipKey: "platebni_portal_tooltip", attribute: "j_platebni_portal", urlKey: "j_platebni_portal_web"},
    { id: "sl2", labelKey: "rozklikavaci_rozpocet", tooltipKey: "rozklikavaci_rozpocet_tooltip", attribute: "j_rozklikavaci_rozpocet", urlKey: "j_rozklikavaci_rozpocet_web"},
    { id: "sl3", labelKey: "integrovany_dopravni_system", tooltipKey: "integrovany_dopravni_system_tooltip", attribute: "j_IDS", urlKey: "j_IDS_web"},
    { id: "sl4", labelKey: "geoportal", tooltipKey: "geoportal_tooltip", attribute: "j_GEOportal", urlKey: "j_GEOportal_odkaz"},
    { id: "sl5", labelKey: "portal_otevrenych_dat", tooltipKey: "portal_otevrenych_dat_tooltip", attribute: "j_openDATA", urlKey: "j_openDATA_web"},
    { id: "sl6", labelKey: "katalog_soc_sluzeb", tooltipKey: "katalog_soc_sluzeb_tooltip", attribute: "j_katalog_soc_sluzeb", urlKey: "j_katalog_soc_sluzeb_web"},
    { id: "sl7", labelKey: "portal_kriz_rizeni", tooltipKey: "portal_kriz_rizeni_tooltip", attribute: "j_portal_kriz_rizeni", urlKey: "j_portal_kriz_rizeni_web"},
    { id: "sl8", labelKey: "dotacni_portal", tooltipKey: "dotacni_portal_tooltip", attribute: "j_dotacni_portal", urlKey: "j_dotacni_portal_web"},
];

// Generování radio buttonů a legend
function generateSluzby() {
    const container = document.getElementById("sluzby-container");
    sluzbyData.forEach((sluzba) => {
        // Vytvoření hlavního containeru pro radio button a label
        const radioContainer = document.createElement("div");
        radioContainer.classList.add("radio-container");

        // Vytvoření radio inputu
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.id = sluzba.id;
        radioInput.name = "sluzby";
        radioInput.dataset.attribute = sluzba.attribute;
        radioInput.dataset.group = "sluzby";
        
        // Vytvoření labelu s data-key atributem
        const label = document.createElement("label");
        label.htmlFor = sluzba.id;
        label.classList.add("tooltip", "tooltip-right-dlouhy");
        label.setAttribute("data-key", sluzba.labelKey);
        label.setAttribute("data-tooltip", "");
        label.setAttribute("data-tooltip-key", sluzba.tooltipKey); // Přidání data-key atributu
        
        // Výchozí text (použije se, pokud není překlad k dispozici)
        label.textContent = sluzba.labelKey;
        
        // Vytvoření legendy
        const legendContainer = document.createElement("div");
        legendContainer.id = `legend-${sluzba.id}`;
        legendContainer.classList.add("legend-container2");

        // Přidání elementů do radio-containeru
        radioContainer.appendChild(radioInput);
        radioContainer.appendChild(label);
        
        // Přidání radio-containeru a legendy do hlavního kontejneru
        container.appendChild(radioContainer);
        container.appendChild(legendContainer);
    });
    
    if (window.currentLanguage) {
        applyTranslationToElement(container, window.currentLanguage);
    }
}

// Volání funkce pro generování HTML
generateSluzby();

// Defaultní styl (žádná viditelnost)
const defaultStyle = {
    opacity: 0,
    fillOpacity: 0,
    color: 'white',
    weight:2
};

// Funkce pro aktualizaci legendy
function updateLegend(radioId, isActive) {
    // Smazání všech legend
    document.querySelectorAll('.legend-container2').forEach((legend) => {
        legend.innerHTML = '';
    });

    // Zobrazení legendy pro aktivní radio button
    if (isActive && radioId) {
        const legendContainer = document.getElementById(`legend-${radioId}`);
        const legendContent = `
            <div class="legend">
                <i style="background: repeating-linear-gradient(
                        45deg,
                        #4d4d4d,
                        #4d4d4d 2px,
                        transparent 2px,
                        transparent 7px
                    );
                "></i>
                <span data-key="kraj_dostupna_sluzba"></span>
            </div>
        `;
        legendContainer.innerHTML = legendContent;
        
        //překlad pro legendu šrafy
        if (window.currentLanguage) {
            applyTranslationToElement(legendContainer, window.currentLanguage);
        }
        
    }
}

// Inicializace prázdné vrstvy pro zvýrazněné polygony
let vrstvaSluzby = L.geoJSON(null);
let vrstvaAktivni = false; // Stav, zda je vrstva přidána do mapy
let geojsonData = null; // Uložíme si všechna data pro výběr služby

// Načteme GeoJSON, ale nepřidáme ho do mapy
fetch("data/kraje.geojson")
    .then(response => response.json())
    .then(data => {
        geojsonData = data; // Uložíme si data pro pozdější filtraci
    });

// Event listener pro změnu radio buttonu
document.addEventListener("change", (e) => {
    if (e.target.matches('input[type="radio"][data-group="sluzby"]')) {
        const attribute = e.target.dataset.attribute;
        const radioId = e.target.id;

        if (!geojsonData) return; // Pokud nejsou data načtena, nic nedělej

        // Odstraníme starou vrstvu
        if (vrstvaAktivni) {
            map.removeLayer(vrstvaSluzby);
        }

        // Vytvoříme nový šrafovací vzor
        let hatchingPattern = new L.StripePattern({
            weight: 2,    // Tloušťka čar
            color: "#4d4d4d", // Barva šrafování
            spaceWeight: 12, // Vzdálenost mezi čárami
            angle: 45      // Úhel šrafování
        });

        hatchingPattern.addTo(map); // Přidáme vzor do Leafletu

        // Vytvoříme novou vrstvu jen se zvýrazněnými polygony
        vrstvaSluzby = L.geoJSON(geojsonData, {
            filter: feature => feature.properties[attribute] == 1, // Pouze zvýrazněné
            style: () => ({
                fillPattern: hatchingPattern, // Aplikuje šrafu
                weight: 3,
                color: "white",
                opacity: 1,
                fillOpacity: 1
            }),
           onEachFeature: vypisPopupuSluzba
        });

        // Přidáme novou vrstvu do mapy
        vrstvaSluzby.addTo(map);
        vrstvaAktivni = true;
        //zajistí, že bodové vrstvy z pole, které je níž v kódu budou vždy graficky nad šrafou
        presunBodoveVrstvyNahoru();
        // Update legend
        updateLegend(radioId, true);
        zrusitVyberIndexuEU();
    }
});

// Funkce pro zrušení výběru
function zrusitVyberSluzby() {
    if (vrstvaAktivni) {
        map.removeLayer(vrstvaSluzby); // Odstraní zvýrazněné polygony
        vrstvaAktivni = false;
    }

    document.querySelectorAll('input[type="radio"][name="sluzby"]').forEach((radio) => {
        radio.checked = false;
    });

    // Skrytí všech legend
    updateLegend(null, false);
}

function vypisPopupuSluzba(feature, layer) {  
    const sluzbaId = document.querySelector('input[type="radio"][name="sluzby"]:checked').id;
    const sluzba = sluzbyData.find(s => s.id === sluzbaId);
    const urlKey = sluzba.urlKey;
    const url = feature.properties[urlKey];

    // Funkce pro generování obsahu popupu podle aktuálního jazyka
    function updatePopupContent(lang) {
        let popupContent = `<div class="popup-container"><h2>${feature.properties.text}</h2>`; 

        if (krajAktivni) {
            popupContent += `<h3 class="info-texty-popup"><span data-key="index_digitalizace_">${translations[lang]["index_digitalizace_"]}</span> ${Math.round(feature.properties.j_index_digitalizace)}</h3>
        <div class="popup-row"><span data-key="sub_sluzby_">${translations[lang]["sub_sluzby_"]}</span>${Math.round(feature.properties.j_index_sluzby)}</div>
        <div class="popup-row"><span data-key="sub_pristupnost_">${translations[lang]["sub_pristupnost_"]}</span>${Math.round(feature.properties.j_index_dostupnost)}</div>
        <div class="popup-row"><span data-key="sub_dovednosti_">${translations[lang]["sub_dovednosti_"]}</span>${Math.round(feature.properties.j_index_dovednosti)}</div>
        <div class="popup-row"><span data-key="sub_infrastruktura_">${translations[lang]["sub_infrastruktura_"]}</span>${Math.round(feature.properties.j_index_digitalizace)}</div>`
        }
        if (url) {
            popupContent += `<div class="popup-row" style="padding-top:8px">
            <img src="img/popup/web_blue.svg" alt="Ikona" class="popup-icon">
            <span><a href="${url}" target="_blank" data-key="${sluzba.labelKey}">${translations[lang][sluzba.labelKey]}</a></span></div>`;
        } 
        
        /*else {
            popupContent += `<br><span data-key="odkaz_nedostupny">${translations[lang]["odkaz_nedostupny"]}</span></div>`;
        }*/
        
        return popupContent;
    }

    // Vytvoří popup s AKTUÁLNÍM jazykem
    const currentLang = window.currentLanguage || "cs";
    layer.bindPopup(updatePopupContent(currentLang));

    // Aktualizuje popup při otevření
    layer.on('popupopen', function() {
        const newLang = window.currentLanguage || "cs";
        layer.setPopupContent(updatePopupContent(newLang));
    });

    // Přeloží popup při změně jazyka, pokud je otevřený
    document.addEventListener("languageChange", function() {
        if (layer.getPopup() && layer.getPopup().isOpen()) {
            const newLang = window.currentLanguage || "cs";
            layer.setPopupContent(updatePopupContent(newLang));
        }
    });

    // Vypiseme další informace o kraji, pokud je potřeba
    vypisInfoKraj(layer, feature);
    
    layer.on('click', function() {
        highlightPolygon(layer);
    });
}












//----------------konec výběru služby-----------------

//vytvoření vrstvy krajů pro indexy
let inD = new L.GeoJSON.AJAX("data/kraje.geojson", {style: indexDigitalizace, onEachFeature: vypisPopupuIndex});

//vytvoření vrstvy pro DESI index
let statyDESI = new L.GeoJSON.AJAX("data/desi.geojson", {style: defaultStyle, onEachFeature: vypisPopupuDESI});

//obrys pokud není zobrazený podklad
let CR_obrys = new L.GeoJSON.AJAX("data/CR_obrys.geojson", {
    style: function(feature) {
        return {
            color: "black",       // Barva čáry
            weight: 2,           // Tloušťka čáry
            fillOpacity: 0    // Průhlednost výplně
        };
    }
});

function vypisPopupuDESI(feature, layer) {
  
    function updatePopupContent(lang){
    return `<div class="popup-container"><h2>${feature.properties.j_stat_CZ}</h2>
    <h3 class="info-texty-popup"><span data-key="desi_index_">${translations[lang]["desi_index_"]}</span>${Math.round(feature.properties["j_DESI" + desi])}</h3>
	<div class="popup-row"><span data-key="lidsky_kapital_">${translations[lang]["lidsky_kapital_"]}</span>${Math.round(feature.properties["j_HC" + desi])}</div>
    <div class="popup-row"><span data-key="digitalni_infrastruktura_">${translations[lang]["digitalni_infrastruktura_"]}</span>${Math.round(feature.properties["j_CONN" + desi])}</div>
    <div class="popup-row"><span data-key="konektivita_">${translations[lang]["konektivita_"]}</span>${Math.round(feature.properties["j_DPS" + desi])}</div>
    <div class="popup-row"><span data-key="integrace_ICT_">${translations[lang]["integrace_ICT_"]}</span>${Math.round(feature.properties["j_IDT" + desi])}</div>
    </div>`;
    }

    // Vytvoří popup s AKTUÁLNÍM jazykem
    const currentLang = window.currentLanguage || "cs"; 
    layer.bindPopup(updatePopupContent(currentLang)); 

    //Aktualizuje popup při otevření
    layer.on('popupopen', function() {
        const newLang = window.currentLanguage; 
        layer.setPopupContent(updatePopupContent(newLang)); 
    });

    //Přeloží popup při změně jazyka, pokud je otevřený
    //asi by bylo dobré předělat, že se zavře a otevře, protože zůstává rozměr podle předchozího jazyka
    document.addEventListener("languageChange", function () {
        if (layer.getPopup().isOpen()) {
            const newLang = window.currentLanguage;
            layer.setPopupContent(updatePopupContent(newLang));
        }
    });

    layer.on('click', function() {
        highlightPolygon(layer);
    });

};


//generování legendy
let grades;
function generateLegend(getColorFunction, legendName, grades, min) {
    let legend = `<div class="info legend">`;

    for (let i = 0; i < grades.length; i++) {
        const from = grades[i];

        if (i === grades.length - 1) {
            // Poslední interval: méně než
            legend += `<i style="background:${getColorFunction(from)}"></i> 
                       <span data-key="mene_nez"></span> ${min}<br>`;
        } else {
            // Ostatní intervaly: více než
            legend += `<i style="background:${getColorFunction(from + 1)}"></i> 
                       ${from} <span data-key="a_vice"></span><br>`;
        }
    }

    legend += '</div>';
    return legend;
}


//definice legend
const legendModra = generateLegend(getColorModra, "legendModra", [75, 60, 45, 44],"45");
const legendFialova = generateLegend(getColorFialova, "legendFialova", [75, 60, 45, 44],"45");
const legendOranzova = generateLegend(getColorOranzova, "legendOranzova", [85, 70, 55, 54],"55");
const legendZelena = generateLegend(getColorZelena, "legendZelena", [75, 50, 25, 24],"25");
const legendVinova = generateLegend(getColorVinova, "legendVinova", [65, 60, 55, 50, 49],"50");
const legendCervena = generateLegend(getColorCervena, "legendCervena", [90, 85, 80, 75, 74], "75");

//sidebar
let sidebar = L.control.sidebar('sidebar').addTo(map); 

//defaultní stav sidebaru podle šířky monitoru
function checkWindowSize() {
    if (window.innerWidth >= 1537) {
        sidebar.open('legenda');
    } else {
        sidebar.close();
    }
}
checkWindowSize();

//vložení dvýchozí vrstvy do mapy

inD.addTo(map);
let krajAktivni = true;

//zobrazení legendy výchozí vrstvy 
let legendContainer = document.getElementById('legenda1');
legendContainer.innerHTML = legendModra;

//ovládání legendy a vrstev indexů
let desi = null;

function addlay(style, legenda, stupnice, vrstva, rok) {
    if (obrys == true) {
        CR_obrys.removeFrom(map);
        obrys = false;
    }

    if (vrstva == 1) {
        if (desi) {
            desi = null;
            statyDESI.removeFrom(map);

            const radios = document.querySelectorAll('input[type="radio"][name="vrsEU"]');
            radios.forEach((radio) => {
                radio.checked = false;
            });

            inD.addTo(map);
            inD.bringToBack();
            krajAktivni = true;
        }

        // Ovládání legendy
        legendContainer.innerHTML = '<div></div>';
        legendContainer = document.getElementById(legenda);
        legendContainer.innerHTML = stupnice;

        // **PŘEKLAD LEGENDY PO ZMĚNĚ**
        const currentLang = window.currentLanguage || "cs"; 
        changeLanguage(currentLang);
        
        // Ovládání vrstev
        inD.addTo(map);
        inD.setStyle(style);
        inD.bringToBack();
        krajAktivni = true;
    } else if (vrstva == 2) {
        inD.removeFrom(map);

        if (krajAktivni) {
            resetVyberKraje();
            krajAktivni = false;
            zrusitVyberSluzby();
        }
        zrusitBody();

        desi = rok;

        // Aktualizace pop-upu
        statyDESI.eachLayer(layer => {
            vypisPopupuDESI(layer.feature, layer);
        });

        const radios = document.querySelectorAll('input[type="radio"][name="vrsKraj"]');
        radios.forEach((radio) => {
            radio.checked = false;
        });

        // Ovládání legendy
        legendContainer.innerHTML = '<div></div>';
        legendContainer = document.getElementById(legenda);
        legendContainer.innerHTML = stupnice;

        // **PŘEKLAD LEGENDY PO ZMĚNĚ**
        const currentLang = window.currentLanguage || "cs"; 
        changeLanguage(currentLang);

        statyDESI.addTo(map);
        statyDESI.bringToBack();
        statyDESI.setStyle(style);
    }
}


//tlačítko na vypnutí vrstev INDEXU
function zrusitVyberIndexuKraj() {
    if (inD) {
        inD.removeFrom(map); 
        krajAktivni = false;
    
    // Odznačení vybraného radiobuttonu
    const radios = document.querySelectorAll('input[type="radio"][name="vrsKraj"]');
    radios.forEach((radio) => {
        radio.checked = false;
    });

    // Vyčištění všech zobrazených legend
    const legends = document.querySelectorAll('.legend-containerKraj');
    legends.forEach((legend) => {
        legend.innerHTML = '';
    });
}
    kontrolaObrys();
}

//tlačítko na vypnutí vrstev indexu kraj
function zrusitVyberIndexuEU() {
    if (desi) {
        statyDESI.removeFrom(map);
        desi = null;     

    // Odznačení vybraného radiobuttonu
    const radios = document.querySelectorAll('input[type="radio"][name="vrsEU"]');
    radios.forEach((radio) => {
        radio.checked = false;
    });

    // Vyčištění všech zobrazených legend
    const legends = document.querySelectorAll('.legend-containerEU');
    legends.forEach((legend) => {
        legend.innerHTML = '';
    });
    } 
    kontrolaObrys();
}

//ovládání podkladových map
let aktivniPodklad = OSM_base;
aktivniPodklad.addTo(map);

function addBase(base){
	if (aktivniPodklad) {
	aktivniPodklad.removeFrom(map);
	aktivniPodklad = base;
	aktivniPodklad.addTo(map);
	
	} else{
	aktivniPodklad = base;	
	aktivniPodklad.addTo(map);
    CR_obrys.removeFrom(map);	
	};
}; 

let obrys = null;
function kontrolaObrys(){
    if (desi === null && krajAktivni === false && aktivniPodklad ===false) {
        CR_obrys.addTo(map);
        obrys = true;
    }
};

function zrusitPodklad(){
	aktivniPodklad.removeFrom(map);
	aktivniPodklad = false;
    kontrolaObrys();
    };

////////////Začátek menu pro podkladové mapy!!!!!!!!!!!!!!
// Vytvoření tlačítka pro ovládání podkladových map
let controlButton = L.DomUtil.create('button', 'control-button tooltip-left-kratky');
controlButton.innerHTML = '<img style="padding-top:4px;" src="img/vrstvy_podklad.svg"></img>'; // Ikona tlačítka
controlButton.setAttribute('data-tooltip-key', 'podkladove_mapy_tooltip');
controlButton.setAttribute('data-tooltip', '');


// Vytvoření menu pro tlačítka
let menu = L.DomUtil.create('div', 'map-layer-menu');
let button1 = L.DomUtil.create('button', '', menu);
button1.setAttribute("data-key", "zakladni");


let button2 = L.DomUtil.create('button', '', menu);
button2.setAttribute("data-key", "letecka");

let button3 = L.DomUtil.create('button', '', menu);
button3.setAttribute("data-key", "bez_podkladu");

// Přidání tlačítka a menu na mapu
map.getContainer().appendChild(controlButton);
map.getContainer().appendChild(menu);

// Sledování aktivní podkladové mapy
let activeButton = button1; // Výchozí aktivní tlačítko (button1)

function updateActiveButton(button) {
    // Odstraní aktivní třídu ze všech tlačítek
    button1.classList.remove('active');
    button2.classList.remove('active');
    button3.classList.remove('active');
    controlButton.classList.remove('active');
    
    // Přidá aktivní třídu novému tlačítku
    button.classList.add('active');
    if (button === controlButton) {
        controlButton.classList.add('active'); // Pokud je aktivní hlavní tlačítko, přidá třídu active
    }
}

// Funkce pro přepínání viditelnosti menu
controlButton.onclick = function(event) {
    // Zabráníme základnímu chování, aby se kliknutí správně zachytilo
    event.stopPropagation();

    // Přepnutí viditelnosti menu
    if (menu.style.display === "none") {
        menu.style.display = "block"; // Zobrazí menu
        controlButton.classList.add('active'); // Přidání třídy 'active' na hlavní tlačítko
    } else {
        menu.style.display = "none"; // Skryje menu
        controlButton.classList.remove('active'); // Odebrání třídy 'active' z hlavního tlačítka
    }
};

// Funkce pro zavření menu, pokud klikneš mimo něj
document.addEventListener('click', function(event) {
    if (!controlButton.contains(event.target) && !menu.contains(event.target)) {
        // Pokud klikneš mimo tlačítko a menu, zavřeme menu
        menu.style.display = "none"; // Skryje menu
        controlButton.classList.remove('active'); // Odebere 'active' z hlavního tlačítka
    }
});


// Funkce pro přidání podkladové mapy
button1.onclick = function() {
    addBase(OSM_base);
    updateActiveButton(button1);
    controlButton.classList.add('active'); 
};

button2.onclick = function() {
    addBase(Orto_base);
    updateActiveButton(button2);
    controlButton.classList.add('active'); 
};

button3.onclick = function() {
    zrusitPodklad();
    updateActiveButton(button3); 
    controlButton.classList.add('active');
};

// Výchozí stav
updateActiveButton(button1); // Výchozí aktivní tlačítko je button1 pro OSM

//---------------------Konec menu pro podkladové mapy-------------------------

//popup a výpis do sidebaru vrstva indexů
function vypisPopupuIndex(feature, layer) {  
    function updatePopupContent(lang) {
        return `<div id="popup-kraj" class="popup-container"><h2>${feature.properties.text}</h2>
        <h3 class="info-texty-popup"><span data-key="index_digitalizace_">${translations[lang]["index_digitalizace_"]}</span> ${Math.round(feature.properties.j_index_digitalizace)}</h3>
        <div class="popup-row"><span data-key="sub_sluzby_">${translations[lang]["sub_sluzby_"]}</span>${Math.round(feature.properties.j_index_sluzby)}</div>
        <div class="popup-row"><span data-key="sub_pristupnost_">${translations[lang]["sub_pristupnost_"]}</span>${Math.round(feature.properties.j_index_dostupnost)}</div>
        <div class="popup-row"><span data-key="sub_dovednosti_">${translations[lang]["sub_dovednosti_"]}</span>${Math.round(feature.properties.j_index_dovednosti)}</div>
        <div class="popup-row"><span data-key="sub_infrastruktura_">${translations[lang]["sub_infrastruktura_"]}</span>${Math.round(feature.properties.j_index_digitalizace)}</div>
        </div>`;
    }

    // Vytvoří popup s AKTUÁLNÍM jazykem
    const currentLang = window.currentLanguage || "cs"; 
    layer.bindPopup(updatePopupContent(currentLang)); 

    //Aktualizuje popup při otevření
    layer.on('popupopen', function() {
        const newLang = window.currentLanguage; 
        layer.setPopupContent(updatePopupContent(newLang)); 
    });

    //Přeloží popup při změně jazyka, pokud je otevřený
    //asi by bylo dobré předělat, že se zavře a otevře, protože zůstává rozměr podle předchozího jazyka
    document.addEventListener("languageChange", function () {
        if (layer.getPopup().isOpen()) {
            const newLang = window.currentLanguage;
            layer.setPopupContent(updatePopupContent(newLang));
        }
    });

    vypisInfoKraj(layer, feature);

    layer.on('click', function() {
        highlightPolygon(layer);
    });
}


const linkKeys = {
    
    j_platebni_portal_web: "platebni_portal",
    j_IDS_web: "integrovany_dopravni_system",
    j_rozklikavaci_rozpocet_web: "rozklikavaci_rozpocet",
    j_GEOportal_odkaz: "geoportal",
    j_openDATA_web: "portal_otevrenych_dat",
    j_katalog_soc_sluzeb_web: "katalog_soc_sluzeb",
    j_portal_kriz_rizeni_web: "portal_kriz_rizeni",
    j_dotacni_portal_web: "dotacni_portal"
};






const krajLayers = {}; // Objekt pro uložení vrstev podle názvu kraje

function resetVyberKraje() {
    if (activePolygon) {
        activePolygon.removeFrom(map);
        activePolygon = null;
        activeFeatureId = null;
        map.closePopup();
    }

    const defaultRadio = document.getElementById("defaultRadio");
    if (defaultRadio) {
        defaultRadio.checked = true; // Aktivujeme "Žádný vybraný kraj"
    }

    document.querySelectorAll("#infoKraj .links").forEach(el => el.innerHTML = ""); // Smazání odkazů

    const infoText = document.getElementById("defaultText");
    if (infoText) {
        infoText.style.display = "block"; // Zobrazíme text
    }
}

function initDefaultRadio() {
    const infoElement = document.getElementById('infoKraj');
    if (!infoElement) return;

    let radioContainer = infoElement.querySelector(".radio-wrapper");
    if (!radioContainer) {
        radioContainer = document.createElement("div");
        radioContainer.classList.add("radio-wrapper");
        infoElement.prepend(radioContainer);
    }

    let defaultElement = document.createElement("div");
    defaultElement.classList.add("radio-container");

    defaultElement.innerHTML = `
        <label>
            <input class="radio" type="radio" name="vyberKraje" value="" id="defaultRadio" checked>
            <span data-key="zadny_kraj"></span>
        </label>
    `;

    

    radioContainer.prepend(defaultElement);

  

    // Vytvoření kontejneru pro text
    let textContainer = document.createElement("div");
    textContainer.classList.add("info-texty"); // CSS třída pro styling
    infoElement.appendChild(textContainer);

    let infoText = document.createElement("p");
    infoText.setAttribute("data-key","zadny_kraj_text");
    infoText.id = "defaultText";
  

    textContainer.appendChild(infoText); // Přidání textu do kontejneru

    document.getElementById("defaultRadio").addEventListener('change', resetVyberKraje);

    document.addEventListener("change", (event) => {
        if (event.target.name === "vyberKraje" && event.target.value !== "") {
            infoText.style.display = "none";
        } else {
            infoText.style.display = "block"; // Zobrazí se, pokud není vybrán žádný kraj
        }
    });

    const currentLang = window.currentLanguage || "cs"; 
    changeLanguage(currentLang);

    map.on("click", resetVyberKraje); // Použití funkce při kliknutí do mapy
}






// Funkce pro vytváření radio buttonů podle krajů
function vypisInfoKraj(layer, feature) {
    const infoElement = document.getElementById('infoKraj');
    if (!infoElement) return;

    let krajElement = document.querySelector(`#infoKraj div[data-kraj="${feature.properties.text}"]`);
    if (!krajElement) {
        krajElement = document.createElement("div");
        krajElement.setAttribute("data-kraj", feature.properties.text);
        
        krajElement.innerHTML = `
            <div class="radio-container">
                <label>
                    <input class="radio" type="radio" name="vyberKraje" value="${feature.properties.text}">
                    ${feature.properties.text}
                </label>
            </div>
            <div class="links legend-containerKraj"></div>
        `;

        infoElement.appendChild(krajElement);

        let radioButton = krajElement.querySelector('input[type="radio"]');
        radioButton.addEventListener('change', () => {
            const layer = krajLayers[feature.properties.text]; // Získáme vrstvu podle názvu kraje
            if (layer) {
                highlightPolygon(layer); // Předáme objekt Leaflet vrstvy
            }
        });

        radioButton.addEventListener('change', () => zobrazitOdkazy(feature, krajElement));
    }

    // Uložíme vrstvu pod názvem kraje
    krajLayers[feature.properties.text] = layer;

    layer.on('click', () => {
        zobrazitOdkazy(feature, krajElement);
        krajElement.querySelector('input[type="radio"]').checked = true;
        highlightPolygon(layer);
    });

    function zobrazitOdkazy(feature, krajElement) {
        document.querySelectorAll("#infoKraj .links").forEach(el => el.innerHTML = "");
    
        let linksHtml = "<ul>";
        for (const [key, dataKey] of Object.entries(linkKeys)) {
            if (feature.properties[key]) {
                linksHtml += `<li><a href="${feature.properties[key]}" target="_blank" data-key="${dataKey}"></a></li>`;
            }
        }
        linksHtml += "</ul>";
    
        krajElement.querySelector(".links").innerHTML = linksHtml;
        changeLanguage(window.currentLanguage || "cs"); // Aby se hned přeložilo
    }
    
}

// Inicializace výchozího radio buttonu při načtení
document.addEventListener("DOMContentLoaded", initDefaultRadio);







// Funkce pro kliknutí na tlačítko
$(".schovaniLegendy").click(function(event){
    event.stopPropagation();  // Zabrání šíření události
    let target = $(this).data("target"); // Získá ID cílového divu
    $(target).slideToggle();
    
    // Přepínání ikon šipek
    $(this).find('.icon-sipka').toggleClass('skryta');
});

// Funkce pro kliknutí na celý nadpis s třídou 'expandable'
$("h3.expandable").click(function() {
    let button = $(this).find(".schovaniLegendy");
    let target = button.data("target"); // Získá ID cílového divu
    $(target).slideToggle();
    
    // Přepínání ikon šipek
    button.find('.icon-sipka').toggleClass('skryta');
});



//czech POINTY a clusterování

let CPmarkers = L.markerClusterGroup({
	showCoverageOnHover: false,
    iconCreateFunction: function(cluster) {
        let count = cluster.getChildCount(); // Počet bodů v clusteru
        let size = count < 10 ? 20 : count < 50 ? 30 : 40; // Velikost clustru
        let color = count < 10 ? "#3c3c3c" : count < 50 ? "#3c3c3c" : "#3c3c3c"; // Barva podle velikosti

        return L.divIcon({
            html: `<div style="
                width: ${size}px; 
                height: ${size}px; 
                background: ${color}; 
                border-radius: 50%;
                line-height: ${size}px;
                color: white;
                text-align: center;
                font-weight: bold;
                border: 2px solid #fff;">
                ${count}
            </div>`,
            className: "custom-cluster",
            iconSize: [size, size] // Nastaví velikost ikony
        });
    }
});

// Funkce pro vytvoření jednotlivých bodů
let CPStyle = function(feature, latlng) {
    let marker = L.marker(latlng, {
        icon: L.divIcon({
            className: "custom-marker",
            html: '<div style="background:#3c3c3c; width:8px; height:8px; border-radius:50%; border:2px solid #fff;"></div>',
            iconSize: [10, 10]
        })
    });

    
    let popupContent = `
        <div class="popup-container"><img src="img/popup/CzechPoint.png" alt="Ikona">
        <h2>${feature.properties.Inst}</h2>` +
		`<h3 class="h3-black">${feature.properties.Mesto} ${feature.properties.Ulice}, ${feature.properties.Psc}</h3>` ;
	if (feature.properties.URL) {
		popupContent += 
        `<div class="popup-row">
        <img src="img/popup/web_blue.svg" alt="Ikona" class="popup-icon">
        <span><a href="${feature.properties.URL}" target="_blank">${feature.properties.URL.slice(7)}</a></span></div>`
	}
    popupContent += `</div>`
	

	marker.bindPopup(popupContent);
    return marker;
};

// Načtení GeoJSON bodové vrstvy
let czechPoint = new L.GeoJSON.AJAX("data/czechpoint.geojson", {
    pointToLayer: CPStyle,
    onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }
});

// Přidání bodů do clusterovací vrstvy
czechPoint.on("data:loaded", function() {
    CPmarkers.addLayer(czechPoint);
});

//ovládání czechPOINT
let CP_active = 0;


function addKMVS() {
    zrusitVyberIndexuEU();
    let legend = document.getElementById("legend-kmvs");

    if (CP_active == 0) {
        map.addLayer(CPmarkers);
        
        // Zajistí, že legenda obsahuje aktuální informace
        legend.innerHTML = `
                <div style="display: inline-block; vertical-align: middle; background:#3c3c3c; width:10px; height:10px; border-radius:50%; border:2px solid #fff;"></div>
        `;
        CP_active = 1;
    } else {
        map.removeLayer(CPmarkers);
        legend.innerHTML = ""; // Skrýt legendu
        CP_active = 0;
    }
}

//Krajské úřady
// Načtení GeoJSON bodů pomocí L.GeoJSON.AJAX
let KUbody = new L.GeoJSON.AJAX("data/krajskyUrad.geojson", {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 6, // Poloměr kolečka
            color: '#ff6666', // Barva okraje
            weight: 2, // Tloušťka okraje
            fillColor: 'red', 
            fillOpacity: 1, // Plná průhlednost výplně
            stroke: true // Okraj bude vykreslen
        });
    },
    onEachFeature: vypisPopupuKU
});

// popup
function vypisPopupuKU(feature, layer) {

        function formatZavreno(value, lang) {
            
            return value === "-" ? `<span data-key="zavreno">${translations[lang]["zavreno"]}</span>` : value;
        }

    function updatePopupContent(lang) {
        return `<div class="popup-container">
            <h2>${feature.properties.nazev}</h2>
            <h3 class="h3-black">${feature.properties.adresa}</h3>
            
            <div class="popup-row">
                <img src="img/popup/tel.svg" alt="Ikona" class="popup-icon">
                <span>+420 ${feature.properties.tel}</span>
            </div>
            <div class="popup-row">
                <img src="img/popup/email.svg" alt="Ikona" class="popup-icon">
                <span>${feature.properties.email}</span>
            </div>
            <div class="popup-row">
                <img src="img/popup/web.svg" alt="Ikona" class="popup-icon">
                <span><a href="${feature.properties.web}" target="_blank">${feature.properties.web}</a></span>
            </div>
            <div class="popup-row">
                <img src="img/popup/dat_schr.svg" alt="Ikona" class="popup-icon">
                <span>${feature.properties.datSchranka}</span>
            </div>
            <div class="popup-row">
                <img style="padding-bottom:3px;" src="img/popup/ico.svg" alt="Ikona" class="popup-icon">
                <span data-key="ICO">${translations[lang]["ICO"]}</span>
                <span>${feature.properties.IC}</span>
            </div>

            <div class="popup-row popup-title">
                <img style="padding-bottom:3px;" src="img/popup/ur_hod.svg" alt="Ikona" class="popup-icon">
                <h4 data-key="uredni_hodiny">${translations[lang]["uredni_hodiny"]}</h4>
            </div>

            <p class="popup-hours">
                <span data-key="po">${translations[lang]["po"]}</span>${formatZavreno(feature.properties.po, lang)}<br>
                <span data-key="ut">${translations[lang]["ut"]}</span>${formatZavreno(feature.properties.ut, lang)}<br>
                <span data-key="st">${translations[lang]["st"]}</span>${formatZavreno(feature.properties.st, lang)}<br>
                <span data-key="ct">${translations[lang]["ct"]}</span>${formatZavreno(feature.properties.ct, lang)}<br>
                <span data-key="pa">${translations[lang]["pa"]}</span>${formatZavreno(feature.properties.pa, lang)}
            </p>
        </div>`;
    }

    // Vytvoří popup s AKTUÁLNÍM jazykem
    const currentLang = window.currentLanguage || "cs";
    layer.bindPopup(updatePopupContent(currentLang));

    // Aktualizuje popup při otevření
    layer.on('popupopen', function() {
        const newLang = window.currentLanguage;
        layer.setPopupContent(updatePopupContent(newLang));
    });

    // Přeloží popup při změně jazyka, pokud je otevřený
    document.addEventListener("languageChange", function () {
        if (layer.getPopup() && layer.getPopup().isOpen()) {
            const newLang = window.currentLanguage;
            layer.setPopupContent(updatePopupContent(newLang));
        }
    });
}


let KU_active = 0;
function addKU(){
    zrusitVyberIndexuEU();
    let legend = document.getElementById("legend-ku");
    
    if (KU_active ==0) {
    KUbody.addTo(map);
    

    KU_active = 1;
    
    legend.innerHTML = `
                        <div style="display: inline-block; vertical-align: middle; background-color: #ff3333; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #ff6666;"></div>
                        `;
    } else {
    KUbody.removeFrom(map);
    KU_active = 0; 
    legend.innerHTML = ""
    }
};
//
//dodělat líp..//////////////////////////////////////////////////////
function zrusitBody(){
    if (CP_active == 1){
        let legend1 = document.getElementById("legend-kmvs");
        map.removeLayer(CPmarkers);
        legend1.innerHTML = ""; // Skrýt legendu
        CP_active = 0;
        document.getElementById("KMVS").checked = false;
    }

    if (KU_active == 1){
    let legend2 = document.getElementById("legend-ku");
    KUbody.removeFrom(map);
    KU_active = 0; 
    legend2.innerHTML = "" 
    document.getElementById("KU").checked = false;
    }
};

/////////bodové vrstvy, které budou vždy nad šrafou
let bodoveVrstvy = [KUbody];

function presunBodoveVrstvyNahoru() {
    bodoveVrstvy.forEach(layer => {
        if (map.hasLayer(layer)) { // Ověříme, zda je vrstva aktivní
            layer.eachLayer(marker => {
                marker.bringToFront();
            });
        }
    });
};

//rozšíření sidebar ikony nahoře

//odkaz na platformu
L.Control.LinkButton = L.Control.extend({
    onAdd: function(map) {
        let container = L.DomUtil.create('div', 'leaflet-control leaflet-control-custom');

        // Stylování kontejneru
        container.style.position = "absolute";
        container.style.top = "0px"; // 10 px od horního okraje
        container.style.right = "0px"; // 50 px od pravého okraje
        container.style.zIndex = "1000"; // Aby bylo nad mapou

        let button = document.createElement("button");
        button.innerHTML = "Portál kompetenčních center";
        button.style.backgroundColor = "white"; // Modrá barva
        button.style.color = "#2362a2"; // Bílý text
        button.style.border = "2px solid #E7E7E7";
        button.style.cursor = "pointer";
        button.style.margin = "0px";
        button.style.fontSize = "12px";
        button.style.borderRadius = "8px"; // Zaoblené rohy
        button.style.boxShadow = "0px 2px 4px rgba(0,0,0,0.3)"; // Přidání stínu
        //
         // Nastavení pevné velikosti
         button.style.width = "98px"; // Pevná šířka
         button.style.height = "50px"; // Pevná výška
         button.style.textAlign = "center"; // Zarovnání textu do středu

        // Kliknutí otevře odkaz v novém okně
        button.onclick = function() {
            window.open("/", "_self"); // Změň URL podle potřeby
        };

        container.appendChild(button);
        return container;
    }
});

// Přidání tlačítka do mapy
let linkButtonControl = new L.Control.LinkButton({ position: 'topright' });

// 3️⃣ Přidání tlačítka na mapu
map.addControl(linkButtonControl);


//zvýraznění polygonu při popupu
let activePolygon = null;
let activeFeatureId = null; // Uložíme ID aktivního polygonu

map.createPane('highlightPane');
map.getPane('highlightPane').style.zIndex = 550;


function highlightPolygon(layer) {
    // Pokud je již nějaký polygon zvýrazněný, odstraníme ho
    if (activePolygon) {
        activePolygon.removeFrom(map);
    }

    // Vytvoříme novou vrstvu polygonu s upraveným stylem
    activePolygon = L.geoJSON(layer.toGeoJSON(), {
        pane: 'highlightPane',
        style: {
            color: '#FFD700',  // Zlatá barva zvýraznění
            weight: 4,         // Zvýrazněný obrys
            fillOpacity: 0     // Průhlednost výplně
        }
    }).addTo(map); // Přidání do mapy

    activePolygon.bringToFront();
    activeFeatureId = layer.feature.id; // Uložíme ID polygonu
    layer.openPopup();
    // Otevřeme popup

    // Event pro zavření popupu → zruší zvýraznění
    map.on('click', function () {
        if (activePolygon) {
            activePolygon.removeFrom(map);
            activePolygon = null;
            activeFeatureId = null;
        }
    });
    
}


//
function vycistiMapu(){
    zrusitVyberIndexuKraj();
    zrusitVyberIndexuEU();
    zrusitVyberSluzby();
    zrusitBody();
    resetVyberKraje();
};



//tooltipy nad mapou
document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.getElementById("custom-tooltip");

    document.querySelectorAll(".tooltip-trigger").forEach((item) => {
        item.addEventListener("mouseenter", function () {
            //  Získáme aktuálně aktivní sekci z URL (např. #home)
            const currentHash = window.location.hash; 
            const itemHash = item.getAttribute("href"); 

            // NEZOBRAZUJ tooltip, pokud se `href` ikony shoduje s aktuálním URL fragmentem
            if (currentHash === itemHash) {
                return;
            }

            const rect = item.getBoundingClientRect();
            tooltip.textContent = item.getAttribute("data-tooltip");
            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";

            // Umístění tooltipu vpravo od ikony
            tooltip.style.left = window.scrollX + rect.right + 10 + "px";
            tooltip.style.top = window.scrollY + rect.top + (rect.height / 2) - (tooltip.offsetHeight / 2) + "px";
        });

        item.addEventListener("mouseleave", function () {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        });
    });
});




//
function exportMapToPDF(map) {

    let podkladHolder;
    controlButton.remove();
    map.removeControl(controlZoomButton);
    map.removeControl(linkButtonControl);
    map.removeControl(zoomButton);
    map.removeControl(meritko);
    meritkoExport.addTo(map);
    document.querySelector(".leaflet-control-scale").classList.add("meritko-export");
    if (aktivniPodklad){
    podkladHolder = aktivniPodklad;
    aktivniPodklad.removeFrom(map);
    
    };

    const mapContainer = map.getContainer();
    
    // Uložíme původní stav mapy
    const originalCenter = map.getCenter();
    const originalZoom = map.getZoom();
    const originalBounds = map.getBounds();

    const titleText = document.getElementById("mapTitle").value || "Bez názvu";

    setTimeout(() => {
        const options = {
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            width: mapContainer.offsetWidth,
            height: mapContainer.offsetHeight,
            windowWidth: mapContainer.offsetWidth,
            windowHeight: mapContainer.offsetHeight,
            taintTest: false,
            imageTimeout: 0,
            scale: 1,
            removeContainer: false,
            logging: true,
            foreignObjectRendering: true,
            removeTransform: false,
            ignoreClear: true
        };

        // Vynutíme překreslení mapy
        map.invalidateSize();
        map.fitBounds(originalBounds, {animate: false});

        html2canvas(mapContainer, options).then(function(canvas) {
            const imgData = canvas.toDataURL('image/png');
            
            // Vytvoření PDF
            const pdf = new jspdf.jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [mapContainer.offsetWidth + 50, mapContainer.offsetHeight + 100],
                compress: true, // Komprese pro lepší kvalitu
                dpi: 600 // Zvýší rozlišení // Přidáme místo pro titulek
            });

            // Přidání titulku
            pdf.setFont("times", "bold");
            pdf.setFontSize(36);
            pdf.text(titleText, 50, 45);

            // Přidání mapy pod titulek
            pdf.addImage(imgData, 'PNG', 50, 50, mapContainer.offsetWidth - 50, mapContainer.offsetHeight);

            pdf.save(titleText + '.pdf');

            // Vrátíme mapu do původního stavu
            map.setView(originalCenter, originalZoom, {animate: false});
            document.getElementById('map').appendChild(controlButton);
            map.addControl(linkButtonControl);
            map.addControl(controlZoomButton);
            map.removeControl(meritkoExport);
            meritko.addTo(map);
            zoomButton.addTo(map);
            if (podkladHolder)
            aktivniPodklad = podkladHolder;
            aktivniPodklad.addTo(map);
            podkladHolder = null;
        });
    }, 50);
}

document.getElementById('exportBtn').addEventListener('click', function() {
    exportMapToPDF(map);
});


let sidebar_rozsireni = document.querySelector('.sidebar');
let legendaTab = document.querySelector('a[href="#legenda"]'); // Odkaz na záložku

// Vytvoříme tlačítko pro otevření sidebaru
let toggleButton = L.DomUtil.create('div', 'expand-sidebar');

// Přidáme SVG šipku (lokální soubor)
let arrowIcon = L.DomUtil.create('img', 'expand-arrow', toggleButton);
arrowIcon.src = 'img/right_arrowBlue.svg'; // Cesta k lokálnímu SVG souboru

toggleButton.onclick = function () {
    if (sidebar_rozsireni.classList.contains('collapsed')) {
        sidebar_rozsireni.classList.remove('collapsed'); // Otevře sidebar
        legendaTab.click(); // Automaticky klikne na záložku #legenda
    }
};

// Přidáme tlačítko do mapy
map.getContainer().appendChild(toggleButton);

// Funkce pro kontrolu stavu sidebaru
let hideButtonTimeout = null; // Proměnná pro sledování timeoutu
let showButtonTimeout = null; // Proměnná pro sledování timeoutu pro zobrazení tlačítka

function checkSidebarState() {
    if (!sidebar_rozsireni.classList.contains('collapsed')) {
        // Skrytí tlačítka s timeoutem 250ms
        if (showButtonTimeout !== null) {
            clearTimeout(showButtonTimeout); // Zrušíme probíhající timeout pro zobrazení
            showButtonTimeout = null;
        }

        // Zpoždíme skrytí tlačítka o 250ms
        hideButtonTimeout = setTimeout(function() {
            toggleButton.style.display = 'none'; // Skryje tlačítko, pokud je sidebar otevřený
        }, 50);
    } else {
        // Zavoláme setTimeout pro zobrazení tlačítka až po 250ms, pokud je sidebar zavřený
        if (hideButtonTimeout !== null) {
            clearTimeout(hideButtonTimeout); // Zrušíme probíhající timeout pro skrytí
            hideButtonTimeout = null;
        }

        // Zpoždíme zobrazení tlačítka o 250ms
        showButtonTimeout = setTimeout(function() {
            toggleButton.style.display = 'block'; // Zobrazí tlačítko po 250ms
        }, 250);
    }
}

// Sledujeme změny ve třídách sidebaru (např. když ho otevřeš jiným tlačítkem)
const observer = new MutationObserver(checkSidebarState);
observer.observe(sidebar_rozsireni, { attributes: true, attributeFilter: ['class'] });

// Kontrola při načtení stránky
checkSidebarState();


//zlačítko pro zoom na čr/eu
L.Control.FunctionButton = L.Control.extend({
    onAdd: function(map) {
        let container = L.DomUtil.create('div', 'leaflet-control');
       

        // Stylování kontejneru
        container.style.position = "fixed";
        container.style.bottom = "168px";
        container.style.right = "40px";
        container.style.zIndex = "1000";

        // Vytvoření tlačítka
        let button = document.createElement("button");
        button.innerHTML = '<img style="padding-top:4px;" src="img/zoom.svg"></img>';
        button.className = "control-zoom-button tooltip-left-dlouhy"; // Použití CSS třídy
        button.setAttribute('data-tooltip-key', 'zoom_na_cr_tooltip');
        button.setAttribute('data-tooltip', '');
        // Debug: zkusíme zjistit, zda se tlačítko vytvoří správně
       

        // Kliknutí zavolá JavaScript funkci
        button.onclick = function() {
            if(desi) {
                zoomEU();
            } else {
                zoomCR();
            }
         
           
        };

        container.appendChild(button);
        return container;
    }
});

// Přidání controlu do mapy
let controlZoomButton = new L.Control.FunctionButton({});
controlZoomButton.addTo(map);

// Definice myFunction()

