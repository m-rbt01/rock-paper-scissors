//GLOBAL CONSTANTS 
const NUM_CHOICES = 3; //number of choices available
const MAX_POINTS = 5; //total number of points for a player to win a single game 
const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";
const ROCK_IMG = "./images/rock-image.png";
const PAPER_IMG = "./images/paper-image.png";
const SCISSORS_IMG = "./images/scissors-image.png";
const INITIAL_IMG = "./images/initial-state-image.png";

//GLOBAL VARIABLES
let round = 1;
let playerScore = 0;
let cpuScore = 0;

//***CALCULATE THE COMPUTER'S CHOICE RANDOMLY***
function getComputerChoice(){
    //generate random number between 1 - 3
    let randomNum = Math.floor(Math.random() * NUM_CHOICES) + 1;
    switch(randomNum){ //convert random number into corresponding RPS choice
        case 1:
            cpuImg.setAttribute("src", ROCK_IMG);
            return ROCK;
        case 2:
            cpuImg.setAttribute("src", PAPER_IMG);
            return PAPER;
        default:
            cpuImg.setAttribute("src", SCISSORS_IMG);
            return SCISSORS;
    }
}

//***GET THE PLAYER'S CHOICE FROM BUTTON SELECTION***
function getPlayerChoice(targetId){
    switch(targetId){
        case "rock-selection":
            playerImg.setAttribute("src", ROCK_IMG);
            return ROCK;
        case "paper-selection":
            playerImg.setAttribute("src", PAPER_IMG);
            return PAPER;
        case "scissors-selection":
            playerImg.setAttribute("src", SCISSORS_IMG);
            return SCISSORS;
    }
}

//***DETERMINE THE WINNER OF A SINGLE ROUND***
function playRound(playerChoice, cpuChoice){
    roundSpan.textContent = round; //Display current round 
    if(playerChoice === cpuChoice){ //round draw
        gameMsg.textContent = `Round draw. Both players chose ${playerChoice}.`;
        return;
    }
    else if((playerChoice === ROCK && cpuChoice === SCISSORS) ||
    (playerChoice === SCISSORS && cpuChoice === PAPER) || 
    (playerChoice === PAPER && cpuChoice === ROCK)){ //Player won the current round
        playerScoreSpan.textContent = ++playerScore;
        gameMsg.textContent = `You won! ${playerChoice} beats ${cpuChoice}.`;
    }
    else{ //Player lost the current round
        cpuScoreSpan.textContent = ++cpuScore;
        gameMsg.textContent = `You lost. ${cpuChoice} beats ${playerChoice}.`;
    }
    ++round;
}

//***INITIATE A SINGLE ROUND ON PLAYER BUTTON CLICK***
function playGame(clickEvent){
    let playerChoice = getPlayerChoice(clickEvent.target.id);
    let cpuChoice = getComputerChoice();
    playRound(playerChoice, cpuChoice);
    if(playerScore >= MAX_POINTS || cpuScore >= MAX_POINTS) displayResults();
}

//***DISPLAY RESULTS ON GAME OVER***/
function displayResults(){
    if(playerScore > cpuScore){ //Player won the game
        gameMsg.textContent = "You won the game!";
        gameMsg.setAttribute("class", "player-won"); //initiate player won color styling
    }
    else if(cpuScore > playerScore){ //Player lost the game
        gameMsg.textContent = "You lost the game.";
        gameMsg.setAttribute("class", "player-lost"); //initiate player lost color styling
    }
    else{ //Game draw
        gameMsg.textContent = "Game draw. No winner.";
        gameMsg.setAttribute("class", "game-draw"); //initiate game draw color styling
    }
    buttonSelections.classList.toggle("hidden"); //hide rps buttons when the game ends
    restartButton.classList.toggle("hidden"); //show the restart game button
}

//***RESTART THE GAME***/
function restartGame(){
    //reset game record
    round = 1;
    playerScore = 0;
    cpuScore = 0;
    roundSpan.textContent = round;
    playerScoreSpan.textContent = playerScore;
    cpuScoreSpan.textContent = cpuScore;
    playerImg.setAttribute("src", INITIAL_IMG);
    cpuImg.setAttribute("src", INITIAL_IMG);
    gameMsg.textContent = "Choose Rock, Paper, or Scissors below to start the game...";
    gameMsg.removeAttribute("class"); //remove color styling 
    restartButton.classList.toggle("hidden"); //hide the restart game button
    buttonSelections.classList.toggle("hidden"); //show the rps buttons for a new game
}

//DOM References
const buttonSelections = document.querySelector(".button-selections");
const restartButton = document.querySelector(".game-over");
const roundSpan = document.querySelector("#round");
const playerScoreSpan = document.querySelector("#player-score");
const cpuScoreSpan = document.querySelector("#computer-score");
const playerImg = document.querySelector("#player-image");
const cpuImg = document.querySelector("#computer-image");
const gameMsg = document.querySelector("#game-msg");

//Event Listeners
buttonSelections.addEventListener("click", playGame);
restartButton.addEventListener("click", restartGame);