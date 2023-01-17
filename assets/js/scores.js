var highScores = JSON.parse(localStorage.getItem("scoresList")) || [];//get the up to date list from local storage
var list = document.querySelector("#highscores"); //set text to the unordered list

//for each element in the array of scores, get the score and the initials and create a new list element to add to the end of the list
for(var i=0; i<highScores.length; i++){
    var eachScore = highScores[i].score + " -  " + highScores[i].initials;
    var li = document.createElement("li");
    li.textContent = eachScore;
    list.appendChild(li);  
}
