var socket = null;
function setup(){
	createCanvas(windowWidth, windowHeight);
	background(50);
	socket = io();
	
	socket.on('draw', drawFull);
	socket.on('drawNew', drawNew);
	socket.on('connect', function (){connect = true});
}
var size = 50;
var color;
function draw(){
	if(connect)	{
		color = [random(255), random(255), random(255)];
		fill(color[0], color[1], color[2]);
		connect = false;
	}
	if(ful){
		for(var i in drawDates){
			fill(drawDates[i][2][0], drawDates[i][2][1], drawDates[i][2][2]);
			ellipse(drawDates[i][0], drawDates[i][1], size, size);
		}
		
		ful = false;
	}
	if(New){
		fill(drawDate[2][0], drawDate[2][1], drawDate[2][2]);
		ellipse(drawDate[0], drawDate[1], size, size);
		New = false;
	}
}
var ful = false, New = false, connect = false;
var drawDates = null, drawDate = null;
function drawFull(val){
	if(val.langth == 0)
		return;
	
	drawDates = val;
	ful = true;
}

function drawNew(val){
	drawDate = val;
	New = true;
}

function mousePressed(){
	socket.emit('position', [mouseX, mouseY, color]);
}
function mouseDragged(){
	socket.emit('position', [mouseX, mouseY, color]);
}


/*function main() {
   var socket = io();
   var chatDiv = document.getElementById('chat');
   var input = document.getElementById('message');
   var button = document.getElementById('submit');

   function handleSubmit(evt) {
       var val = input.value;
       if (val != "") {
           socket.emit("send message", val);
       }
   }
   button.onclick = handleSubmit;
   
   function handleMessage(msg) {
   		var p = document.createElement('p');
   		p.innerText = msg[1] + ' : ' + msg[0];
   		chatDiv.appendChild(p);
   		input.value = "";
	}
	
	function printName(){
		var name = prompt('your nick :');
		socket.emit('nick', name);
	}

	socket.on('display message', handleMessage);
	socket.on('name', printName);
} // main closing bracket

window.onload = main;  */