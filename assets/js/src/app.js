((() => {

    angular.module('app', [
        'angular-storage',
        'purplefox.numeric'
    ]);

    AppRun.$inject = ['$rootScope'];

    function AppRun($rootScope) {
        $rootScope._ = _;
    }

    angular.module('app').run(AppRun)

}))();