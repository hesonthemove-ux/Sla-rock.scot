/* ROCK.SCOT DYNAMIC ROUTER 2026 
   Maintains live audio stream during page transitions.
*/

document.addEventListener('click', (e) => {
    // Intercept clicks on Nav links or buttons that point to .html files
    const link = e.target.closest('nav a, .price-strip a, .cta-btn');
    if (!link) return;

    const href = link.getAttribute('href');

    // Only process internal .html links (ignores mailto: or external sites)
    if (href && href.endsWith('.html') && !href.startsWith('http')) {
        e.preventDefault();
        loadPage(href);
        
        // Push the new URL to the browser bar without a refresh
        window.history.pushState({}, '', href);
    }
});

async function loadPage(url) {
    const mainContainer = document.querySelector('main');
    
    try {
        // 1. Start the fade-out effect
        mainContainer.style.opacity = 0;

        // 2. Fetch the new page content
        const response = await fetch(url);
        if (!response.ok) throw new Error('Page not found');
        const html = await response.text();
        
        // 3. Parse the new content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('main').innerHTML;
        const newTitle = doc.querySelector('title').innerText;

        // 4. Wait for fade-out, then swap content and update SEO
        setTimeout(() => {
            mainContainer.innerHTML = newContent;
            document.title = newTitle; // Updates the browser tab name
            
            // 5. Update Navigation "Active" state
            updateActiveLink(url);

            // 6. Fade back in and scroll to top
            mainContainer.style.opacity = 1;
            window.scrollTo(0, 0);
        }, 200);

    } catch (err) {
        console.error('Routing error:', err);
        // If anything fails, do a hard reload to ensure the user sees the content
        window.location.href = url;
    }
}

function updateActiveLink(url) {
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.classList.remove('active');
        // Match the link's href to the current URL
        if (url.includes(a.getAttribute('href'))) {
            a.classList.add('active');
        }
    });
}

// Handle the browser "Back" and "Forward" buttons
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});
