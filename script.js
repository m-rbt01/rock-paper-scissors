//CONSTANTS 
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
    if((temp != ROCK) && (temp != PAPER) && (temp != SCISSORS)){ //validate given input
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
    //Evaluate the winner of the current round
    console.log(`User choice: ${userChoice} CPU choice: ${cpuChoice}`); //display player choices
    if(userChoice === cpuChoice){ //Round draw
        alert("Round Draw.");
        return playRound(getHumanChoice(), getComputerChoice()); //restart current round
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

//***INITIATE A GAME***
function playGame(){
    //Iterate through the total number of rounds
    for(let i = 1; i <= NUM_ROUNDS; i++){
        console.log(`-------ROUND ${i}------`); //display the current round
        if(playRound(getHumanChoice(), getComputerChoice()) === QUIT){ //play a single round, unless the user quit
            alert("Thank you for playing!");
            console.log("User quit the game.");
            break;
        } 
        console.log(`User Score: ${userScore} CPU Score: ${cpuScore}`); //display updated score
    }
    //Display the game's winner
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