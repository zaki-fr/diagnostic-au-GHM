'use strict';

var utils = require('../utils/writer.js');
var GHMs = require('../services/GHMsService');

module.exports.getGHMByCode = function getGHMByCode (req, res, next) {
  var code = req.swagger.params['code'].value;
  GHMs.getGHMByCode(code)
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
