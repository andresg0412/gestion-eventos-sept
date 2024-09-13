const express = require('express');
const AppModule = require('./application/AppModule');
const UserModule = require('./application/modules/UserModule');
const EventModule = require('./application/modules/EventModule');
const serverConfig = require('./resources/application.json').server;
const { app } = require('./infrastructure/server');


async function startAppplication() {
    const appModule = new AppModule();

    appModule.addModule(new UserModule());
    appModule.addModule(new EventModule());

    await Promise.all([
        UserModule.prototype.start(),
        EventModule.prototype.start(),
        appModule.start().then(() => {
            console.log(`Servidor iniciado en http://localhost:${serverConfig.port}`);
            app.listen(serverConfig.port, () => {
                console.log(`Escuchando en http://localhost:${serverConfig.port}`);
            });
        })
    ]);
}

startAppplication().catch(console.error);
