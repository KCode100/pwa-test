const staticCacheName = 'site-static-v2'
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
    './',
    './index.html',
    './js/script.js',
    'https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css',
    './fallback.html'
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
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

// listen to fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone())
                    return fetchRes
                })
            });
        }).catch(() => caches.match('./fallback.html'))
    )
});