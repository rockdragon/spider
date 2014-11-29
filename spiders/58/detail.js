var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;
var extractImgSrc = require('../biz').extractImgSrc;
var ent = require('ent');
var bravo = require('bravo');
var path = require('path');

/*
 详情
 * */
module.exports = Detail;
function Detail(url) {
    this.url = url;
}

/*
 crawl detail page
 * */
Detail.prototype.getDetail = function () {
    var boundParse = parse.bind(this);
    return crawlPage(this.url, boundParse);
};

/*
 * parse houses
 * */
function parse(fn) {
    var url = this.url;
    return function (err, res) {
        var $ = cheerio.load(res, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        //collect page info
        var jsonFile = path.join(process.cwd(), 'detail.json');
        var house = bravo.Parse(jsonFile, res);

        //var $time = $('li.time');
        //if ($time) {
        //    var $timeScript = $time.children();
        //    if ($timeScript.length > 0) {
        //        house.publishDate = new Date();
        //    } else {
        //        house.publishDate = $time.text().trim();
        //    }
        //}
        //var $price = $('span.bigpri');
        //house.price = $price.text().trim();
        //house.payment = $price.next().text().trim();
        //house.overview = ent.decode($('div.su_tit:contains("概况")').next().text()).trim();
        //var $zone = $('div.su_tit:contains("区域")').next();
        //if ($zone.children() && $zone.children().length > 0) {
        //    var zoneText = ent.decode($zone.text());
        //    house.zone = new RegExp(/(\S+\s-\s\S+\s-\s\S+).?/g).exec(zoneText)[1];
        //} else {
        //    house.zone = $zone.text() + ' - ' + $zone.next().text() + ' - ' + $zone.next().next().text();
        //}
        //var $address = $('div.su_tit:contains("地址")').next();
        //house.address = new RegExp(/([^\s]+)/g).exec($address.text())[1];
        fn(err, house);
    };
}

co(function*() {
    //var d = new Detail('http://cd.58.com/zufang/20059098777351x.shtml');
    //var d = new Detail('http://bj.58.com/zufang/20114437262986x.shtml');
    var d = new Detail('http://bj.58.com/zufang/19562028299138x.shtml');
    var house = yield d.getDetail();
    console.log(house);
});