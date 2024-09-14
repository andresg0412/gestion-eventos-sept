class GeolocationController {
    constructor(GeolocationServiceUseCase) {
        this.GeolocationServiceUseCase = GeolocationServiceUseCase;
    }

    async getNearbyLocations(req, res) {
        try {
            const { eventId } = req.body;
            if(!eventId){
                throw { status: 400, body: { message: 'Event id is required' } };
            }
            const result = await this.GeolocationServiceUseCase.getNearbyLocations(eventId);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}

module.exports = GeolocationController;