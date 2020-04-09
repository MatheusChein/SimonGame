var buttonColors = ["red", "blue", "yellow", "green"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// User press any key for the first time
$(document).keydown(function() {
  if (started == false) {
    nextSequence();
    started = true;
  }
})

// The game creates its own pattern
function nextSequence() {
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  $("h1").html("Level " + level);
  userClickedPattern = [];
}

// The user clicks and creates his pattern
$(".btn").click(function(event) {
  var userChosenColor = $(event.target).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
})

// Plays the sound of the current button (works for the game and for the user)
function playSound(name) {
  var randomSound = new Audio("sounds/" + name + ".mp3");
  randomSound.play();
}

// Animates the button that got pressed by the user
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// Checks to see if the user clicked on the correct button
function checkAnswer() {
  if (userClickedPattern.length < gamePattern.length) {

    if (userClickedPattern[(userClickedPattern.length - 1)] != gamePattern[(userClickedPattern.length - 1)]) {
      gameOver();
    }
  }
  else if (userClickedPattern.length == gamePattern.length) {

    if (userClickedPattern[(level - 1)] === gamePattern[(level - 1)]) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
    else {
      gameOver();
    }
  }
}

// Flashes the red background, indicating that the game is over and starts it again
function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 300);
  playSound("wrong");
  $("h1").html("Game Over, Press Any Key to Restart");
  started = false;
  level = 0;
  gamePattern = [];
}
