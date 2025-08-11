//CONSTANTS 
const NUM_CHOICES = 3; //number of choices available
const NUM_ROUNDS = 5; //total number of rounds within a game 
const ROCK = "rock";
const SCISSORS = "scissors";
const PAPER = "paper";

//Global Variables
let userScore = 0;
let cpuScore = 0;

function getComputerChoice(){
    //generate random number between 1 - 3
    let temp = Math.floor(Math.random() * NUM_CHOICES) + 1;
    switch(temp){ //convert random number into corresponding choice
        case 1:
            return ROCK;
            break;
        case 2:
            return SCISSORS;
            break;
        default:
            return PAPER;
    }
}

function getHumanChoice(){
    return prompt("Rock, Paper, or Scissors? Enter Your Choice:").toLowerCase(); //Convert user choice to lowercase and return the result
}

function playRound(userChoice, cpuChoice){
    console.log(`User choice: ${userChoice} CPU choice: ${cpuChoice}`); //display player choices
    if(userChoice === cpuChoice){ //draw
        console.log("Draw");
        playRound(getHumanChoice(), getComputerChoice());
    }
    else if((userChoice === ROCK && cpuChoice === SCISSORS) ||
    (userChoice === SCISSORS && cpuChoice === PAPER) || 
    (userChoice === PAPER && cpuChoice === ROCK)){ //User won
        ++userScore;
        console.log(`You won! ${userChoice} beats ${cpuChoice}`);
    }
    else{ //User lost
        ++cpuScore;
        console.log(`You lose. ${cpuChoice} beats ${userChoice}`);
    }
}

function playGame(){
    for(let i = 1; i <= NUM_ROUNDS; i++){
        console.log(`-------ROUND ${i}------`);
        playRound(getHumanChoice(), getComputerChoice());
    }
    console.log("-------GAME OVER-------")
    if(userScore > cpuScore){
        console.log("You won the game!");
    }
    else if(cpuScore > userScore){
        console.log("You lost the game.");
    }
    else{
        console.log("Draw. No winner.");
    }
}