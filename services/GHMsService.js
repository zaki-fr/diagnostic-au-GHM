'use strict';


/**
 * Get GHM details by GHM code.
 *
 * code string The GHM code of a GHM.
 * returns ErrorsResponse
 **/
exports.getGHMByCode = function(code) {
  return new Promise(function(resolve, reject) {
    reject({
      "code": "ErrorOperationNotImplemetedException",
      "message": "Not Implemented Exception"
    });
  });
}

