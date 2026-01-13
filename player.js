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
            trackTitle.innerText = "Streaming Live...";
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
        // Using a public proxy to bypass CORS security blocks
        const proxy = "https://api.allorigins.win/get?url=";
        const apiUrl = encodeURIComponent(`https://api.broadcast.radio/api/nowplaying/${stationId}`);
        
        const response = await fetch(proxy + apiUrl);
        const wrapper = await response.json();
        const data = JSON.parse(wrapper.contents);
        
        if (data && data.success) {
            // 1. Update the "Now Playing" bar
            const now = data.body?.now_playing;
            if (now && now.title) {
                trackTitle.innerText = `${now.artist} - ${now.title}`;
            }

            // 2. Update Recently Played List
            const history = data.body?.recently_played;
            if (history && Array.isArray(history) && recentBox) {
                recentBox.innerHTML = ''; // Clear "Fetching" message
                
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
            }
        }
    } catch (error) {
        console.error("Metadata fetch error:", error);
    }
}

if (playBtn) { playBtn.addEventListener('click', togglePlayback); }
setInterval(updateStationInfo, 30000);
updateStationInfo();
