//zoomlevel podle šířky monitoru
let zoomLev;
	
if (window.innerWidth > 1800) {
    zoomLev = 9;
} else {
    zoomLev = 8;
};

//definice mapy, výchozí bod, a omezení zoom levelu
const map = L.map('map',{minZoom:4, maxZoom:19}).setView([49.8, 14.85],zoomLev);

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
		return 	d >= 80 ? 	'#0080ff':
				d >= 70 ? 	'#709bff':
				d >= 60 ? 	'#adbeff':
				d < 60  ? 	'#d5dcff':
							'#d5dcff';
	};	

	function getColorOranzova(d) {
		return 	d >= 80 ? 	'#C76300':
				d >= 70 ? 	'#DB8543':
				d >= 60 ? 	'#EEB086':
				d < 60  ? 	'#F9D2B9':
							'#F9D2B9';
	};

	function getColorZelena(d) {
		return 	d >= 80 ? 	'#008040':
				d >= 70 ? 	'#499861':
				d >= 60 ? 	'#82B78F':
				d < 60  ? 	'#B2D3B9':
							'#B2D3B9';
	};

	function getColorFialova(d) {
		return 	d >= 80 ? 	'#800080':
				d >= 70 ? 	'#973E95':
				d >= 60 ? 	'#AE66AA':
				d < 60 ?  	'#C187BC':
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
		fillOpacity: 0.7
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
			fillOpacity: 0.7
		};
	};

	function indexInfrastruktura(feature) {
		return {
			fillColor: getColorFialova(feature.properties.j_index_infrastruktura),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.7
		};
	};

	function accessibilityScoring(feature) {
		return {
			fillColor: getColorCervena(feature.properties.j_Accessibility_desktop),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.7
		};
	};
	
	function DESIIndex(feature) {
		return {
			fillColor: getColorVinova(feature.properties.j_DESI),
			weight: 2,
			opacity: 1,
			color: 'white',
			fillOpacity: 0.7
		};
	};

//------------výběr služby
// Data pro radio buttony na výběr služby
const sluzbyData = [
    { id: "sl1", label: "Platební portál", attribute: "j_platebni_portal" },
    { id: "sl2", label: "Rozklikávací rozpočet", attribute: "j_rozklikavaci_rozpocet" },
    { id: "sl3", label: "Integrovaný dopravní systém", attribute: "j_IDS" },
    { id: "sl4", label: "Geoportál", attribute: "j_GEOportal" },
    { id: "sl5", label: "Portál otevřených dat", attribute: "j_openDATA" },
    { id: "sl6", label: "Katalog sociálních služeb", attribute: "j_katalog_soc_sluzeb" },
    { id: "sl7", label: "Portál krizového řízení", attribute: "j_portal_kriz_rizeni" },
    { id: "sl8", label: "Dotační portál", attribute: "j_dotacni_portal" },
];

// Generate radio buttons and legends
function generateSluzby() {
    const container = document.getElementById("sluzby-container");
    sluzbyData.forEach((sluzba) => {
        const radioWrapper = document.createElement("div");

        // Create radio input
        const radioInput = document.createElement("input");
        radioInput.classList.add("radio");
        radioInput.type = "radio";
        radioInput.id = sluzba.id;
        radioInput.name = "sluzby";
        radioInput.dataset.attribute = sluzba.attribute;
        radioInput.dataset.group = "sluzby";

        // Create label
        const label = document.createElement("label");
        label.htmlFor = sluzba.id;
        label.textContent = sluzba.label;

        // Create legend container
        const legendContainer = document.createElement("div");
        legendContainer.id = `legend-${sluzba.id}`;
        legendContainer.classList.add("legend-container2");

        // Append to wrapper
        radioWrapper.appendChild(radioInput);
        radioWrapper.appendChild(label);
        radioWrapper.appendChild(legendContainer);

        // Append to main container
        container.appendChild(radioWrapper);
    });
}

// Call the function to generate the HTML
generateSluzby();

// Default style for inactive state
const defaultStyle = {
    opacity: 0,
    fillOpacity: 0,
};

// Update legend function
function updateLegend(radioId, isActive) {
    // Clear all legends
    document.querySelectorAll('.legend-container2').forEach((legend) => {
        legend.innerHTML = '';
    });

    // Show the legend for the active radio button
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

// Highlight polygons
function highlightFeature(feature, layer, attribute) {
    if (feature.properties[attribute] == 1) {
        const hatchingPattern = new L.StripePattern({
            weight: 2,
            color: "#4d4d4d",
            spaceWeight: 12,
            angle: 45,
        });

        hatchingPattern.addTo(map);

        layer.setStyle({
            fillPattern: hatchingPattern,
            weight: 3,
            color: "white",
            opacity: 1,
            fillOpacity: 1,
        });

        layer.bringToFront();
    } else {
        layer.setStyle(defaultStyle);
    }
}

// Initialize the transparent layer
let pruhlednaVrstva = new L.GeoJSON.AJAX("data/kraje.geojson", {
    style: defaultStyle,
    onEachFeature: vypisPopupu,
});

// Handle radio button changes
document.addEventListener("change", (e) => {
    if (e.target.matches('input[type="radio"][data-group="sluzby"]')) {
        const attribute = e.target.dataset.attribute;
        const radioId = e.target.id;
        pruhlednaVrstva.eachLayer((layer) => {
            highlightFeature(layer.feature, layer, attribute);
        });

        // Update legend
        updateLegend(radioId, true);
    }
});

// Clear selections
function zrusitVyberSluzby() {
    pruhlednaVrstva.setStyle(defaultStyle);
    document.querySelectorAll('input[type="radio"][name="sluzby"]').forEach((radio) => {
        radio.checked = false;
    });

    // Hide all legends
    updateLegend(null, false);
}
//----------------konec výběru služby



//vytvoření vrstvy krajů pro indexy
let inD = new L.GeoJSON.AJAX("data/kraje.geojson", {style: indexDigitalizace, onEachFeature: vypisPopupu});

//vytvoření vrstvy pro DESI index
let statyDESI = new L.GeoJSON.AJAX("data/desi.geojson", {style: defaultStyle});



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

const legendModra = generateLegend(getColorModra, "legendModra", [80, 70, 60, 59],"60");
const legendFialova = generateLegend(getColorFialova, "legendFialova", [80, 70, 60, 59],"60");
const legendOranzova = generateLegend(getColorOranzova, "legendOranzova", [80, 70, 60, 59],"60");
const legendZelena = generateLegend(getColorZelena, "legendZelena", [80, 70, 60, 59],"60");
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
pruhlednaVrstva.addTo(map)
inD.addTo(map);
let aktivniVrstva = inD;

//pruhledne staty pro zobrazení DESI
statyDESI.addTo(map)

//přidání průhledné vrstvy pro zobrazení služeb 


//zobrazení legendy výchozí vrstvy 
let legendContainer = document.getElementById('legenda1');
legendContainer.innerHTML = legendModra;

//měřítko
L.control.scale({
	position:'bottomright',
	metric: true, 
	imperial: false
}).addTo(map);

//ovládání legendy a vrstev indexů
let desi;
function addlay(style,legenda,stupnice,vrstva){
	
	if (vrstva == 1) {
		if(desi==1){
			desi=0;
			statyDESI.setStyle(defaultStyle)
		}
	//ovladani legendy
	legendContainer.innerHTML = '<div></div>';
	legendContainer = document.getElementById(legenda);
	legendContainer.innerHTML = stupnice;
	
	//ovladani vrstev
	aktivniVrstva.setStyle(style);
	} else if (vrstva == 2) {
	aktivniVrstva.setStyle(defaultStyle)
	
	desi=1;
	
	legendContainer.innerHTML = '<div></div>';
	legendContainer = document.getElementById(legenda);
	legendContainer.innerHTML = stupnice;

		
	statyDESI.setStyle(style);	
	}
};

//tlačítko na vypnutí vrstev indexu
function zrusitVyberIndexu() {
    if (desi === 1) {
        statyDESI.setStyle(defaultStyle);
        desi = 0; 
    } else {
        aktivniVrstva.setStyle(defaultStyle); 
    }

    // Odznačení vybraného radiobuttonu
    const radios = document.querySelectorAll('input[type="radio"][name="vrs"]');
    radios.forEach((radio) => {
        radio.checked = false;
    });

    // Vyčištění všech zobrazených legend
    const legends = document.querySelectorAll('.legend-container');
    legends.forEach((legend) => {
        legend.innerHTML = '';
    });
}

//ovládání podkladových map
let aktivniPodklad = OSM_base;
aktivniPodklad.addTo(map);

function addBase(base){
	podklad = 1;
	if (aktivniPodklad) {
	aktivniPodklad.removeFrom(map);
	aktivniPodklad = base;
	aktivniPodklad.addTo(map);
	
	} else{
	aktivniPodklad = base;	
	aktivniPodklad.addTo(map);	
	};
}; 

function zrusitPodklad(){
	aktivniPodklad.removeFrom(map);
	aktivniPodklad = false;
	
	const radios = document.querySelectorAll('input[type="radio"][name="podk"]');
    radios.forEach((radio) => {
        radio.checked = false; // Odznačí všechny radiobuttony
    });
};

//popup a výpis do sidebaru
function vypisPopupu(feature, layer) {  
	let popupContent = `<b>${feature.properties.text}</b>` + 
	`<br>Index digitalizace: ${Math.round(feature.properties.j_index_digitalizace)}` +
	`<br>Index poskytovaných služeb: ${Math.round(feature.properties.j_index_sluzby)}` +
	`<br>Index digitální dovednosti: ${Math.round(feature.properties.j_index_dovednosti)}` +
	`<br>Index digitální infrastruktura: ${Math.round(feature.properties.j_index_digitalizace)}`+
	`<br>Accessibility scoring: ${feature.properties.j_Accessibility_desktop}`;

	layer.bindPopup(popupContent); 

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


//schování části legendy
$(document).ready(function(){
	$(".schovaniLegendy").click(function(){
		let target = $(this).data("target"); // Získá ID cílového divu
		$(target).slideToggle();
		$(this).text($(this).text() === "-" ? "+" : "-");
	});
});


/*let CPStyle = function(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 4,          // Velikost bodu
        fillColor: "#ff7800", // Barva výplně
        color: "#000",       // Barva obrysu
        weight: 1,           // Šířka obrysu
        opacity: 1,          // Viditelnost obrysu
        fillOpacity: 0.8     // Průhlednost výplně
    });
};

// Přidání GeoJSON bodové vrstvy s `pointToLayer`
let czechPoint = new L.GeoJSON.AJAX("data/czechpoint.geojson", {
    pointToLayer: CPStyle,
    onEachFeature: function(feature, layer) {
        layer.on("add", function() {
            layer.bringToFront();  // Posune bod nad ostatní vrstvy
        });

        
    }
});*/

//czech POINTY a clusterování

let markers = L.markerClusterGroup({
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

    
    let popupContent = `<b><br>${feature.properties.Inst}</b><br>` +
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
    markers.addLayer(czechPoint);
});

//ovládání czechPOINT
let CP_active = 0;

function addKMVS(){
	if (CP_active == 0) {
	 map.addLayer(markers);
	CP_active = 1
	} else {
	 map.removeLayer(markers);
	CP_active = 0;
	};	
};