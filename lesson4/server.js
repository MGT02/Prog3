var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
console.log('8080');
server.listen(8080);

io.on('connection', function (socket) {
	io.to(socket.id).emit("name");
	socket.on('nick', function(nick){
		socket.my_prop_name = nick;
	});
	
	for(var i in messages) {
	 io.to(socket.id).emit("display message", messages[i]);
	 //io.sockets.emit();
	}

	socket.on("send message", function (data) {
	   messages.push([data, this.my_prop_name]);
	   io.sockets.emit("display message", [data, this.my_prop_name]);
	});
});
