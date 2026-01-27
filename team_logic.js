const teamMembers = [
    { name: 'STATION HEAD', bio: 'The chaos coordinator.', img: 'logo.png' },
    { name: 'THE WIRE LEAD', bio: 'Curating the redistribution hub.', img: 'logo.png' },
    { name: 'TECH LEAD', bio: 'Ensuring the heartbeat never stops.', img: 'logo.png' }
];

function renderTeam() {
    const container = document.getElementById('team-cascade');
    teamMembers.forEach((m, i) => {
        const card = document.createElement('div');
        card.className = 'glass-panel team-card';
        card.style.transform = `translateY(${i * 20}px) rotate(${i % 2 === 0 ? -2 : 2}deg)`;
        card.innerHTML = `
            <h3>${m.name}</h3>
            <div class="bio-popout" id="bio-${i}">${m.bio}</div>
            <button onclick="toggleBio(${i})" class="punk-btn">VIEW INTEL</button>
        `;
        container.appendChild(card);
    });
}

function toggleBio(id) {
    const el = document.getElementById(`bio-${id}`);
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

// Postcode Autocomplete Fix
async function lookupPostcode(pc) {
    if(pc.length < 5) return;
    try {
        const res = await fetch(`https://api.postcodes.io/postcodes/${pc}`);
        const data = await res.json();
        if(data.status === 200) {
            document.getElementById('city-field').value = data.result.admin_district;
            document.getElementById('region-field').value = data.result.european_electoral_region;
        }
    } catch(e) { console.error("Postcode failure"); }
}
