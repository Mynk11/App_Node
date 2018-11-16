//Dependency
var config1 = require("./lib/config1");
var http = require("http");
var https = require('https');
var url = require("url");
var fs = require("fs");
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');
var _data = require('./lib/data');
console.log("config is :" + config1);
var StringnDecoder = require('string_decoder').StringDecoder;
//the server should respond to all request with a string


//rm -rf .git*



// _data.delete('test', 'newFile', function (err) {
//   console.log("this was the error", err);
// });

//Instantiating Server
var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

//Start the server and have it listen on port 3000
httpServer.listen(config1.httpPort, function () {
  console.log("the server is listening on " + config1.httpPort + "in " + config1.envName + " mode");
});


var httpsServerOptions = {
  'key': fs.readFileSync("./https/key.pem"),
  'cert': fs.readFileSync("./https/cert.pem")

};
var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

//Start the server and have it listen on port 3000
httpsServer.listen(config1.httpsPort, function () {
  console.log("the server is listening on " + config1.httpsPort + "in " + config1.envName + " mode");
});

//  all the server logic for both the http and https server

var unifiedServer = function (req, res) {
  //get the url and parse it

  var parsedUrl = url.parse(req.url, true);
  //this true allow the query to be passed further
  //get the path

  var path = parsedUrl.pathname;
  console.log("Full path is:" + path);

  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  console.log(`Request on path is ${trimmedPath}`);
  //send the response

  //get the query string as an object

  var queryStringObject = parsedUrl.query;
  console.log(queryStringObject);

  //get the http method

  var method = req.method.toLocaleLowerCase();
  console.log(`Request on path is ${trimmedPath} with this method ${method} and query is :`, queryStringObject);
  //get the header as an object
  var headers = req.headers;
  console.log("the requested header is ", headers);
  //get the apyload if any
  var decoder = new StringnDecoder('utf-8');
  var buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function () {
    buffer += decoder.end();
    //choose the handler this request should go to if one is not found use the not dound handler
    //if the requested path is in the router 

    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    //Construct the data object and send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)

    };
    //Route the request to the chosen handler

    chosenHandler(data, function (statusCode, payload) {
      //use the status code callback by the handler or default 200
      //use the payload callback by the handler or default to an empty object
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
      payload = typeof (payload) == 'object' ? payload : {};
      //convert the payload to a string
      var payloadString = JSON.stringify(payload);



      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning this response', statusCode, payloadString);

    });

  });
};





var router = {
  'ping': handlers.ping,
  'users': handlers.users
};