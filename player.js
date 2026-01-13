// ROCKIN' SCOTLAND PLAYER - HTTPS SECURE STREAM & METADATA
const stationId = "9400";
// UPDATED TO HTTPS
const streamUrl = "https://uksoutha.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd";

const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

// 1. STABLE AUDIO ENGINE
let isPlaying = false;
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().then(() => {
            playBtn.textContent = "Stop";
            isPlaying = true;
        }).catch(err => {
            console.error("HTTPS Playback failed:", err);
            // If the secure stream fails, we alert the user
            alert("Stream error. Please check your internet connection.");
        });
    } else {
        audio.pause();
        audio.src = streamUrl; // Flush buffer
        playBtn.textContent = "Listen Live";
        isPlaying = false;
    }
});

// 2. METADATA ENGINE (Station ID 9400)
async function updateLiveData() {
    try {
        const response = await fetch(`https://api.broadcast.radio/api/nowplaying/${stationId}`);
        const data = await response.json();

        if (data) {
            const current = data.now_playing;
            const show = data.current_show ? data.current_show.title : "Rockin' Scotland";
            
            if (current) {
                trackTitle.innerHTML = `LIVE: ${current.title} - ${current.artist} | <span style="color: #ff3e00">WITH ${show}</span>`;
            }

            const historyList = document.getElementById('recent-tracks');
            if (historyList && data.recently_played) {
                const historyHTML = data.recently_played.slice(0, 4).map(track => `
                    <li>
                        <span style="color: #ff3e00; font-weight: bold;">${track.title}</span><br>
                        <span style="color: #888; font-size: 0.8rem;">${track.artist}</span>
                    </li>
                `).join('');
                historyList.innerHTML = historyHTML;
            }
        }
    } catch (err) {
        console.error("Metadata error:", err);
    }
}

setInterval(updateLiveData, 30000);
updateLiveData();
