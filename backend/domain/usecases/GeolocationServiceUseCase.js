class GeolocationServiceUseCase {
    constructor(GeolocationRepository, ConnetAPIMapbox) {
        this.ConnetAPIMapbox = ConnetAPIMapbox;
        this.GeolocationRepository = GeolocationRepository;
    }

    async getNearbyLocations(eventId) {
        try {
            const result = await this.GeolocationRepository.getEventLocation(eventId);

            if (!result) {
                return { status: 404, body: { message: 'Evento no encontrado' } };
            }
            
            const coordinates = await this.ConnetAPIMapbox.getCoordinates(result.location);

            const nearbyLocations = await this.ConnetAPIMapbox.getNearbyLocations(coordinates.features[0].center[1], coordinates.features[0].center[0]);

            return { status: 200, body: nearbyLocations };
        } catch (error) {
            return { status: 500, body: { message: 'Error al obtener ubicaciones cercanas' } };
        }
    }
}
module.exports = GeolocationServiceUseCase;