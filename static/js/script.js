/* Author: Sean Iveson
*/

$(document).ready(function() {   

  var socket = io.connect();
  var d;
  var score = 0;
  var duration = 250;
  var spacing = 750;
  var pattern = new Array();
  var response = new Array();
  var listen = false; 
    
  function init()
  {
    for (var i=0; i<2; i++)  //loop to start the pattern[]  might become populatePattern()
    {
		pattern[i] = Math.floor((Math.random()*4)+1);
		console.log("pattern[" + i + "] = " + pattern[i]);
    }
    
  	if(typeof game_loop != "undefined") {
  	 clearInterval(game_loop); }
  	  game_loop = setInterval(handleButtons, 60);
  }  // end of init()
  init();
    
  function revert()
  {
    setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 200);
  } 
  
  function populatePattern()  //currently unused
  {
  }
  
  function playSingle()
  {
    //this should play one note, and i can call it within playPattern
  }
  
  function playPattern()
  {
  	var i = 0;
	  //p = pattern[i];	
	  //console.log('p= ' + p);
	//play(0);
	  (function play()
	  {
		  setTimeout(function()
		  {
			revert();
		  }, duration + spacing);  //controls flash duration.  
		  
		  //recursion goes here
		  console.log('i = ' + i + ' just before recursion');
		  if(i<pattern.length)
		  {
		    console.log('i = ' + i + ' during if');
		    //p = pattern[i];
		    (function()
		    {
		      p = pattern[i];
		      console.log('well i = ' + i);
			  console.log('well p= ' + p);
				  if(p == 1 )//yup  I can do src='http://www.tadcoenvironmental.com/simon/' + p + 'Selected1.png' for all lines
				  {
					setTimeout(document.panel.src='http://www.tadcoenvironmental.com/simon/upSelected1.png', 250*(i+1));
					revert();
				  } else if(p == 4) { //down
					setTimeout(document.panel.src='http://www.tadcoenvironmental.com/simon/downSelected1.png', 250*(i+1));
					revert();
				  } else if(p == 2) { //left
					setTimeout(document.panel.src='http://www.tadcoenvironmental.com/simon/_leftSelected1.png', 250*(i+1));
					revert();
				  } else if(p == 3) { //right
					setTimeout(document.panel.src='http://www.tadcoenvironmental.com/simon/_rightSelected1.png', 250*(i+1));
					revert();
				  }
		    })(); // end of setTimeout
		    i++;
		    play();
		  } else {
		    listen = true;
		    console.log('set listen to true');
		  }
	    })(); //end of function play()
  }//end of playPattern

  function evaluate()
  {
    //compare pattern to response array
  }

  function handleButtons()
  {
     var myDate = new Date();
     var myEpoch = myDate.getTime()/1000.00;
	
	  //if listen = false
	  if(listen == false) playPattern();
	  
	  
	  $('#up').bind('click', function() {d = 'up';});
	  $('#right').bind('click', function() {d = 'right';});
	  $('#down').bind('click', function() {d = 'down';});
	  $('#left').bind('click', function() {d = 'left';});
	  
	  $(document).keydown(function(e){
		var key = e.which;
		if(key == "38") d = 'up';
		else if(key == "40") d = 'down';
		else if(key == "37") d = 'left';
		else if(key == "39") d = 'right';
		});
		
	  if(listen == true)
	  {	
		  if(d == 'up')
		  {
			socket.emit('message', 'up (yellow) pressed on ' + myEpoch);
			document.panel.src='http://www.tadcoenvironmental.com/simon/upSelected1.png';
			revert();
		  } else if(d == 'down') { 
			socket.emit('message', 'down (blue) pressed on ' + myEpoch);
			document.panel.src='http://www.tadcoenvironmental.com/simon/downSelected1.png';
			revert();
		  } else if(d == 'left') { 
			socket.emit('message', 'left (green) pressed on ' + myEpoch);
			document.panel.src='http://www.tadcoenvironmental.com/simon/_leftSelected1.png';
			revert();
		  } else if(d == 'right') { 
			socket.emit('message', 'right (red) pressed on ' + myEpoch);
			document.panel.src='http://www.tadcoenvironmental.com/simon/_rightSelected1.png';
			revert();
		  }
	  }
		
	d = null;
  }	//end of handleButtons
  
  socket.on('server_message', function(data){
   $('#receiver').append('<li>' + data + '</li>');  
  });
});