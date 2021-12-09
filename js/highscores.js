/*
================================
talk to the highscores.html file
================================
*/
const highScoresList = document.getElementById('highScoresList')

// get the high scores out of local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

/*
==================================================
go through each score and add an <li> to <ul> list
The Map object holds key-value pairs and remembers 
the original insertion order of the keys.
==================================================
*/

highScoresList.innerHTML =
highScores.map(function(score) {
    return `<li class="highScoresList"><b>Name:</b> ${score.name}<br><b>Score:</b> ${score.score}</li>`
    }).join('')


