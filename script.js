//setting up variables
var main = document.getElementById("board");
var head = document.getElementById("head");
var button = document.getElementById("button");
var timeInterval;
var timeEnd;
var reactionTime = new Array(5);
var attempt = 5;
var sum = 0;
var isWaiting = 1;
var timer;

//displaying the Average reaction time of the user
function retry() {
  for (let i = 0; i < reactionTime.length; i++) {
    sum += reactionTime[i];
  }
  var avg = sum / 5;
  main.style.background = "blue";
  head.innerHTML = "Average Time : " + avg;
  main.onmousedown = function(){
    location.reload();
  };
}
//check for early shot from the user otherwise calculate and display reaction time
function display(timeend, timestart) {
  let diff = timeend - timestart;
  if (isWaiting == 0) {
      isWaiting = 2;
      reactionTime[attempt - 1] = diff;
      main.style.background = "purple";
      head.innerHTML = "Reaction Time : " + reactionTime[attempt - 1];
      attempt--;
      if (attempt > 0) {
        setTimeout(start , 1200);
      }else {
        setTimeout(retry, 1200);
      }
  } else if(isWaiting == 1){
      main.onmousedown = function(){ display(); };
      main.style.background = "orange";
      head.innerHTML = "Too Excited? Try again";
      clearTimeout(timer);
      setTimeout(start, 1200);
  }
}
//here user has to shoot(green screen)
function shoot() {
  main.style.background = "green";
  head.innerHTML = "Click Now";
  isWaiting = 0;
  var timeStart = +new Date();
  main.onmousedown = function() {
    var timeEnd = +new Date();
    display(timeEnd, timeStart);
  };
}
//display the red screen for a random amount of time where user has to wait
function start() {
  button.remove();
  main.onmousedown = function(){ display(); }
  main.style.background = "red";
  head.innerHTML = "Wait For Green Colour";
  isWaiting = 1;
  timeInterval = Math.floor((Math.random() *1700) + 750);
  timer = setTimeout(shoot, timeInterval);
}
