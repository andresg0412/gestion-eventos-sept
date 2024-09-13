const mapboxToken = process.env.MAPBOX_TOKEN;

class LocationService {
    async getNearbyLocations(lat, lon) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxToken}&limit=5`;
        const response = await fetch(url);
        const data = await response.json();
        return data.features.map(feature => ({
            name: feature.place_name,
            lat: feature.center[1],
            lon: feature.center[0]
        }));

    }
}

module.exports = LocationService