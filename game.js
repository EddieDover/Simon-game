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
function playerClicked() {
  $(".btn").click((e) => {
    let userChosenColour = e.target.id;
    animatePress(userChosenColour);
    console.log(userChosenColour);
    // userClickedPattern.push(userChosenColour);

    playSounds(userChosenColour);
    compareButtonClicked(userChosenColour);

    // arrayEquals(userClickedPattern, gamePattern);

    // if (arrayEquals(userClickedPattern, gamePattern)) {
    //   nextSequence();
    // } else {
    //   var audio = new Audio("sounds/wrong.mp3");
    //   audio.play();
    // }

    //nextSequence();
  });
}

function compareButtonClicked(buttonClicked) {
  userClickedPattern.push(buttonClicked);
  // if (userClickedPattern.length < gamePattern.length) {
  //   console.log(userClickedPattern.length);
  //   console.log(gamePattern.length);

  //   if (userClickedPattern[index] === gamePattern[index]) {
  //     nextSequence();
  //     console.log("going to next sequence");
  //   }
  // } else {
  //   console.log("Oops wrong color");
  // }
  let newColorIndex = userClickedPattern.length;
  console.log("NEW COLOR", userClickedPattern[newColorIndex]);
  console.log("GAME PATTERN COLOR", gamePattern[newColorIndex]);

  if (userClickedPattern[newColorIndex] === gamePattern[newColorIndex]) {
    console.log("correct color chosen");
    if (userClickedPattern.length === gamePattern.length) {
      console.log("going to next sequence");
      console.log("userClickedPattern", userClickedPattern);
      nextSequence();
    } else {
      console.log("continuing");
    }
  } else {
    console.log("oops wrong color");
  }

  // userClickedPattern.forEach((clickedColor, index) => {
  //   if (userClickedPattern.length === gamePattern.length) {
  //   }
  //   if (clickedColor === gamePattern[index]) {
  //     nextSequence();
  //     console.log("going to next sequence");
  //   } else {
  //     console.log("Oops wrong color");
  //   }

  //   //Evaluate if user pattern is the same length as gamePattern
  //   //If not add more to user pattern

  //   // for (i = 0; clickedColor.length <= gamePattern.length; i++) {
  //   //   playerClicked();

  //   //Evaluate both patterns if they don't have the same value on
  //   //the same index end game and start over
  //   // if (clickedColor[i] === gamePattern[i]) {
  //   //   console.log(clickedColor);
  //   //   nextSequence();
  //   // } else {
  //   //   console.log("Opps wrong color");
  //   // }
  //   //}

  //   //If User Pattern is the same length as gamePattern and
  //   //both index has the same values go to nextSequence

  //   //Clear user pattern
  // });
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
  $("h1").text("Level" + " " + level);
  level++;
  //random number generator
  var randNum = Math.floor(Math.random() * 4);

  //random color pick
  var randomChosenColour = buttonColours[randNum];
  gamePattern.push(randomChosenColour);
  //simon sound generator
  playSounds(randomChosenColour);
  //highlights color picked]
  console.log("new color", randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playerClicked(gamePattern);
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
