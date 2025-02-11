//zoomlevel podle šířky monitoru
let zoomLev;

if (window.innerWidth > 1800) {
    zoomLev = 9;
} else {
    zoomLev = 8;
};

let bounds = [
    [34.5, -35],  // Jihozápadní roh (SWW)
    [71.5, 45]    // Severovýchodní roh (NEE)
];


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
L.control.scale({
	position:'bottomright',
	metric: true, 
	imperial: false
}).addTo(map);


L.control.zoom({
    position: 'bottomright' // Umístění tlačítek
}).addTo(map);


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
		return 	d >= 75 ? 	'#1d456f':
				d >= 60 ? 	'#2362a2':
				d >= 45 ? 	'#599bd7':
				d < 45  ? 	'#c5dbf2':
							'#c5dbf2';
	};	

	function getColorOranzova(d) {
		return 	d >= 75 ? 	'#C76300':
				d >= 50 ? 	'#DB8543':
				d >= 25 ? 	'#EEB086':
				d < 25 ? 	'#F9D2B9':
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
				d >= 50 ? 	'#973E95':
				d >= 25 ? 	'#AE66AA':
				d < 25 ?  	'#C187BC':
						  	'#C187BC';
	};


	function getColorCervena(d) {
		return 	d > 99  ? 	'#FF0000':
				d >= 95 ? 	'#FF603E':
				d >= 90 ? 	'#FF9B7E':
				d >= 85 ? 	'#FFCCBA':
				d < 85  ? 	'#FFE8E0':
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
		fillOpacity: 0.8
	};
};

	function indexSluzby(feature) {
		return {
			fillColor: getColorOranzova(feature.properties.j_index_sluzby),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.7
		};
	};

	function indexDovednosti(feature) {
		return {
			fillColor: getColorZelena(feature.properties.j_index_dovednosti),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8
		};
	};

	function indexInfrastruktura(feature) {
		return {
			fillColor: getColorFialova(feature.properties.j_index_infrastruktura),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8
		};
	};

	function indexPristupnost(feature) {
		return {
			fillColor: getColorCervena(feature.properties.j_Accessibility_desktop),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8
		};
	};
	
	function DESIIndex22(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI22),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8
		};
	};

    function DESIIndex21(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI21),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8
		};
	};

    function DESIIndex20(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI20),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.8
		};
	};


//------------výběr služby
// Data pro radio buttony na výběr služby
const sluzbyData = [
    { id: "sl1", label: "Platební portál", attribute: "j_platebni_portal", urlKey: "j_platebni_portal_web"},
    { id: "sl2", label: "Rozklikávací rozpočet", attribute: "j_rozklikavaci_rozpocet", urlKey: "j_rozklikavaci_rozpocet_web"},
    { id: "sl3", label: "Integrovaný dopravní systém", attribute: "j_IDS", urlKey: "j_IDS_web"},
    { id: "sl4", label: "Geoportál", attribute: "j_GEOportal", urlKey: "j_GEOportal_odkaz"},
    { id: "sl5", label: "Portál otevřených dat", attribute: "j_openDATA", urlKey: "j_openDATA_web"},
    { id: "sl6", label: "Katalog sociálních služeb", attribute: "j_katalog_soc_sluzeb", urlKey: "j_katalog_soc_sluzeb_web"},
    { id: "sl7", label: "Portál krizového řízení", attribute: "j_portal_kriz_rizeni", urlKey: "j_portal_kriz_rizeni_web"},
    { id: "sl8", label: "Dotační portál", attribute: "j_dotacni_portal", urlKey: "j_dotacni_portal_web"},
];

// Generování radio buttonů a legend
function generateSluzby() {
    const container = document.getElementById("sluzby-container");
    sluzbyData.forEach((sluzba) => {
        const radioWrapper = document.createElement("div");

        // Vytvoření radio inputu
        const radioInput = document.createElement("input");
        radioInput.classList.add("radio");
        radioInput.type = "radio";
        radioInput.id = sluzba.id;
        radioInput.name = "sluzby";
        radioInput.dataset.attribute = sluzba.attribute;
        radioInput.dataset.group = "sluzby";

        // Vytvoření labelu
        const label = document.createElement("label");
        label.htmlFor = sluzba.id;
        label.textContent = sluzba.label;

        // Vytvoření legendy
        const legendContainer = document.createElement("div");
        legendContainer.id = `legend-${sluzba.id}`;
        legendContainer.classList.add("legend-container2");

        // Přidání do wrapperu
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(label);
        radioWrapper.appendChild(legendContainer);

        // Přidání do hlavního kontejneru
        container.appendChild(radioWrapper);
    });
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
                <span>kraj s dostupnou službou</span>
            </div>
        `;
        legendContainer.innerHTML = legendContent;
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
    let popupContent = `<b>${feature.properties.text}</b>`; 

    // Získání klíče pro URL na základě vybrané služby
    const sluzbaId = document.querySelector('input[type="radio"][name="sluzby"]:checked').id;
    const sluzba = sluzbyData.find(s => s.id === sluzbaId);
    
    // Získání URL pro aktuální službu
    const urlKey = sluzba.urlKey;
    const url = feature.properties[urlKey];  // Například feature.properties.platebni_portal_url

    // Pokud URL existuje, přidáme odkaz s label z sluzbyData
    if (url) {
        popupContent += `<br><a href="${url}" target="_blank">Přejít na ${sluzba.label}</a>`;
    } else {
        popupContent += `<br>Odkaz na službu není dostupný.`;
    }

    
    // Připojíme popup k vrstvě
    layer.bindPopup(popupContent);

    // Vypiseme další informace o kraji, pokud je potřeba
    vypisInfoKraj(layer, feature);
    highlightPolygon(layer);
}

//----------------konec výběru služby



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
  
    let popupDESI = `<b>${feature.properties.j_stat_CZ}</b>` + 
    `<br>DESI index: ${Math.round(feature.properties["j_DESI" + desi])}` +
	`<br>Integrace digitálních technologií: ${Math.round(feature.properties["j_IDT" + desi])}` +
    `<br>Lidský kapitál: ${Math.round(feature.properties["j_HC" + desi])}` +
    `<br>Digitalizace veřejné služby: ${Math.round(feature.properties["j_DPS" + desi])}` +
    `<br>Digitální infrastruktura: ${Math.round(feature.properties["j_CONN" + desi])}`;
    
    highlightPolygon(layer);
    layer.bindPopup(popupDESI);
};



//generování legendy
let grades;
function generateLegend(getColorFunction, legendName, grades, min) {

	let legend = `<div class="info legend">`;

    for (let i = 0; i < grades.length; i++) {
        const from = grades[i];
        
        if (i === grades.length - 1) {
            // Poslední interval: méně než
            legend += `<i style="background:${getColorFunction(from)}"></i> méně než ${min}<br>`;
        } else {
            // Ostatní intervaly: více než
            legend += `<i style="background:${getColorFunction(from + 1)}"></i> ${from} a více <br>`;
        }
    }

    legend += '</div>';
    return legend;
}

//generování legendy pro lighthouse accessibility score 
function generateLegendAccessibility(getColorFunction, legendName, grades) {
    let legend = `<div class="info legend">`;

    for (let i = 0; i < grades.length; i++) {
        const from = grades[i];

        if (i === 0) {
            // První interval: méně než
            legend += `<i style="background:${getColorFunction(from)}"></i> 100<br>`;
			
        } else if (i === grades.length - 1) {
            // Poslední interval: pevně 100
            legend += `<i style="background:${getColorFunction(from)}"></i> méně než 85<br>`;
        } else {
            // Ostatní intervaly: více než
            legend += `<i style="background:${getColorFunction(from)}"></i> ${from} a více <br>`;
        }
    }

    legend += '</div>';
    return legend;
}

const legendModra = generateLegend(getColorModra, "legendModra", [75, 60, 45, 44],"45");
const legendFialova = generateLegend(getColorFialova, "legendFialova", [75, 50, 25, 24],"25");
const legendOranzova = generateLegend(getColorOranzova, "legendOranzova", [75, 50, 25, 24],"25");
const legendZelena = generateLegend(getColorZelena, "legendZelena", [75, 50, 25, 24],"25");
const legendVinova = generateLegend(getColorVinova, "legendVinova", [65, 60, 55, 50, 49],"50");

//legenda pro lighthouse Accessibility
const legendCervena = generateLegendAccessibility(getColorCervena, "legendCervena", [100, 95, 90, 85, 84]);

//sidebar
let sidebar = L.control.sidebar('sidebar').addTo(map); 

//defaultní stav sidebaru podle šířky monitoru
function checkWindowSize() {
    if (window.innerWidth >= 1537) {
        sidebar.open('home');
    } else {
        sidebar.close();
    }
}
checkWindowSize();

//vložení dvýchozí vrstvy do mapy

inD.addTo(map);
let krajAktivni = true;

//pruhledne staty pro zobrazení DESI


//přidání průhledné vrstvy pro zobrazení služeb 


//zobrazení legendy výchozí vrstvy 
let legendContainer = document.getElementById('legenda1');
legendContainer.innerHTML = legendModra;






//ovládání legendy a vrstev indexů
let desi = null;
function addlay(style,legenda,stupnice,vrstva, rok){
	if (obrys ==true) {
        CR_obrys.removeFrom(map);
        obrys = false;
    }
	if (vrstva == 1) {
		if(desi){
			desi= null;
			statyDESI.removeFrom(map);
            
            const radios = document.querySelectorAll('input[type="radio"][name="vrsEU"]');
            radios.forEach((radio) => {
                radio.checked = false;
            });

            inD.addTo(map);
            inD.bringToBack();
            krajAktivni = true;
		
        
        }
	//ovladani legendy
	legendContainer.innerHTML = '<div></div>';
	legendContainer = document.getElementById(legenda);
	legendContainer.innerHTML = stupnice;
	
	//ovladani vrstev
    inD.addTo(map);
	inD.setStyle(style);
    inD.bringToBack();
    krajAktivni = true;
	} else if (vrstva == 2) {
	inD.removeFrom(map);
	krajAktivni = false;
    zrusitVyberSluzby(); 
    zrusitBody();

	desi=rok;
    //aktualizace pop-upu
    statyDESI.eachLayer(layer => {
        vypisPopupuDESI(layer.feature, layer);
    });

    const radios = document.querySelectorAll('input[type="radio"][name="vrsKraj"]');
    radios.forEach((radio) => {
        radio.checked = false;
    });

	legendContainer.innerHTML = '<div></div>';
	legendContainer = document.getElementById(legenda);
	legendContainer.innerHTML = stupnice;

	statyDESI.addTo(map);
    statyDESI.bringToBack();
	statyDESI.setStyle(style);	
	}

};

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
controlButton.innerHTML = '<img src="img/vrstvyWhite.svg"></img>'; // Ikona tlačítka
controlButton.setAttribute('data-tooltip', 'Podkladové mapy');

// Vytvoření menu pro tlačítka
let menu = L.DomUtil.create('div', 'map-layer-menu');
let button1 = L.DomUtil.create('button', '', menu);
button1.innerHTML = "OpenStreetMap";
let button2 = L.DomUtil.create('button', '', menu);
button2.innerHTML = "Ortofoto";
let button3 = L.DomUtil.create('button', '', menu);
button3.innerHTML = "Bez podkladové mapy";

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

////////////Konec menu pro podkladové mapy!!!!!!!!!!!!!!


//popup a výpis do sidebaru
function vypisPopupuIndex(feature, layer) {  


	let popupContent = `<b>${feature.properties.text}</b>` + 
	`<br>Index digitalizace: ${Math.round(feature.properties.j_index_digitalizace)}` +
	`<br>Subindex poskytovaných služeb: ${Math.round(feature.properties.j_index_sluzby)}` +
	`<br>Subindex digitální dovednosti: ${Math.round(feature.properties.j_index_dovednosti)}` +
	`<br>Subindex digitální infrastruktura: ${Math.round(feature.properties.j_index_digitalizace)}`+
	`<br>Subindex přístupnosti: ${feature.properties.j_Accessibility_desktop}`;

    
	layer.bindPopup(popupContent); 

    vypisInfoKraj(layer,feature);
    highlightPolygon(layer);
};


function vypisInfoKraj(layer,feature){
// Seznam klíčů a jejich odpovídajících textů
const linkKeys = {
    web_kraje: "Web kraje",
    j_platebni_portal_web: "Platební portál",
    j_IDS_web: "Integrovaný dopravní systém",
    j_rozklikavaci_rozpocet_web: "Rozklikávací rozpočet",
    j_GEOportal_web: "GEOportál",
    j_openDATA_web: "Portál otevřených dat",
    j_katalog_soc_sluzeb_web: "Katalog sociálních služeb",
    j_portal_kriz_rizeni_web: "Portál krizového řízení",
    j_dotacni_portal_web: "Dotační portál"
};

let vypisKraj = `<h3>${feature.properties.text}</h3>`;
for (const [key, label] of Object.entries(linkKeys)) {
    if (feature.properties[key]) {
        vypisKraj += `<a href="${feature.properties[key]}" target="_blank">${label}</a><br>`;
    }
}


layer.on('click', (e) => {
// Změna obsahu v elementu s ID "infoKraj"
const infoElement = document.getElementById('infoKraj');
if (infoElement) {
    infoElement.innerHTML = vypisKraj;
}});
};



//+- pro schovávání oddílů ovládání

$(".schovaniLegendy").click(function(event){
    event.stopPropagation();  // Zabrání šíření události
    let target = $(this).data("target"); // Získá ID cílového divu
    $(target).slideToggle();
    $(this).text($(this).text() === "−" ? "+" : "−");
});

// Funkce pro kliknutí na celý nadpis s třídou 'expandable'
$("h3.expandable").click(function() {
    let target = $(this).find(".schovaniLegendy").data("target"); // Získá ID cílového divu
    $(target).slideToggle();
    let buttonText = $(this).find(".schovaniLegendy").text();
    $(this).find(".schovaniLegendy").text(buttonText === "−" ? "+" : "−");
});

//czech POINTY a clusterování

let CPmarkers = L.markerClusterGroup({
	showCoverageOnHover: false,
    iconCreateFunction: function(cluster) {
        let count = cluster.getChildCount(); // Počet bodů v clusteru
        let size = count < 10 ? 20 : count < 50 ? 30 : 40; // Velikost clustru
        let color = count < 10 ? "#599bd7" : count < 50 ? "#2362a2" : "#1d456f"; // Barva podle velikosti

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
            html: '<div style="background:#93bde6; width:8px; height:8px; border-radius:50%; border:2px solid #fff;"></div>',
            iconSize: [10, 10]
        })
    });

    
    let popupContent = `<b>${feature.properties.Inst}</b><br>` +
			`<br>${feature.properties.Mesto} ${feature.properties.Ulice}, ${feature.properties.Psc}` ;
	if (feature.properties.URL) {
		popupContent += `<br><a href="${feature.properties.URL}" target="_blank">Webové stránky</a>`
	}
	

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
                <div style="display: inline-block; background:#93bde6; width:10px; height:10px; border-radius:50%; border:2px solid #fff;"></div>
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
function vypisPopupuKU(feature, layer){
    let popupKU = `<b>${feature.properties.nazev}</b>` + 
	`<br>${feature.properties.adresa}` +
    `<br>Telefon: ${feature.properties.tel}` +
    `<br>E-mail: ${feature.properties.email}` +
    `<br>Web: ${feature.properties.web}` +
    `<br>Dat. schránka: ${feature.properties.datSchranka}` +
    `<br>IČ: ${feature.properties.IC}` +
    `<br><br>Úřední hodiny:` +
    `<br>PO: ${feature.properties.po}` +
    `<br>ÚT: ${feature.properties.ut}` +
    `<br>ST: ${feature.properties.st}` +
    `<br>ČT: ${feature.properties.ct}` +
    `<br>PÁ: ${feature.properties.pa}`;
    

    layer.bindPopup(popupKU)
};


let KU_active = 0;
function addKU(){
    zrusitVyberIndexuEU();
    let legend = document.getElementById("legend-ku");
    
    if (KU_active ==0) {
    KUbody.addTo(map);
    

    KU_active = 1;
    
    legend.innerHTML = `
                        <div style="display: inline-block; background-color: #ff3333; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #ff6666;"></div>
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
        button.innerHTML = "Platforma";
        button.style.backgroundColor = "#2362a2"; // Modrá barva
        button.style.color = "white"; // Bílý text
        button.style.border = "none";
        button.style.cursor = "pointer";
        button.style.margin = "0px";
        button.style.fontSize = "20px";
        button.style.borderRadius = "5px"; // Zaoblené rohy
        button.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.3)"; // Přidání stínu
        //
         // Nastavení pevné velikosti
         button.style.width = "120px"; // Pevná šířka
         button.style.height = "41px"; // Pevná výška
         button.style.textAlign = "center"; // Zarovnání textu do středu
 
        // Změna barvy při najetí myší
        button.onmouseover = function() {
            button.style.backgroundColor = "#f4f4f4"; // Tmavší modrá při hoveru
            button.style.color = "#2362a2";
        };
        button.onmouseout = function() {
            button.style.backgroundColor = "#2362a2"; // Zpět na původní modrou
            button.style.color = "white";
        };

        // Kliknutí otevře odkaz v novém okně
        button.onclick = function() {
            window.open("https://dia.gov.cz", "_blank"); // Změň URL podle potřeby
        };

        container.appendChild(button);
        return container;
    }
});

// Přidání tlačítka do mapy
map.addControl(new L.Control.LinkButton({ position: 'topright' }));


//zvýraznění polygonu při popupu
let activePolygon = null;
let activeFeatureId = null; // Uložíme ID aktivního polygonu

function highlightPolygon(layer) {
            layer.on('click', function () {
            // Pokud je již nějaký polygon zvýrazněný, odstraníme ho
            if (activePolygon) {
                activePolygon.removeFrom(map);
            }

            // Vytvoříme novou vrstvu polygonu s upraveným stylem
            activePolygon = L.geoJSON(layer.toGeoJSON(), {
                style: {
                    color: '#FFD700',  // Zlatá barva zvýraznění
                    weight: 4,         // Zvýrazněný obrys
                    fillOpacity: 0   // Průhlednost výplně
                }
            }).addTo(map); // Přidání do mapy
            activePolygon.bringToFront();
            
            activeFeatureId = layer.feature.id; // Uložíme ID polygonu
            layer.openPopup(); // Otevřeme popup
        });
    

    layer.on('popupclose', function () {
        if (activePolygon) {
            activePolygon.removeFrom(map); // Odebrání zvýrazněného polygonu z mapy
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
}