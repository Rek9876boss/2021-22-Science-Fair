const mathjs = require("mathjs");
const Decimal = require("decimal.js").Decimal;
Decimal.set({precision: MAX_DIGITS, rounding: 1});
/**
 * This class contains all the Chu formulas that I will be using.
 * @fXY {x: Letter} {y: number} is a listed function.
 * @fuY {y: any} is unlisted. see description for more information.
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
    static fA1(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([0.5,0.5,0.5],[1,1,1],k)*((1+6*k)/(4^k)));
        }
        return Decimal.div(4,temp);
    }
    static fA2(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/3,1/3,2/3,2/3],[1,1,1,3/2],k)*((2+18*k+27*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.sqrt(3).mul(9),temp.mul(2));
    }
    static fA3(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/4,1/4,3/4,3/4],[1,1,1,3/2],k)*((3+32*k+48*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.sqrt(2).mul(8),temp);
    }
    static fA4(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/6,1/6,5/6,5/6],[1,1,1,3/2],k)*((5+72*k+108*k^2)/(4^k)));
        }
        return Decimal.div(18,temp);
    }
    static fA5(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/5,1/5,4/5,4/5],[1,1,1,3/2],k)*((4+50*k+75*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(25,Decimal.sqrt(Decimal.sub(5,Decimal.sqrt(5)))),Decimal.sqrt(2).mul(2).mul(temp));
    }
    static fA6(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([2/5,2/5,3/5,3/5],[1,1,1,3/2],k)*((6+50*k+75*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(25,Decimal.sqrt(Decimal.add(5,Decimal.sqrt(5)))));
    }
    static fA7(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/8,1/8,7/8,7/8],[1,1,1,3/2],k)*((7+128*k+192*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(32,Decimal.sqrt(Decimal.sub(2,Decimal.sqrt(2)))),temp);
    }
    static fA8(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([3/8,3/8,5/8,5/8],[1,1,1,3/2],k)*((15+128*k+192*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(32,Decimal.sqrt(Decimal.add(2,Decimal.sqrt(2)))),temp);
    }
    static fA9(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/3,1/3,2/3,2/3],[1,3/2,5/4,5/3],k)*((7+27*k+27*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(temp,Decimal.sqrt(3)),4);
    }
    static fA10(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/4,1/4,3/4,3/4],[1,3/2,5/4,7/4],k)*((13+48*k+48*k^2)/(4^k)));
        }
        return Decimal.div(temp,Decimal.mul(3,Decimal.sqrt(2)));
    }
    static fA11(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/6,1/6,5/6,5/6],[1,3/2,7/6,11/6],k)*((31+108*k+108*k^2)/(4^k)));
        }
        return Decimal.div(temp,10);
    }
    static fA12(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/5,1/5,4/5,4/5],[1,3/2,6/5,9/5],k)*((7+25*k+25*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(temp,Decimal.mul(3,Decimal.sqrt(Decimal.sub(5,Decimal.sqrt(5))))),Decimal.mul(8,Decimal.sqrt(2)));
    }
    static fA13(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([2/5,2/5,3/5,3/5],[1,3/2,7/5,8/5],k)*((19+75*k+75*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(temp,Decimal.sqrt(Decimal.add(5,Decimal.sqrt(5)))),Decimal.mul(12,Decimal.sqrt(2)));
    }
    static fA14(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([1/8,1/8,7/8,7/8],[1,3/2,9/8,15/8],k)*((19+64*k+64*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(temp,Decimal.mul(3,Decimal.sqrt(Decimal.sub(2,Decimal.sqrt(2))))),14);
    }
    static fA15(n){
        var temp = new Decimal(0);
        for(let k=0;k<n;k++){
            temp = temp.add(hgeo([3/8,3/8,5/8,5/8],[1,3/2,11/8,13/8],k)*((49+192*k+192*k^2)/(4^k)));
        }
        return Decimal.div(Decimal.mul(temp,Decimal.sqrt(Decimal.add(2,Decimal.sqrt(2)))),30);
    }
    functionList = {
        fA1: Chu.fA1,
        fA2: Chu.fA2,
        fA3: Chu.fA3,
        fA4: Chu.fA4,
        fA5: Chu.fA5,
        fA6: Chu.fA6,
        fA7: Chu.fA7,
        fA8: Chu.fA8,
        fA9: Chu.fA9,
        fA10: Chu.fA10,
        fA11: Chu.fA11,
        fA12: Chu.fA12,
        fA13: Chu.fA13,
        fA14: Chu.fA14,
        fA15: Chu.fA15
    }
}
module.exports = {
    Chu:Chu
}
