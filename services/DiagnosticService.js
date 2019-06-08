'use strict';

const DecisionTree = require("@zaki-fr/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/../database", "ROOT.json")

function getGHMs(tree) {
  var lastleafs = tree.lastleafs()
  var GHMs = lastleafs.length ? lastleafs.join() : tree.current().key
  return {
    last: tree.lastsel().key,
    ghms: GHMs
  }
}

function diagnostic(arrays, params) {
  let last = null
  var options = []
  var current = null
  decisionTree.reset()
  arrays.map(pos => {
    if (last) {
      decisionTree.set(last, pos).next(params)
      current = decisionTree.current()
      options = current.options ? current.options.map((opt, idx) => {
        return opt.key
      }) : []
    }
    last = pos
  })
  const possibility = getGHMs(decisionTree)
  return {
    associatedDiagnoses: options,
    possibleGHMCodes: possibility.ghms,
    lastDiagnosicCode: possibility.last,
    historicalInformation: {
      decisionJourney: decisionTree.journey(),
      historyPath: decisionTree.history()
    }
  }
}

/**
 * Get ACTs details by Diagnostic code.
 *
 * code string The Diagnostic code of acts.
 * returns ErrorsResponse
 **/
exports.getACTsByDiagnosticCode = function(code) {
  return new Promise(function(resolve, reject) {
    resolve({
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
    try {
      resolve(diagnostic(["ROOT"].concat([body.mainDiagnosis].concat(body.associatedDiagnoses)), body.clientParameters));
    } catch(ex) {
      reject({
        "code": "ErrorOperationNotFoundException",
        "message": ex.message
      });
    }
  });
}

