//||require
//var cs = require("./colors");
const cs = require('chalk');
var data = require("./classes/Data");
const readline = require('readline');
//kareliya guyny sev sarqel vor kursory chereva... prosto maki vra spitka
//petqa spitak consoli vra gunery havqel

console.reset = function () {
  return process.stdout.write('\033c');
}
console.resetCursorPosition = function(){
	return process.stdout.write('\033[0;0H');
}

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.log(cs.Yellow+'Hello'+cs.Reset);
//||require
//|||script
var matrix = data.getMatrix();
var obshyak = data.getObshyak();
var colors = [cs.hex("#acacac"), cs.keyword("green"), cs.keyword("yellow"), cs.keyword("red"),
	cs.keyword("blue"), cs.keyword("black"), cs.hex("#0972C3"), cs.hex("#00FFF7"), cs.hex("#FF8C00")];

var map = "";	

function drawMatrix() 
{
	//console.reset();
	console.resetCursorPosition();
	for (var i = 0; i < data.n; i++) 
	{
		for (var j = 0; j < data.m; j++) 
		{
			map += colors[matrix[i][j]](matrix[i][j]);
		}
		console.log(map);
		map = '';
	}
}

const defRate = 10;
var myRate = defRate, granatCounter = 0, granatRate = 0;
function draw()
{
	drawMatrix();	
	//console.log(keyNumber);
	if(myRate-- <= 0)
	{
		//console.log(grasses,1);
		myRate = defRate
		for(var i in obshyak[1])
		{
			obshyak[1][i].mul();
		}	
		for(var i in obshyak[2])
		{
			obshyak[2][i].move();
		}
		for(var i in obshyak[3])
		{
			obshyak[3][i].move();
		}
		for(var i in obshyak[6])
		{
			obshyak[6][i].move();
		}
		for(var i in obshyak[5])
		{
			obshyak[5][i].spawn();
		}
	}	
	
	if(data.shit != null)
	{
		data.shit.move();
	}
	
	if(data.mage != null)
	{
		if(keyNumber > 0)
		{
			if(keyNumber == 10)
			{
				data.mage.attack();
			}
			else if(keyNumber == 5)
			{
				if( granatCounter >= defRate * 4)//vor else chmtni
				{
					granatCounter = 0;
					data.mage.granatQci();
				}
			}
			else
			{
				data.mage.move(keyNumber);
				//console.log('moove');
			}
			keyNumber = 0;
		}
	}
	else
	{
		if(data.shit != null)
			data.shit.die();
	}
	if(data.granat != null && ++granatRate == 2)
	{
		granatRate = 0;
		data.granat.live();
	}
	granatCounter++;
}

var keyNumber = 0;
process.stdin.on('keypress', (str, key) => {
  if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
    process.exit();
  }
  else{
	if(key.name == "down")
	{
		keyNumber = 4;
	}
	else if(key.name == "up")
	{
		keyNumber = 3;
	}
	else if(key.name == "left")
	{
		keyNumber = 2;
	}
	else if(key.name == "right")
	{
		keyNumber = 1;
	}
	else if(key.name == "space")
	{
		keyNumber = 10;
	}
	else if(key.name == "g")
	{
		keyNumber = 5;
	}
	else if(key.name == "m")
	{
		draw();
	}
	else if(key.name == "d")
	{
		console.log(data.shit);
	}
	else
	{
		keyNumber = 0;
	}
  }
});

console.reset();
data.setup();
drawMatrix();
setInterval(draw, 50);
//|||script
