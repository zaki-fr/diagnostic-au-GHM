'use strict';

var utils = require('../utils/writer.js');
var Diagnostic = require('../services/DiagnosticService');

module.exports.getACTsByDiagnosticCode = function getACTsByDiagnosticCode (req, res, next) {
  var code = req.swagger.params['code'].value;
  var start = req.swagger.params['start'].value;
  var size = req.swagger.params['size'].value;
  var filters = req.swagger.params['filters'].value;
  Diagnostic.getACTsByDiagnosticCode(code, start, size, filters)
    .then(function (response) {
      utils.writeJson(res, response);
    }, function (error) {
      utils.writeError(res, error);
    })
    .catch(function (error) {
      utils.writeError(res, {
        code: 'InnerHandlerThrownException',
        message: error
      });
    });
};

module.exports.diagnosticGHM = function diagnosticGHM (req, res, next) {
  var body = req.swagger.params['body'].value;
  Diagnostic.diagnosticGHM(body)
    .then(function (response) {
      utils.writeJson(res, response);
    }, function (error) {
      utils.writeError(res, error);
    })
    .catch(function (error) {
      utils.writeError(res, {
        code: 'InnerHandlerThrownException',
        message: error
      });
    });
};
