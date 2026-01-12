/* ROCK.SCOT AUTOMATED ENGINE 2026 */
const streamUrl = 'https://uk1.fastcast4u.com/proxy/rockscot?mp=/stream';
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

// 1. LIVE TRACK METADATA
async function updateTrackInfo() {
    try {
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
        updateTrackInfo();
        setInterval(updateTrackInfo, 20000);
    }
    isPlaying = !isPlaying;
});

// 2. HYPER-LOCAL WEATHER ENGINE
async function fetchWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        
        // Simple Icon Logic
        let icon = "☁️";
        if (code <= 3) icon = "☀️";
        if (code >= 51) icon = "🌧️";

        document.getElementById('weather-temp').innerText = `${temp}°C and Rocking`;
        document.getElementById('weather-icon').innerText = icon;
        document.getElementById('weather-location').innerText = "Local Weather for You";
    } catch (e) {
        document.getElementById('weather-temp').innerText = "Great Rock Weather";
    }
}

function initWeather() {
    // Default: West of Scotland
    let lat = 55.8642; 
    let lon = -4.2518;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => fetchWeather(lat, lon)
        );
    } else {
        fetchWeather(lat, lon);
    }
}

// Start weather on load
initWeather();
