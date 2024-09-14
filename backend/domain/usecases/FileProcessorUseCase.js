const fileProcessorUtils = require('../utils/FileProcessorUtils');
class FileProcessorUseCase {
    constructor(FileProcessorRepository) {
        this.FileProcessorRepository = FileProcessorRepository;
    }

    async uploadEvents(req) {
        try {
            //llamar a utils para que procese el archivo
            const { originalname: filename } = req.file;
            const filePath = req.file.path;
            const result = await fileProcessorUtils.importEvents(filePath);

            const upload = await this.FileProcessorRepository.createEvents(result);
            return { status: 200, body: upload };
        } catch (error) {
            return { status: 500, body: error.body };
        }
    }
}

module.exports = FileProcessorUseCase;