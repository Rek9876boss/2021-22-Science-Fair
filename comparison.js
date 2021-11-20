const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
const Pi = require("decimal.js").PI;
Decimal.set({precision:MAX_DIGITS, rounding: 1});
/**
 * Compares different formulas
 * @class
 * @static
 */
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
  /**
   * 
   * @param {Function} c1 
   * @param {Function} c2 
   * @param {number} n 
   */
  static makeList(c1,c2,n){
    var fs = {
      c1:[],
      c2:[]
    }
    Object.getOwnPropertyNames(c2.prototype).forEach(function(value){if(value.charAt(0) == "f"){fs.c2.push(c2.value)}});
    Object.getOwnPropertyNames(c1.prototype).forEach(function(value){if(value.charAt(0) == "f"){fs.c1.push(c1.value)}});
    var fnList = {
      c1: {},
      c2: {}
    }
    fs.c1.forEach((value) => Object.defineProperty(fnList.c1,value,[]));
    fs.c2.forEach((value) => Object.defineProperty(fnList.c2,value,[]));
  }
}
module.exports = {
  Comparator: Comparator
}
