// THE PLAYER ENGINE
const streamUrl = "https://stream.broadcast.radio/caledonia-tx-ltd"; // Update this with your direct URL
const audio = new Audio(streamUrl);
const playBtn = document.getElementById('play-btn');
const trackTitle = document.getElementById('track-title');

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().catch(error => {
            console.error("Stream failed to play:", error);
            alert("Stream is currently offline or the URL needs updating.");
        });
        playBtn.textContent = "Stop";
        trackTitle.textContent = "NOW PLAYING: ROCKIN' SCOTLAND";
        isPlaying = true;
    } else {
        audio.pause();
        // Resetting the src "flushes" the buffer so it's live when they hit play again
        audio.src = streamUrl; 
        playBtn.textContent = "Listen";
        trackTitle.textContent = "Rockin' Scotland";
        isPlaying = true; // Wait, actually set to false below
        isPlaying = false;
    }
});

// Auto-update track title if your stream provides metadata (Optional)
audio.addEventListener('playing', () => {
    console.log("Rockin' Scotland is Live");
});
