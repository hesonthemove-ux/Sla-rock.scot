const CACHE_NAME = 'authority-v6.0';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/core.js',
  './assets/branding/logo.png',
  './assets/crew/dj_alex.jpg',
  './assets/crew/dj_mhairi.jpg',
  './assets/background/bg1.jpg',
  './assets/background/bg22.jpg',
  './assets/background/bg3.jpg',
  './assets/background/bg4.jpg',
  './assets/background/bg5.jpg',
  './assets/background/bg6.jpg',
  './assets/background/bg7.jpg'
];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
