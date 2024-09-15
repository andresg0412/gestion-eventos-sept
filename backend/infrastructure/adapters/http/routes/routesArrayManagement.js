const express = require('express');
const router = express.Router();

const ArrayManagementController = require('../controllers/arrayManagementController');
const ArrayManagementUseCase = require('../../../../domain/usecases/ArrayManagementUseCase');

const arrayManagementUseCase = new ArrayManagementUseCase();
const arrayManagementController = new ArrayManagementController(arrayManagementUseCase);

router.post('/array', (req, res) => {
    arrayManagementController.processArray(req, res);
});

module.exports = router;