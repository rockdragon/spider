require('should');
var cryptoUtils = require('../modules/other/cryptoUtils');
var configUtils = require('../modules/config/configUtils');

describe('crypto utils testing', function(){
    var site = '58';
    var id = '20038458323847x';
    var config = configUtils.getConfigs();
    var secret = config ? config.SECRET : 'spider__helloworld';
    var encrypted = null, decrypted = null;

    it('encrypt', function(){
        encrypted = cryptoUtils.encrypt(secret, site, id);
        encrypted.should.not.equal(null);
    });

    it('decrypt', function(){
        decrypted = cryptoUtils.decrypt(secret, encrypted);
        decrypted.should.not.equal(null);
        Object.prototype.toString.call(decrypted).should.equal('[object Array]');
        decrypted.length.should.equal(2);
    });

    it('decrypted should same as the origin strings', function(){
        decrypted[0].should.equal(site);
        decrypted[1].should.equal(id);
    });
});