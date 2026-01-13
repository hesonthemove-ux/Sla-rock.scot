// ROCK.SCOT Master Player Logic - Correct Broadcast.Radio Stream
const streamUrl = "HTTPS://uksouth.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd"; 
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

function togglePlayback() {
    if (!isPlaying) {
        // Attempt to play
        audio.play().then(() => {
            isPlaying = true;
            playBtn.innerText = "Stop";
            playBtn.style.background = "#ffffff"; 
            trackTitle.innerText = "Streaming Live";
        }).catch(err => {
            console.error("Playback failed:", err);
            trackTitle.innerText = "Stream Error";
        });
    } else {
        // Stop and reset the buffer
        audio.pause();
        audio.src = streamUrl; 
        isPlaying = false;
        playBtn.innerText = "Listen";
        playBtn.style.background = "#ff3e00"; 
        trackTitle.innerText = "Ready to Rock";
    }
}

if (playBtn) {
    playBtn.addEventListener('click', togglePlayback);
}
