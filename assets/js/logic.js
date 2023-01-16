
var startGame = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questionDiv = document.querySelector("#questions");
var questionText = document.querySelector("#question-title");
var buttonA = document.querySelector("#button-a");
var buttonB = document.querySelector("#button-b");
var buttonC = document.querySelector("#button-c");
var buttonD = document.querySelector("#button-d");
var feedbackDiv = document.querySelector("#feedback");
var feedbackText = document.querySelector("#feedback-text");
var timerElement = document.querySelector("#time");
var endScreen = document.querySelector("#end-screen");


var updatedQuestionList = questions; //holds the questions left after removing each one when it is used
var currentQuestion = {}; //used for checking correct answer and setting the text on screen
var score = 0;
var timerCount;
var wrongAnswer = false;
var submitDetails = {Score: "", Initials: ""};

startGame.addEventListener("click", begin);
function begin(event){
    startScreen.setAttribute("class", "hide");
    questionDiv.setAttribute("class", "show");
    feedbackDiv.setAttribute("class", "show");
    playgame();
}


function playgame() {
    getNewQuestion(); //call the function to generate and display a random question
    timerCount = 60; //set the time for the game to 60 seconds
    startTimer(); //countdown to 0
    var btns = document.querySelectorAll('button'); //wait for user to click answer button
    btns.forEach(function(i) {
        i.addEventListener('click', function() {
            var compareAnswer = currentQuestion.CorrectAnswer; //set correct answer for the question
            if(i.innerHTML === compareAnswer){ //if it matches with the string from the button click
            score++; //increment score
            feedbackText.innerHTML = "Yes!"; //tell player they are correct
            getNewQuestion(); //generate the next question
            compareAnswer=currentQuestion.CorrectAnswer; //update the new correct answer to be checked
            }
            else{ //if the answer is incorrect
                wrongAnswer = true; //set the boolean to true so that the time can be deducted
                feedbackText.innerHTML = "Nope!"; //tell the player they are incorrect
                getNewQuestion(); //generate the next question
                compareAnswer=currentQuestion.CorrectAnswer; //update the new correct answer to be checked
            }
        })
    });
}

function endGame(){
    //hide the questions and show the final screen. Display the final score
    questionDiv.setAttribute("class", "hide");
    feedbackDiv.setAttribute("class", "hide");
    endScreen.setAttribute("class", "show");
    var finalScore = document.querySelector("#final-score");
    finalScore.innerHTML=score;
    localStorage.setItem("finalScore", score);
    submitScore();
}

function submitScore(){
    var submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", function(){
        var initials = document.querySelector("#initials").value;
        submitDetails.Initials = initials;
        submitDetails.Score = score;
        //console.log(submitDetails);
        localStorage.setItem("finalScore", submitDetails);
    });
}
    

function getNewQuestion(){
    //if there are questions left in the array, select a random index number and assign the question object to the currentQuestion variable. Then remove that question from the array using splice() and finally set the text to the html to display the updated question
    if(updatedQuestionList.length>0){ 
        var randomQuestionIndex = Math.floor(Math.random()*updatedQuestionList.length);
        currentQuestion = updatedQuestionList[randomQuestionIndex];
        updatedQuestionList.splice(randomQuestionIndex, 1);
        questionText.innerHTML = currentQuestion.Question;
        buttonA.innerHTML = currentQuestion.ChoiceA;
        buttonB.innerHTML = currentQuestion.ChoiceB;
        buttonC.innerHTML = currentQuestion.ChoiceC;
        buttonD.innerHTML = currentQuestion.ChoiceD;
        return currentQuestion;
    }
    else{
        endGame();
    }
    
}
    
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (wrongAnswer) {
          wrongAnswer = false;
          timerCount -= 5;
        }
          // Tests if time has run out
            if (timerCount <= 0) {
            // Clears interval
            clearInterval(timer);
            endGame();
            }
        }   
    }, 1000);

}


  

/*
Psuedocode 

Variables
---


2. logic file:  

    functions 
    --- 

    1. game start function: add an event listener to the start button
        Once the start button has been clicked, change the div containing the question to "show" instead of "hide"
        1.1 - game will start with a question and timer will start
        1.2 - get score from localStorage
        1.3 - function should keep track of the questions - if all questions completed function should render to page their score and render html elements to save their initials and their final score. 

    2  add a timer function
    
        2.1 - timer will decrement by seconds 
        
        2.2 - when an incorrect answer is submitted the timer will substract by an penalty amount e.g 1 min 
    

    3. get random question from array of objects 
    4. check correct answer function 
        
        4.1 - when user gets the answer correct, mutate the object property correct to true
    
    
    5. score function:  

        5.1 - check if the object correct property is true, if true update the score variable 

    6. 


3. Highscores file

    1. Do something with local storage to get/set the highscores
    2. Check if higher than existing highscore, if yes, add to list, if no then don't
*/