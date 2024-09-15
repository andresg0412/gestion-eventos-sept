const express = require('express');
const LocationService = require('./adapters/file/locationService');
const AppModule = require('../application/AppModule');
const serverConfig = require('../resources/application.json').server;
const routes = require('./adapters/http/routes/index');
const routerUser = require('./adapters/http/routes/routesUser');
const routerEvent = require('./adapters/http/routes/routesEvent');
const routerAttendee = require('./adapters/http/routes/routerAttendee');
const routerGeolocation = require('./adapters/http/routes/routesGeolocation');
const routerFileProcessor = require('./adapters/http/routes/routeFileProcessor');
const app = express();

app.use(express.json());

//LOGIN
app.use('/api', routes);

//USERS
app.use('/api', routerUser);

//EVENTS
app.use('/api', routerEvent);

//RUTAS DE ASISTENTES
app.use('/api', routerAttendee);

//RUTAS DE UBICACIONES
app.use('/api', routerGeolocation);

//RUTAS DE PROCESAMIENTO DE ARCHIVOS
app.use('/api', routerFileProcessor);

module.exports = { app, serverConfig };
