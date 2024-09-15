const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const FileProcessorController = require('../controllers/FileProcessorController');
const FileProcessorUseCase = require('../../../../domain/usecases/FileProcessorUseCase');
const FileProcessorRepository = require('../../../../domain/repositories/FileProcessorRepository');


const authenticateToken = require('../middlewares/authMiddleware');

const fileProcessorUseCase = new FileProcessorUseCase(new FileProcessorRepository());
const fileProcessorController = new FileProcessorController(fileProcessorUseCase);


router.post('/load-events', upload.single('file'), async (req, res) => {
    fileProcessorController.uploadEvents(req, res);
});
module.exports = router;