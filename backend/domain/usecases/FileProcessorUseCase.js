const FileProcessorUtils = require('../utils/FileProcessorUtils');
class FileProcessorUseCase {
    constructor(FileProcessorRepository) {
        this.FileProcessorRepository = FileProcessorRepository;
    }

    async uploadEvents(req) {
        try {
            const { originalname: filename } = req.file;
            const filePath = req.file;
            const result = await FileProcessorUtils.importEvents(filePath);
            
            const upload = await this.FileProcessorRepository.createEvents(result);
            return { status: 200, body: upload };
        } catch (error) {
            return { status: 500, body: error.body };
        }
    }
}

module.exports = FileProcessorUseCase;