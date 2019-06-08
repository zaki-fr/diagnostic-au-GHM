'use strict';

var utils = require('../utils/writer.js');
var Diagnostic = require('../services/DiagnosticService');

module.exports.getACTsByDiagnosticCode = function getACTsByDiagnosticCode (req, res, next) {
  var code = req.swagger.params['code'].value;
  Diagnostic.getACTsByDiagnosticCode(code)
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
