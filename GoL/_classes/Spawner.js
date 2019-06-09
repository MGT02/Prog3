class spawner{	
    constructor(i, j, index, k) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.energy = defaultEnergy_SP - k*delta_SP;
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

	spawn()
	{
		this.energy++;
		
		if(this.energy >= defaultEnergy_SP)
		{
			var rndCell = random(this.chooseCell(0));
			
			if(rndCell)
			{
				this.energy = 0;
				soliders.push(new Solider(rndCell[0], rndCell[1], 6));
				matrix[rndCell[0]][rndCell[1]] = 6;
			}
			else
			{
				var rndGrass = random(this.chooseCell(1));
				if(rndGrass)
				{
					this.energy = 0;
					for(var i in grasses)
					{
						if(grasses[i].i == rndGrass[0] && grasses[i].j == rndGrass[1])
						{
							grasses.splice(i, 1);
							break;
						}
					}
					soliders.push(new Solider(rndGrass[0], rndGrass[1], 6));
					matrix[rndGrass[0]][rndGrass[1]] = 6;
				}
			}
			
		}
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