var cl_test1 = require("./krle/test1");
var cl_test2 = require("./krle/test2");

var matrix = require("./krle/data").getMatrix();
var data = require("./krle/data");
data.mage = null;
console.log(data.mage);
console.log(require("./krle/data").mage);

var test1 = new cl_test1(1, 1, 1);
var test2 = new cl_test2(2, 2, 2, "Sre");
var cs = require('chalk');
function app()
{
	data.mage += "23";
}
app();
console.log(data.mage);
console.log(cs.blue("assas"));
console.log(require("./krle/data").mage);
test2.prt();
/*test1.prt();
test2.prt();
matrix.push(6);
test2.prt();
var obj = test2.getObj();
matrix.push(obj.randomNumber());
test2.prt();*/
/*test1.prt();
test1.prt2();
test2.prt(23);
test2.prt2();
test2.prt3();*/


