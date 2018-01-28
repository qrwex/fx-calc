(() => {

    CurrencyFactory.$inject = [];

    function CurrencyFactory() {

        /**
         * @returns {Currency}
         * @constructor
         */
        class Currency {

            /**
             * @param data
             * @returns {Currency}
             */
            constructor(data) {
                this.data = data;
                return this;
            }

            /**
             * Get currency name
             * @returns {string}
             */
            getName() {
                return this.data.name;
            }

            /**
             * Get currency code
             * @returns {string}
             */
            getCode() {
                return this.data.code;
            }

            /**
             * Get currency symbol
             * @returns {string}
             */
            getSymbol() {
                return this.data.symbol;
            }
        }

        return Currency;
    }

    angular.module('app').factory('CurrencyFactory', CurrencyFactory);
})();