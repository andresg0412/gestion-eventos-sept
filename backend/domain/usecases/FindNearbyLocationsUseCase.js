class FindNearbyLocationsUseCase {

    execute({ latitude, longitude, radius }) {
        return Event.findAll({ where: { location: { [Op.and]: { [Op.gte]: [latitude - radius, longitude - radius], [Op.lte]: [latitude + radius, longitude + radius] } } } });
    }

}

module.exports = FindNearbyLocationsUseCase