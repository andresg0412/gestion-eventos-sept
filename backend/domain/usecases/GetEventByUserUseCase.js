class GetEventByUserUseCase {

    execute({ userId }) {
        return Event.findAll({ where: { createdBy: userId } });
    }

}

module.exports = GetEventByUserUseCase