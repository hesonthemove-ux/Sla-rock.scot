// CONFIGURATION - REPLACE 'YOUR_ID' WITH YOUR ACTUAL STATION ID NUMBER
const stationId = "YOUR_ID"; 
const streamUrl = "https://stream.broadcast.radio/caledonia-tx-ltd";

const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

// Metadata logic
async function updateMetadata() {
    try {
        const response = await fetch(`https://api.broadcast.radio/api/nowplaying/${stationId}`);
        const data = await response.json();
        
        if (data.success && data.body.now_playing) {
            const current = data.body.now_playing;
            const presenter = data.body.current_show ? data.body.current_show.title : "Rockin' Scotland";
            
            // Update the player bar
            trackTitle.innerHTML = `<strong>LIVE:</strong> ${current.title} - ${current.artist} <span style="margin-left:15px; color:#888;">WITH ${presenter}</span>`;
            
            // If you have a list for "Last 4", you can populate it here
            if (document.getElementById('recent-tracks')) {
                const history = data.body.recently_played.slice(0, 4);
                document.getElementById('recent-tracks').innerHTML = history.map(t => `<li>${t.title} - ${t.artist}</li>`).join('');
            }
        }
    } catch (err) {
        console.error("Metadata error:", err);
    }
}

// Update metadata every 30 seconds
setInterval(updateMetadata, 30000);
updateMetadata();

// Play/Pause Logic
let isPlaying = false;
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play();
        playBtn.textContent = "Stop";
        isPlaying = true;
    } else {
        audio.pause();
        audio.src = streamUrl; 
        playBtn.textContent = "Listen Live";
        isPlaying = false;
    }
});
                         
