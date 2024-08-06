// Cache version
const CACHE_NAME = 'static-cache-v1';

// Files to cache
const FILES_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './icon-192x192.png',
    './icon-512x512.png',
    './photo/artificial-intelligence-machine-learning-concept-with-blue-glowing-digital-human-brain-with-convolutions-inside-surrounded-by-neural-net-abstract-dark-background-3d-rendering.jpg',
    './sound effect/mixkit-arcade-game-jump-coin-216.wav',
    './sound effect/mixkit-game-level-completed-2059.wav'
];

// Install event
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
    console.log('[ServiceWorker] Fetch', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});