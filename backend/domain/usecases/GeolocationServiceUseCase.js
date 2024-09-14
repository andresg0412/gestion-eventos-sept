class GeolocationServiceUseCase {
    constructor(GeolocationRepository, ConnetAPIMapbox) {
        this.ConnetAPIMapbox = ConnetAPIMapbox;
        this.GeolocationRepository = GeolocationRepository;
    }

    async getNearbyLocations(eventId) {
        try {
            const result = await this.GeolocationRepository.getEventLocation(eventId);
            
            const coordinates = await this.ConnetAPIMapbox.getCoordinates(result.location);

            const nearbyLocations = await this.ConnetAPIMapbox.getNearbyLocations(coordinates.features[0].center[1], coordinates.features[0].center[0]);

            return { status: 200, body: nearbyLocations };
        } catch (error) {
            return { status: 500, body: 'Error obteniendo ubicaciones cercanas' };
        }
    }
}

module.exports = GeolocationServiceUseCase;