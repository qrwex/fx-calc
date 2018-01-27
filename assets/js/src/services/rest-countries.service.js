((() => {

    RestCountries.$inject = ['$q', '$http', 'store'];

    function RestCountries($q, $http, store) {

        return {
            get
        };

        /**
         * Get countries list
         * @returns {*}
         */
        function get() {
            return $q((resolve, reject) => {

                let url = 'https://restcountries.eu/rest/v2/all?fields=name;currencies;flag;alpha2Code;';

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
            });
        }
    }

    angular.module('app').service('RestCountries', RestCountries);

}))();