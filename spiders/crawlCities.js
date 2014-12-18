var util = require('util');
var co = require('co');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;

var model = require('./model');
var log = require('./biz').log;

var getRootURL = require('../modules/other/pathUtils').getRootURL;
var readFile = require('../modules/other/pathUtils').readFile;
var getAbsolutePath = require('../modules/other/pathUtils').getAbsolutePath;
var extractImgSrc = require('./biz').extractImgSrc;
var extractRequestHref = require('./biz').extractRequestHref;
var download2Buffer = require('./biz').download2Buffer;
var sleep = require('./biz').sleep;
var getURL = require('./biz').getURL;
var onSuccess = require('./biz').onSuccess;
var onError = require('./biz').onError;

var BloomFilter = require('../modules/repeater/repeater'),
    repeater = new BloomFilter();

/*
 * @site 站点
 * @sleepSeconds 休眠秒数
 * */
module.exports.fetchCities = fetchCities;
function* fetchCities(site) {
    var hotCities = JSON.parse(yield readFile(getAbsolutePath('spiders/hotCities.json')));
    var cities = hotCities[site].cities;
    var sleepSeconds = hotCities[site].sleepSeconds;
    var HotZone = require(getAbsolutePath('spiders/' + site + '/hotZone'));
    var Houses = require(getAbsolutePath('spiders/' + site + '/houses'));
    var Detail = require(getAbsolutePath('spiders/' + site + '/detail'));

    for (var i = 0, len = cities.length; i < len; i++) {
        var city = cities[i];
        try {
            var zones = yield new HotZone(city).getHotZones();
            sleep(sleepSeconds);
            for (var j = 0, len2 = zones.length; j < len2; j++) {
                var zone = zones[j];
                var listPage = yield new Houses(zone.href).getHouses();

                yield co(fetchHouses(listPage, Detail, sleepSeconds, city));

                for (var l = 0, len4 = listPage.pages.length; l < len4; l++) {
                    listPage = yield new Houses(listPage.pages[l]).getHouses();
                    yield co(fetchHouses(listPage, Detail, sleepSeconds, city));

                    sleep(sleepSeconds);
                }

                sleep(sleepSeconds);
            }
        } catch (e) {
            log(util.format('%s: ---------ERROR', city));
            log(e.stack);
        }
    }
}

function* fetchHouses(listPage, Detail, sleepSeconds, city){
    for (var m = 0, len5 = listPage.houses.length; m < len5; m++) {
        var href = listPage.houses[m].href;
        if (!_s.startsWith(href, 'http')) {
            log('resolve: ', city, href);
            href = resolve(getRootURL(city), href);
        }
        yield co(fetchOneHouse(Detail, href, sleepSeconds));
    }
}

function* fetchOneHouse(Detail, href, sleepSeconds) {
    if (!repeater.exists(href)) {//防重
        repeater.add(href);

        if(href.trim()) {

            var detail = new Detail(href);
            var house = yield detail.getDetail();

            yield co(detail.moreDetail(house));

            if(house.longitude && house.latitude) {
                console.log(house);

                yield model.bulkCreate(house);
                onSuccess('creation successful.');
            }

            sleep(sleepSeconds);
        } else {
            log('NULL href');
        }
    }
}

//co(fetchCities(10));
