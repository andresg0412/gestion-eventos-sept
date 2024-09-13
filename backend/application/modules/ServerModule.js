const express = require('express');
const LocationService = require('./file/locationService');
const FileProcessor = require('./file/fileProcessor');

class ServerModule {
    constructor(appModule) {
        this.appModule = appModule;
        this.server = null;
    }

    async start() {
        this.server = express();
        this.server.use(express.json());

        const locationService = new LocationService();
        const fileProcessor = new FileProcessor();

        this.server.get('/locations/:lat/:lon', async (req, res) => {
            const { lat, lon } = await locationService.getNearbyLocations(req.params.lat, req.params.lon);
            res.send({ lat, lon });
        });

        this.server.post('/process-file', async (req, res) => {
            const fileBuffer = req.body.file;
            const filePath = 'uploads/temp.xlsx';
            await fs.writeFile(filePath, fileBuffer);
            const processedData = await fileProcessor.processFile(filePath);
            res.send(processedData);
        });

        this.server.get('/health', (req, res) => {
            res.send('OK');
        });

        this.server.listen(server.port, () => {
            console.log(`Example app listening at http://localhost:${server.port}`);
        });

        this.appModule.setExpressRouter(this.server);
    }

    getDependencies() {
        return ['express'];
    }
}

module.exports = ServerModule;