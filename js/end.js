/*
===============================================
talk to the end.html file
===============================================
*/
const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const maxHighScores = 5


/*
===============================================
get score from local storage
===============================================
*/

// in trivia.js - get the highscore and display on page
const mostRecentScore = localStorage.getItem('mostRecentScore')

// turn the string into an array object - get the high score or return an empty array
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// fill the id of finalScore with the most recent score
finalScore.innerText = mostRecentScore


/*
=====================================================
disable the save button if no value in username field
=====================================================
*/

username.addEventListener('keyup', () => {
    // if no user input disable the button
    saveScoreBtn.disabled = !username.value
})


/*
===============================================
process scores
===============================================
*/

function saveHighScore(e) {
    // prevent browser from auto reload the page
    e.preventDefault()

    // create score object with most recent score and username
    const score = {
        // score: mostRecentScore,
        // random whole interger 1-100
        score: Math.floor(Math.random() * 100),
        name: username.value
    }
    // push/add this data into the empty array highScores (push the score variable into the highScores variable array)
    highScores.push(score)
    
    // add score to the highScores list array, sort the list based on decreasing scores and cut of anything over the number 5
    highScores.sort( (a, b) => {
        return b.score - a.score
    })
    highScores.splice(5)

    // update the high scores in local storage as a string
    localStorage.setItem('highScores', JSON.stringify(highScores))

    // after user submits their username redirect them to the home page
    window.location.assign('index.html')

    // console.log(highScores) // del
}

