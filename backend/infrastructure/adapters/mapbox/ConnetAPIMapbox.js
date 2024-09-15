const axios = require('axios');
require('dotenv').config();
const MapboxUtils = require('./utils/mapboxUtils');
class ConnetAPIMapbox {
    
    //OBTENER COORDENADAS DE DIRECCION
    async getCoordinates(address) {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;
            const response = await axios.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
    //OBTENER UBICACIONES CERCANAS
    async getNearbyLocations(lat, lon) {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=5&types=poi`;

            const response = await axios.get(url);
            const data = response.data;
            const formattedReponse = await MapboxUtils.formatMapboxResponse(data);

            return formattedReponse;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ConnetAPIMapbox;
