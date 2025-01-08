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
		return 	d > 80 ? 				'#2362a2' :
				d > 60 && d < 80 ? 		'#337fc4' :
				d > 40 && d < 60 ? 		'#599bd7' :
				d < 40  ? 				'#93bde6' :
										'#93bde6' ;
	};	

	function getColorOranzova(d) {
		return 	d > 80 ? 				'#C76300' :
				d > 60 && d < 80 ? 		'#DB8543' :
				d > 40 && d < 60 ? 		'#EEB086' :
				d < 40  ? 				'#F9D2B9' :
										'#F9D2B9' ;
	};

	function getColorZelena(d) {
		return 	d > 80 ? 				'#008040' :
				d > 60 && d < 80 ? 		'#499861' :
				d > 40 && d < 60 ? 		'#82B78F' :
				d < 40  ? 				'#B2D3B9' :
										'#B2D3B9' ;
	};

	function getColorFialova(d) {
		return 	d > 80 ? '#800080' :
				d > 60 ? '#973E95' :
				d > 40 ? '#AE66AA' :
				d < 40 ? '#C187BC' :
						 '#C187BC' ;
	};

//definování stylu vrstev
function indexD(feature) {
	return {
		fillColor: getColorModra(feature.properties.test),
		weight: 2,
		opacity: 0.5,
		color: 'white',
		fillOpacity: 0.7
	};
};


	function index1(feature) {
		return {
			fillColor: getColorOranzova(feature.properties.test2),
			weight: 2,
			opacity: 0.5,
			color: 'white',
			fillOpacity: 0.7
		};
	};

	function index2(feature) {
		return {
			fillColor: getColorZelena(feature.properties.test3),
			weight: 2,
			opacity: 0.5,
			color: 'white',
			fillOpacity: 0.7
		};
	};

	function index3(feature) {
		return {
			fillColor: getColorFialova(feature.properties.test4),
			weight: 2,
			opacity: 0.5,
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

//funkce na zvýraznění polygonů + definice toho způsobu zvýraznění
function highlightFeature(feature, layer, attribute) {
    if (feature.properties[attribute] == 1) {
        layer.setStyle({
            fillColor: '#d6d64b',
			weight: 2,
			color: "white",
            opacity: 0.5,
            fillOpacity: 1
        });
		layer.bringToFront(); 
    } else {
        layer.setStyle(defaultStyle);
    }
};

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

//vytvoření vrstev
	let inD = new L.GeoJSON.AJAX("data/kraje.geojson", {style: indexD, onEachFeature: vypisPopupu});
/*	
	let in1 = new L.GeoJSON.AJAX("data/kraje.geojson", {style: index1, onEachFeature: vypisPopupu});
	let in2 = new L.GeoJSON.AJAX("data/kraje.geojson", {style: index2, onEachFeature: vypisPopupu});
	let in3 = new L.GeoJSON.AJAX("data/kraje.geojson", {style: index3, onEachFeature: vypisPopupu});
*/
	
//generování legendy
const grades = [80, 60, 40, 40];

function generateLegend(getColorFunction, legendName) {
    let legend = `<div class="info legend">`;

    for (let i = 0; i < grades.length; i++) {
        const from = grades[i];
        
        if (i === grades.length - 1) {
            // Poslední interval: méně než
            legend += `<i style="background:${getColorFunction(from)}"></i> méně než ${from}<br>`;
        } else {
            // Ostatní intervaly: více než
            legend += `<i style="background:${getColorFunction(from + 1)}"></i> ${from} a více <br>`;
        }
    }

    legend += '</div>';
    return legend;
}

const legendModra = generateLegend(getColorModra, "legendModra");
const legendFialova = generateLegend(getColorFialova, "legendFialova");
const legendOranzova = generateLegend(getColorOranzova, "legendOranzova");
const legendZelena = generateLegend(getColorZelena, "legendZelena");

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

//popup


function vypisPopupu(feature, layer) {  
	let popupContent = `<b>${feature.properties.text}</b>` + 
	`<br>Hodnota celkového indexu: ${feature.properties.test}` +
	`<br>Hodnota indexu za oblast 1: ${feature.properties.test2}` +
	`<br>Hodnota indexu za oblast 2: ${feature.properties.test3}` +
	`<br>Hodnota indexu za oblast 3: ${feature.properties.test4}`;

	layer.bindPopup(popupContent); 

	let	vypisKraj = `<h3>${feature.properties.text}</h3>`;
	if (feature.properties.web_kraje) {
	vypisKraj += `<a href="${feature.properties.web_kraje}" target="_blank">Web kraje</a> <br>`}
	if (feature.properties.j_platebni_portal_web) {
	vypisKraj += `<a href="${feature.properties.j_platebni_portal_web}" target="_blank">Platební portál</a> <br>`}
	if (feature.properties.properties.j_IDS_web) {
	vypisKraj += `<a href="${feature.properties.j_IDS_web}" target="_blank">Integrovaný dopravní systém</a> <br>`}
	if (feature.properties.j_rozklikavaci_rozpocet_web) {
	vypisKraj += `<a href="${feature.properties.j_rozklikavaci_rozpocet_web}" target="_blank">Rozklikávací rozpočet</a> <br>`}
	if (feature.properties.j_GEOportal_web) {
	vypisKraj += `<a href="${feature.properties.j_GEOportal_web}" target="_blank">GEOportál</a> <br>`};

	layer.on('click', (e) => {
        // Změna obsahu v elementu s ID "infoKraj"
        const infoElement = document.getElementById('infoKraj');
        if (infoElement) {
            infoElement.innerHTML = vypisKraj;
        }});
};




