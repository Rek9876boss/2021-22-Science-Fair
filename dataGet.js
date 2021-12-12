const fs = require('fs');
const comparison = require('./comparison').Comparator;
const ChuFormulas = require('./Chu Paper/Chu_Formulas').Chu;
const BbpFormulas = require('./BBP Paper/BBP_Formulas').BBP;



class Data {
    constructor(n) {
        this.iterations = n;
        Comparator.makeListBBP(n);
        fs.readFile("./BBPData.json", "utf-8", (err, data) => {
            if (err) {
                throw err;
            }
            var BBPData = JSON.parse(data.toString());
            this.BBP = BBPData;
        });
        Comparator.makeListChu(n);
        fs.readFile("./ChuData.json", "utf-8", (err, data) => {
            if (err) {
                throw err;
            }
            var ChuData = JSON.parse(data.toString());
            this.Chu = ChuData;
        });
    }
}

