'use strict';
const loaderService = require("./CSVLoaderService")

/**
 * Get GHM details by GHM code.
 *
 * code string The GHM code of a GHM.
 * returns ErrorsResponse
 **/
exports.getGHMByCode = function(code) {
  return new Promise(function(resolve, reject) {
    try {
      if (loaderService.isDataLoaded()) {
        resolve(loaderService.getGHM(code))
      } else {
        throw {
          code: "ErrorOperationNotReadyException",
          message: "Data is loading into memory..."
        }
      }
    } catch (ex) {
      reject({
        "code": "ErrorGHMNotFoundException",
        "message": ex.message
      });
    }
  });
}

