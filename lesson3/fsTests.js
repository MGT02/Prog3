var fs = require('fs');

var obj = {
	'first_name': 'Vardan',
	'last_name': "Hovsepyan",
	"age": 13,
	"tumoci": true
}

var jsonchik = JSON.stringify(obj);

fs.writeFileSync("obj.json", jsonchik);
console.log('Okay');