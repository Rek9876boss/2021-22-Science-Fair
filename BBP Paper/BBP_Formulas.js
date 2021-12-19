const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({ precision: 1025, rounding: 1 });
/**
 * This class contains all the Bailey-Borwein-Plouffe formulas that I will be using.
 * @fXY {x: Letter} {y: number} is a listed function.
 * @fuY {y: any} is unlisted. see description for more information.
 */
class BBP {
    /**
     * @param {Number} m Is the m-th polylogarithm
     * @param {Number} z The value that you are taking the polylogarithm of
     * @param {Number} n Is the accuracy of the function (number of iterations)
     * @returns {Decimal}
     */
    static polyLogarithm(m, z, n) {
        let temp = new Decimal(0);
        for (let i = 1; i <= n; i++) {
            temp = temp.add(Decimal.div(Decimal.pow(z, i), Decimal.pow(i, m)));
        }
        return temp;
    }
    /**
     * Listed in paper as function (1.2)
     * @param {Number} n Number of iterations
     * @returns {Decimal}
     */
    static f1_2(n) {
        var temp = new Decimal(0);
        for (let i = 0; i < n; i++) {
            temp = temp.add(Decimal.pow(16, -1 * i).mul(Decimal.div(4, Decimal.mul(8, i).add(1)).sub(Decimal.div(2, ((8 * i) + 4))).sub(Decimal.div(1, ((8 * i) + 5))).sub(Decimal.div(1, ((8 * i) + 6)))));
        }
        return temp;
    }
    /**
     * Listed in paper as function (2.3)
     * @param {Number} n Number of iterations
     * @returns {Decimal}
     */
    static f2_3(n) {
        var p2 = BBP.polyLogarithm(2, 0.5, n).mul(36);
        var p4 = BBP.polyLogarithm(2, 0.25, n).mul(36);
        var p8 = BBP.polyLogarithm(2, 0.125, n).mul(12);
        var p64 = BBP.polyLogarithm(2, 0.015625, n).mul(6);
        var out = p2.sub(p4).sub(p8).add(p64);
        return out.sqrt();
    }
    static functionList = [
        BBP.f1_2,
        BBP.f2_3,
    ]
}
module.exports = {
    BBP: BBP
}
