var express = require("express");
var app = express();

app.use(express.static("../GoL"));

app.get("/", function(rq, rs)
{
	//???
	//rs.send("<body style='zoom: 3'></body>");
	rs.send("<h1 style='text-align: center'>Hello world</h1>");
	//rs.send("</body>");
});

app.get("/gol", function(rq, rs)
{
	rs.redirect('index2.html');
});

app.get("/google", function(rq, rs)
{
	rs.redirect('http://google.com');
});

app.get("/google/:search", function(rq, rs)
{
	var search = rq.params.search;
	rs.redirect('http://google.com/search?q=' + search);
});

app.get("/*", function(rq, rs)
{
	rs.send("<h1 style='color: red, font-size: 30px'>ERROR 404</h1>");
});

const portNumber = 8080;

app.listen(portNumber, function(){
	console.log("port" + portNumber);
});