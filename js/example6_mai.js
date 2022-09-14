var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

var today = new Date();
//today.setDate(today.getDate()); 
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+'T'+time+'Z';


var today5 = new Date();
var numberOfDaysToAdd = 5;
today5.setDate(today5.getDate() + numberOfDaysToAdd); 
var date5 = today5.getFullYear()+'-'+(today5.getMonth()+1)+'-'+today5.getDate();
var TimeInt = date+'/'+date5;

//var TimeInt = date+':00:00:00Z/'+date5+':00:00:00Z';

var map = L.map('map', {
    //zoom: 10,
    zoom: 5.0,
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
        currentTime: Date.parse(date)
    },
    //center: [29.8, -81.2]
    center: [30.00, -75.975]
});

var sapoWMS = "http://icoast.rc.ufl.edu/thredds/wms/coawst/L0/forecast_qck/NHCI_L0_QCK_best.ncd"

var sapoWLLayer = L.tileLayer.wms(sapoWMS, {
    layers: 'zeta',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-1.5,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

/*
var sapoWHLayer = L.nonTiledLayer.wms(sapoWMS, {
    layers: 'Hwave',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,5.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});
*/

var sapoSSLayer = L.nonTiledLayer.wms(sapoWMS, {
    layers: 'salt_sur',
    format: 'image/png',
    transparent: true,
    colorscalerange: '15,37',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});
var sapoSTLayer = L.nonTiledLayer.wms(sapoWMS, {
    layers: 'temp_sur',
    format: 'image/png',
    transparent: true,
    colorscalerange: '23,37',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});


var proxy = 'server/proxy.php';
var sapoWLTimeLayer = L.timeDimension.layer.wms(sapoWLLayer, {
    proxy: proxy,
    updateTimeDimension: false
});

/*
var sapoWHTimeLayer = L.timeDimension.layer.wms(sapoWHLayer, {
    proxy: proxy
});
*/

var sapoSSTimeLayer = L.timeDimension.layer.wms(sapoSSLayer, {
    proxy: proxy
});
var sapoSTTimeLayer = L.timeDimension.layer.wms(sapoSTLayer, {
    proxy: proxy
});

var sapoLegend = L.control({
    position: 'bottomright'
});

sapoLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zeta&colorscalerange=-1.5,1.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

/*
var sapoWHLegend = L.control({
    position: 'bottomleft'
});
sapoWHLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=Hwave&colorscalerange=0,5.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
*/

var sapoSSLegend = L.control({
    position: 'bottomleft'
});
sapoSSLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=salt_sur&colorscalerange=15,37&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
var sapoSTLegend = L.control({
    position: 'bottomright'
});
sapoSTLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=temp_sur&colorscalerange=23,37&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

// Read L1 GOMSAB outputs

var gomsabWMS = "http://icoast.rc.ufl.edu/thredds/wms/coawst/L1/GOMSAB_2km/qck/GOMSAB_2km_qck_best.ncd"

var gomsabWLLayer = L.tileLayer.wms(gomsabWMS, {
    layers: 'zeta',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-1.5,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var gomsabWHLayer = L.nonTiledLayer.wms(gomsabWMS, {
    layers: 'Hwave',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,5.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var gomsabSSLayer = L.nonTiledLayer.wms(gomsabWMS, {
    layers: 'salt_sur',
    format: 'image/png',
    transparent: true,
    colorscalerange: '15,37',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});
var gomsabSTLayer = L.nonTiledLayer.wms(gomsabWMS, {
    layers: 'temp_sur',
    format: 'image/png',
    transparent: true,
    colorscalerange: '23,37',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});


var proxy = 'server/proxy.php';
var gomsabWLTimeLayer = L.timeDimension.layer.wms(gomsabWLLayer, {
    proxy: proxy,
    updateTimeDimension: false
});

var gomsabWHTimeLayer = L.timeDimension.layer.wms(gomsabWHLayer, {
    proxy: proxy
});

var gomsabSSTimeLayer = L.timeDimension.layer.wms(gomsabSSLayer, {
    proxy: proxy
});

var gomsabSTTimeLayer = L.timeDimension.layer.wms(gomsabSTLayer, {
    proxy: proxy
});

var gomsabLegend = L.control({
    position: 'bottomright'
});

gomsabLegend.onAdd = function(map) {
    var src = gomsabWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zeta&colorscalerange=-1.5,1.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};


var gomsabWHLegend = L.control({
    position: 'bottomleft'
});
gomsabWHLegend.onAdd = function(map) {
    var src = gomsabWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=Hwave&colorscalerange=0,5.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var gomsabSSLegend = L.control({
    position: 'bottomleft'
});
gomsabSSLegend.onAdd = function(map) {
    var src = gomsabWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=salt_sur&colorscalerange=15,37&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
var gomsabSTLegend = L.control({
    position: 'bottomright'
});
gomsabSTLegend.onAdd = function(map) {
    var src = gomsabWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=temp_sur&colorscalerange=23,37&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

// Plot all in map

var overlayMaps = {
    "Coawst L0 - water levels": sapoWLTimeLayer,
//    "Icoast - wave height": sapoWHTimeLayer,
    "Coawst L0 - surface salinity": sapoSSTimeLayer,
    "Coawst L0 - surface temperature": sapoSTTimeLayer,
    "Coawst L1- GOMSAB - water levels": gomsabWLTimeLayer,
    "Coawst L1- GOMSAB - wave height": gomsabWHTimeLayer,
    "Coawst L1- GOMSAB - surface salinity": gomsabSSTimeLayer,
    "Coawst L1- GOMSAB - surface temperature": gomsabSTTimeLayer
};

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'Coawst L0 - water levels') {
        sapoLegend.addTo(this);
//    } else if (eventLayer.name == 'Icoast - wave height') {
//        sapoWHLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst L0 - surface salinity') {
        sapoSSLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst L0 - surface temperature') {
        sapoSTLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst L1- GOMSAB - water levels') {
        sapoSSLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst L1- GOMSAB - wave height') {
        sapoSTLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst L1- GOMSAB - surface salinity') {
        sapoSSLegend.addTo(this);
    } else if (eventLayer.name == 'Coawst L1- GOMSAB - surface temperature') {
        sapoSTLegend.addTo(this);
    }
});

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'Coawst L0 - water levels') {
        map.removeControl(sapoLegend);
//    } else if (eventLayer.name == 'Icoast - wave height') {
//        map.removeControl(sapoWHLegend);
    } else if (eventLayer.name == 'Coawst L0 - surface salinity') {
        map.removeControl(sapoSSLegend);
    } else if (eventLayer.name == 'Coawst L0 - surface temperature') {
        map.removeControl(sapoSTLegend);
} else if (eventLayer.name == 'Coawst L1-GOMSAB - water levels') {
        map.removeControl(sapoSSLegend);
//    } else if (eventLayer.name == 'COAWST L1-GOMSAB - wave height') {
//        map.removeControl(gomsabWHLegend);
    } else if (eventLayer.name == 'Coawst L1-GOMSAB - surface salinity') {
        map.removeControl(sapoSSLegend);
    } else if (eventLayer.name == 'Coawst L1-GOMSAB - surface temperature') {
        map.removeControl(sapoSTLegend);
    }
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);

/*
sapoWLTimeLayer.addTo(map);
sapoWHTimeLayer.addTo(map);
sapoSSTimeLayer.addTo(map);
*/

/*sapoSSTimeLayer.addTo(map);*/
sapoWLTimeLayer.addTo(map);
