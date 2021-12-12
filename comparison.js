const fs = require("fs");
const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
const BBP = require("./BBP Paper/BBP_Formulas").BBP;
const Chu = require("./Chu Paper/Chu_Formulas").Chu;
const PI = new Decimal('3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789');
Decimal.set({ precision: 1025, rounding: 1 });
/**
 * Compares different formulas
 * @class
 */
class Comparator {
    /**
     * Measures accuracy at number of iterations
     * @param {Decimal} f result of function of n
     * @param {Number} n number of iterations
     * @returns {Array<number,Decimal>} array containing number of iterations and number of correct digits
     */
    static measure(f, n) {
        // converts into checkable string
        var fn = f.toString();
        var pi = PI.toString();
        var count = 0;
        fn.replace(".", "");
        pi.replace(".", "");
        // checks string
        while (fn[count] == pi[count]) {
            count++;
        }
        return [n, count - 1];
    }
    /**
     * Data collection function
     * @param {number} n number ofiterations to count to
     */
    static makeListBBP(n) {
        var bbpfl = BBP.functionList;
        var BBPList = [];
        var output = [];
        for (const func of bbpfl) {
            output = [];
            for (let j = 1; j <= n; j++) {
                output.push(Comparator.measure(func(j), j));
            }
            BBPList.push([func.name, output]);
        }
        const data = JSON.stringify(BBPList, null, 4);
        fs.writeFile("./BBPData.json", data, (err) => {
            if (err) {
                throw err;
            }
            console.log("Data Saved");
        });
    }
    static makeListChu(n) {
        var chufl = Chu.functionList;
        var ChuList = [];
        var output = [];
        for (const func of chufl) {
            output = [];
            for (let j = 1; j <= n; j++) {
                output.push(Comparator.measure(func(j), j));
            }
            ChuList.push([func.name, output]);
        }
        const data = JSON.stringify(ChuList, null, 4);
        fs.writeFile("./ChuData.json", data, (err) => {
            if (err) {
                throw err;
            }
            console.log("Data Saved");
        });
    }
}
module.exports = {
    Comparator: Comparator
}
