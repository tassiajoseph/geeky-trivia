/*
==================
talk to index.html
==================
*/

let homeButton = document.getElementById('homeButton')

// home button sounds
homeButton.addEventListener('click', playStartSound)
homeButton.addEventListener('mouseover', playHoverSound) 


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
    musicStart.playbackRate = 1;        
    musicStart.volume = 0.2
}

/*
===================================
wait before redirect to trivia.html
===================================
*/

function homeRedirect() {            
    console.log(`hello`)

    setTimeout(function () {
        window.location.href = 'index.html';
    }, 500);

}


