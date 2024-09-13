class AppModule {
    constructor() {
        this.modules = [];
        this.dependencies = {};
    }

    addModule(module) {
        this.modules.push(module);
        module.constructor.name.forEach(dependency => {
            if (!this.dependencies[dependency]) {
                this.dependencies[dependency] = [];
            }
            this.dependencies[dependency].push(module.constructor.name);
        });
    }

    getModules() {
        return this.modules;
    }

    async start() {
        const orderedModules = this.orderModulesByDependencies();
        for (const module of orderedModules) {
            await module.start();
        }
    }

    orderModulesByDependencies() {
        const visited = {};
        const orderedModules = [];
        function visit(moduleName) {
            if (!visited[moduleName]) {
                visited[moduleName] = true;
                
                const module = this.modules.find(module => module.constructor.name === moduleName);

                if (module.getDependencies().length > 0) {
                    module.getDependencies().forEach(dependency => visit.call(this, dependency));
                }
                orderedModules.push(module);
            }
        }

        this.modules.forEach(module => visit.call(this, module.constructor.name));

        return orderedModules;
    }

    setExpressRouter(router){
        this.setExpressRouter = router;
    }

    getExpressRouter(){
        return Promise.resolve(this.expressRouter);
    }
}

module.exports = AppModule;