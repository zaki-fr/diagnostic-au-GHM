'use strict';


/**
 * Get ACTs details by Diagnostic code.
 *
 * code string The Diagnostic code of acts.
 * returns ErrorsResponse
 **/
exports.getACTsByDiagnosticCode = function(code) {
  return new Promise(function(resolve, reject) {
    reject({
      "code": "ErrorOperationNotImplemetedException",
      "message": "Not Implemented Exception"
    });
  });
}


/**
 * Diagnostic a GHM by decision tree making algorithm.
 *
 * body object The object contains diagnostic request.
 * returns ErrorsResponse
 **/
exports.diagnosticGHM = function(body) {
  return new Promise(function(resolve, reject) {
    reject({
      "code": "ErrorOperationNotImplemetedException",
      "message": "Not Implemented Exception"
    });
  });
}

