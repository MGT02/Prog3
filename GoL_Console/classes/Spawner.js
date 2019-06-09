var LivingCreature = require('./LivingCreature');
var data = require('./Data');
var p5 = require('./myP5');
var Solider = require('./Solider.js');

var matrix = data.getMatrix();
var obshyak = data.getObshyak();
var defaultEnergy = data.defaultEnergy_Spawner;
var delta = data.delta_Spawner;

module.exports = class spawner extends LivingCreature{	
    constructor(i, j, index, k) {
       super(i, j, index)
       this.energy = defaultEnergy - k*delta;
    }

	spawn()
	{
		this.energy++;
		
		if(this.energy >= defaultEnergy)
		{
			var rndCell = p5.getRandomItem(this.chooseCell(0));
			
			if(rndCell)
			{
				this.energy = 0;
				obshyak[6].push(new Solider(rndCell[0], rndCell[1], 6));
				matrix[rndCell[0]][rndCell[1]] = 6;
			}
			else
			{
				var rndGrass = p5.getRandomItem(this.chooseCell(1));
				if(rndGrass)
				{
					this.energy = 0;
					var arr = obshyak[1];
					for(var i in arr)
					{
						if(arr[i].i == rndGrass[0] && arr[i].j == rndGrass[1])
						{
							arr.splice(i, 1);
							break;
						}
					}
					obshyak[6].push(new Solider(rndGrass[0], rndGrass[1], 6));
					matrix[rndGrass[0]][rndGrass[1]] = 6;
				}
			}
			
		}
	}
}