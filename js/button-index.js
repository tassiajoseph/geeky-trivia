/*
==================
talk to index.html
==================
*/

let playButton = document.getElementById('playButton')
let highScoreButton = document.getElementById('highScoreButton')
let howToPlayButton = document.getElementById('howToPlayButton')

// play button sounds
playButton.addEventListener('click', playStartSound)
playButton.addEventListener('mouseover', playHoverSound)  

// highscore button sounds
highScoreButton.addEventListener('click', playStartSound)
highScoreButton.addEventListener('mouseover', playHoverSound)

// how to play button sounds
howToPlayButton.addEventListener('click', playStartSound)
howToPlayButton.addEventListener('mouseover', playHoverSound)


/*
================================
play sound when mouse hover over
================================
*/
function playHoverSound() {
    const musicHover = new Audio('assets/sounds/mouseover.wav');
    musicHover.play();
    musicHover.loop = false;
    musicHover.playbackRate = 1;        
    musicHover.volume = 0.4
}

/*
=============================
play sound when mouse clicked
=============================
*/

function playStartSound() {
    const musicStart = new Audio('assets/sounds/clickthrough.wav');
    musicStart.play();
    musicStart.loop = false;
    musicStart.playbackRate = 1.5;        
    musicStart.volume = 0.2
}

/*
===================================
wait before redirect to _.html
===================================
*/

function playRedirect() {            
    console.log(`hello`)

    setTimeout(function () {
        window.location.href = 'trivia.html';
    }, 500);

}

function hsRedirect() {            
    console.log(`hello`)

    setTimeout(function () {
        window.location.href = 'highscores.html';
    }, 500);

}

function howtoRedirect() {            
    console.log(`hello`)

    setTimeout(function () {
        window.location.href = 'howtoplay.html';
    }, 500);

}




