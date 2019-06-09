var fs = require('fs');
var tupoyText = "Apple yep";
const file_tup = "textTup.txt";
const file_unTup = "unTup.txt";
function main()
{
	fs.writeFileSync(file_tup, tupoyText);
	var unTup = fs.readFileSync(file_tup).toString();
	console.log(tupoyText == unTup);
	console.log(unTup);
	fs.writeFileSync(file_unTup, 
		unTup.replace("Apple", "Microsoft")
	);
}
main();