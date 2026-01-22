const CACHE_NAME = 'authority-v6.0';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/core.js',
  './assets/branding/logo.png',
  './assets/crew/dj_alex.jpg',
  './assets/crew/dj_mhairi.jpg',
  './assets/background/background1.jpg',
  './assets/background/background2.jpg',
  './assets/background/background3.jpg',
  './assets/background/background4.jpg',
  './assets/background/background5.jpg',
  './assets/background/background6.jpg',
  './assets/background/background7.jpg'
];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
