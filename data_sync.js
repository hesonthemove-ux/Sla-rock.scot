<script>
    const _sb = supabase.createClient('https://figcmwjdbeurhjopxknp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY');

    async function fetchGigs() {
        const { data, error } = await _sb.from('gigs').select('*').order('date', { ascending: true });
        const list = document.getElementById('gig-list');
        if(!list) return;
        if(error) { list.innerHTML = 'GIG FEED OFFLINE'; return; }
        list.innerHTML = '';
        data.forEach(g => {
            list.innerHTML += `<div class="gig-entry"><strong>${g.date}</strong>: ${g.venue} - <span style="color:var(--orange)">${g.act}</span></div>`;
        });
    }

    async function fetchWire() {
        const { data, error } = await _sb.from('news_wire')
            .select('headline, source_name, created_at')
            .order('created_at', { ascending: false })
            .limit(20);
        
        const list = document.getElementById('wire-content');
        if(!list) return;
        if(error) { list.innerHTML = 'WIRE DISCONNECTED'; return; }
        
        list.innerHTML = '';
        data.forEach(n => {
            list.innerHTML += `
                <div style="border-bottom:2px solid #000; padding:12px 0; font-family:monospace; line-height:1.2;">
                    <span style="background:#000; color:var(--orange); padding:2px 5px; font-size:0.7rem; margin-right:8px;">${n.source_name}</span>
                    <span style="text-transform:uppercase; font-weight:900; color:#000;">${n.headline}</span>
                </div>`;
        });
    }

    function tab(id) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        const target = document.getElementById(id);
        if(target) target.classList.add('active');
        const btn = document.getElementById('btn-'+id);
        if(btn) btn.classList.add('active');
        
        if(id === 'live') fetchGigs();
        if(id === 'wire') fetchWire();
        if(id === 'crew') renderCrew();
    }

    const crewData = [{n:"Andy", b:"EK Legend"}, {n:"Alex", b:"Johnstone Noise"}, {n:"Stevie", b:"Inverclyde Auth"}, {n:"Mhairi", b:"Distortion Spc"}];
    function renderCrew() { 
        const list = document.getElementById('crew-list'); 
        if(!list) return;
        list.innerHTML = '';
        crewData.forEach(c => { 
            list.innerHTML += `<div class="crew-card" onclick="openBio('${c.n}','${c.b}')"><img src="./assets/branding/logo.png" style="width:100%; filter:grayscale(1);"><p>${c.n}</p></div>`; 
        });
    }
    function openBio(n,b) { document.getElementById('m-name').innerText=n; document.getElementById('m-body').innerText=b; document.getElementById('modal').style.display='flex'; }
    function closeModal() { document.getElementById('modal').style.display='none'; }
    function updateClock() { const c = document.getElementById('clock'); if(c) c.innerText = new Date().toTimeString().split(' ')[0]; requestAnimationFrame(updateClock); }
    
    // Initial Load
    tab('live');
    updateClock();
</script>
