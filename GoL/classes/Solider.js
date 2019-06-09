class Solider extends LivingCreature{	
    constructor(i, j, index) {
       super(i, j, index)
       this.health = health_S;
    }

	move()
	{
		this.health--;
		if(this.health == 0)
		{
			this.die();
			return
		}
		
		var nearMage = this.chooseMage();

		if(nearMage.length > 0)
		{				
			matrix[this.i][this.j] = 0;
			matrix[mage.i][mage.j] = this.index;
			this.i = mage.i; this.j = mage.j;			
			mage = null;
		}
		else
		{
			var pos = random(this.chooseCell());			
			if(pos)
			{
				var index = matrix[pos[0]][pos[1]];
				this.destroy(pos, index);
			}
		}
	}
	
	destroy(pos, index)
	{
		var arr = [];
		if(index == 1)
		{
			arr = grasses;
		}
		else if(index == 2)
		{
			arr = grassEaters;
		}
		else if(index == 3)
		{
			arr = predators;
		}
	
		for(var i in arr)
		{
			if(arr[i].i == pos[0] && arr[i].j == pos[1])
			{
				arr.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
		
		this.i = pos[0];
		this.j = pos[1];
		
		matrix[this.i][this.j] = this.index;
	}
	
	die()
	{
		for(var i in soliders)
		{
			if(soliders[i].i == this.i && soliders[i].j == this.j)
			{
				soliders.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
	
	chooseCell() 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] <= 3) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
	chooseMage() 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == 4) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
}