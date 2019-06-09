class Shit
{
	constructor(i1, j1, index, i, j)
	{
		this.i = i1;
		this.j = j1;
		this.index = index;
		this.transform = [
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
		]
		this.p = 0;
		for(var k in this.transform)
		{
			if(this.transform[k][0] == this.i && this.transform[k][1] == this.j)
			{
				this.p = k;
				break;
			}
		}
	}
	
	move()
	{
		matrix[this.i][this.j] = 0;	
		
		if(this.p == this.transform.length - 1)
			this.p = 0;
		else
			this.p++;

		var i = this.transform[this.p][0];
		var j = this.transform[this.p][1];
		if(matrix[i] == undefined || matrix[i][j] == undefined
		|| matrix[i][j] == 8)
		{
			shit = null;
		}
		else
		{
			var index = matrix[i][j];
			
			for(var k in obshyak[index])
			{
				if(obshyak[index][k].i == i && obshyak[index][k].j == j)
				{
					obshyak[index].splice(k, 1);
				}
			}
			this.i = i; this.j = j;
			matrix[i][j] = this.index;		
		}
	}
	die()
	{
		matrix[this.i][this.j] = 0;	
		shit = null;
	}
}