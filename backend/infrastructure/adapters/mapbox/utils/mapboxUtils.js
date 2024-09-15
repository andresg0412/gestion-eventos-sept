class MapboxUtils {

    static async formatMapboxResponse(response) {
        const formattedReponse = response.features.map(feature => ({
            name: feature.text,
            placeName: feature.place_name,
            address: feature.properties.address || '',
            category: feature.properties.category || '',
            foursquareId: feature.properties.foursquare || '',
            coordinates: feature.geometry.coordinates.reverse().join(', '),
            relevance: feature.relevance,
            landmark: feature.properties.landmark || false
        }));

        return formattedReponse;
    }
}

module.exports = MapboxUtils;