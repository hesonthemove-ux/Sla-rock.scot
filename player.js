const streamUrl = "HTTPS://uksouth.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd"; 
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

// POPUP PLAYER LOGIC
// This keeps the music playing even when the user changes pages on the main site.
function openPlayer() {
    const width = 400;
    const height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    window.open(
        'player-window.html', 
        'RockScotPlayer', 
        `width=${width},height=${height},top=${top},left=${left},menubar=no,status=no,toolbar=no`
    );
}

if (playBtn) {
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPlayer();
    });
}

// Keep the "Now Playing" text updated on the main site even if they aren't in the popup
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
