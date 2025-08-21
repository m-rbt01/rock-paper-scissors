//GLOBAL CONSTANTS 
const NUM_CHOICES = 3; //number of choices available
const MAX_POINTS = 5; //total number of points for a player to win a single game 
const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

//GLOBAL VARIABLES
let round = 1;
let userScore = 0;
let cpuScore = 0;
let gameOver = false;

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

//***GET THE USER'S CHOICE***
function getHumanChoice(targetId){
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
function playRound(userChoice, cpuChoice){
    roundElem.textContent = round;
    if(userChoice === cpuChoice){ //Round draw
        results.textContent = `Round Draw. Both players chose ${userChoice}.`;
        return;
    }
    else if((userChoice === ROCK && cpuChoice === SCISSORS) ||
    (userChoice === SCISSORS && cpuChoice === PAPER) || 
    (userChoice === PAPER && cpuChoice === ROCK)){ //User won the current round
        userScoreElem.textContent = ++userScore;
        results.textContent = `You won! ${userChoice} beats ${cpuChoice}.`;
    }
    else{ //User lost the current round
        cpuScoreElem.textContent = ++cpuScore;
        results.textContent = `You lose. ${cpuChoice} beats ${userChoice}.`;
    }
    ++round;
}

//***INITIATE A GAME***
function playGame(clickEvent){
    let userChoice = getHumanChoice(clickEvent.target.id);
    let cpuChoice = getComputerChoice();
    playRound(userChoice, cpuChoice);
    if(userScore >= MAX_POINTS || cpuScore >= MAX_POINTS){
        gameOver = true;
        displayResults();
    }
}

//***ADD RESULTS TO PAGE***/
function displayResults(){
    if(userScore > cpuScore){ //User won the game
        results.textContent = "You won the game!";
        results.className = "user-won"; //initiate user won color styling
    }
    else if(cpuScore > userScore){ //User lost the game
        results.textContent = "You lost the game.";
        results.className = "user-lost"; //initiate user lost color styling
    }
    else{ //Game draw
        results.textContent = "Game draw. No winner.";
        results.className = ''; //remove color styling
    }
    restartButton.classList.toggle("hidden");
}

//***RESTART THE GAME***/
function restartGame(){
    round = 1;
    userScore = 0;
    cpuScore = 0;
    gameOver = false;
    results.textContent = '';
    results.className = '';
    roundElem.textContent = round;
    userScoreElem.textContent = userScore;
    cpuScoreElem.textContent = cpuScore;
    restartButton.classList.toggle("hidden");
}

//DOM References
const resultsContainer = document.querySelector(".game-results");
const buttonSelections = document.querySelector(".button-selections");
const restartButton = document.querySelector("#restart-game");
const roundElem = document.querySelector("#round");
const userScoreElem = document.querySelector("#user-score");
const cpuScoreElem = document.querySelector("#computer-score");
const results = document.createElement("p");
resultsContainer.appendChild(results);

//Event Listeners
buttonSelections.addEventListener("click", (event) => {
    if(!gameOver) playGame(event);
});

restartButton.addEventListener("click", restartGame);