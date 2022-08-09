var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

var today = new Date();
//today.setDate(today.getDate()); 
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+'T'+time+'Z';


var today5 = new Date();
var numberOfDaysToAdd = 3;
today5.setDate(today5.getDate() + numberOfDaysToAdd); 
var date5 = today5.getFullYear()+'-'+(today5.getMonth()+1)+'-'+today5.getDate();
var TimeInt = date+'/'+date5;

//var TimeInt = date+':00:00:00Z/'+date5+':00:00:00Z';

var map = L.map('map', {
    //zoom: 10,
    zoom: 9.4,
    fullscreenControl: true,
    timeDimensionControl: true,
    timeDimensionControlOptions: {
        position: 'bottomleft',
        playerOptions: {
            transitionTime: 1000,
        }
    },
    timeDimension: true,
    timeDimensionOptions: {
        //timeInterval: "2021-06-11:00:00Z/2021-06-31:00:00Z",
        timeInterval: TimeInt,
        period: "PT1H",
        //currentTime: Date.parse(someDate)
        currentTime: Date.parse(date)
    },
    //center: [29.8, -81.2]
    center: [26.73, -81.975]
});

//var sapoWMS = "https://icoast.rc.ufl.edu/thredds/wms/roms_his_agg/AGG_ROMS_HIS.nc";
// var sapoWMS = "https://icoast.rc.ufl.edu/thredds/wms/coawst/gtm/forecast/GTM_FORECAST_best.ncd";
var sapoWMS= "http://icoast.rc.ufl.edu/thredds/wms/coawst_L0/L0_his_20220809.nc";

var sapoWLLayer = L.tileLayer.wms(sapoWMS, {
    layers: 'zeta',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-0.4,0.4',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var sapoSSLayer = L.nonTiledLayer.wms(sapoWMS, {
    layers: 'salt',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,35',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var sapoSTLayer = L.nonTiledLayer.wms(sapoWMS, {
    layers: 'temp',
    format: 'image/png',
    transparent: true,
    colorscalerange: '23,30',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var proxy = 'server/proxy.php';
var sapoWLTimeLayer = L.timeDimension.layer.wms(sapoWLLayer, {
    proxy: proxy,
    updateTimeDimension: false
});

var sapoWHTimeLayer = L.timeDimension.layer.wms(sapoWHLayer, {
    proxy: proxy
});

var sapoSSTimeLayer = L.timeDimension.layer.wms(sapoSSLayer, {
    proxy: proxy
});

var sapoSTTimeLayer = L.timeDimension.layer.wms(sapoSTLayer, {
    proxy: proxy
});

/*
var sapoPeakDirectionTimeLayer = L.timeDimension.layer.wms(sapoPeakDirectionLayer, {
    proxy: proxy
});
*/

var sapoLegend = L.control({
    position: 'bottomright'
});

sapoLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zeta&colorscalerange=-0.4,0.4&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var sapoSSLegend = L.control({
    position: 'bottomleft'
});

sapoSSLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=salt&colorscalerange=0,35&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var sapoSTLegend = L.control({
    position: 'bottomright'
});

sapoSTLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=temp&colorscalerange=23,30&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var overlayMaps = {
    "Coawst - water levels": sapoWLTimeLayer,
    "Coawst - surface salinity": sapoSSTimeLayer,
    "Coawst - surface temperature": sapoSTTimeLayer
};

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'Coawst - water levels') {
        sapoLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst - surface salinity') {
        sapoSSLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst - surface temperature') {
        sapoSTLegend.addTo(this);
    }
});

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'Coawst - water levels') {
        map.removeControl(sapoLegend);
	} else if (eventLayer.name == 'Coawst - surface salinity') {
        map.removeControl(sapoSSLegend);
	} else if (eventLayer.name == 'Coawst - surface temperature') {
        map.removeControl(sapoSTLegend);
    }
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);

/*
sapoWLTimeLayer.addTo(map);
sapoSSTimeLayer.addTo(map);
*/

/*sapoSSTimeLayer.addTo(map);*/
sapoWLTimeLayer.addTo(map);


