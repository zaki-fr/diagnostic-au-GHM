"use strict";
const Promise = require("bluebird")
const loaderService = require("./CSVLoaderService")
const diagnosticTree = require("./DiagnosticTree")

/**
 * Get ACTs details by Diagnostic code.
 *
 * code string The Diagnostic code of acts.
 * start integer The start index of acts. (optional)
 * size integer The number of item of acts. (optional)
 * filters string The filter keywords of acts. (optional)
 * returns ErrorsResponse
 **/
exports.getACTsByDiagnosticCode = function (code, start, size, filters) {
  return new Promise(function (resolve, reject) {
    try {
      if (loaderService.isDataLoaded()) {
        resolve({
          medicalActs: loaderService.getActs(code, start, size, filters)
        })
      } else {
        throw {
          code: "ErrorOperationNotReadyException",
          message: "Data is loading into memory..."
        }
      }
    } catch (ex) {
      reject({
        "code": "ErrorMedicalActNotFoundException",
        "message": "Not Implemented Exception"
      });
    }
  });
}

/**
 * Diagnostic a GHM by decision tree making algorithm.
 *
 * body object The object contains diagnostic request.
 * returns ErrorsResponse
 **/
exports.diagnosticGHM = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(diagnosticTree.run(body.mainDiagnosis, body.associatedDiagnoses, body.clientParameters));
    } catch (ex) {
      reject({
        "code": "ErrorDiagnosisNotFoundException",
        "message": ex.message
      });
    }
  });
}

