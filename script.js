//GLOBAL CONSTANTS 
const NUM_CHOICES = 3; //number of choices available
const NUM_ROUNDS = 5; //total number of rounds within a game 
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const QUIT = -1; //user quit sentinel 

//GLOBAL VARIABLES
let userScore = 0;
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

//***GET THE USER'S CHOICE***
function getHumanChoice(){
    let temp; //holds user choice
    try{ //Get user choice, remove potential whitespace from ends and convert to lowercase (case-insensitive)
        temp = prompt(`"Rock" | "Paper" | "Scissors"? Please Enter Your Choice: (or click Cancel to quit)`).trim().toLowerCase();
    }
    catch(error){ //User canceled input, return to the current round
        return QUIT;
    }
    if((temp != ROCK) && (temp != PAPER) && (temp != SCISSORS)){ //Otherwise, validate user input
        alert(`${temp} is not a valid choice.`);
        return getHumanChoice(); //get input again
    }
    return temp; //return valid input
}

//***DETERMINE THE WINNER OF A SINGLE ROUND***
function playRound(userChoice, cpuChoice){
    if(userChoice === QUIT){ //cancel the current round if the user quit
        return QUIT;
    }
    //Otherwise, evaluate and display the winner of the current round
    if(userChoice === cpuChoice){ //Round draw
        alert(`Round Draw.\nBoth players chose ${userChoice}`);
        return playRound(getHumanChoice(), getComputerChoice()); //restart current round
    }
    else if((userChoice === ROCK && cpuChoice === SCISSORS) ||
    (userChoice === SCISSORS && cpuChoice === PAPER) || 
    (userChoice === PAPER && cpuChoice === ROCK)){ //User won the current round
        ++userScore;
        alert(`You won!\n${userChoice} beats ${cpuChoice}`);
    }
    else{ //User lost the current round
        ++cpuScore;
        alert(`You lose.\n${cpuChoice} beats ${userChoice}`);
    }
}

//***INITIATE A GAME***
function playGame(){
    //Iterate through the total number of rounds
    for(let i = 1; i <= NUM_ROUNDS; i++){
        alert(`-------------Round ${i}/${NUM_ROUNDS}-------------\nUser Score: ${userScore} CPU Score: ${cpuScore}`); //display the current round and scores
        if(playRound(getHumanChoice(), getComputerChoice()) === QUIT){ //play a single round, but if the user quit then end the game
            alert("Thank you for playing!");
            break;
        } 
    }
    //Display the game's winner
    displayResults();
}

//***ADD RESULTS TO PAGE***/
function displayResults(){
    const resultsPar = document.getElementById("game-results"); //get the page's existing header element 
    resultsPar.innerHTML = `-------------Results-------------<br>User Score: ${userScore} CPU Score: ${cpuScore}<br>`; //display final scores
    //display the winner
    if(userScore > cpuScore){ //User won the game
        resultsPar.innerHTML += "You won the game!";
        resultsPar.className = "user-won"; //initiate user won color styling
    }
    else if(cpuScore > userScore){ //User lost the game
        resultsPar.innerHTML += "You lost the game.";
        resultsPar.className = "user-lost"; //initiate user lost color styling
    }
    else{ //Game draw
        resultsPar.innerHTML += "Game draw. No winner.";
        resultsPar.className = ""; //remove color styling
    }
}

//***RESTART THE GAME***/
function playAgain(){
    userScore = 0;
    cpuScore = 0;
    playGame();
}

//On Page Load
const restartButton = document.getElementById("restart-game"); //get the page's existing button element
restartButton.addEventListener("click", playAgain); //play game again when the user clicks restart button
playGame() //start the game