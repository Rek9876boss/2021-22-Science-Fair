const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
const Pi = require("decimal.js").PI;
Decimal.set({precision: MAX_DIGITS, rounding: 1});
/**
 * Compares different formulas
 * @class
 */
class Comparator{
  /**
   * Measures accuracy at number of iterations
   * @param {Function} f function to be tested
   * @param {Number} n number of iterations
   * @returns {Array<number,Decimal>} array containing number of correct digits and number of iterations
   */
  static measure(f,n){
    // isolates digits
    var a = f(n).minus(3).times(10);
    var b = Pi.minus(3).times(10);
    // converts into checkable string
    var fn = a.toString();
    var pi = b.toString();
    var count = 0;
    fn.replace(".","");
    pi.replace(".","");
    // checks string
    while(fn[count] == pi[count]){
      count++;
    }
    return [n,count];
  }
  /**
   * Data collection function
   * @param {Function} c1 first class to test
   * @param {Function} c2 second class to test
   * @param {number} n number ofiterations to count to
   */
  static makeList(c1,c2,n){
    var c1List = {};
    var c2List = {};
    for(const fn in c1.functionList){
      Object.defineProperty(c1List,fn,(function(){
        var output = [];
        for(let i=1; i<=n; i++){
          output.push(Comparator.measure(c1.functionList.fn,n))
        }
        return output;
      }));
    }
    for(const fn in c2.functionList){
      Object.defineProperty(c2List,fn,(function(){
        var output = [];
        for(let i=1; i<=n; i++){
          output.push(Comparator.measure(c2.functionList.fn,n))
        }
        return output;
      }));
    }
    var final = {};
    Object.defineProperty(final,c1.name,c1List);
    Object.defineProperty(final,c2.name,c2List);
    return final;
  }
}
module.exports = {
  Comparator: Comparator
}
