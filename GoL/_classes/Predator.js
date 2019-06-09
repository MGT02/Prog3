class Predator{	
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.energy = defaultEnergy_P;
       this.eatGrass = 0;
    }
	
	getDirections()
	{
		var directions = [
			[this.i - 1, this.j - 1],
			[this.i    , this.j - 1],
			[this.i + 1, this.j - 1],
			[this.i - 1, this.j    ],
			[this.i + 1, this.j    ],
			[this.i - 1, this.j + 1],
			[this.i    , this.j + 1],
			[this.i + 1, this.j + 1]
			];
		return directions;
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
			this.eat(nearGrassEaters, grassEaters, 5);
			this.eatGrass = 0;
		}
		else if(mageCell.length > 0)
		{
			this.energy += 50;
			matrix[this.i][this.j] = 0;
			this.i = mage.i; this.j = mage.j;
			matrix[this.i][this.j] = this.index;
			mage = null;
		}
		else if(nearGrasses.length > 0)
		{
			this.eat(nearGrasses, grasses, 1);
			this.eatGrass++;
		}
		else if(nearCells.length > 0)
		{
			this.eat(nearCells, [], 0)
		}
		
		if(this.energy == 0 || this.eatGrass == grassPeredoz)
		{
			this.die();
		}
		
		if(this.energy >= defaultMulEnergy_P)
		{
			this.mul();
			this.energy = defaultEnergy_P;
		}
	}
	
	eat(food, arr, energy)
	{
		var newPos = random(food);
			
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
		var newCell = random(this.chooseCell(0));
		if(newCell)
		{
			//console.log(newCell);
			
			predators.push(new Predator(newCell[0], newCell[1], this.index));
			
			matrix[newCell[0]][newCell[1]] = this.index;
		}
	}
	
	die()
	{
		for(var i in predators)
		{
			if(predators[i].i == this.i && predators[i].j == this.j)
			{
				predators.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
	
	chooseCell(character) 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == character) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
}