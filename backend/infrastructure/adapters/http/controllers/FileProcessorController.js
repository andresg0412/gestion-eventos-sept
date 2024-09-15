class FileProcessorController {
    constructor(FileProcessorUseCase) {
        this.FileProcessorUseCase = FileProcessorUseCase;
    }

    async uploadEvents(req, res) {
        try {
            if (!req.file) {
                throw { status: 400, body: { message: 'Archivo no encontrado' } };
            }
            const result = await this.FileProcessorUseCase.uploadEvents(req);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }

    async uploadAttendees(req, res) {
        try {
            const { userId } = req.body;
            if (!userId) {
                throw { status: 400, body: { message: 'Se requiere un usuario de sistema para registrar asistentes' } };
            }
            if (!req.file) {
                throw { status: 400, body: { message: 'Archivo no encontrado' } };
            }
            const result = await this.FileProcessorUseCase.uploadAttendees(req);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}
module.exports = FileProcessorController;