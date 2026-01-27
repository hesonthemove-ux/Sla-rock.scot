async function fetchWire() {
    const { data, error } = await _sb.from('news_wire')
        .select('headline, source_name, created_at')
        .order('created_at', { ascending: false })
        .limit(15);
    
    const list = document.getElementById('wire-content');
    if(!list) return;
    if(error) { list.innerHTML = 'FEED ERROR: ' + error.message; return; }
    
    list.innerHTML = '';
    data.forEach(n => {
        list.innerHTML += `
            <div style="border-bottom:2px solid #000; padding:12px 0; font-family:monospace;">
                <span style="background:#000; color:var(--orange); padding:2px 6px; margin-right:5px;">
                    ${n.source_name || 'INTEL'}
                </span>
                <span style="text-transform:uppercase; font-weight:900;">${n.headline}</span>
            </div>`;
    });
}
