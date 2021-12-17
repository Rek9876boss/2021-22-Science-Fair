const fs = require('fs');
const Chu = require('./Chu Paper/Chu_Formulas').Chu;
const BBP = require('./BBP Paper/BBP_Formulas').BBP;
const Comparator = require('./comparison').Comparator;
/**
 * The class used to initialize the data
 */
class Data {
    /**
     * @constructor
     * @param {number} n number of iterations
     */
    static init = (function (n) {
        Comparator.makeListBBP(n);
        Comparator.makeListChu(n);
        Data.prototype.iterations = n;
        Data.prototype.BBP = JSON.parse(fs.readFileSync("./BBPData.json", "utf-8"));
        Data.prototype.Chu = JSON.parse(fs.readFileSync("./ChuData.json", "utf-8"));
        return Object.create(Data.prototype);
    });
    make() {
        var lists = {
            "Number of iterations": this.iterations,
            "BBP Data": this.BBP,
            "Chu Data": this.Chu
        }
        const data = JSON.stringify(lists, null, 4);
        fs.writeFileSync("./data.json", data);
    }
}
var dataContainer = Data.init(10000);
dataContainer.make();