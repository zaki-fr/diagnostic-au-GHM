const DecisionTree = require("@zaki-fr/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/../database/json", "ROOT.json")

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

exports.run = function (mainDiagnosis, associatedDiagnoses, clientParameters) {
  return diagnostic(["ROOT"].concat([mainDiagnosis].concat(associatedDiagnoses)), clientParameters)
}