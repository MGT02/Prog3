var data = require('./Data');
var p5 = require('./myP5');

var matrix = data.getMatrix();
var obshyak = data.getObshyak();

module.exports = class Granat
{
	constructor(a, b, index)
	{
		this.i = a;
		this.j = b;
		this.index = index;
		this.res1 = []; this.res2 = [];
		this.res25 = [];//res2.5
		this.res = 0;
		//console.log(a, b);
		for(var i = a - 3; i <= a + 3; i++)
		{
			for(var j = b - 3; j <= b + 3; j++)
			{
				if((matrix[i] == undefined || matrix[i][j] == undefined)
					|| (i == a && j == b))
					continue;
				
				if((i >= a-1 && i <= a+1) && (j >= b-1 && j <= b+1))
				{
					this.res1.push([i, j]);
				}
				else if(
				(i == a-2 && (j >= b-1 && j <= b+1))||
				(i == a+2 && (j >= b-1 && j <= b+1))||
				(j == b-2 && (i >= a-1 && i <= a+1))||
				(j == b+2 && (i >= a-1 && i <= a+1))
				)
				{
					this.res25.push([i, j]);
				}
				else if(!(
				(j == b-3 &&(i == a-3 || i == a-2 || i== a+3 || i==a+2))||
				(j == b+3 &&(i == a-3 || i == a-2 || i== a+3 || i==a+2))||
				(i == a - 3 && (j == b-2 || j==b+2))||
				(i == a + 3 && (j == b-2 || j==b+2))
				))
				{
					this.res2.push([i, j]);
				}
			}
		}
		//console.log(this.res1);
		//console.log(this.res2);
	}
	
	drawVzryv(arr)
	{
		for(var j in arr)
			{
				var index = matrix[arr[j][0]][arr[j][1]];
				if(index == 4)
				{
					data.mage = null;
				}
				else if(index == 7)
				{
					data.shit.die();
				}
				else
				{
					for(var i in obshyak[index])
					{
						if(obshyak[index][i].i == arr[j][0] && obshyak[index][i].j == arr[j][1])
						{
							obshyak[index].splice(i, 1);
							break;
						}
					}
				}
				matrix[arr[j][0]][arr[j][1]] = this.index;
			}
	}
	removeVzryv(arr)
	{
		for(var j in arr)
			{				
				matrix[arr[j][0]][arr[j][1]] = 0;
			}
	}
	
	live()
	{
		this.res++;
		if(this.res == 1)
		{
			this.drawVzryv(this.res1);
		}
		else if(this.res == 2)
		{
			this.drawVzryv(this.res25);
		}
		else if(this.res == 3)
		{
			this.drawVzryv(this.res2);
		}
		else if(this.res == 4)
		{
			matrix[this.i][this.j] = 0;
		}
		else if(this.res == 5)
		{
			this.removeVzryv(this.res1);
		}
		else if(this.res == 6)
		{
			this.removeVzryv(this.res25);
		}
		else if(this.res == 7)
		{
			this.removeVzryv(this.res2);
			data.granat = null;
		}
	}
}