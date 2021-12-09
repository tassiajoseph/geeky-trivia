/*
================================
play music onload
================================
*/

function playEndMusic() {
    const music = new Audio('assets/music/endtheme.mp3');
    music.play();
    music.loop = true;
    music.playbackRate = 1;        
    music.volume = 0.4
    // music.pause();
}

/*
================================
1 sec pause before start playing
================================
*/

setTimeout(function() {
    playEndMusic() }, 500)

    