const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Eventos', // Título de la API
            version: '1.0.0', // Versión de la API
            description: 'Documentación de la API para gestionar eventos', // Descripción
        },
        servers: [
            {
                url: 'http://localhost:5001', // URL base de tu API
            },
        ],
    },
    apis: ['../adapters/http/routes/*.js'], // Archivos donde está definida la API
};

// Generar la especificación de Swagger
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
