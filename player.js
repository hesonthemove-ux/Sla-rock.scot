// ROCKIN' SCOTLAND PLAYER ENGINE - STATION ID 9400
const stationId = "9400";
const streamUrl = "https://stream.broadcast.radio/caledonia-tx-ltd";

const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

// FUNCTION TO FETCH LIVE DATA
async function updateLiveData() {
    try {
        // Fetching from the Broadcast Radio API
        const response = await fetch(`https://api.broadcast.radio/api/nowplaying/${stationId}`);
        const data = await response.json();

        if (data) {
            // 1. Update the Player Bar Tagline
            const current = data.now_playing;
            const show = data.current_show ? data.current_show.title : "Rockin' Scotland";
            
            if (current) {
                trackTitle.innerHTML = `LIVE: ${current.title} - ${current.artist} | <span style="color: #ff3e00">WITH ${show}</span>`;
            }

            // 2. Update the "Last 4" list if it exists on the page
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
        console.error("Metadata fetch error:", err);
    }
}

// Play/Pause Logic
let isPlaying = false;
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        playBtn.textContent = "Stop";
        isPlaying = true;
    } else {
        audio.pause();
        audio.src = streamUrl; // Flush buffer
        playBtn.textContent = "Listen Live";
        isPlaying = false;
    }
});

// Refresh data every 30 seconds
setInterval(updateLiveData, 30000);
updateLiveData();
