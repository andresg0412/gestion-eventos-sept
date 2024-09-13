const express = require('express');
const UserController = require('./adapters/http/userController');
const UserServiceUseCase = require('../domain/usecases/UserServiceUseCase');
const UserRepository = require('../domain/repositories/UserRepository');
const LocationService = require('./adapters/file/locationService');
//const FileProcessor = require('./adapters/file/fileProcessor');
const AppModule = require('../application/AppModule');
const serverConfig = require('../resources/application.json').server;

const app = express();


const locationService = new LocationService();
//const fileProcessor = new FileProcessor();
const userServiceUseCase = new UserServiceUseCase(new UserRepository());
const userController = new UserController(userServiceUseCase);


app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
});
app.post('/users', (req, res) => {
    res.send('OK');
    //userController.handleRequest(req, res);
});

app.get('/users', (req, res) => {
    console.log('GET /users');
    userController.getAllUsers(req, res);
});

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