// listen for installed service worker
self.addEventListener('install', event => {
    console.log('service worker has been installed')
})

// listen for activated service worker
self.addEventListener('activate', event => {
    console.log('service worker has been activated')
})

// listen to fetch event
self.addEventListener('fetch', (event) => {
    console.log('fetch event', event)
});