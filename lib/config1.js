/*
Create and export configuration variables

*/

//Containers for all the environments
//staging { default environment }
const yargs = require('yargs');
var argv = yargs.argv;
console.log("Argv is :", argv);
console.log();
var environments = {};


environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecret': 'this Is A Secret'
};

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'this Is A Secret'

};

//Determine which environment was passed as a command line arguement

console.log("process.env.NODE_ENV is :" + argv._[0], argv._[1]);
console.log("process.env.NODE_ENV is using process.argv:" + process.argv[0], process.argv[1]);
var currentEnvironment = argv._[0] === 'production' ? argv._[0].toLowerCase() : 'staging';

//check that the current environment is one of the environments above if not default to staging

var environmentToExport = typeof (environments[currentEnvironment] == 'object') ? environments[currentEnvironment] : '';
console.log("environmentToExport is :" + environmentToExport);
module.exports = environmentToExport;