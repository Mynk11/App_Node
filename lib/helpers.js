//helpers for various task

//container for all the helper
var config = require('./config1')
var crypto = require('crypto');
var helpers = {};
//create a sha256 hash

helpers.hash = (str) => {
    if (typeof (str) == 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        console.log("hashed key is :", hash);
        return hash;
    } else {
        return false;


    }
}

//parse a JSON string to all object without throwing

helpers.parseJsonToObject = (str) => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }


}


module.exports = helpers;