var LivingCreature = require('./LivingCreature');
var data = require('./Data');
var p5 = require('./myP5');

var matrix = data.getMatrix();
var obshyak = data.getObshyak();
var health = data.health_Solider;

module.exports = class Solider extends LivingCreature{	
    constructor(i, j, index) {
       super(i, j, index)
       this.health = health;
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
			matrix[data.mage.i][data.mage.j] = this.index;
			this.i = data.mage.i; this.j = data.mage.j;			
			data.mage = null;
		}
		else
		{
			var pos = p5.getRandomItem(this.chooseCell());			
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
			arr = obshyak[1];
		}
		else if(index == 2)
		{
			arr = obshyak[2];
		}
		else if(index == 3)
		{
			arr = obshyak[3];
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