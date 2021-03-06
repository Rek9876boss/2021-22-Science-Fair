const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({ precision: 1025, rounding: 1 });
/**
 * This class contains all the Chu formulas that I will be using.
 * @fXY {x: Letter} {y: number} is a listed function.
 * @fuY {y: any} is unlisted. see description for more information.
 */
class Chu {
    static sFactorial(x, n) {
        if (n == 0) {
            return new Decimal(1);
        } else {
            let temp = new Decimal(x)
            for (let i = 1; i < n; i++) {
                temp = temp.mul(x + i);
            }
            return temp;
        }
    }
    /**
     * 
     * @param {Array<number>} a The list of values on top
     * @param {Array<number>} A The list of values on bottom
     * @param {number} n The base of the shifted factorial
     */
    static hgeo(a, A, n) {
        var l1 = [];
        var l2 = [];
        a.forEach((x, i) => { l1[i] = Chu.sFactorial(x, n) });
        A.forEach((x, i) => { l2[i] = Chu.sFactorial(x, n) });
        var p = new Decimal(mathjs.prod(l1));
        var q = new Decimal(mathjs.prod(l2));
        return Decimal.div(p, q);
    }
    static fA1(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Decimal.mul(Chu.hgeo([0.5, 0.5, 0.5], [1, 1, 1], k), Decimal.div((6 * k + 1), Decimal.pow(4, k))));
        }
        return Decimal.div(4, temp);
    }
    static fA2(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Decimal.mul(Chu.hgeo([1 / 3, 1 / 3, 2 / 3, 2 / 3], [1, 1, 1, 3 / 2], k), Decimal.div((2 + 18 * k + 27 * k ** 2), Decimal.pow(4, k))));
        }
        return Decimal.div(Decimal.div(Decimal.sqrt(3).mul(9), temp), 2);
    }
    static fA3(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Decimal.mul(Chu.hgeo([1 / 4, 1 / 4, 3 / 4, 3 / 4], [1, 1, 1, 3 / 2], k), Decimal.div((3 + 32 * k + 48 * k ** 2), Decimal.pow(4, k))));
        }
        return Decimal.div(Decimal.sqrt(2).mul(8), temp);
    }
    static fA4(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Decimal.mul(Chu.hgeo([1 / 6, 1 / 6, 5 / 6, 5 / 6], [1, 1, 1, 3 / 2], k), Decimal.div((5 + 72 * k + 108 * k ** 2), Decimal.pow(4, k))));
        }
        return Decimal.div(18, temp);
    }
    static fA5(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Decimal.mul(Chu.hgeo([1 / 5, 1 / 5, 4 / 5, 4 / 5], [1, 1, 1, 3 / 2], k), Decimal.div((4 + 50 * k + 75 * k ** 2), Decimal.pow(4, k))));
        }
        return Decimal.div(Decimal.mul(Decimal.sqrt(Decimal.sub(5, Decimal.sqrt(5))), 25), Decimal.mul(Decimal.mul(Decimal.sqrt(2), 2), temp));
    }
    static functionList = [
        Chu.fA1,
        Chu.fA2,
        Chu.fA3,
        Chu.fA4,
        Chu.fA5,
    ];
}
module.exports = {
    Chu: Chu
}