
var startGame = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questionDiv = document.querySelector("#questions");
var questionText = document.querySelector("#question-title");
var buttonA = document.querySelector("#button-a");
var buttonB = document.querySelector("#button-b");
var buttonC = document.querySelector("#button-c");
var buttonD = document.querySelector("#button-d");




startGame.addEventListener("click", begin);

function begin(event){
    console.log("game started");
    showQuestion();
}


function decrementTimer(){

}

function playgame() {
    

}


function showQuestion() {
    startScreen.setAttribute("class", "hide");
    questionDiv.setAttribute("class", "show");
    questionText.innerHTML = "This is the question!";
    buttonA.innerHTML = "First Option";
    buttonB.innerHTML = "Second Option";
    buttonC.innerHTML = "Third Option";
    buttonD.innerHTML = "Fourth Option";
    console.log(questions[0]); //this accesses the first element of the array in the questions file
    
  }

  function getNewQuestion(){

  }
  //showQuestion();



/*
Psuedocode 

Variables
---

score = 0; 


1. We need a list of questions to be displayed on the page: these questions should be stored in the questions.js file. 

    1.1 These questions should be stored within an array of objects. 
    1.2 These objects should contain properties to store the buttons
        - describe the object 

        [

            {
                question: 'What data types can an array store ?',
                choices: ['string', 'numbers', 'objects', 'all of them' ],
                answer: 'all of them', 
                correct: false
            }, 

            // multiple object questions 
        ]

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