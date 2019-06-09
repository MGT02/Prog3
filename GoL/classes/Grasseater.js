class GrassEater extends LivingCreature{	
	constructor(i, j, index){
		super(i, j, index)
		this.energy = defaultEnergy_GE;
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

	move()
	{
		this.energy--;
		var nearGrasses = this.chooseCell(1);
		var nearCells = this.chooseCell(0);
		if(nearGrasses.length > 0)
		{					
			this.eat(nearGrasses, grasses, 2);
		}
		else if(nearCells.length > 0)
		{
			this.eat(nearCells, [], 0)
		}
		
		if(this.energy == 0)
		{
			this.die();
		}
		
		if(this.energy >= defaultMulEnergy_GE)
		{
			this.mul();
			this.energy = defaultEnergy_GE;
		}
	}
	
	mul()
	{		
		var newCell = random(this.chooseCell(0));
		if(newCell)
		{
			//console.log(newCell);
			
			grassEaters.push(new GrassEater(newCell[0], newCell[1], this.index));
			
			matrix[newCell[0]][newCell[1]] = this.index;
		}
	}
	
	die()
	{
		for(var i in grassEaters)
		{
			if(grassEaters[i].i == this.i && grassEaters[i].j == this.j)
			{
				grassEaters.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
}