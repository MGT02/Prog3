class GrassEater{	
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.energy = defaultEnergy_GE;
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