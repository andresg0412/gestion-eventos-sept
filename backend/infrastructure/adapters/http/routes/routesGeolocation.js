const express = require('express');
const router = express.Router();

const GeolocationController = require('../controllers/geolocationController');
const GeolocationServiceUseCase = require('../../../../domain/usecases/GeolocationServiceUseCase');
const GeolocationRepository = require('../../../../domain/repositories/GeolocationRepository');
const ConnetAPIMapbox = require('../../mapbox/ConnetAPIMapbox');

const authenticateToken = require('../middlewares/authMiddleware');

const geolocationServiceUseCase = new GeolocationServiceUseCase(new GeolocationRepository(), new ConnetAPIMapbox());
const geolocationController = new GeolocationController(geolocationServiceUseCase);

//RUTAS DE UBICACIONES
router.get('/locations', (req, res) => {
    geolocationController.getNearbyLocations(req, res);
});

module.exports = router;