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
  //initiates the game
  nextSequence();
});

//checks which color is clicked and puts it in userClickedPattern
$(".btn").click((e) => {
  let userChosenColour = e.target.id;
  animatePress(userChosenColour);
  console.log(userChosenColour);

  playSounds(userChosenColour);
  compareButtonClicked(userChosenColour);
});

function compareButtonClicked(buttonClicked) {
  userClickedPattern.push(buttonClicked);

  let newColorIndex = userClickedPattern.length - 1;
  //console.log("NEW COLOR", userClickedPattern[newColorIndex]);
  //console.log("GAME PATTERN COLOR", gamePattern[newColorIndex]);

  var failed = false;

  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] == gamePattern[i]) {
      failed = false;
    } else {
      failed = true;
    }
  }

  if (!failed) {
    console.log("correct pattern!");
    if (
      userClickedPattern.length == gamePattern.length &&
      arrayEquals(userClickedPattern, gamePattern)
    )
      nextSequence();
  } else {
    console.log("FAILED");

    //game pattern
    gamePattern = [];

    //user clicked pattern
    userClickedPattern = [];

    //game level
    level = 0;
  }
}

function arrayEquals(a, b) {
  for (i = 0; a <= b; i++) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level" + " " + level);
  level++;
  //random number generator
  var randNum = Math.floor(Math.random() * 4);

  //random color pick
  var randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  //simon sound generator
  //playSounds(randomChosenColour);
  //highlights color picked]
  //console.log("new color", randomChosenColour);
  gamePattern.forEach((randomChosenColour) => {
    setTimeout(() => {
      5000;
      $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    });
    setTimeout(() => {
      5000;
      playSounds(randomChosenColour);
    });
    //$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  });
  //$(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  //playerClicked(gamePattern);
  return randNum;
}

//plays sounds
function playSounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  setTimeout(() => {
    audio.play();
  }, 100);
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
