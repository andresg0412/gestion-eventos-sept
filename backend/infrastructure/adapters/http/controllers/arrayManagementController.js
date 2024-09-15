class ArrayManagementController {
    constructor(ArrayManagementUseCase) {
        this.ArrayManagementUseCase = ArrayManagementUseCase;
    }

    async processArray(req, res) {
        try {
            const result = await this.ArrayManagementUseCase.processArray(req);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}

module.exports = ArrayManagementController;