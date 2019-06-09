class LivingCreature{
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.multiply = 0;
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