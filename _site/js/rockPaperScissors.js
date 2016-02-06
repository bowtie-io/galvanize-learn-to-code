// "application state" things that can change w/n scope of play

var profileName,
    playCount = 0,
    userWinCount = 0;

function updateUI(){
  $("#profile_name").val(profileName);
  $("#scoreboard span.wins").text(userWinCount);
  $("#scoreboard span.plays").text(playCount);

  if(playCount > 0){
    // show a play again button after playing once
    $("#play").text("Play Again?");
  }
}

// create a play function so the game executes by intent
function play(){

var userChoice = prompt("Do you choose rock, paper or scissors?");
var computerChoice = Math.random();
if (computerChoice <= 0.33) {
    computerChoice = "rock";
} else if (computerChoice <= 0.66) {
    computerChoice = "paper";
} else {
    computerChoice = "scissors";
}

playCount += 1;

// not needed // var compare = function(userChoice, computerChoice) {
    if (userChoice  === computerChoice) {
          window.alert("The result is a tie " + profileName + "!");
      } else if(userChoice ==="rock") {
        if (computerChoice==="scissors") {
            // add win counts based on the outcomes
            userWinCount += 1;
            window.alert("Rock Wins "  + profileName + "!");
      } else {
            window.alert("Paper Wins");
          }
      }
      else if(userChoice==="paper") {
         if(computerChoice ==="rock") {
             userWinCount += 1;
             window.alert("Paper Wins "  + profileName + "!");
         } else {
             window.alert("Scissors Wins!");
         }
      }
      else if(userChoice==="scissors") {
          if (computerChoice==="paper") {
              userWinCount += 1;
              window.alert("Scissors Wins "  + profileName + "!");
          } else {
              window.alert("Rock Wins");
          }
      }

  // store the scores in bowtie
  bowtie.user.profile({
    playCount: playCount,
    userWinCount: userWinCount
  });
  // update the elements on the page
  updateUI();
}

// create a separate function outside of play to store parse the global variables in the bowtie user profile
$(function(){
  bowtie.user.profile(function(profile){
    userWinCount = parseInt(profile.userWinCount || 0);
    playCount = parseInt(profile.playCount || 0);
    profileName = profile.name || "";
    // update the elements on the page
    updateUI();

  });

  $("#profile_name").on("change", function(){
    profileName = $('#profile_name').val();
    // Store the name in the Bowtie User Profile
    bowtie.user.profile({
      name: profileName,
    }, function(){
      alert("saved");
    })
  });
});
