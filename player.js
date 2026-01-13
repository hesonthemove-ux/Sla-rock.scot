const streamUrl = "HTTPS://uksouth.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd"; 
const stationId = "16641";
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');
const recentBox = document.getElementById('recent-tracks');

let isPlaying = false;

// PLAY/PAUSE LOGIC
function togglePlayback() {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            playBtn.innerText = "Stop";
            playBtn.style.background = "#ffffff"; 
            trackTitle.innerText = "Streaming Live...";
            updateStationInfo(); // Fetch info immediately on play
        }).catch(err => {
            trackTitle.innerText = "Stream Error";
        });
    } else {
        audio.pause();
        audio.src = streamUrl; 
        isPlaying = false;
        playBtn.innerText = "Listen";
        playBtn.style.background = "#ff3e00"; 
        trackTitle.innerText = "Ready to Rock";
    }
}

// FETCH NOW PLAYING & RECENTLY PLAYED
async function updateStationInfo() {
    try {
        const response = await fetch(`https://api.broadcast.radio/api/nowplaying/${stationId}`);
        const data = await response.json();
        
        if (data.success && data.body) {
            const now = data.body.now_playing;
            // Update Player Bar
            if (now.title) {
                trackTitle.innerText = `${now.artist} - ${now.title}`;
            }

            // Update Recently Played List (First 3 items)
            if (data.body.recently_played && recentBox) {
                recentBox.innerHTML = ''; // Clear old list
                data.body.recently_played.slice(0, 3).forEach(track => {
                    const trackRow = document.createElement('div');
                    trackRow.style.display = 'flex';
                    trackRow.style.justifyContent = 'space-between';
                    trackRow.style.fontSize = '0.8rem';
                    trackRow.style.borderBottom = '1px solid #1a1a1a';
                    trackRow.style.paddingBottom = '4px';
                    trackRow.style.marginBottom = '4px';
                    
                    trackRow.innerHTML = `
                        <span>${track.artist} - ${track.title}</span>
                        <span style="color: #444;">${new Date(track.played_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    `;
                    recentBox.appendChild(trackRow);
                });
            }
        }
    } catch (error) {
        console.error("Metadata fetch failed", error);
    }
}

// Initial Listener & Auto-Refresh
if (playBtn) {
    playBtn.addEventListener('click', togglePlayback);
}
setInterval(updateStationInfo, 30000); // Refresh every 30 seconds
updateStationInfo(); // Run once on page load
                        
