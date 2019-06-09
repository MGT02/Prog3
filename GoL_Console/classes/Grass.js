var LivingCreature = require('./LivingCreature');
var data = require('./Data');
var p5 = require('./myP5');

var matrix = data.getMatrix();
var obshyak = data.getObshyak();
var defaultMulEnergy = data.defaultMulEnergy_Grass;

class Grass extends LivingCreature{
    constructor(i, j, index) {
       super(i, j, index);
       this.multiply = 0;
    }
	
	mul()
	{
		this.multiply++;
		//console.log(this.multiply);
		
		if(this.multiply >= defaultMulEnergy)
		{
			var newCell = p5.getRandomItem(this.chooseCell(0));
			
			if(newCell)
			{
				//console.log(newCell);
				
				this.multiply = 0;
				
				obshyak[this.index].push(new Grass(newCell[0], newCell[1], this.index));
				
				matrix[newCell[0]][newCell[1]] = this.index;
			}
		}
	}
}
module.exports = Grass;