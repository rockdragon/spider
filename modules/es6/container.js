/**
 * ES6 Generator execution container
 */

var slice = Array.prototype.slice;

module.exports.run = function(generatorFunction) {
    try {
        var generatorItr = generatorFunction(callback);
        function callback(err, res) {
            if(err)
                generatorItr.throw(err);
            else {
                var args = slice.call(arguments, 1);
                res = args.length > 1 ? args : res;
                generatorItr.next(res);
            }
        }
        generatorItr.next();
    }
    catch (e){
        console.log(e.message | "I'm died.");
    }
};