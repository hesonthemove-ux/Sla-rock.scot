/* ROCK.SCOT DYNAMIC ROUTER 2026
    Allows navigation without stopping the live stream.
*/

document.addEventListener('click', (e) => {
    const link = e.target.closest('nav a, .price-strip a, .cta-btn');
    if (!link) return;

    const href = link.getAttribute('href');

    // Only intercept internal .html links (not mailto or external)
    if (href && href.endsWith('.html')) {
        e.preventDefault();
        loadPage(href);
        
        // Update URL in browser bar without refreshing
        window.history.pushState({}, '', href);
    }
});

async function loadPage(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        // Create a temporary element to parse the incoming HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Grab the new content from the <main> tag
        const newContent = doc.querySelector('main').innerHTML;
        const mainContainer = document.querySelector('main');
        
        // Smooth transition out
        mainContainer.style.opacity = 0;
        
        setTimeout(() => {
            mainContainer.innerHTML = newContent;
            mainContainer.style.opacity = 1;
            
            // Update Active Nav Link
            document.querySelectorAll('.nav-menu a').forEach(a => {
                a.classList.remove('active');
                if(url.includes(a.getAttribute('href'))) a.classList.add('active');
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
        }, 200);

    } catch (err) {
        console.error('Failed to load page:', err);
        window.location.href = url; // Fallback to normal load if fetch fails
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname);
});
