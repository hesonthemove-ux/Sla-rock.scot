const streamUrl = "HTTPS://uksouth.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd"; 
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

// THE FIX: Standard in-page play/stop logic (No Popups)
function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerText = "Listen";
        playBtn.style.background = "#ff3e00";
    } else {
        audio.play().catch(e => console.error("Playback failed:", e));
        playBtn.innerText = "Stop";
        playBtn.style.background = "#fff"; // White when playing
    }
    isPlaying = !isPlaying;
}

if (playBtn) {
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAudio();
    });
}

// METADATA SYNC (Updates the artist/track name every 30s)
async function updateGlobalStatus() {
    const stationId = "16641";
    const proxy = "https://corsproxy.io/?";
    const apiUrl = `https://api.broadcast.radio/api/nowplaying/${stationId}`;

    try {
        const response = await fetch(proxy + encodeURIComponent(apiUrl));
        const data = await response.json();
        if (data && data.success && data.body?.now_playing) {
            const now = data.body.now_playing;
            if (trackTitle) trackTitle.innerText = `${now.artist} - ${now.title}`;
        }
    } catch (error) {
        if (trackTitle) trackTitle.innerText = "ROCK.SCOT LIVE";
    }
}

setInterval(updateGlobalStatus, 30000);
updateGlobalStatus();
