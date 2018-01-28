describe('FormCtrl', () => {

    beforeEach(module('app'));

    let FormCtrl;

    beforeEach(inject($controller => {
        FormCtrl = $controller('FormCtrl');
    }));

    it('Fraction size should be defined', () => {
        expect(FormCtrl.fractionSize).toBeDefined();
    });

    it('Minimum size should be defined', () => {
        expect(FormCtrl.minimum).toBeDefined();
    });
});