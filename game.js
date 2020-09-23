//button colours
var buttonColours = ["red", "blue", "green", "yellow"];

//random color pick
// var randomChosenColour = buttonColours[nextSequence()];

//game pattern
var gamePattern = [];
// gamePattern.push(randomChosenColour);

//user clicked pattern
var userClickedPattern = [];

//game level
var level = 0;

//initial game start
var gameStart = false;
$(document).one("keypress", (e) => {
  gameStart = true;
  console.log(e);

  nextSequence();
});

//checks which color is clicked and puts it in userClickedPattern
function playerClicked() {
  $(".btn").click((e) => {
    let userChosenColour = e.target.id;
    animatePress(userChosenColour);
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);

    playSounds(userChosenColour);
    if (userClickedPattern == gamePattern) {
      nextSequence();
    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
    }
    //nextSequence();
  });
}
function nextSequence() {
  $("h1").text("Level" + " " + level);
  level++;
  //random number generator
  var randNum = Math.floor(Math.random() * 4);

  //random color pick
  var randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);
  //simon sound generator
  playSounds(randomChosenColour);
  //highlights color picked
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playerClicked(gamePattern);
  return randNum;
}

//plays sounds
function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  setTimeout(audio.play(), 100);
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
