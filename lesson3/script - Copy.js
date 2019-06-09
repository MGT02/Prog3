var fs = require('fs');

function main()
{
	var file = "hello6.txt";
	fs.writeFile(file, "90", function(err){
		console.log("finsih");
	});
	console.log("write...");
}
main();