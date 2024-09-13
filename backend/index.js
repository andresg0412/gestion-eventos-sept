const AppModule = require('./application/AppModule');
const UserModule = require('./application/modules/UserModule');
const EventModule = require('./application/modules/EventModule');
const ServerModule = require('./application/modules/ServerModule');

async function startAppplication() {
    const appModule = new AppModule();

    appModule.register(new UserModule(appModule));
    appModule.register(new EventModule(appModule));
    appModule.register(new ServerModule(appModule));

    await appModule.start();
}

startAppplication().catch(console.error);
