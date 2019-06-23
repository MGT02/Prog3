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
var my_color;
function draw(){
	if(connect)	{
		my_color = [random(255), random(255), random(255)];
		fill(my_color[0], my_color[1], my_color[2]);
		connect = false;
	}
	if(ful){
		for(var i in drawDates){
			fill(drawDates[i][2][0], drawDates[i][2][1], drawDates[i][2][2]);
			ellipse(drawDates[i][0], drawDates[i][1], size, size);
		}
		
		ful = false;
	}
	if(drawDateArr.length > 0){
		fill(drawDateArr[0][2][0], drawDateArr[0][2][1], drawDateArr[0][2][2]);
		ellipse(drawDateArr[0][0], drawDateArr[0][1], size, size);
		drawDateArr.splice(0, 1);
	}
}
var ful = false, New = false, connect = false;
var drawDates = null, drawDateArr = [];
function drawFull(val){
	if(val.langth == 0)
		return;
	
	drawDates = val;
	ful = true;
}

function drawNew(val){
	drawDateArr.push(val);
}

function mousePressed(){
	socket.emit('position', [mouseX, mouseY, my_color]);
}
function mouseDragged(){
	socket.emit('position', [mouseX, mouseY, my_color]);
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