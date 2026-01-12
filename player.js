// ROCK.SCOT Master Player Logic
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');
const eqBars = document.querySelectorAll('.eq-bar');

// Placeholder for the actual stream URL
const streamUrl = "https://your-stream-url.com/live"; 
const audio = new Audio(streamUrl);

let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerText = "Listen Live";
        playBtn.style.background = "#ff3e00";
        trackTitle.innerText = "Paused";
        stopEQ();
    } else {
        // In a real scenario, we reload to catch the live edge
        audio.load(); 
        audio.play().catch(error => {
            console.log("Playback failed: ", error);
        });
        playBtn.innerText = "Stop";
        playBtn.style.background = "#fff";
        trackTitle.innerText = "Rock.Scot - Live Feed";
        startEQ();
    }
    isPlaying = !isPlaying;
}

function startEQ() {
    eqBars.forEach(bar => {
        bar.style.animation = "eq 0.8s infinite ease-in-out";
    });
}

function stopEQ() {
    eqBars.forEach(bar => {
        bar.style.animation = "none";
    });
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);

// Add basic CSS animation for EQ bars via JS if not in CSS file
const style = document.createElement('style');
style.textContent = `
    @keyframes eq {
        0% { height: 5px; }
        50% { height: 20px; }
        100% { height: 5px; }
    }
    .eq-container {
        display: flex;
        align-items: flex-end;
        gap: 2px;
        height: 20px;
    }
    .eq-bar {
        width: 3px;
        height: 5px;
        background: #ff3e00;
    }
`;
document.head.appendChild(style);

// Simulated Track Update (In reality, fetch from your Icecast/Shoutcast JSON)
setInterval(() => {
    if(isPlaying) {
        const tracks = ["AC/DC - Back in Black", "Guns N' Roses - Welcome to the Jungle", "Biffy Clyro - Mountains"];
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        trackTitle.innerText = randomTrack;
    }
}, 30000);
