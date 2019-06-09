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
  console.log("Medical Acts:", MedicalActCache.length)
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
  console.log("GHM codes:", GHMCache.length)
  gCsvDataLoaded = true
});

exports.getActs = function (code, start, size, filters) {
  const actCodes = MedicalActCache.get(code).slice(start,start + size)
  const result = actCodes.map((act) => {
    return {
      code: act[0],
      name: act[1],
      desc: act[2]
    }
  })
  return result
}
exports.getGHM = function (code) {
  const ghmCode = GHMCache.get(code)
  if (ghmCode) {
    return {
      name: ghmCode[0]
    }
  } else {
    throw { code: "ErrorCacheNotFoundException", message: "No given GHM code inside database" }
  }
}
exports.isDataLoaded = () => gCsvDataLoaded