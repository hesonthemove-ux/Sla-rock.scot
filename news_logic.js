const newsStories = [
    { t: "BARROWLANDS ALERT", b: "Increased security for tonight's sold out show. Arrive early.", s: "GLA-WIRE" },
    { t: "KILMARNOCK RIFFS", b: "New rehearsal space opens in old industrial unit near town center.", s: "AYR-ROCK" },
    { t: "STIRLING GIG CANCELLED", b: "The Tolbooth show is postponed due to technical noise failure.", s: "CEN-PRESS" }
];

function renderWire() {
    const list = document.getElementById('wire-content');
    if(!list) return;
    list.innerHTML = '';
    newsStories.forEach(s => {
        list.innerHTML += `
            <div style="border-bottom:2px solid #000; padding:10px 0;">
                <span style="background:#000; color:var(--orange); padding:2px 5px;">[${s.s}]</span>
                <span style="text-transform:uppercase;">${s.t}:</span> ${s.b}
            </div>`;
    });
}
