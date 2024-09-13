const express = require('express');
const UserController = require('./http/userController');
const LocationService = require('./file/locationService');
const FileProcessor = require('./file/fileProcessor');

const app = express();

app.use(express.json());

const userController = new UserController();
const locationService = new LocationService();
const fileProcessor = new FileProcessor();

app.post('/users', (req, res) => {
    userController.handleRequest(req, res);
});

app.get('/locations/:lat/:lon', async (req, res) => {
    const { lat, lon } = await locationService.getNearbyLocations(req.params.lat, req.params.lon);
    res.send({ lat, lon });
});

app.post('/process-file', async (req, res) => {
    const fileBuffer = req.body.file;
    const filePath = 'uploads/temp.xlsx';
    await fs.writeFile(filePath, fileBuffer);
    const processedData = await fileProcessor.processFile(filePath);
    res.send(processedData);
});


app.listen(server.port, () => {
    console.log(`Example app listening at http://localhost:${server.port}`);
});