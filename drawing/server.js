var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
console.log('8080');
server.listen(8080);

var drawDates = [];

io.on('connection', function (socket) {
	io.to(socket.id).emit('draw', drawDates);
	io.to(socket.id).emit('connect');
	
	socket.on('position', function (data){
		drawDates.push(data);
		io.sockets.emit('drawNew', data);
	});
});


	/*io.to(socket.id).emit("name");
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
	});*/