class AppModule {
    constructor() {
        this.modules = [];
        this.dependencies = {};
    }

    addModule(module) {
        this.modules.push(module);
        const moduleName = module.constructor.name;
        if (!this.dependencies[moduleName]) {
            this.dependencies[moduleName] = [];
        }
        this.dependencies[moduleName].push(moduleName);
    }

    //getModules() {
    //    return this.modules;
    //}

    async start() {
        try {
            const orderedModules = await this.orderModulesByDependencies();

            console.log(orderedModules);
            for (let i = 0; i < orderedModules.length; i++) {
                if (orderedModules[i]) {
                    const module = orderedModules[i];
                    console.log(`Starting module ${module}`);
                    if (typeof module.start === 'function') {
                        await module.start();
                    } else {
                        console.warn(`Module ${module.constructor.name} does not have a start function`);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async orderModulesByDependencies() {
        const validModules = this.modules.filter(module =>
            typeof module === 'object' && module !== null && typeof module.start === 'function'
        );
        const visited = {};
        const orderedModules = [];

        function visit(module) {
            if (!visited[module.constructor.name]) {
                visited[module.constructor.name] = true;

                //const module = this.modules.find(m => m.constructor.name === moduleName);
                const dependencies = module.getDependencies();
                if (Array.isArray(dependencies)) {
                    dependencies.forEach(dependency => {
                        const dependentModule = validModules.find(m => m.constructor.name === dependency);
                        if (dependentModule) {
                            visit(dependentModule);
                        }
                    });
                }
                orderedModules.push(module);
            }
        }
        validModules.forEach(visit);

        //this.modules.forEach(module => visit.call(this, module.constructor.name));
        return orderedModules;
    }

    //setExpressRouter(router) {
    //    this.expressRouter = router;
    //}

    //getExpressRouter() {
    //    return Promise.resolve(this.expressRouter);
    //}
}

module.exports = AppModule;