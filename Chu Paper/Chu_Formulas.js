const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({precision: MAX_DIGITS, rounding: 1});
/**
 * This class contains all the Chu formulas that I will be using.
 */
class Chu{
    static sFactiorial(x,n){
        if(n === 0){
            return 1;
        } else {
            return mathjs.gamma(x+n)/mathjs.gamma(x);
        }
    }
    /**
     * 
     * @param {Array<number>} a The list of values on top
     * @param {Array<number>} A The list of values on bottom
     * @param {number} n The base of the shifted factorial
     */
    static hgeo(a,A,n){
        a.forEach(x => Chu.sFactiorial(x,n));
        A.forEach(x => Chu.sFactiorial(x,n));
        return mathjs.prod(a)/mathjs.prod(A);
    }
    /**
     * Listed in paper as function A1
     * @param {Number} n Number of iterations
     * @returns {Decimal}
     */
    static fA1(n){
        var temp = new Decimal('0');
        for(let i=0;i<n;i++){
            temp = temp.plus(hgeo([0.5,0.5,0.5],[1,1,1],i)*((1+6*i)/(4^i)));
        }
        return temp.toPower(-1).times(4);
    }
    functionList = {
        fA1: Chu.fA1
    }
}
module.exports = {
    Chu:Chu
}
