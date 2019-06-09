//var cs = require("./colors");
const readline = require('readline');
const cs = require('chalk');
console.reset = function () {
  return process.stdout.write('\033c');
}
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
    process.exit();
  } 
  else {
	  if(key.name == 'c')
		  console.reset();
	  else{
		console.log(`You pressed the "${str}" key`);
		console.log();
		console.log(key);
		console.log();
	  }
  }
});
var colors = [cs.hex("#acacac"), cs.keyword("green"), cs.keyword("yellow"), cs.keyword("red"),
	cs.keyword("blue"), cs.keyword("black"), cs.hex("#0972C3"), cs.hex("#00FFF7"), cs.hex("#FF8C00")];
//console.log(cs.red('Press any key...'));
console.log(colors[6]('krleeee'));
//console.log(cs.Yellow+'Hello'+cs.Reset);

