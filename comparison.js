const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
const Pi = require("decimal.js").PI;
set({precision:MAX_DIGITS, rounding: 1});
class Comparator{
  /**
   * Measures accuracy at number of iterations
   * @param {Function} f function to be tested
   * @param {Number} n number of iterations
   * @returns {Array<Decimal,Number>} array containing number of correct digits and number of iterations
   */
  static measure(f,n){
    var a = f(n).minus(3).times(10);
    var b = Pi.minus(3).times(10);
    var fn = a.toString();
    var pi = b.toString();
    var count = 0;
    fn.replace(".","");
    pi.replace(".","");
    while(fn[count] == pi[count]){
      count++;
    }
    return [count,n];
  }
}
module.exports = {
  Comparator: Comparator
}
