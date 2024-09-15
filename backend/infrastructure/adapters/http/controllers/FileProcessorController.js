class FileProcessorController {
    constructor(FileProcessorUseCase) {
        this.FileProcessorUseCase = FileProcessorUseCase;
    }

    async uploadEvents(req, res) {
        try {
            if (!req.file) {
                throw { status: 400, body: { message: 'File not found' } };
            }
            const result = await this.FileProcessorUseCase.uploadEvents(req);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}
module.exports = FileProcessorController;