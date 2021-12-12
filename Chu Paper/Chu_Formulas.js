const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({ precision: 1e9, rounding: 1 });
/**
 * This class contains all the Chu formulas that I will be using.
 * @fXY {x: Letter} {y: number} is a listed function.
 * @fuY {y: any} is unlisted. see description for more information.
 */
class Chu {
    static sFactiorial(x, n) {
        if (n === 0) {
            return 1;
        } else {
            return mathjs.gamma(x + n) / mathjs.gamma(x);
        }
    }
    /**
     * 
     * @param {Array<number>} a The list of values on top
     * @param {Array<number>} A The list of values on bottom
     * @param {number} n The base of the shifted factorial
     */
    static hgeo(a, A, n) {
        a.forEach((x, i) => { a[i] = Chu.sFactiorial(x, n) });
        A.forEach((x, i) => { a[i] = Chu.sFactiorial(x, n) });
        return mathjs.prod(a) / mathjs.prod(A);
    }
    static fA1(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([0.5, 0.5, 0.5], [1, 1, 1], k) * ((1 + 6 * k) / (4 ** k)));
        }
        return Decimal.div(4, temp);
    }
    static fA2(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([1 / 3, 1 / 3, 2 / 3, 2 / 3], [1, 1, 1, 3 / 2], k) * ((2 + 18 * k + 27 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.sqrt(3).mul(9), temp.mul(2));
    }
    static fA3(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([1 / 4, 1 / 4, 3 / 4, 3 / 4], [1, 1, 1, 3 / 2], k) * ((3 + 32 * k + 48 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.sqrt(2).mul(8), temp);
    }
    static fA4(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([1 / 6, 1 / 6, 5 / 6, 5 / 6], [1, 1, 1, 3 / 2], k) * ((5 + 72 * k + 108 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(18, temp);
    }
    static fA5(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([1 / 5, 1 / 5, 4 / 5, 4 / 5], [1, 1, 1, 3 / 2], k) * ((4 + 50 * k + 75 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.mul(25, Decimal.sqrt(Decimal.sub(5, Decimal.sqrt(5)))), Decimal.sqrt(2).mul(2).mul(temp));
    }
    static fA6(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([2 / 5, 2 / 5, 3 / 5, 3 / 5], [1, 1, 1, 3 / 2], k) * ((6 + 50 * k + 75 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.mul(25, Decimal.sqrt(Decimal.add(5, Decimal.sqrt(5)))));
    }
    static fA7(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([1 / 8, 1 / 8, 7 / 8, 7 / 8], [1, 1, 1, 3 / 2], k) * ((7 + 128 * k + 192 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.mul(32, Decimal.sqrt(Decimal.sub(2, Decimal.sqrt(2)))), temp);
    }
    static fA8(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([3 / 8, 3 / 8, 5 / 8, 5 / 8], [1, 1, 1, 3 / 2], k) * ((15 + 128 * k + 192 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.mul(32, Decimal.sqrt(Decimal.add(2, Decimal.sqrt(2)))), temp);
    }
    static fA9(n) {
        var temp = new Decimal(0);
        for (let k = 0; k < n; k++) {
            temp = temp.add(Chu.hgeo([1 / 3, 1 / 3, 2 / 3, 2 / 3], [1, 3 / 2, 5 / 4, 5 / 3], k) * ((7 + 27 * k + 27 * k ** 2) / (4 ** k)));
        }
        return Decimal.div(Decimal.mul(temp, Decimal.sqrt(3)), 4);
    }
    static functionList = [
        Chu.fA1,
        Chu.fA2,
        Chu.fA3,
        Chu.fA4,
        Chu.fA5,
        Chu.fA6,
        Chu.fA7,
        Chu.fA8,
        Chu.fA9,
    ]
}
module.exports = {
    Chu: Chu
}
