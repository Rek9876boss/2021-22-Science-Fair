const fs = require('fs');
const mathjs = require("mathjs");
const Chu = require('./Chu Paper/Chu_Formulas').Chu;
const BBP = require('./BBP Paper/BBP_Formulas').BBP;
const Decimal = require("decimal.js").Decimal;
const Comparator = require('./comparison').Comparator;
const Data = require("./dataGet").Data;
Decimal.set({ precision: 1025, rounding: 1 });
// Avoid running excessively: very slow
Data.run();
// If the data.json file get changed, run this:
//Data.backup();

const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
const BBPData = data["BBP Data"];
const ChuData = data["Chu Data"];

var toprow = ["Iterations"];
var dataList = [];
for (let i = 0; i < 500; i++) {
    dataList.push([i + 1]);
}
for (let key in BBPData) {
    toprow.push(key);
    BBPData[key].forEach((v, i) => {
        dataList[i].push(v[1]);
    });
}
for (let key in ChuData) {
    toprow.push(key);
    ChuData[key].forEach((v, i) => {
        dataList[i].push(v[1]);
    });
}
var top = toprow.join(",");
var dataString = [];
dataList.forEach(v => {
    dataString.push(v.join(","));
});
var dataString2 = "";
dataString.forEach(v => {
    dataString2 = `${dataString2}\n${v}`;
})
var finalVal = `${top}${dataString2}`;
fs.writeFileSync("./data.csv", finalVal);