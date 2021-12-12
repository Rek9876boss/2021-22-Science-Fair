const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({ precision: 1e9, rounding: 1 });
/**
 * This class contains all the Bailey-Borwein-Plouffe formulas that I will be using.
 * @fXY {x: Letter} {y: number} is a listed function.
 * @fuY {y: any} is unlisted. see description for more information.
 */
class BBP {
  /**
   * @param {Number} m Is the m-th polylogarithm
   * @param {Number} z The value that you are taking the polylogarithm of
   * @param {Number} a Is the accuracy of the function (number of iterations)
   * @returns {Decimal}
   */
  static polyLogarithm(m, z, a) {
    var temp = new Decimal(0);
    for (let i = 0; i < a; i++) {
      temp = temp.add(((z ** i) / (i ** m)));
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
      temp = temp.add((1 / (16 ** i)) * ((4 / ((8 * i) + 1)) - (2 / ((8 * i) + 4)) - (1 / ((8 * i) + 5)) - (1 / ((8 * i) + 6))));
    }
    return temp;
  }
  /**
   * Unlisted, fourth unlisted function from top on page 905
   * @param {Number} n Number of iterations
   * @returns {Decimal}
   */
  static fupg905_4(n) {
    var temp = new Decimal(0);
    for (let i = 0; i < n; i++) {
      temp = temp.add(((((-1) ** i) / (4 ** i)) * ((2 / (4 * i + 1)) + (2 / (4 * i + 2)) + (1 / (4 * i + 3)))));
    }
    return temp;
  }
  /**
   * Listed in paper as function (2.3)
   * @param {Number} n Number of iterations
   * @returns {Decimal}
   */
  static f2_3(n) {
    return Decimal.sqrt(36 * BBP.polyLogarithm(2, 0.5, n) - 36 * BBP.polyLogarithm(2, 0.25, n) - 12 * BBP.polyLogarithm(2, 0.125, n) + 6 * BBP.polyLogarithm(2, 0.015625, n));
  }
  /**
   * Listed as function (2.13)
   * @param {Number} n Number of iterations
   * @returns {Decimal}
   */
  static f2_13(n) {
    function f(x) {
      var temp = new Decimal(0);
      for (let i = 1; i <= n; i++) {
        temp = temp.add(((((-1) ** i) * (x ** i)) / (2 * i + 1)));
      }
      return temp;
    }
    return f(1 / 2).mul(4).add(f(1 / 8)).div(Decimal.sqrt(2));
  }
  static functionList = [
    BBP.f1_2,
    BBP.fupg905_4,
    BBP.f2_3,
    BBP.f2_13
  ]
}
module.exports = {
  BBP: BBP
}
