class Grass extends LivingCreature{
    constructor(i, j, index) {
       super(i, j, index);
       this.multiply = 0;
    }
	
	mul()
	{
		this.multiply++;
		//console.log(this.multiply);
		
		if(this.multiply >= defaultMulEnergy_G)
		{
			var newCell = random(this.chooseCell(0));
			
			if(newCell)
			{
				//console.log(newCell);
				
				this.multiply = 0;
				
				grasses.push(new Grass(newCell[0], newCell[1], this.index));
				
				matrix[newCell[0]][newCell[1]] = this.index;
			}
		}
	}
}