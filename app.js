/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, lastRollWas6;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // Rondom number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    console.log(dice, dice2);

    // Display the result
    var diceDOM = document.querySelector(".dice");
    var dice2DOM = document.querySelector(".dice2");
    diceDOM.style.display = "block";
    dice2DOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";

    // Update the round score IF the rolled number was NOT a 1
    if (dice + dice2 === 2) {
      // Next Player
      nextPlayer();
    } else if (lastRollWas6 && (dice === 6 || dice2 === 6)) {
      console.log(
        "TWO SIXES IN A ROW!!! PLAYER " + activePlayer + " SCORE SET TO 0"
      );
      document.querySelector("#current-" + activePlayer).textContent = 0;
      document.querySelector("#score-" + activePlayer).textContent = 0;
      scores[activePlayer] = 0;
      dice = 0;
      dice2 = 0;
      nextPlayer();
    } else {
      // Add score
      roundScore += dice + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
    if (dice === 6 || dice2 === 6) {
      lastRollWas6 = true;
    } else {
      lastRollWas6 = false;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // Next player
  console.log("switch player!");
  lastRollWas6 = false;

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  winningScore = prompt(
    "What will the winning score be?",
    "Enter a number between 10 - 100"
  );

  if (winningScore != null) {
    document.getElementById("winScore").textContent = winningScore;
  } else {
    alert("You must enter a valid winning score to start the game!");
    init();
  }

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1!";
  document.getElementById("name-1").textContent = "Player 2!";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  gamePlaying = true;
  lastRollWas6 = false;
}

/*
Challenges
1. Add a second die. player loses total score if two 6s in a row    
2. Add an input field to allow players to set the winning score
3. add a second dice to the game. Player loses current score when one of the dice is a 1.

*/
