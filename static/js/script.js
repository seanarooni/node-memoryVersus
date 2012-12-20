/* Author: Sean Iveson
*/

$(document).ready(function() {   

  var socket = io.connect();
  var d;
    
  function init()
  {
  	if(typeof game_loop != "undefined") {
  	 clearInterval(game_loop); }
  	  game_loop = setInterval(handleButtons, 100);
  	  d = null;
  }  
  init();
    
  function revert()
  {
    setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 200);
  }

 function handleButtons()
  {
	  if(d == 'up')
	  {
		socket.emit('message', 'up (yellow) pressed on ' + new Date());
		document.panel.src='http://www.tadcoenvironmental.com/simon/upSelected1.png';
		revert();
	  } else if(d == 'down') { //down
		socket.emit('message', 'down (blue) pressed on ' + new Date());
		document.panel.src='http://www.tadcoenvironmental.com/simon/downSelected1.png';
		revert();
	  } else if(d == 'left') { //left
		socket.emit('message', 'left (green) pressed on ' + new Date());
		document.panel.src='http://www.tadcoenvironmental.com/simon/_leftSelected1.png';
		revert();
	  } else if(d == 'right') { //right
		socket.emit('message', 'right (red) pressed on ' + new Date());
		document.panel.src='http://www.tadcoenvironmental.com/simon/_rightSelected1.png';
		revert();
	  }

  $('#up').bind('click', function() {
    d = 'up';
  });
  
  $('#right').bind('click', function() {
    d = 'right';
  });
  
  $('#down').bind('click', function() {
    d = 'down';
  });
  
  $('#left').bind('click', function() {
  	d = 'left';
  });
  
  $(document).keydown(function(e){
  	var key = e.which;
  	
  	if(key == "38") d = 'up';
  	else if(key == "40") d = 'down';
  	else if(key == "37") d = 'left';
	else if(key == "39") d = 'right';
  	});
  	d = null;
  }		
  
  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });
});