/* Author: Sean Iveson
*/

$(document).ready(function() {   

  var socket = io.connect();

  $('#up').bind('click', function() {
  	socket.emit('message', 'Yellow button pressed on ' + new Date());
  	document.panel.src='http://www.tadcoenvironmental.com/simon/upSelected1.png';
  	setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 200);
  });
  
  $('#right').bind('click', function() {
  	socket.emit('message', 'Red button pressed on ' + new Date());
  	document.panel.src='http://www.tadcoenvironmental.com/simon/leftSelected1.png';
  	setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 200);

  });
  
  $('#down').bind('click', function() {
  	socket.emit('message', 'Blue button pressed on ' + new Date());
  	document.panel.src='http://www.tadcoenvironmental.com/simon/downSelected1.png';
  	setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 200);

  });
  
  $('#left').bind('click', function() {
  	socket.emit('message', 'Green button pressed on ' + new Date());
  	document.panel.src='http://www.tadcoenvironmental.com/simon/rightSelected1.png';
  	setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 200);

  });
  
  $('#sender').bind('click', function() {
   socket.emit('message', 'Message Sent on ' + new Date());     
  });

  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });
});