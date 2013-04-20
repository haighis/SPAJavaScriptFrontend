define(['durandal/system', 'services/logger', 'durandal/plugins/router', 'config'],
    function (system, logger, router, config) {

        var adminRoutes = ko.computed(function() {

       //     logger.log('in get routes ' + router.allRoutes().length, null, null, false);

            return router.allRoutes().filter(function (r) {
                return r.settings.admin;
            });
            
        });

        var shell = {
            activate: activate,
            addAdmin: addAdmin,
            adminRoutes: adminRoutes,
            router: router
        };
        return shell;

        function activate() {
            return boot().fail(failedInitialization);
        }
        
        //datacontext.primeData()
        //.then(boot)

        function boot() {
            logger.log('Booky Application Loaded!', null, system.getModuleId(shell), true);
            router.map(config.routes);
            return router.activate(config.startModule);
        }

        function addAdmin(item) {
            router.navigateTo(item.hash);
        }


        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, system.getModuleId(shell), true);
        }
    }
);