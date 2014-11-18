var list = require('../spiders/58/list');
var run = require('../modules/es6/container').run;

describe('58 testing', function () {
    it('list testing', function (done) {
        run(function*(cb) {
            var listPage = yield list.getHouses()(cb);
            expect(listPage).not.toBeNull();
            expect(listPage.houses).not.toBeNull();
            expect(listPage.houses).toEqual(jasmine.any(Array));
            expect(listPage.houses.length).toBeGreaterThan(10);
            done();
        });
    });
});
