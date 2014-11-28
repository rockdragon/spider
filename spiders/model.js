module.exports.house = house;
module.exports.listPage = listPage;
/*
 房模型
 @opt:{
 id             hash('5820038458323847x' or 'fang3/1268317789x')
 zone           '北京 - 昌平 - 沙河镇'
 address        '东风北桥北，酒仙桥路甲12号'
 overview       '1室1厅2卫 76㎡ 商住两用 精装修 朝向西 2层/3层'
 furniture      '床 / 家具 / 煤气 / 暖气 / 宽带 / 电视 / 冰箱 / 洗衣机 / 热水器'
 phone          '15801429451'
 phonePic       'http://bj.ganji.com/tel_img/?c=UdxKaqrVYooZg055sS0ramfjr968g__PtQyV'
 title          '【21世纪官方推荐】3室2厅125平 出租,南北通透-整租'
 price          '15000元/月'
 payment        '押一付三' '季付' '半年付' '年付'
 publisher      '个人'
 contact        '郑小姐'
 thumbnail      'http://pic4.58cdn.com.cn/p1/tiny/n_s02512217763172548164.jpg'
 href           'http://bj.58.com/hezu/19996422443272x.shtml'
 source         'ganji' '58' 'anjuke' 'soufun'
 publishDate    '2014/11/15'
 description    '...'
 }
 */
function house(opt) {
    opt = opt || {};
    if (opt.id)this.id = opt.id;
    if (opt.zone)this.zone = opt.zone;
    if (opt.address)this.address = opt.address;
    if (opt.overview)this.overview = opt.overview;
    if (opt.furniture)this.furniture = opt.furniture;
    if (opt.phone)this.phone = opt.phone;
    if (opt.phonePic)this.phonePic = opt.phonePic;
    if (opt.title)this.title = opt.title;
    if (opt.price)this.price = opt.price;
    if (opt.payment)this.payment = opt.payment;
    if (opt.publisher)this.publisher = opt.publisher;
    if (opt.contact)this.contact = opt.contact;
    if (opt.thumbnail)this.thumbnail = opt.thumbnail;
    if (opt.href)this.href = opt.href;
    if (opt.source)this.source = opt.source;
    if (opt.publishDate)this.publishDate = opt.publishDate;
}

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('mysql://root:system@127.0.0.1:3306/spider');

var House = sequelize.define('house', {
    id          : {type: Sequelize.STRING, primaryKey: true, unique: true},
    zone        : {type: Sequelize.STRING},
    address     : {type: Sequelize.STRING},
    overview    : {type: Sequelize.STRING},
    furniture   : {type: Sequelize.STRING},
    phone       : {type: Sequelize.STRING},
    phonePic    : {type: Sequelize.BLOB},
    title       : {type: Sequelize.STRING, allowNull: false},
    price       : {type: Sequelize.DECIMAL, allowNull: false},
    payment     : {type: Sequelize.STRING},
    publisher   : {type: Sequelize.STRING},
    contact     : {type: Sequelize.STRING},
    thumbnail   : {type: Sequelize.BLOB},
    href        : {type: Sequelize.STRING, allowNull: false},
    source      : {type: Sequelize.STRING},
    publishDate : {type: Sequelize.DATE, allowNull: false}
});

/*
 列表模块
 @opt{
 url:       http://zu.fang.com/house/list/
 houses:    [house, house, ...]
 pages:     ['http://zu.fang.com/house/list/i32/', 'http://zu.fang.com/house/list/i33/', ...]
 }
 */
function listPage(opt) {
    opt = opt || {};
    if (opt.url)this.url = opt.url;
    if (opt.houses)this.houses = opt.houses;
    if (opt.pages)this.pages = opt.pages;
}

