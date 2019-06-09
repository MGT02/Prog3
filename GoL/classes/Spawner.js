class spawner extends LivingCreature{	
    constructor(i, j, index, k) {
       super(i, j, index)
       this.energy = defaultEnergy_SP - k*delta_SP;
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
}