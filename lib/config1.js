/*
Create and export configuration variables

*/

//Containers for all the environments
//staging { default environment }
const yargs = require('yargs');
const argv = yargs.option({
    NODE_ENV: {
        demand: true,
        alias: "env",
        descride: "Environment for app to run in",
        string: true

    }
}).help().alias("help", 'h').argv;;
console.log("Argv is :", argv);
console.log("NOdeEnv is :", argv.NODE_ENV);
var env = argv.NODE_ENV || argv.env;
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
// npm install -g node-inspector --save
//Determine which environment was passed as a command line arguement

//console.log("process.env.NODE_ENV is :" + argv._[0], argv._[1]);
//console.log("process.env.NODE_ENV is using process.argv:" + process.argv[0], process.argv[1]);
var currentEnvironment = env === 'production' ? env.toLowerCase() : 'staging';

//check that the current environment is one of the environments above if not default to staging

var environmentToExport = typeof (environments[currentEnvironment] == 'object') ? environments[currentEnvironment] : '';
console.log("environmentToExport is :", environmentToExport.envName);
module.exports = environmentToExport;