(function () {

    formatNumber.$inject = [];

    function formatNumber() {

        return function (number, fractionSize) {
            return parseFloat(number).toFixed(fractionSize);
        };
    }

    angular.module('app').filter('formatNumber', formatNumber);

})();