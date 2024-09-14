class Controller {
    constructor({ service }) {
        this.service = service;
    }

    async handleRequest(req, res) {
        try {
            const result = await this.service(req);
            res.status(result.status).json(result.body);
        } catch (error) {
            res.status(error.status).json(error.body);
        }
    }
}

module.exports = Controller