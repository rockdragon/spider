var getObjectType = function (obj) {
    return Object.prototype.toString.call(obj);
};
var isObject = function (obj) {
    return getObjectType(obj) === '[object Object]';
};
var isString = function (obj) {
    return getObjectType(obj) === '[object String]';
};
var isArray = function (obj) {
    return getObjectType(obj) === '[object Array]';
};
var isNumber = function (obj) {
    return getObjectType(obj) === '[object Number]';
};
var isFunction = function (obj) {
    return getObjectType(obj) === '[object Function]';
};
function deepCopy(obj) {
    var cloneObj = null;
    if (isArray(obj))
        cloneObj = [];
    else
        cloneObj = Object.create(null);
    for (var key in obj) {
        var child = obj[key];
        if (isObject(child) || isArray(child))
            cloneObj[key] = deepCopy(child);
        else if (isNumber(child) ||
            isString(child) ||
            isFunction(child))
            cloneObj[key] = child;
    }
    return cloneObj;
}
module.exports.deepCopy = deepCopy;