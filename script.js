//CONSTANTS 
const NUM_CHOICES = 3; //number of choices available
const NUM_ROUNDS = 5; //total number of rounds within a game 
const ROCK = "rock";
const SCISSORS = "scissors";
const PAPER = "paper";
const QUIT = -1; //user quit sentinel 

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
    let temp; //holds user choice
    try{ //Get user choice, convert to lowercase
        temp = prompt(`"Rock" | "Paper" | "Scissors"? Please Enter Your Choice: (or click Cancel to quit)`).trim().toLowerCase();
    }
    catch(error){ //User canceled input
        alert("Thank you for playing!");
        return QUIT;
    }
    if((temp != ROCK) && (temp != PAPER) && (temp != SCISSORS)){ //input validation
        alert(`${temp} is not a valid choice.`);
        return getHumanChoice(); //get input again
    }
    return temp; //return valid input
}

function playRound(userChoice, cpuChoice){
    if(userChoice === QUIT){

    }
    else{
        console.log(`User choice: ${userChoice} CPU choice: ${cpuChoice}`); //display player choices
        if(userChoice === cpuChoice){ //Round draw
            alert("Round Draw.");
            playRound(getHumanChoice(), getComputerChoice());
        }
        else if((userChoice === ROCK && cpuChoice === SCISSORS) ||
        (userChoice === SCISSORS && cpuChoice === PAPER) || 
        (userChoice === PAPER && cpuChoice === ROCK)){ //User won the current round
            ++userScore;
            console.log(`You won! ${userChoice} beats ${cpuChoice}`);
        }
        else{ //User lost the current round
            ++cpuScore;
            console.log(`You lose. ${cpuChoice} beats ${userChoice}`);
        }
    }
}

function playGame(){
    for(let i = 1; i <= NUM_ROUNDS; i++){
        console.log(`-------ROUND ${i}------`);
        playRound(getHumanChoice(), getComputerChoice()); //play a single round
        console.log(`User Score: ${userScore} CPU Score: ${cpuScore}`); //display updated score
    }
    console.log("-------GAME OVER-------")
    if(userScore > cpuScore){ //User won the game
        console.log("You won the game!");
    }
    else if(cpuScore > userScore){ //User lost the game
        console.log("You lost the game.");
    }
    else{ //Game draw
        console.log("Draw. No winner.");
    }
}