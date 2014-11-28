var crawlPage = require('../biz').crawlPage;
var model = require('../model');
var co = require('co');
var cheerio = require('cheerio');
var _ = require('underscore');
var _s = require('underscore.string');
var resolve = require('url').resolve;
var getRootURL = require('../../modules/other/pathUtils').getRootURL;
var extractImgSrc = require('../biz').extractImgSrc;
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
        var house = {};
        house.title = $('div.bigtitle h1').text().trim();
        var $time = $('li.time');
        if($time){
            var $timeScript = $time.children();
            if($timeScript.length > 0){
                house.publishDate = new Date();
            } else {
                house.publishDate = $time.text().trim();
            }
        }
        var $price = $('span.bigpri');
        house.price = $price.text().trim();
        house.payment = $price.next().text().trim();
        var $infos = $('div.su_tit:contains("概况")').next().text().trim().split('&nbsp;&nbsp;');
        console.log($infos);
        house.houseType = $infos[0].trim();
        house.area = $infos[1].trim();
        house.buildingType = $infos[2].trim();
        if($infos[3])
            house.fitment = $infos[3].trim();
        if($infos[4])
            house.orientation = $infos[4].trim();
        house.floor = $('div.su_tit:contains("楼层")').next().text().trim();
        var $zones = $('div.su_tit:contains("区域")').next().text().replace('找附近工作','').trim().split('-');
        house.district = $zones[0].trim();
        house.bizDistrict = $zones[1].trim();
        house.building = $zones[2].trim();
        house.address = $('div.su_tit:contains("地址")').next().text().trim();
        var $contact = $('div.su_tit:contains("联系")').next();
        house.contact = $contact.find('a').text();
        house.publisher = $contact.find('em').text();
        var $phone = $('#t_phone');
        if($phone) {
            var $phoneScript = $phone.children();
            if($phoneScript.length > 0){ // 必须加Referer
                house.phonePic =  extractImgSrc($($phoneScript[0]).html());
            } else {
                house.phone = $phone.text().trim();
            }
        }
        fn(err, house);
    };
}

co(function*() {
    var d = new Detail('http://cd.58.com/zufang/20059098777351x.shtml');
    var house = yield d.getDetail();
    console.log(house);
});