const CACHE_NAME = 'sla-rock-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/logo.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intermittent Caching Logic (Suggestion 10)
self.addEventListener('fetch', (e) => {
  // If it's the news or gigs, go to network first
  if (e.request.url.includes('rss2json') || e.request.url.includes('gigs.txt')) {
    e.respondWith(fetch(e.request));
  } else {
    // Otherwise, check cache first for speed (SLA compliance)
    e.respondWith(
      caches.match(e.request).then((res) => {
        return res || fetch(e.request);
      })
    );
  }
});
