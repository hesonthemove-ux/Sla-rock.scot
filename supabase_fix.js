// 1. RE-ESTABLISH SUPABASE CONNECTION
const _supabase = supabase.createClient('https://figcmwjdbeurhjopxknp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY');

// 2. FETCH REAL GIGS (Python Output)
async function fetchGigs() {
    const { data, error } = await _supabase.from('gigs').select('*').order('date', { ascending: true });
    if (error) { console.error('Gig Fetch Error:', error); return; }
    const list = document.getElementById('gig-list');
    if(!list) return;
    list.innerHTML = '';
    data.forEach(g => {
        list.innerHTML += `<div class="gig-entry"><strong>${g.date}</strong> ${g.venue} - <span style="font-weight:900;">${g.act}</span></div>`;
    });
}

// 3. FETCH REAL WIRE NEWS
async function fetchWire() {
    const { data, error } = await _supabase.from('news_wire').select('*').limit(10);
    const list = document.getElementById('wire-content');
    if(!list) return;
    if (error) { list.innerHTML = 'FEED OFFLINE'; return; }
    list.innerHTML = '';
    data.forEach(s => {
        list.innerHTML += `
            <div style="border-bottom:2px solid #000; padding:10px 0;">
                <span style="background:#000; color:var(--orange); padding:2px 5px;">[${s.source || 'WIRE'}]</span>
                <span style="text-transform:uppercase;">${s.title}:</span> ${s.content}
            </div>`;
    });
}

// 4. FIX NAVIGATION BREAKAGE
function tab(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    const btn = document.getElementById('btn-' + id);
    if(btn) btn.classList.add('active');
    
    // Trigger data loads
    if(id === 'live') fetchGigs();
    if(id === 'wire') fetchWire();
}
