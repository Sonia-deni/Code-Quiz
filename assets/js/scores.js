var highScores = JSON.parse(localStorage.getItem("scoresList")) || [];//get the up to date list from local storage
var list = document.querySelector("#highscores"); //set text to the unordered list

//for each element in the array of scores, get the score and the initials and create a new list element to add to the end of the list
for(var i=0; i<highScores.length; i++){
    var eachScore = highScores[i].initials + " -  " + highScores[i].score;
    var li = document.createElement("li");
    li.textContent = eachScore;
    list.appendChild(li);  
}


//add event listener to clear button. If clicked, clear local storage and set the list text to empty
var clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function(){
localStorage.clear();
list.textContent = "";
})   
