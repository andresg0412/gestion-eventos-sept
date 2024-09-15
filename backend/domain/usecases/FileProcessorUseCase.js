const FileProcessorUtils = require('../utils/FileProcessorUtils');
class FileProcessorUseCase {
    constructor(FileProcessorRepository) {
        this.FileProcessorRepository = FileProcessorRepository;
    }

    async uploadEvents(req) {
        try {
            const filePath = req.file;
            const result = await FileProcessorUtils.importEvents(filePath);
            
            const upload = await this.FileProcessorRepository.createEvents(result);
            return { status: 200, body: upload };
        } catch (error) {
            return { status: 500, body: error.body };
        }
    }

    async uploadAttendees(req) {
        try {
            const filePath = req.file;
            const userId = req.body.userId;
            const result = await FileProcessorUtils.importAttendees(filePath);
            const upload = await this.FileProcessorRepository.createAttendees(result, userId);
            return { status: 200, body: upload };
        } catch (error) {
            return { status: 500, body: error.body };
        }
    }
}

module.exports = FileProcessorUseCase;