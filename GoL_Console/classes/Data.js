/*
const defaultMulEnergy_G = 8;
const defaultEnergy_GE = 8, defaultMulEnergy_GE = 12;
const defaultEnergy_P = 30, defaultMulEnergy_P = 40, grassPeredoz = 50;
const defaultEnergy_SP = 50, delta_SP = 5;
const health_S = 250;*///solider
var spCounter = 1;
function getRandomMatrix()
{
	for(var i = 0; i < n; i++)
	{
		matrix[i] = [];
		for(var j = 0; j < m; j++)
		{
			var a = Math.floor(Math.random() * 100);//0-99
			if(j == 1 && i == parseInt(n/2))
			{
				matrix[i][j] = 4;				
			}
			else if((j >= 0 && j <= 3) && (i >= parseInt(n/2) - 2 && i <= parseInt(n/2) + 2))
			{
				matrix[i][j] = 0;
			}
			else if((j == m - 1 && (i == parseInt(n/2) || i == parseInt(n/2) - 1))
				|| (j == m - 2 && (i == parseInt(n/2) || i == parseInt(n/2) - 1)))
			{				
				matrix[i][j] = 5;
			}
			else if(a < 14)
			{		
				matrix[i][j] = 1;				
			}
			else if(a == 14)
			{
				matrix[i][j] = 2;
			}
			else if(a == 15)
			{
				matrix[i][j] = 3;
			}
			else
			{
				matrix[i][j] = 0;
			}
		}
	}
}

var setup = function(){	
	var data = require('./Data');
	for(var i = 0; i < n; i++)
	{
		for(var j = 0; j < m; j++)
		{
			if(matrix[i][j] == 1)
				grasses.push(new cl_Grass(i, j, 1));
			else if(matrix[i][j] == 2)
				grassEaters.push(new cl_GrassEater(i, j, 2));
			else if(matrix[i][j] == 3)
				predators.push(new cl_Predator(i, j, 3));
			else if(matrix[i][j] == 4)
				data.mage = new cl_Mage(i, j, 4);
			else if(matrix[i][j] == 5)
				spawners.push(new cl_Spawner(i, j, 5, spCounter++));
		}
	}
}

const delta = 5;
const n = 4 * delta, m = 8 * delta, side = 200 / delta;
var matrix = [], grasses = [], grassEaters = [], predators = [];
var spawners = [], soliders = [];
var mage = null, shit = null, granat = null;
//0-datark,1-xot,2-xotaker,3-gishatich,4-mag,5-spawner,6-zinvor,7-shit,8-granat
//var colors = ["#acacac", "green", "yellow", "red", "blue", "black", "#0972C3", "#00FFF7", "#FF8C00"];

var obshyak = [
	[],
	grasses,
	grassEaters,
	predators,
	[],
	spawners,
	soliders
];
console.log('b');
getRandomMatrix();

console.log('a');

module.exports = {
	'defaultMulEnergy_Grass' : 8,
	'defaultEnergy_GrassEater' : 8,
	'defaultMulEnergy_GrassEater' : 12,
	'defaultEnergy_Predator' : 30,
	'defaultMulEnergy_Predator' : 40,
	'grassPeredoz' : 50,
	'defaultEnergy_Spawner' : 50,
	'delta_Spawner' : 5,	
	'health_Solider' : 250,
	getObshyak : function(){
		return obshyak;
	},
	getMatrix : function(){
		return matrix;
	},
	'mage' : mage,
	'shit' : shit,
	'granat' : granat,
	'n' : n,
	'm' : m,
	'setup' : setup
}

var cl_LivingCreature = require("./LivingCreature");
var cl_Grass = require("./Grass");
var cl_GrassEater = require("./Grasseater");
var cl_Predator = require("./Predator");
var cl_Spawner = require("./Spawner");
var cl_Solider = require("./Solider");
var cl_Mage = require("./Mage");
var cl_Shit = require("./Shit");
var cl_Granat = require("./Granat");











