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
    colorscalerange: '23,32',
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
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=temp_sur&colorscalerange=23,32&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

// Read L1 NYBIGHT outputs

//var nybWMS = "http://geoport.whoi.edu/thredds/wms/vortexfs1/usgs/Projects/NOPP_forecast/NYBight/nyb_qck.nc"
var nybWMS = "http://icoast.rc.ufl.edu/thredds/wms/coawst/L1/GOMSAB_2km/qck/GOMSAB_2km_qck_best.ncd"

var nybWLLayer = L.tileLayer.wms(nybWMS, {
    layers: 'zeta',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-2.5,2.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var nybWHLayer = L.nonTiledLayer.wms(nybWMS, {
    layers: 'Hwave',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,5.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var nybSSLayer = L.nonTiledLayer.wms(nybWMS, {
    layers: 'salt_sur',
    format: 'image/png',
    transparent: true,
    colorscalerange: '15,37',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});
var nybSTLayer = L.nonTiledLayer.wms(nybWMS, {
    layers: 'temp_sur',
    format: 'image/png',
    transparent: true,
    colorscalerange: '23,32',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var proxy = 'server/proxy.php';
var nybWLTimeLayer = L.timeDimension.layer.wms(nybWLLayer, {
    proxy: proxy,
    updateTimeDimension: false
});

var nybWHTimeLayer = L.timeDimension.layer.wms(nybWHLayer, {
    proxy: proxy
});

var nybSSTimeLayer = L.timeDimension.layer.wms(nybSSLayer, {
    proxy: proxy
});

var nybSTTimeLayer = L.timeDimension.layer.wms(nybSTLayer, {
    proxy: proxy
});

var nybLegend = L.control({
    position: 'bottomright'
});

nybLegend.onAdd = function(map) {
    var src = nybWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zeta&colorscalerange=-2.5,2.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var nybWHLegend = L.control({
    position: 'bottomleft'
});
nybWHLegend.onAdd = function(map) {
    var src = nybWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=Hwave&colorscalerange=0,5.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var nybSSLegend = L.control({
    position: 'bottomleft'
});
nybSSLegend.onAdd = function(map) {
    var src = nybWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=salt_sur&colorscalerange=15,37&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
var nybSTLegend = L.control({
    position: 'bottomright'
});
nybSTLegend.onAdd = function(map) {
    var src = nybWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=temp_sur&colorscalerange=23,32&PALETTE=rainbow";
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
    colorscalerange: '23,32',
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
    var src = gomsabWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=temp_sur&colorscalerange=23,32&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

// Read L1 GOMSAB MAX outputs

var gomsabWMS_max = "http://icoast.rc.ufl.edu/thredds/wms/coawst/L1/GOMSAB_2km/max/GOMSAB_2km_max_best.ncd"

var gomsabWLmaxLayer = L.tileLayer.wms(gomsabWMS_max, {
    layers: 'zeta_max',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-1.5,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var gomsabWHmaxLayer = L.nonTiledLayer.wms(gomsabWMS_max, {
    layers: 'Hmax',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,5.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

//var gomsabWLmaxTimeLayer = L.timeDimension.layer.wms(gomsabWLmaxLayer, {
//    proxy: proxy,
//    updateTimeDimension: false
//});

//var gomsabWHmaxTimeLayer = L.timeDimension.layer.wms(gomsabWHmaxLayer, {
//    proxy: proxy
//});

var gomsabWLmaxLegend = L.control({
    position: 'bottomright'
});

gomsabWLmaxLegend.onAdd = function(map) {
    var src = gomsabWMS_max + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zeta_max&colorscalerange=-1.5,1.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
var gomsabWHmaxLegend = L.control({
    position: 'bottomleft'
});
gomsabWHmaxLegend.onAdd = function(map) {
    var src = gomsabWMS_max + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=Hmax&colorscalerange=0,5.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

// Plot all in map

var overlayMaps = {
    "L0- water levels": sapoWLTimeLayer,
//    "L0- Hm0": sapoWHTimeLayer,
    "L0- SSS": sapoSSTimeLayer,
    "L0- SST": sapoSTTimeLayer,
//    "L1- NYB - water levels": nybWLTimeLayer,
//    "L1- NYB - Hm0": nybWHTimeLayer,
//    "L1- NYB - SSS": nybSSTimeLayer,
//    "L1- NYB - SST": nybSTTimeLayer,
    "L1- GOMSAB - water levels": gomsabWLTimeLayer,
    "L1- GOMSAB - Hm0": gomsabWHTimeLayer,
    "L1- GOMSAB - SSS": gomsabSSTimeLayer,
    "L1- GOMSAB - SST": gomsabSTTimeLayer,
//   "L1- NYB - zeta_max": nybWLmaxLayer,
//    "L1- NYB - Hm0_max": nybWHmaxLayer,
    "L1- GOMSAB - zeta_max": gomsabWLmaxLayer,
    "L1- GOMSAB - Hm0_max": gomsabWHmaxLayer
};

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'L0- water levels') {
        sapoLegend.addTo(this);
//    } else if (eventLayer.name == 'L0- Hm0') {
//        sapoWHLegend.addTo(this);
    } else if (eventLayer.name == 'L0- SSS') {
        sapoSSLegend.addTo(this);
    } else if (eventLayer.name == 'L0- SST') {
        sapoSTLegend.addTo(this);
//    } else if (eventLayer.name == 'L1- NYB - water levels') {
//        nybLegend.addTo(this);
//    } else if (eventLayer.name == 'L1- NYB - Hm0') {
//        nybWHLegend.addTo(this);
//    } else if (eventLayer.name == 'L1- NYB - SSS') {
//        nybSSLegend.addTo(this);
//    } else if (eventLayer.name == 'L1- NYB - SST') {
//        nybSTLegend.addTo(this);
    } else if (eventLayer.name == 'L1- GOMSAB - water levels') {
        gomsabLegend.addTo(this);
    } else if (eventLayer.name == 'L1- GOMSAB - Hm0') {
        gomsabWHLegend.addTo(this);
    } else if (eventLayer.name == 'L1- GOMSAB - SSS') {
        gomsabSSLegend.addTo(this);
    } else if (eventLayer.name == 'L1- GOMSAB - SST') {
        gomsabSTLegend.addTo(this);
//    } else if (eventLayer.name == 'L1- NYB - zeta_max') {
//        nybWLmaxLegend.addTo(this);
//    } else if (eventLayer.name == 'L1- NYB - Hm0_max') {
//        nybWHmaxLegend.addTo(this);
    } else if (eventLayer.name == 'L1- GOMSAB - zeta_max') {
        gomsabWLmaxLegend.addTo(this);
    } else if (eventLayer.name == 'L1- GOMSAB - Hm0_max') {
        gomsabWHmaxLegend.addTo(this);
    }
});

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'L0- water levels') {
        map.removeControl(sapoLegend);
//    } else if (eventLayer.name == 'L0- Hm0') {
//        map.removeControl(sapoWHLegend);
    } else if (eventLayer.name == 'L0- SSS') {
        map.removeControl(sapoSSLegend);
    } else if (eventLayer.name == 'L0- SST') {
        map.removeControl(sapoSTLegend);
//    } else if (eventLayer.name == 'L1- NYB - water levels') {
//        map.removeControl(nybLegend);
//    } else if (eventLayer.name == 'L1- NYB - Hm0') {
//        map.removeControl(nybWHLegend);
//    } else if (eventLayer.name == 'L1- NYB - SSS') {
//        map.removeControl(nybSSLegend);
//    } else if (eventLayer.name == 'L1- NYB - SST') {
//        map.removeControl(nybSTLegend); 
    } else if (eventLayer.name == 'L1- GOMSAB - water levels') {
        map.removeControl(gomsabLegend);
    } else if (eventLayer.name == 'L1- GOMSAB - Hm0') {
        map.removeControl(gomsabWHLegend);
    } else if (eventLayer.name == 'L1- GOMSAB - SSS') {
        map.removeControl(gomsabSSLegend);
    } else if (eventLayer.name == 'L1- GOMSAB - SST') {
        map.removeControl(gomsabSTLegend);
//    } else if (eventLayer.name == 'L1- NYB - zeta_max') {
//        map.removeControl(nybWLmaxLegend);
//    } else if (eventLayer.name == 'L1- NYB - Hm0_max') {
//        map.removeControl(nybWHmaxLegend);
    } else if (eventLayer.name == 'L1- GOMSAB - zeta_max') {
        map.removeControl(gomsabWLmaxLegend);
    } else if (eventLayer.name == 'L1- GOMSAB - Hm0_max') {
        map.removeControl(gomsabWHmaxLegend);
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
