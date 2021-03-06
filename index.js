'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 3000;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var specYAML = fs.readFileSync(path.join(__dirname,'specs/swagger.yaml'), 'utf8');
var specOpenAPI = fs.readFileSync(path.join(__dirname,'specs/openapi.yaml'), 'utf8');
var resultHTML = fs.readFileSync(path.join(__dirname,'index.html'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(specYAML);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Expose openapi.yaml spec for documentation apps
  app.use('/openapi.yaml', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/yaml'});
    res.end(specOpenAPI);
  })

  // Expose swagger.yaml spec for documentation apps
  app.use('/swagger.yaml', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/yaml'});
    res.end(specYAML);
  })

  // Expose openapi.yaml spec for documentation apps
  app.use('/output', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(resultHTML);
  })

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
