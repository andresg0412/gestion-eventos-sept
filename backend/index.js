const express = require('express');

require('dotenv').config();
const { server, database, jwt, mapbox, swagger, logging } = require('./resources/application.json');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./domain/database');

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Conectado');
});


app.listen(server.port, () => {
    console.log(`Example app listening at http://localhost:${server.port}`);
})