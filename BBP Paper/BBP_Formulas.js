/**
 * This class contains all the Bailey-Borwein-Plouffe formulas that I will be using.
 */
class BBP{
  /**
   * 
   * @param {Number} m Is the m-th polylogarithm
   * @param {Number} z The value that you are taking the polylogarithm of
   * @param {Number} a Is the accuracy of the function (number of iterations)
   */
  static polyLogarithm(m,z,a){
    var temp = 0;
    for(let i = 0; i < a; i++){
      temp = temp + ((z^i)/(i^m));
    }
    return temp;
  }
  /**
   * Listed in paper as function (1.2)
   * @param {Number} n Number of iterations
   * @returns {Number}
   */
  f1_2(n){
    var temp = 0;
    for(let i = 0; i < n; i++){
     temp = temp + ((1/(16^i))*((4/(8*i + 1))-(2/(8*i+4))-(1/(8*i+5))-(1/(8*i+6))));
    }
    return temp;
  }
  /**
   * Unlisted, fourth unlisted function from top on page 905
   * @param {Number} n Number of iterations
   * @returns {Number}
   */
  fupg905_4(n){
    var temp = 0;
    for(let i = 0; i < n; i++){
      temp = temp + (((-1)^i)/(4^i))*((2/(4*i+1))+(2/(4*i+2))+(1/(4*i+3)));
    }
    return temp;
  }
  /**
   * Listed in paper as function (2.3)
   * @param {Number} n Number of iterations
   * @returns {Number}
   */
  f2_3(n){
    return Math.sqrt(36*BBP.polyLogarithm(2,0.5,n) - 36*BBP.polyLogarithm(2,0.25,n) - 12*BBP.polyLogarithm(2,0.125,n) + 6*BBP.polyLogarithm(2,0.015625,n));
  }
  /**
   * Unlisted, first unlisted function from top on page 906
   * @param {Number} n Number of iterations
   * @returns {Number}
   */
  fupg906_1(n){
    var temp = 0;
    for(let i = 0; i < n; i++){
      temp = temp + ((1/(64^i))*((16/((6*i+1)^2))-(24/((6*i+2)^2))-(8/((6*i+3)^3))-(6/((6*i+4)^2))+(1/((6*i+5)^2))));
    }
    temp = temp * 9/8;
    return Math.sqrt(temp);
  }
}
module.exports = {
  BBP: BBP
}