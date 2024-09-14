const express = require('express');
const LocationService = require('./adapters/file/locationService');
//const FileProcessor = require('./adapters/file/fileProcessor');
const AppModule = require('../application/AppModule');
const serverConfig = require('../resources/application.json').server;
const routes = require('./adapters/http/routes/index');
const routerUser = require('./adapters/http/routes/routesUser');
const routerEvent = require('./adapters/http/routes/routesEvent');
const routerAttendee = require('./adapters/http/routes/routerAttendee');
const routerGeolocation = require('./adapters/http/routes/routesGeolocation');
const app = express();


const locationService = new LocationService();
//const fileProcessor = new FileProcessor();

app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
});

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

app.post('/locations/:lat/:lon', async (req, res) => {
    const { lat, lon } = await locationService.getNearbyLocations(req.params.lat, req.params.lon);
    res.send({ lat, lon });
});

//app.post('/process-file', async (req, res) => {
//    const fileBuffer = req.body.file;
//    const filePath = 'uploads/temp.xlsx';
//    await fs.writeFile(filePath, fileBuffer);
//    const processedData = await fileProcessor.processFile(filePath);
//    res.send(processedData);
//});

//AppModule.addModule(serverModule);
//AppModule.start().then(() => {
//    console.log(`Servidor iniciado en http://localhost:${serverConfig.port}`);
//}).catch(error => {
//    console.error(error);
//});

module.exports = { app, serverConfig };