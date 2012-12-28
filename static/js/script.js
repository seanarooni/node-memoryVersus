/* Author: Sean Iveson
*/

$(document).ready(function() {   

  var socket = io.connect();
  var score = 0;
  var duration = 250; //not used
  var spacing = 750; //not used
  var pattern = new Array();
  var response = new Array();
  var listen = false; 

  function init()
  {
    var initialPatternLength = 4;
    for (var i=0; i<initialPatternLength; i++)  //loop to start the pattern[]  might become populatePattern()
    {
    pattern[i] = Math.floor((Math.random()*4)+1);
    console.log("pattern[" + i + "] = " + pattern[i]);
    }
    
    if(typeof game_loop != "undefined") {
     clearInterval(game_loop); }
      game_loop = setInterval(SimonSays, 60);
  }  // end of init()
  init();
    
  function revert()
  {
    setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, 1000);
  } 
  
  function populatePattern()  //currently unused
  {
  }
  
  function playSingle()
  {
    //this should play one note, and i can call it within playPattern
  }

  function playSingle(p,i)
  {
    var speed = 500;
    setTimeout(function(){ 
      document.panel.src='http://www.tadcoenvironmental.com/simon/' + p + 'Selected.png';
      setTimeout(function(){ document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png'; }, (speed - 100)*(i+1));
     }, speed*i);
  }
  
  function playPattern()
  {
    var i = 0;
    //p = pattern[i]; 
    //console.log('p= ' + p);
    //play(0);
    if (listen == false)
    {
      play();
    }
    function next()
    {
      //is there a next number in the pattern
      //what is it
      //if there isn't, proceed
      //i think i can replace the else statement with this function
    }

    function play()
    {
      console.log('play were called and listen = ' + listen);

      /*setTimeout(function()
      {
      revert();
      }, 500*(i+1));  //controls flash duration.  */

      //recursion goes here
        if(i<pattern.length)
        {
        //p = pattern[i];
        //(function()
        //{
          p = pattern[i];
          console.log('well i = ' + i);
          console.log('well p= ' + p);
          /*if(p == 1 )
          {
          document.panel.src='http://www.tadcoenvironmental.com/simon/upSelected1.png';
          setTimeout(revert, 500*(i+1));  //instead of revert it should call next, but next could be revert
          } else if(p == 4) { //down
          document.panel.src='http://www.tadcoenvironmental.com/simon/downSelected1.png';
          setTimeout(revert, 500*(i+1));
          } else if(p == 2) { //left
          document.panel.src='http://www.tadcoenvironmental.com/simon/_leftSelected1.png';
          setTimeout(revert, 500*(i+1));
          } else if(p == 3) { //right
          document.panel.src='http://www.tadcoenvironmental.com/simon/_rightSelected1.png';
          setTimeout(revert, 500*(i+1));
          }*/
        //}); // end of setTimeout
        //document.panel.src='http://www.tadcoenvironmental.com/simon/' + p + 'Selected.png';
        //setTimeout(revert, 500*(i+1));
        playSingle(p, i);
        i++;
        play();
      } else {
        listen = true;
        listenEvent();
        console.log('set listen to true');
      } //end of function play()
    }  
  }//end of playPattern

  function evaluate()
  {
    //compare pattern to response array
    //set the listen back to false
    //if the user passed
        //add 1 randomly to the pattern array
        //call playPattern
    //else if the user failed
      //make fun of the player
  }
  function listenEvent()
  {
    var ListenTimer = 5000;
    //record presses into an array
    handleButtons();
    setTimeout(evaluate, ListenTimer);
    //use a setTimeout to call evaluate

  }

  function handleButtons()
  {
     var myDate = new Date();
     var d;
     var myEpoch = myDate.getTime()/1000.00;

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
  } //end of handleButtons
  
  function SimonSays()
  {
    if (listen == true)
    {
      listenEvent();
    } else {   
      playPattern();
    }
  }

  socket.on('server_message', function(data){
   //$('#receiver').append('<li>' + data + '</li>');  
  });
});