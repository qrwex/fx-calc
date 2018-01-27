(() => {

    CountryFactory.$inject = [];

    function CountryFactory() {

        /**
         * @returns {Country}
         * @constructor
         */
        class Country {

            /**
             * @param data
             * @returns {Country}
             */
            constructor(data) {
                this.data = data;
                return this;
            }

            /**
             * Get country name
             * @returns {string}
             */
            getName() {
                return this.data.name;
            }

            /**
             * Get country code
             * @returns {string}
             */
            getCode() {
                return this.data.alpha2Code;
            }

            /**
             * Get country flag URL
             * @returns {string}
             */
            getFlag() {
                return this.data.flag;
            }

            /**
             * Get country currencies
             * @returns {array}
             */
            getCurrencies() {
                return this.data.currencies;
            }

            /**
             * Get primary currency
             * @returns {object}
             */
            getPrimaryCurrency() {
                return _.first(this.data.currencies);
            }
        }

        return Country;
    }

    angular.module('app').factory('CountryFactory', CountryFactory);
})();