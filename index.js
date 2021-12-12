const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({ precision: 1e9, rounding: 1 });
const Chu = require("./Chu Paper/Chu_Formulas").Chu;
const BBP = require("./BBP Paper/BBP_Formulas").BBP;
const Comparator = require("./comparison").Comparator;
console.log(Comparator.makeList(1));
debugger;