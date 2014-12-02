require('should');
var repeater = require('../modules/repeater/repeater');

describe('repeater utils testing', function(){
    it('prevent repetition validation.', function(){
        var url = 'http://www.moye.me/';
        repeater.exists(url).should.equal(false);
        repeater.add(url);
        repeater.exists(url).should.equal(true);
    });
});