((() => {

    angular.module('app', [
        'angular-storage',
        'purplefox.numeric'
    ]);

    AppRun.$inject = ['$rootScope'];

    function AppRun($rootScope) {
        $rootScope._ = _; // make lodash accessible in a views
    }

    angular.module('app').run(AppRun)

}))();