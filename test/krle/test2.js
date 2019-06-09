//consts
const Krle = require("./test1.js");
var data = require('./data.js');

class myClass extends Krle{	
	
	constructor(i, j, index, ok) {
       super(i, j, index);
	   this.ok = ok;
    }
	
	prt()
	{
		console.log(data.mage);
	}
	getObj(){
		return new myClass(0, 0, 0, "new");
	}
	randomNumber()
	{
		return Math.random(10);
	}
	/*
	prt()
	{
		console.log(matrix);
	}
	prt(delta)
	{
		console.log(delta);
	}
	prt2()
	{
		console.log(this.index)
	}
	prt3()
	{
		console.log(this.ok)
	}*/
}
module.exports = myClass;
