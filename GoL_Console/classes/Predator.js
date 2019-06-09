var LivingCreature = require('./LivingCreature');
var data = require('./Data');
var p5 = require('./myP5');

var matrix = data.getMatrix();
var obshyak = data.getObshyak();
var defaultEnergy = data.defaultEnergy_Predator;
var defaultMulEnergy = data.defaultMulEnergy_Predator;
var grass_peredoz = data.grassPeredoz;

module.exports = class Predator extends LivingCreature{	
    constructor(i, j, index) {
       super(i, j, index)
       this.energy = defaultEnergy;
       this.eatGrass = 0;
    }

	move()
	{
		this.energy--;
		var nearGrassEaters = this.chooseCell(2);
		var nearGrasses = this.chooseCell(1);
		var nearCells = this.chooseCell(0);
		var mageCell = this.chooseCell(4);

		if(nearGrassEaters.length > 0)
		{					
			this.eat(nearGrassEaters, obshyak[2], 5);
			this.eatGrass = 0;
		}
		else if(mageCell.length > 0)
		{
			this.energy += 50;
			matrix[this.i][this.j] = 0;
			this.i = data.mage.i; this.j = data.mage.j;
			matrix[this.i][this.j] = this.index;
			data.mage = null;
		}
		else if(nearGrasses.length > 0)
		{
			this.eat(nearGrasses, obshyak[1], 1);
			this.eatGrass++;
		}
		else if(nearCells.length > 0)
		{
			this.eat(nearCells, [], 0)
		}
		
		if(this.energy == 0 || this.eatGrass == grass_peredoz)
		{
			this.die();
		}
		
		if(this.energy >= defaultMulEnergy)
		{
			this.mul();
			this.energy = defaultEnergy;
		}
	}
	
	eat(food, arr, energy)
	{
		var newPos = p5.getRandomItem(food);
			
		for(var i in arr)
		{
			if(arr[i].i == newPos[0] && arr[i].j == newPos[1])
			{
				arr.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
		
		this.i = newPos[0];
		this.j = newPos[1];
		
		matrix[this.i][this.j] = this.index;
		
		this.energy += energy;
	}
	
	mul()
	{		
		var newCell = p5.getRandomItem(this.chooseCell(0));
		if(newCell)
		{
			//console.log(newCell);
			
			obshyak[this.index].push(new Predator(newCell[0], newCell[1], this.index));
			
			matrix[newCell[0]][newCell[1]] = this.index;
		}
	}
	
	die()
	{
		var arr = obshyak[this.index];
		for(var i in arr)
		{
			if(arr[i].i == this.i && arr[i].j == this.j)
			{
				arr.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
}