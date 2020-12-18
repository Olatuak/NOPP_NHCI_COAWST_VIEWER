var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

//var today = new Date();
//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//var dateTime = date+'T'+time+'Z';
//var date_end = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+2);

var map = L.map('map', {
    zoom: 10,
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
        timeInterval: "2020-11-25/2020-11-26",
        period: "PT1H",
        currentTime: Date.parse("2020-11-25T12:00:00Z")
        //currentTime: Date.parse(dateTime)
    },
    center: [29.8, -81.2]
});

var sapoWMS = "https://icoast.rc.ufl.edu/thredds/wms/roms_his_agg/AGG_ROMS_HIS.nc";
var sapoHeightLayer = L.tileLayer.wms(sapoWMS, {
    layers: 'zeta',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-1.5,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});

var sapoMeanDirectionLayer = L.nonTiledLayer.wms(sapoWMS, {
    layers: 'Hwave',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,3',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
});



var proxy = 'server/proxy.php';
var sapoHeightTimeLayer = L.timeDimension.layer.wms(sapoHeightLayer, {
    proxy: proxy,
    updateTimeDimension: false
});

var sapoMeanDirectionTimeLayer = L.timeDimension.layer.wms(sapoMeanDirectionLayer, {
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
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=zeta&colorscalerange=-1.5,1.5";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};



var sapoMeanDirectionLegend = L.control({
    position: 'bottomright'
});
sapoMeanDirectionLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

/*var sapoPeakDirectionLegend = L.control({
    position: 'bottomright'
});
sapoPeakDirectionLegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<img src="img/grey-arrow.png" /> peak direction';
    return div;
};
*/


var overlayMaps = {
    "Icoast - water level": sapoHeightTimeLayer,
    "Icoast - significant wave height": sapoMeanDirectionTimeLayer
//    "SAPO - direction of the peak": sapoPeakDirectionTimeLayer
};



map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'Icoast - water level') {
        sapoLegend.addTo(this);
    } else if (eventLayer.name == 'Icoast - Significant Wave Height') {
        sapoMeanDirectionLegend.addTo(this);
//    } else if (eventLayer.name == 'SAPO - direction of the peak') {
//        sapoPeakDirectionLegend.addTo(this);
    }
});

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'Icoast - water level') {
        map.removeControl(sapoLegend);
    } else if (eventLayer.name == 'Icoast - Significant Wave Height') {
        map.removeControl(sapoMeanDirectionLegend);
//    } else if (eventLayer.name == 'SAPO - direction of the peak') {
//        map.removeControl(sapoPeakDirectionLegend);
    }
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);

sapoHeightTimeLayer.addTo(map);
//sapoPeakDirectionTimeLayer.addTo(map);
//sapoMeanDirectionTimeLayer.addTo(map);