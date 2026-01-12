const streamUrl = 'https://uk1.fastcast4u.com/proxy/rockscot?mp=/stream';
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

async function updateTrack() {
    try {
        const res = await fetch('https://uk1.fastcast4u.com/proxy/rockscot?mp=/stats.json');
        const data = await res.json();
        if (data.songtitle) trackTitle.innerText = data.songtitle.toUpperCase();
    } catch (e) { trackTitle.innerText = "SCOTLAND'S ROCK STATION"; }
}

playBtn.addEventListener('click', () => {
    if (isPlaying) { audio.pause(); playBtn.innerText = 'Listen Live'; }
    else { audio.play(); playBtn.innerText = 'Stop'; updateTrack(); setInterval(updateTrack, 20000); }
    isPlaying = !isPlaying;
});

async function initWeather() {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=55.8642&longitude=-4.2518&current_weather=true`);
        const data = await res.json();
        document.getElementById('weather-temp').innerText = `${Math.round(data.current_weather.temperature)}°C - Live West`;
    } catch (e) { document.getElementById('weather-temp').innerText = "West of Scotland Weather"; }
}

function acceptCookies() { localStorage.setItem('rock_consent', 'yes'); document.getElementById('cookie-banner').style.display='none'; }
function rejectCookies() { localStorage.setItem('rock_consent', 'no'); document.getElementById('cookie-banner').style.display='none'; }
window.onload = () => { if(!localStorage.getItem('rock_consent')) document.getElementById('cookie-banner').style.display='block'; initWeather(); };
