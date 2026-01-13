const streamUrl = "HTTPS://uksouth.streaming.broadcast.radio/stream/16641/caledonia-tx-ltd"; 
const stationId = "16641";
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');
const recentBox = document.getElementById('recent-tracks');

let isPlaying = false;

function togglePlayback() {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            playBtn.innerText = "Stop";
            playBtn.style.background = "#ffffff"; 
            trackTitle.innerText = "Connecting...";
            updateStationInfo();
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

async function updateStationInfo() {
    try {
        // Using a highly reliable CORS proxy
        const apiUrl = `https://api.broadcast.radio/api/nowplaying/${stationId}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
        
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const wrapper = await response.json();
        const data = JSON.parse(wrapper.contents);
        
        if (data && data.success && data.body) {
            // 1. Update the "Now Playing" bar
            const now = data.body.now_playing;
            if (now && now.title) {
                trackTitle.innerText = `${now.artist} - ${now.title}`;
            } else {
                trackTitle.innerText = "ROCK.SCOT LIVE";
            }

            // 2. Update Recently Played List
            const history = data.body.recently_played;
            if (history && history.length > 0 && recentBox) {
                recentBox.innerHTML = ''; // Clear the "Fetching" status
                
                history.slice(0, 3).forEach(track => {
                    const row = document.createElement('div');
                    row.style.cssText = "display:flex; justify-content:space-between; font-size:0.8rem; border-bottom:1px solid #1a1a1a; padding:6px 0; margin-bottom:2px;";
                    
                    const timeStr = track.played_at ? new Date(track.played_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--';
                    
                    row.innerHTML = `
                        <span style="color:#eee;">${track.artist} - ${track.title}</span>
                        <span style="color:#444;">${timeStr}</span>
                    `;
                    recentBox.appendChild(row);
                });
            } else if (recentBox) {
                recentBox.innerHTML = '<div style="font-size:0.75rem; color:#444;">History temporarily unavailable</div>';
            }
        }
    } catch (error) {
        console.error("Metadata fetch error:", error);
        // Don't overwrite if we already have data showing
        if (recentBox && recentBox.innerText.includes("Fetching")) {
            recentBox.innerHTML = '<div style="font-size:0.75rem; color:#444;">ROCK.SCOT Playback History</div>';
        }
    }
}

// Initial Listener
if (playBtn) {
    playBtn.addEventListener('click', togglePlayback);
}

// Update every 30 seconds
setInterval(updateStationInfo, 30000);

// Run immediately on page load
updateStationInfo();
