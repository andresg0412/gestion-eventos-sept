const express = require('express');
const LocationService = require('../../infrastructure/adapters/file/locationService');
//const FileProcessor = require('../../infrastructure/adapters/file/fileProcessor');
const AppModule = require('../AppModule');
const server = require('../../resources/application.json').server;

class ServerModule extends AppModule {
    constructor(app) {
        super();
        this.server = null;
        this.app = app;
    }

    async start() {
        try {
            this.server = express();
            this.server.use(express.json());

            const locationService = new LocationService();
            //const fileProcessor = new FileProcessor();

            this.server.get('/locations/:lat/:lon', async (req, res) => {
                const { lat, lon } = await locationService.getNearbyLocations(req.params.lat, req.params.lon);
                res.send({ lat, lon });
            });

            //this.server.post('/process-file', async (req, res) => {
            //    const fileBuffer = req.body.file;
            //    const filePath = 'uploads/temp.xlsx';
            //    await fs.writeFile(filePath, fileBuffer);
            //    const processedData = await fileProcessor.processFile(filePath);
            //    res.send(processedData);
            //});

            this.server.get('/health', (req, res) => {
                res.send('OK');
            });

            //const port = server.port;
            //console.log(`Intento Example app listening at http://localhost:${port}`);

            //this.server.listen(port);
            

        } catch (error) {
            console.error(error);
        }
    }

    addRoute(path, handler) {
        this.app.use(path, handler);
    }
    getDependencies() {
        return ['express'];
    }
}
module.exports = ServerModule;