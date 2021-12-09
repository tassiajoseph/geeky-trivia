/*
================================
play music onload
================================
*/

function playTriviaMusic() {
    const music = new Audio('assets/music/triviatheme.mp3');
    music.play();
    music.loop = true;
    music.playbackRate = 1;        
    music.volume = 0.2
    // music.pause();
}

/*
================================
1 sec pause before start playing
================================
*/

setTimeout(function() {
    playTriviaMusic() }, 500)

    