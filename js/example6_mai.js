//var startDate = new Date();
//startDate.setUTCHours(0, 0, 0, 0);

//var today = new Date();
//var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//var dateTime = date+'T'+time+'Z';
//var date_end = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+2);
//var time_int = '2021-02-23:06:00Z/'+date+':06:00Z';

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
        timeInterval: "2021-02-23:06:00Z/2021-02-25:06:00Z",
        //timeInterval: time_int,
        period: "PT1H",
        currentTime: Date.parse("2021-02-24T06:00:00Z")
        //currentTime: Date.parse(dateTime)
    },
    center: [29.8, -81.2]
});

//var sapoWMS = "https://icoast.rc.ufl.edu/thredds/wms/roms_his_agg/AGG_ROMS_HIS.nc";
var sapoWMS = "https://icoast.rc.ufl.edu/thredds/wms/coawst/gtm/forecast/GTM_FORECAST_best.ncd";

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
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zeta&colorscalerange=-1.5,1.5&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var sapoMeanDirectionLegend = L.control({
    position: 'bottomleft'
});
sapoMeanDirectionLegend.onAdd = function(map) {
    var src = sapoWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=Hwave&colorscalerange=0,3&PALETTE=rainbow";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};

var overlayMaps = {
    "Icoast - water levels": sapoHeightTimeLayer,
    "Icoast - wave height": sapoMeanDirectionTimeLayer
};

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'Icoast - water levels') {
        sapoLegend.addTo(this);
    } else if (eventLayer.name == 'Icoast - wave height') {
        sapoMeanDirectionLegend.addTo(this);
    }
});

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'Icoast - water levels') {
        map.removeControl(sapoLegend);
    } else if (eventLayer.name == 'Icoast - wave height') {
        map.removeControl(sapoMeanDirectionLegend);
    }
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);

sapoHeightTimeLayer.addTo(map);
sapoPeakDirectionTimeLayer.addTo(map);
