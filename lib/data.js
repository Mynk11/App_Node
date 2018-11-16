//Library  for storing and editing data




//Dependencies

var fs = require('fs');
var path = require('path');

//container for the module to be exported

var lib = {}




//Base directory of data folder
//__dirname it has the present direction name ex-lib for now
lib.baseDir = path.join(__dirname, '/../.data/');


console.log("__dirname is :" + __dirname);

//write data to a file
lib.create = function (dir, file, data, callback) {
    //open the file for writing
    console.log("dir, file, data, is :", dir, file, data);
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function (err, data) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        }
                        else {
                            callback("closing new file");
                        }

                    });
                }
                else {
                    callback("Error writing to new file");
                }
            });
        }
        else {
            callback("could not create new file,it may already exist");

        }

    });

};

lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + dir + '/' + file + ".json", 'utf8', function (err, data) {
        callback(err, data);
    });
};

lib.update = function (dir, file, data, callback) {
    //open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.truncate(fileDescriptor, function (err) {
                if (!err) {
                    //write to the file & close it
                    fs.writeFile(fileDescriptor, stringData, function (err) {

                        if (!err) {

                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback("false");
                                }
                                else {
                                    callback("Error closing existing file")
                                }
                            });

                            callback("false");
                        }
                        else {
                            callback("Error Wrriting existing file");
                        }


                    });

                }
                else {

                    callback("Error truncating file");

                }
            });
        }
        else {
            callback('could not open the file for updation');
        }
    });
};


lib.delete = function (dir, file, callback) {
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
        if (!err) {

            callback("false");
            console.log("The given file is Deleted:" + lib.baseDir + dir + '/' + '.json');
        }
        else {
            callback("Error deleting the file");
            console.log("The given file is Deleted 1:" + file, dir, lib.baseDir + dir + '/' + '.json');
        }
    });

};


//Export the module

module.exports = lib;