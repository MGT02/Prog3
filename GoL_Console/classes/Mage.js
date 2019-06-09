var LivingCreature = require('./LivingCreature');
var data = require('./Data');
var Shit = require('./Shit');
var Granat = require('./Granat');
var p5 = require('./myP5');

var matrix = data.getMatrix();
var obshyak = data.getObshyak();

module.exports = class Mage extends LivingCreature
{	
	getDirections(i, j)
	{
		var directions = [
			[i-2, j-1],
			[i-2, j],
			[i-2, j+1],
			[i-1, j+2],
			[i, j+2],
			[i+1, j+2],
			[i+2, j+1],
			[i+2, j],
			[i+2, j-1],
			[i+1, j-2],
			[i, j-2],
			[i-1, j-2]
			];
		return directions;
	}
	
	granatDirection(i, j)
	{
		var direction = [
			[i-4, j],
			[i-4, j+1],
			[i-4, j+2],
			[i-3, j+3],
			[i-2, j+4],
			[i-1, j+4],
			[i, j+4],
			[i+1, j+4],
			[i+2, j+4],
			[i+3, j+3],
			[i+4, j+2],
			[i+4, j+1],
			[i+4, j],
			[i+4, j-1],
			[i+4, j-2],
			[i+3, j-3],
			[i+2, j-4],
			[i+1, j-4],
			[i, j-4],
			[i-1, j-4],
			[i-2, j-4],
			[i-3, j-3],
			[i-4, j-2],
			[i-4, j-1],
			];
		var arr = [];
		for(var k in direction)
		{
			var a = direction[k][0];
			var b = direction[k][1];
			if(matrix[a] == undefined || matrix[a][b] == undefined)
				continue;
			arr.push(direction[k]);
		}
		return arr;
	}
	
	goTo(newPos)
	{
		if(matrix[newPos[0]] == undefined || matrix[newPos[0]][newPos[1]] == undefined)
			return;
		
		var index = matrix[newPos[0]][newPos[1]];
		if(index == 0)
		{
			matrix[this.i][this.j] = 0;
			this.i = newPos[0]; this.j = newPos[1];
			matrix[this.i][this.j] = this.index;
		}
		else if(index == 1)
		{
			matrix[this.i][this.j] = 0;
			this.i = newPos[0]; this.j = newPos[1];
			matrix[this.i][this.j] = this.index;
			var arr = obshyak[1];
			for(var i in arr)
			{
				if(arr[i].i == this.i && arr[i].j == this.j)
				{
					arr.splice(i, 1);
				}
			}
		}
		else if(index == 8)
		{
			matrix[this.i][this.j] = 0;
			data.mage = null;
		}
	}
	
	move(put)
	{
		if(data.shit != null)
			data.shit.die();
		
		if(put == 1)//aj
		{
			this.goTo([this.i, this.j + 1]);
		}
		else if(put == 2)//dzax
		{
			this.goTo([this.i, this.j - 1]);
		}
		else if(put == 3)//verev
		{
			this.goTo([this.i - 1, this.j]);
		}
		else if(put == 4)//nerqev
		{
			this.goTo([this.i + 1, this.j]);
		}
	}
	
	granatQci()
	{
		var rndPos = p5.getRandomItem(this.granatDirection(this.i, this.j));
		if(rndPos)
		{
			var index = matrix[rndPos[0]][rndPos[1]];
			for(var i in obshyak[index])
			{
				if(obshyak[index][i].i == rndPos[0] && obshyak[index][i].j == rndPos[1])
					obshyak[index].splice(i, 1);
			}
			matrix[rndPos[0]][rndPos[1]] = 8;
			data.granat = new Granat(rndPos[0], rndPos[1], 8);
		}
	}
	
	attack()
	{		
		if(data.shit != null)
			data.shit.die();
		
		var rndPos = p5.getRandomItem(this.chooseCell());
		if(rndPos)
		{
			var index = matrix[rndPos[0]][rndPos[1]];
			for(var i in obshyak[index])
			{
				if(obshyak[index][i].i == rndPos[0] && obshyak[index][i].j == rndPos[1])
				{
					obshyak[index].splice(i, 1);
					break;
				}
			}
			matrix[rndPos[0]][rndPos[1]] = 7;
			data.shit = new Shit(rndPos[0], rndPos[1], 7, this.i, this.j);
		}
	}
	
	chooseCell() 
	{
		var found = [];
		var arr = this.getDirections(this.i, this.j);
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(!(matrix[i] == undefined || matrix[i][j] == undefined))
		   {
				found.push(arr[k]);
		   }
		}

		return found;
	}
}