((() => {

    OpenExchangeRates.$inject = ['$q', '$http', 'store'];

    function OpenExchangeRates($q, $http, store) {

        return {
            get
        };

        /**
         * Get exchange rates
         * @returns {*}
         */
        function get() {

            return $q((resolve, reject) => {

                let url = 'https://openexchangerates.org/api/latest.json?app_id=d20ca9f5f4764ffd952b07f82475b01f';

                let cached = store.get(url);

                if (cached) {
                    return resolve(cached);
                }

                return $http.get(url).then(response => {

                    if (!response.data) {
                        return reject();
                    }

                    store.set(url, response.data);
                    return resolve(response.data);

                }, reject)
            })
        }
    }

    angular.module('app').service('OpenExchangeRates', OpenExchangeRates);

}))();