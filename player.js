/* ROCK.SCOT AUTOMATED ENGINE 2026 */
const streamUrl = 'https://uk1.fastcast4u.com/proxy/rockscot?mp=/stream';
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

// AUTOMATION: Fetch Live Song Title
async function updateTrackInfo() {
    try {
        // FastCast4u metadata proxy
        const response = await fetch('https://uk1.fastcast4u.com/proxy/rockscot?mp=/stats.json');
        const data = await response.json();
        if (data.songtitle) {
            trackTitle.innerText = data.songtitle.toUpperCase();
        }
    } catch (error) {
        trackTitle.innerText = "SCOTLAND'S ROCK STATION";
    }
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.innerText = 'Listen Live';
        playBtn.style.background = "transparent";
        playBtn.style.color = "#ff3e00";
    } else {
        audio.play();
        playBtn.innerText = 'Stop';
        playBtn.style.background = "#ff3e00";
        playBtn.style.color = "#000";
        // Refresh metadata every 20 seconds for SEO activity
        updateTrackInfo();
        setInterval(updateTrackInfo, 20000);
    }
    isPlaying = !isPlaying;
});
