module.exports.isObject = isObject;
module.exports.isObject = isObject;
module.exports.isString = isString;
module.exports.isNumber = isNumber;
module.exports.isFunction = isFunction;
module.exports.deepCopy = deepCopy;

function getObjectType(obj) {
    return Object.prototype.toString.call(obj);
}
function isObject(obj) {
    return getObjectType(obj) === '[object Object]';
}
function isDate(obj) {
    return getObjectType(obj) === '[object Date]';
}
function isString(obj) {
    return getObjectType(obj) === '[object String]';
}
function isArray(obj) {
    return getObjectType(obj) === '[object Array]';
}
function isNumber(obj) {
    return getObjectType(obj) === '[object Number]';
}
function isFunction(obj) {
    return getObjectType(obj) === '[object Function]';
}
function deepCopy(obj) {
    var cloneObj = null;
    if (isArray(obj))
        cloneObj = [];
    else if (isObject(obj))
        cloneObj = {};
    else if (isDate(obj))
        cloneObj = new Date(obj.toJSON());
    else
        cloneObj = obj;
    for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
            var child = obj[key];
            if (isObject(child) || isArray(child))
                cloneObj[key] = deepCopy(child);
            else if (isNumber(child) ||
                isString(child) ||
                isFunction(child))
                cloneObj[key] = child;
        }
    }
    return cloneObj;
}
