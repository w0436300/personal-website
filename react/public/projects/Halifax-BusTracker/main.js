//create map in leaflet and tie it to the div called 'theMap'
const map = L.map('theMap').setView([44.650627, -63.597140], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([44.650690, -63.596537]).addTo(map)
//     .bindPopup('This is a sample popup. You can put any html structure in this including extra bus data. You can also swap this icon out for a custom icon. A png file has been provided for you to use if you wish.')
//     .openPopup();

let busIcon = L.icon({
        iconUrl: 'bus.png',
        iconSize: [27, 27], // size of the icon
        iconAnchor: [13, 27], // point of the icon which will correspond to marker's location
        popupAnchor: [1, -28], // point from which the popup should open relative to the iconAnchor
    });
    
let markersLayer;

async function busData() {
    try{
    const response = await fetch('https://prog2700.onrender.com/hrmbuses');
    const data = await response.json();

    if (markersLayer) {
        map.removeLayer(markersLayer); // Clear existing markers
    }


    const FeatureCollection = {
        type: "FeatureCollection",
        features:[]
    };
    

    data.entity.forEach(entity => {
        const routeId = parseInt(entity.vehicle.trip.routeId,10)
        
        if(routeId <= 10){
        const feature = {
            type: "Feature",
            properties:{
                uniqueId: entity.id,
                tripId: entity.vehicle.trip.tripId,
                startDate: entity.vehicle.trip.startDate,
                routeId: entity.vehicle.trip.routeId,
                speed: entity.vehicle.position.speed,
                bearing: entity.vehicle.position.bearing,
                vehicleId: entity.vehicle.vehicle.id,
                label: entity.vehicle.vehicle.label        
            } ,
            geometry: {
                coordinates: [
                    entity.vehicle.position.longitude,
                    entity.vehicle.position.latitude
                  ],
                  type: "Point",
            } 
        }
        FeatureCollection.features.push(feature)
        }
    });

    //add geoJson to the map
    markersLayer = L.geoJSON(FeatureCollection,{
        pointToLayer: function(geoJsonPoint, latlng){
            return L.marker(latlng,{
                icon: busIcon,
                rotationAngle:geoJsonPoint.properties.bearing
             })
        },
        onEachFeature: function(feature, layer){
            if(feature.properties){
                const popupContent = 
                `Unique ID: ${feature.properties.uniqueId}<br>
                Trip ID: ${feature.properties.tripId}<br>
                Star Date: ${feature.properties.startDate}<br>
                Route ID: ${feature.properties.routeId}<br>
                speed: ${parseInt(feature.properties.speed)}<br>
                Bearing: ${feature.properties.bearing}<br>
                Vehicle ID: ${feature.properties.vehicleId}<br>
                Label: ${feature.properties.label}<br>
                `
                layer.bindPopup(popupContent);
            }
        }
       
    }).addTo(map);
} catch(error){
    console.error('Failed', error)
}

} 

busData();
setInterval(busData, 15000);
