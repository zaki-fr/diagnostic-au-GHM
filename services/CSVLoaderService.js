const fs = require("fs")
const Cache = require('mem-cache');
const MedicalActCache = new Cache();
const GHMCache = new Cache();
const CsvReadableStream = require("csv-reader")
const MAReadStream = fs.createReadStream(__dirname + "/../database/csv/ACTs.csv", "utf8")
const GHMReadStream = fs.createReadStream(__dirname + "/../database/csv/GHMs.csv", "utf8")

var gCsvDataLoaded = false

MAReadStream.pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })).on("data", function (row) {
  if (row.length) {
    var existedRow = MedicalActCache.get(row[0])
    if (typeof existedRow !== undefined && existedRow) {
      MedicalActCache.set(existedRow[0], existedRow.push(row.slice(1)));
    } else {
      MedicalActCache.set(row[0], [row.slice(1)]);
    }
  }
}).on("end", function (_) {
  gCsvDataLoaded = true
});

GHMReadStream.pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })).on("data", function (row) {
  if (row.length) {
    var existedRow = GHMCache.get(row[0])
    if (typeof existedRow !== undefined && existedRow) {
      GHMCache.set(existedRow[0], row.slice(1));
    } else {
      GHMCache.set(row[0], row.slice(1));
    }
  }
}).on("end", function (_) {
  gCsvDataLoaded = true
});

exports.getActs = function (code) {
  MedicalActCache.get(code).map((act) => {
    return {
      code: act[0],
      name: act[1],
      desc: act[2],
      refs: act[3]
    }
  })
}
exports.getGHM = function (code) {
  const ghm = GHMCache.get(code)
  if (ghm) {
    return {
      sevr: ghm[0],
      flag: ghm[1],
      name: ghm[2],
      desc: ghm[3],
      refs: ghm[4]
    }
  } else {
    throw { code: "ErrorCacheNotFoundException", message: "No given GHM code inside database" }
  }
}
exports.isDataLoaded = () => gCsvDataLoaded