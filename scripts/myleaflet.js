//zoomlevel podle šířky monitoru
let zoomLev;
	
if (window.innerWidth > 1800) {
    zoomLev = 9;
} else {
    zoomLev = 8;
};

const map = L.map('map',{minZoom:6, maxZoom:9}).setView([49.8, 14.85],zoomLev);

//podkladová mapa
	const OSM_podklad = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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


//Přidat výpočty indexů

//definování stylu vrstev
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


//zvýraznění podle služby
//defultní průhledná vrstva
const defaultStyle = {
	opacity: 0,
	fillOpacity: 0
};


// Funkce na zvýraznění polygonů
function highlightFeature(feature, layer, attribute) {
    // Zkontrolujte, zda hodnota atributu odpovídá podmínce
    if (feature.properties[attribute] == 1) {
        // Vytvoření šrafovacího vzoru
        const hatchingPattern = new L.StripePattern({
            weight: 2, // Tloušťka čar
            color: "#4d4d4d", // Barva šrafování
            spaceWeight: 12, // Vzdálenost mezi čarami
            angle: 45, // Úhel šrafování
        });

        // Přidání vzoru do mapy
        hatchingPattern.addTo(map);

        // Použití vzoru na zvýrazněný polygon
        layer.setStyle({
            fillPattern: hatchingPattern, // Nastavení šrafovacího vzoru
            weight: 3,
            color: "white", // Okraj polygonu
            opacity: 1,
            fillOpacity: 1, // Plná neprůhlednost šrafy
        });

        layer.bringToFront(); // Posun vrstvy dopředu
    } else {
        layer.setStyle(defaultStyle); // Reset na výchozí styl
    }
}

//inicializace průhledné vrstvy
let pruhlednaVrstva = new L.GeoJSON.AJAX("data/kraje.geojson", {style: defaultStyle, onEachFeature: vypisPopupu});

//obsluha heckboxů
document.querySelectorAll('input[type="radio"][data-group="sluzby"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        const attribute = e.target.dataset.attribute;
        pruhlednaVrstva.eachLayer((layer) => {
            highlightFeature(layer.feature, layer, attribute);
        });
    });
});

//zrušení označení podle služby
function zrusitVyberSluzby(){
	pruhlednaVrstva.setStyle(defaultStyle);
	const radios = document.querySelectorAll('input[type="radio"][name="sluzby"]');
      radios.forEach(radio => radio.checked = false);
}

//vytvoření vrstevy pro indexy
let inD = new L.GeoJSON.AJAX("data/kraje.geojson", {style: indexDigitalizace, onEachFeature: vypisPopupu});

	
//generování legendy
let grades;
function generateLegend(getColorFunction, legendName, grades) {

	let legend = `<div class="info legend">`;

    for (let i = 0; i < grades.length; i++) {
        const from = grades[i];
        
        if (i === grades.length - 1) {
            // Poslední interval: méně než
            legend += `<i style="background:${getColorFunction(from)}"></i> méně než 60<br>`;
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

const legendModra = generateLegend(getColorModra, "legendModra", [80, 70, 60, 59]);
const legendFialova = generateLegend(getColorFialova, "legendFialova", [80, 70, 60, 59]);
const legendOranzova = generateLegend(getColorOranzova, "legendOranzova", [80, 70, 60, 59]);
const legendZelena = generateLegend(getColorZelena, "legendZelena", [80, 70, 60, 59]);

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

//default vrstva
inD.addTo(map);
let aktivniVrstva = inD;

//přidání průhledné vrstvy nad vrstvy indexu 
pruhlednaVrstva.addTo(map)

//default legenda
let legendContainer = document.getElementById('legenda1');
legendContainer.innerHTML = legendModra;

//měřítko
L.control.scale({
	position:'bottomright',
	metric: true, 
	imperial: false
}).addTo(map);

//ovládání legendy a vrstev v sidebaru
function addlay(style,legenda,stupnice){
	//ovladani legendy
	legendContainer.innerHTML = '<div></div>';
	legendContainer = document.getElementById(legenda);
	legendContainer.innerHTML = stupnice;
	
	//ovladani vrstev
	aktivniVrstva.setStyle(style);
};

//ovládání podkladových map
let nevim;
OSM_podklad.addTo(map);
function addBase(){
	nevim = document.getElementById("OSM");
	if (nevim.checked == 1){
	OSM_podklad.addTo(map);
	}else{
		OSM_podklad.removeFrom(map);
	}
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




