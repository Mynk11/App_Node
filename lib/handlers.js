//define a request router
/*
Request handlers
*/
var config = require('./config1');
var _data = require('./data');
var helpers = require('./helpers');
var handlers = {};
handlers.ping = function (data, callback) {
    //callback a http status code, and a payload object
    callback(200);
};

handlers.notFound = function (data, callback) {
    callback(404);
};

handlers.users = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {

        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};
//containers for the users submethods 
handlers._users = {};



//require data: name phone password
handlers._users.post = (data, callback) => {
    //check all the required fields are filled out
    var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 5 ? data.payload.password.trim() : false;
    var tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;
    console.log("Mynk", firstName, lastName, phone, password, tosAgreement);
    if (firstName && lastName && phone && password && tosAgreement) {
        //make sure user doesn't duplicate
        _data.read('users', phone, (err, res) => {
            if (err) {

                var hashedPassword = helpers.hash(password);
                if (hashedPassword) {
                    var user = {
                        "firstName": firstName,
                        "lastName": lastName,
                        "phone": phone,
                        "password": password,
                        "tosAgreement": tosAgreement
                    }
                    _data.create('users', phone, user, (err, res) => {
                        if (!err) {
                            callback(200);
                        } else {
                            console.log("Error in creating file from handler.js");
                            callback(404, {
                                'error': 'Already Exists'
                            });

                        }

                    });
                } else {
                    callback('500', {
                        'Error': 'could not hash the user\'s password'
                    });
                }
            } else {
                callback(404, {
                    'Error': "Existing user in file system"
                });
            }
        })
    } else {
        callback(404, {
            'Error': "Missing from users post method"
        });
    }


}

handlers._users.put = (data, callback) => {

}
handlers._users.delete = (data, callback) => {

}
handlers._users.get = (data, callback) => {

}
module.exports = handlers;