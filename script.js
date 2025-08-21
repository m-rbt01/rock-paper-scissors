//GLOBAL CONSTANTS 
const NUM_CHOICES = 3; //number of choices available
const MAX_POINTS = 5; //total number of points for a player to win a single game 
const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

//GLOBAL VARIABLES
let round = 1;
let playerScore = 0;
let cpuScore = 0;

//***CALCULATE THE COMPUTER'S CHOICE***
function getComputerChoice(){
    //generate random number between 1 - 3
    let temp = Math.floor(Math.random() * NUM_CHOICES) + 1;
    switch(temp){ //convert random number into corresponding choice
        case 1:
            return ROCK;
        case 2:
            return PAPER;
        default:
            return SCISSORS;
    }
}

//***GET THE PLAYER'S CHOICE***
function getPlayerChoice(targetId){
    switch(targetId){
        case "rock-selection":
            return ROCK;
        case "paper-selection":
            return PAPER;
        case "scissors-selection":
            return SCISSORS;
    }
}

//***DETERMINE THE WINNER OF A SINGLE ROUND***
function playRound(playerChoice, cpuChoice){
    //Display current round information
    roundPar.textContent = round;
    playerChoicePar.textContent = playerChoice;
    cpuChoicePar.textContent = cpuChoice;
    if(playerChoice === cpuChoice){ //round draw
        winnerPar.textContent = `Round draw. Both players chose ${playerChoice}.`;
        return;
    }
    else if((playerChoice === ROCK && cpuChoice === SCISSORS) ||
    (playerChoice === SCISSORS && cpuChoice === PAPER) || 
    (playerChoice === PAPER && cpuChoice === ROCK)){ //Player won the current round
        playerScorePar.textContent = ++playerScore;
        winnerPar.textContent = `You won! ${playerChoice} beats ${cpuChoice}.`;
    }
    else{ //Player lost the current round
        cpuScorePar.textContent = ++cpuScore;
        winnerPar.textContent = `You lost. ${cpuChoice} beats ${playerChoice}.`;
    }
    ++round;
}

//***INITIATE A GAME***
function playGame(clickEvent){
    let playerChoice = getPlayerChoice(clickEvent.target.id);
    let cpuChoice = getComputerChoice();
    playRound(playerChoice, cpuChoice);
    if(playerScore >= MAX_POINTS || cpuScore >= MAX_POINTS) displayResults();
}

//***ADD RESULTS TO PAGE***/
function displayResults(){
    if(playerScore > cpuScore){ //Player won the game
        winnerPar.textContent = "You won the game!";
        winnerPar.className = "player-won"; //initiate player won color styling
    }
    else if(cpuScore > playerScore){ //Player lost the game
        winnerPar.textContent = "You lost the game.";
        winnerPar.className = "player-lost"; //initiate player lost color styling
    }
    else{ //Game draw
        winnerPar.textContent = "Game draw. No winner.";
        winnerPar.className = "game-draw"; //initiate game draw color styling
    }
    buttonSelections.classList.toggle("hidden"); //hide rps buttons when the game ends
    restartButton.parentNode.classList.toggle("hidden"); //show the restart game button
}

//***RESTART THE GAME***/
function restartGame(){
    //reset game record
    round = 1;
    playerScore = 0;
    cpuScore = 0;
    roundPar.textContent = round;
    playerScorePar.textContent = playerScore;
    cpuScorePar.textContent = cpuScore;
    playerChoicePar.textContent = "...";
    cpuChoicePar.textContent = "...";
    winnerPar.textContent = "Choose Rock, Paper, or Scissors to start the game...";
    winnerPar.removeAttribute("class");
    restartButton.parentNode.classList.toggle("hidden"); //hide the restart game button
    buttonSelections.classList.toggle("hidden"); //show the rps buttons for a new game
}

//DOM References
const buttonSelections = document.querySelector(".button-selections");
const restartButton = document.querySelector("#restart-game");
const roundPar = document.querySelector("#round");
const playerScorePar = document.querySelector("#player-score");
const cpuScorePar = document.querySelector("#computer-score");
const playerChoicePar = document.querySelector("#player-choice");
const cpuChoicePar = document.querySelector("#computer-choice");
const winnerPar = document.querySelector("#game-winner");

//Event Listeners
buttonSelections.addEventListener("click", playGame);
restartButton.addEventListener("click", restartGame);