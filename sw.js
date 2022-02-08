const staticCacheName = 'site-static'
const assets = [
    './',
    './index.html',
    './js/script.js',
    'https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css'
]

// listen for installed service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assests')
            cache.addAll(assets)
        })
    )
})

// listen for activated service worker
self.addEventListener('activate', event => {
})

// listen to fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request);
        })
    )
});