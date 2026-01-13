// ROCKIN' SCOTLAND PLAYER - FIXED STREAM & METADATA
const stationId = "9400";
// THE CORRECT DIRECT STREAM URL
const streamUrl = "http://uksoutha.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd";

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
            console.error("Playback failed:", err);
            // If the browser blocks HTTP on an HTTPS site, we alert the user
            alert("Please allow 'Insecure Content' in your browser settings to hear the live stream.");
        });
    } else {
        audio.pause();
        audio.src = streamUrl; // Flush buffer to stay live
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
            // Update Top Bar Text
            const current = data.now_playing;
            const show = data.current_show ? data.current_show.title : "Rockin' Scotland";
            
            if (current) {
                trackTitle.innerHTML = `LIVE: ${current.title} - ${current.artist} | <span style="color: #ff3e00">WITH ${show}</span>`;
            }

            // Update "Last 4" Sidebar on Home Page
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

// Initial fetch and 30-second refresh
setInterval(updateLiveData, 30000);
updateLiveData();
