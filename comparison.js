const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
const BBP = require("./BBP Paper/BBP_Formulas.js").BBP;
const Chu = require("./Chu Paper/Chu_Formulas.js").Chu;
Decimal.set({precision:MAX_DIGITS, rounding: 1});
Decimal Pi = new Decimal(Decimal.PI);

class Comparator{
  /**
   * Measures accuracy at number of iterations
   * @param {function} f function to be tested
   * @param {number} n number of iterations
   * @returns {Number[]} array containing number of correct digits and number of iterations
   */
  static measure(f,n){
    Decimal a = f(n).minus(3).times(10);
    Decimal b = Pi.minus(3).times(10);
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
