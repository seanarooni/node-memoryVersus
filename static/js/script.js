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


  function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
    this.soundsQueue = [];
  }

  AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
  }

  AssetManager.prototype.queueSound = function(id, path) {
    this.soundsQueue.push({id: id, path: path});
  }

  AssetManager.prototype.downloadAll = function(downloadCallback) {
    if (this.downloadQueue.length == 0 && this.soundsQueue.length === 0) {
      downloadCallback();
    }
    this.downloadSounds(downloadCallback);

    for (var i = 0; i < this.downloadQueue.length; i++) {
      var path = this.downloadQueue[i];
      var img = new Image();
      var that = this;
      img.addEventListener("load", function() {
        console.log(this.src + ' is loaded');
        that.successCount += 1;
        if (that.isDone()) {
          downloadCallback();
        }
      }, false);
      img.addEventListener("error", function() {
        that.errorCount += 1;
        if (that.isDone()) {
          downloadCallback();
        }
      }, false);
      img.src = path;
      this.cache[path] = img;
    }
  }

  AssetManager.prototype.downloadSound = function(id, path, soundsCallback) {
    var that = this;
    this.cache[path] = soundManager.createSound({
      id: id,
      autoLoad: true,
      url: path,
      onload: function() {
        console.log(this.url + ' is loaded');
        that.successCount += 1;
        if (that.isDone()) {
          soundsCallback();
        }
      }
    });
  }

  AssetManager.prototype.getSound = function(path) {
    return this.cache[path];
  }

  AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
  }

  AssetManager.prototype.isDone = function() {
    return ((this.downloadQueue.length + this.soundsQueue.length) == this.successCount + this.errorCount);
  }

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
    var finale = pattern.length - 1;
    setTimeout(function(){ 
      document.panel.src='http://www.tadcoenvironmental.com/simon/' + p + 'Selected.png';
      setTimeout(function(){ 
        document.panel.src='http://www.tadcoenvironmental.com/simon/SimonS2.png';
        if (i == finale) {
          console.log('final playSingle called');
        }
      }, (speed - 100)*(i+1));
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
      } 
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
      console.log('start listening now');
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