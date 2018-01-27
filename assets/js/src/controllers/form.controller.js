((() => {

    FormCtrl.$inject = ['OpenExchangeRates', 'RestCountries', '$q', 'CountryFactory', '$filter'];

    function FormCtrl(OpenExchangeRates, RestCountries, $q, CountryFactory, $filter) {

        let vm = this;

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
                            currFrom = _.first(vm.data.to.country.obj.getCurrencies()).code,
                            currTo = _.first(vm.data.from.country.obj.getCurrencies()).code;

                        this.value = $filter('number')(
                            fx(amtFrom).from(currFrom).to(currTo), 2
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
                            currFrom = _.first(vm.data.from.country.obj.getCurrencies()).code,
                            currTo = _.first(vm.data.to.country.obj.getCurrencies()).code;

                        this.value = $filter('number')(
                            fx(amtFrom).from(currFrom).to(currTo), 2
                        );
                    }
                },
            }
        };

        let init = () => {

            let promises = {
                countries: RestCountries.get(),
                exchange: OpenExchangeRates.get()
            };

            $q.all(promises).then(results => {

                fx.base = results.exchange.base;
                fx.rates = results.exchange.rates;

                let availableCountries = _.filter(results.countries, country => {
                    return _.has(results.exchange.rates, _.transform(country.currencies, (result, currency) => {
                        result.push(currency.code);
                    }, []))
                });

                vm.countries = _.transform(availableCountries, (result, country) => {
                    result.push(new CountryFactory(country));
                });

                vm.data.from.country.obj = _.first(vm.countries);
                vm.data.to.country.obj = _.last(vm.countries);
                vm.data.from.amount.value = '100.00';
                vm.data.to.amount.calculate();

            }, reason => {
                console.error(reason);
            });
        };

        init();
    }

    angular.module('app').controller('FormCtrl', FormCtrl);
}))();