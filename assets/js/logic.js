
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
            var audio = new Audio('assets/sfx/correct.wav');
            audio.play();
            feedbackText.innerHTML = "Yes!"; //tell player they are correct
            getNewQuestion(); //generate the next question
            compareAnswer=currentQuestion.CorrectAnswer; //update the new correct answer to be checked
            }
            else{ //if the answer is incorrect
                wrongAnswer = true; //set the boolean to true so that the time can be deducted
                feedbackText.innerHTML = "Nope!"; //tell the player they are incorrect
                var audio = new Audio('assets/sfx/incorrect.wav');
                audio.play();
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
    submitScore();
}

function submitScore(){
    var submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", function(event){
    event.preventDefault();
    addScore();
    submitButton.disabled = "true"; //prevent the score being added multiple times to the array
});
}

function addScore(){
    //get the current list of high scores and add a new object containing the score and the initials to it
    var highScores = JSON.parse(localStorage.getItem("scoresList")) || [];
    var inputInitials = document.querySelector("#initials").value;
    var endScore = {
        score: score,
        initials: inputInitials
    }
    highScores.push(endScore);
    //save the updated list into local storage
    localStorage.setItem("scoresList", JSON.stringify(highScores)); 
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

