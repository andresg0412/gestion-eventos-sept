const express = require('express');
const cors = require('cors');
const LocationService = require('./adapters/file/locationService');
const AppModule = require('../application/AppModule');
const serverConfig = require('../resources/application.json').server;
const routes = require('./adapters/http/routes/index');
const routerUser = require('./adapters/http/routes/routesUser');
const routerEvent = require('./adapters/http/routes/routesEvent');
const routerAttendee = require('./adapters/http/routes/routerAttendee');
const routerGeolocation = require('./adapters/http/routes/routesGeolocation');
const routerFileProcessor = require('./adapters/http/routes/routeFileProcessor');
const routerArrayManagement = require('./adapters/http/routes/routesArrayManagement');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost'
];

const corsOptions = {
    origin: (origin, callback) => {
        const whitelist = ['http://localhost:3000', 'http://mi-dominio-en-produccion.com', 'http://localhost'];
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

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

//RUTAS ANALISIS DE MATRICES
app.use('/api', routerArrayManagement);

//DOCUMENTACION SWAGGER
const swaggerDocument = YAML.load('./swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = { app, serverConfig };
