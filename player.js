/* ROCK.SCOT PLAYER ENGINE 2026
    Stream: Caledonia TX Ltd via Broadcast Radio
*/

const streamUrl = 'https://uksoutha.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd'; 
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const eqBars = document.querySelectorAll('.eq-bar');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

// 1. TOGGLE PLAY/PAUSE
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        // Pre-load logic for smoother start
        audio.load();
        audio.play()
            .then(() => {
                isPlaying = true;
                playBtn.innerText = 'STOP';
                playBtn.style.background = '#ff3e00';
                playBtn.style.color = '#000';
                startEqualizer();
                trackTitle.innerText = "STREAMING LIVE";
            })
            .catch(err => {
                console.error("Playback failed:", err);
                trackTitle.innerText = "STREAM ERROR";
            });
    } else {
        audio.pause();
        // Clear the source and re-assign to drop the buffer
        audio.src = ''; 
        audio.src = streamUrl; 
        isPlaying = false;
        playBtn.innerText = 'LISTEN LIVE';
        playBtn.style.background = 'transparent';
        playBtn.style.color = '#ff3e00';
        stopEqualizer();
        trackTitle.innerText = "SCOTLAND'S ROCK STATION";
    }
});

// 2. EQUALIZER ANIMATION LOGIC
function startEqualizer() {
    eqBars.forEach((bar, index) => {
        bar.style.animation = `eqBounce ${0.3 + (index * 0.1)}s infinite ease-in-out`;
    });
}

function stopEqualizer() {
    eqBars.forEach(bar => {
        bar.style.animation = 'none';
        bar.style.height = '10px'; 
    });
}

// 3. KEYFRAME INJECTION
const style = document.createElement('style');
style.innerHTML = `
    @keyframes eqBounce {
        0% { height: 5px; opacity: 0.5; }
        50% { height: 20px; opacity: 1; }
        100% { height: 5px; opacity: 0.5; }
    }
`;
document.head.appendChild(style);
