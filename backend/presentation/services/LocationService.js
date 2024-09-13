const LocationUseCase = require('../../usecases/LocationServiceUseCase');
const LocationRepository = require('../../domain/repositories/LocationRepository');

class PresentationLocationService {
    constructor() {
        this.LocationRepository = new LocationRepository();
        this.LocationUseCase = new LocationUseCase(this.LocationRepository);
    }

    getNearbyLocations(lat, lon) {
        return this.LocationUseCase.getNearbyLocations(lat, lon);
    }
}

module.exports = PresentationLocationService;