((() => {

    FormCtrl.$inject = ['OpenExchangeRates', 'RestCountries', '$q', 'CountryFactory', '$filter'];

    function FormCtrl(OpenExchangeRates, RestCountries, $q, CountryFactory, $filter) {

        let vm = this;

        /**
         * Number of decimal places to round the number to.
         * @type {number}
         */
        vm.fractionSize = 2;

        /**
         * Minimum value
         * @type {number}
         */
        vm.minimum = 0;

        /**
         * Form data
         * @todo refactor this monster
         */
        vm.data = {
            from: {
                country: {
                    obj: {},
                    onchange() {
                        vm.data.to.amount.calculate();
                    }
                },
                amount: {
                    value: '0.00',
                    onchange() {
                        vm.data.to.amount.calculate();
                    },
                    calculate() {
                        let amtFrom = vm.data.to.amount.value,
                            currFrom = vm.data.to.country.obj.getPrimaryCurrency().getCode(),
                            currTo = vm.data.from.country.obj.getPrimaryCurrency().getCode();

                        this.value = $filter('number')(
                            fx(amtFrom).from(currFrom).to(currTo), vm.fractionSize
                        );
                    }
                },
            },
            to: {
                country: {
                    obj: {},
                    onchange() {
                        vm.data.to.amount.calculate();
                    }
                },
                amount: {
                    value: '0.00',
                    onchange() {
                        vm.data.from.amount.calculate();
                    },
                    calculate() {
                        let amtFrom = vm.data.from.amount.value,
                            currFrom = vm.data.from.country.obj.getPrimaryCurrency().getCode(),
                            currTo = vm.data.to.country.obj.getPrimaryCurrency().getCode();

                        this.value = $filter('number')(
                            fx(amtFrom).from(currFrom).to(currTo), vm.fractionSize
                        );
                    }
                },
            }
        };

        // Initialize form data
        let init = () => {

            let promises = {
                countries: RestCountries.get(),
                exchange: OpenExchangeRates.get()
            };

            /**
             * Getting countries and exchange rates asynchronously. Wait for all promises to resolve.
             */
            $q.all(promises).then(results => {

                // Setting money.js
                fx.base = results.exchange.base;
                fx.rates = results.exchange.rates;

                // Filtering countries without currency rate
                let availableCountries = _.filter(results.countries, country => {
                    return _.has(results.exchange.rates, _.transform(country.currencies, (result, currency) => {
                        result.push(currency.code);
                    }, []))
                });

                // Transforming countries list
                vm.countries = _.transform(availableCountries, (result, country) => {
                    result.push(new CountryFactory(country));
                });

                // Setting default form parameters
                vm.data.from.country.obj = _.first(vm.countries);
                vm.data.to.country.obj = _.last(vm.countries);
                vm.data.from.amount.value = '100.00';
                vm.data.to.amount.calculate();

            }, reason => {
                console.error(reason);
            });
        };

        // Here we go!
        init();
    }

    angular.module('app').controller('FormCtrl', FormCtrl);
}))();