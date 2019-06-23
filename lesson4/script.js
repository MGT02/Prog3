function main() {
   var socket = io('http://localhost:8080/');
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

window.onload = main;  