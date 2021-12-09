/*
===============================================
talk to the trivia.html file
===============================================
*/
const question = document.getElementById('question')
const options = Array.from(document.getElementsByClassName('option-text'))
const progressText = document.getElementById('progressText')
const progressBarFull = document.getElementById('progressBarFull')
const scoreText = document.getElementById('score')
const loader = document.getElementById('loader')
const trivia = document.getElementById('trivia')
const optionContainer = Array.from(document.getElementsByClassName('option-container'))


// API URL
let url = 'https://api.trivia.willfry.co.uk/questions?categories=food_and_drink&limit=15'

let currentQuestion = {} // starts as an empty object
let acceptingAnswers = false // create a delay before collecting next answer
let score = 0 // start score at 0
let questionCounter = 0 // start question counter at 0
let putTimerCodeHere = 0
let availableQuestions = [] // starts as an empty array
let questions = [] // let questions = empty array
let countdownTimer = 15 // countdown for answering questions

/*
===============================================
fetch API - get the data and make a promise
===============================================
*/
fetch(url)
.then(
    function(response) {
    if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
        response.status)
        return
    }

    // List out all data attached to the fetch url
    response.json().then(function(questionData) {        
    
    // get the original question, format it and return array of new formatted questions
    questions = questionData.map( // returns empty arrays
        // object
        function(getTriviaQuestion) {
            const setupQuestion = {
            question: getTriviaQuestion.question 
        }    

    // spread operator - grab all incorrect answers and randomize the order it's shown       
    const answerOptions = [... getTriviaQuestion.incorrectAnswers]  // expand an iterable object into the list of arguments
    // Returns a random integer from 1 to 3
    setupQuestion.answer = Math.floor(Math.random() * 3) + 1 

    // takes all 3 incorrect answers and adds correct answer
    // put all answers together and randomize order
    answerOptions.splice(setupQuestion.answer - 1, 0, getTriviaQuestion.correctAnswer)

    // run through each answer and add to setupQuestion
    answerOptions.forEach((answerOption, index) => {
        setupQuestion['option' + (index + 1)] = answerOption // option
    })

    return setupQuestion
    })

    // start the game function
    startGame()   

    }) // end response.json() function
})
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
})


/*
======================================
Function: Load and Start The Game
======================================
*/

// points and max questions
const correctBonus = 10
const maxQuestions = 10

// load and start the game
function startGame() {
    // reset
    questionCounter = 0
    score = 0

    // take questions and spread out each item and put in new array
    availableQuestions = [... questions]

    // 
    getNewQuestion()
    
    // toggle the classes to show and hide loader
    trivia.classList.remove('hidden')
    loader.classList.add('hidden')
}

/*
======================================
Function: Move the questions along
======================================
*/

function getNewQuestion() {
    // check if available questions is 0 or question counter is maxed out
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){

        // save score into local storage
        localStorage.setItem('mostRecentScore', score)

        // go to the end page
        return window.location.assign('end.html')
    }

    // else:
    // add a question
    questionCounter++

    // display question number and total questions
    progressText.innerHTML = `Question ${questionCounter} / ${maxQuestions}`

    // update the styled width of progress bar in percentage
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`

    // random number * number of left over questions turned into integer
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    
    // randomize each question
    question.innerText = currentQuestion.question
    
    // fill in each answer option
    options.forEach( answerOption => {
        const number = answerOption.dataset['number']
        answerOption.innerText = currentQuestion['option' + number]
    })

    // remove already used question
    availableQuestions.splice(questionIndex, 1)

    // after question load allow user to answer
    acceptingAnswers = true
}


/*
==========================================
Function: What to do when option is chosen
==========================================
*/

// grab each answerOption and listen for clicked answer
options.forEach(answerOption => {
    answerOption.addEventListener('click', e => {
    // not ready for user to answer - return nothing
        if (!acceptingAnswers) 
        return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        // start answer default as incorrect 
        let applyOptionClass = 'incorrect'
        if (selectedAnswer == currentQuestion.answer) {
            applyOptionClass = 'correct'
        }

        // play corresponding sound to answer chosen
        let correctSound = new Audio()
        let wrongSound = new Audio()
        correctSound.src = "assets/sounds/correct-answer.wav"
        wrongSound.src = "assets/sounds/incorrect-answer.wav"
        correctSound.volume = 0.2
        wrongSound.volume = 0.2

        // if user chooses the correct answer increment the score
        if (applyOptionClass === 'correct') {
            correctSound.play()
            incrementScore(correctBonus)
        } else {
            wrongSound.play()
        }
        
        // applies a new class in the parent element where the option lives
        selectedChoice.parentElement.classList.add(applyOptionClass) 

        // remove class to prevent multiple options to be styled & give a delay of 1 second before next question
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(applyOptionClass)       
            getNewQuestion()
        }, 1000)        

    })
})


/*
======================================
Function: hover over sound for options
======================================
*/
optionContainer.forEach(answerOption => {
    answerOption.addEventListener('mouseover', function() {
    
    // hover = sound
    const musicHover = new Audio('assets/sounds/mouseover.wav');
    musicHover.play();
    musicHover.loop = false;
    musicHover.playbackRate = 1;        
    musicHover.volume = 0.2

    })
})


/*
======================================
Function: score tally incrementer
======================================
*/
 
function incrementScore(num) {
    score +=num
    scoreText.innerText = score
}





