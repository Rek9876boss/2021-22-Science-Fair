const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({precision: MAX_DIGITS, rounding: 1});
class Chu{
    /**
     * 
     * @param {Number} x 
     * @param {Number} n 
     * @returns {Number}
     */
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
     * @param {Number} n The base of the shifted factorial
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
}
module.exports = {
    Chu:Chu
}
