// Remember that is executed in a thread independent of main thread

// CACHING SITE

// Option 1: Cache the individual pages. (Option 2 in sw_cached_pages.js)
const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  'js/main.js'
]

/* SW lifecycle 2 and 3 */

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed'); // lifecycle: 2. Installed

  e.waitUntil( // Tells the browser wait until the promise param (caches.open()) finishes.
    caches // caches web api
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets)
        // Here, we have all files cached but, we still need to delivery this cached files
        // when browser is offline. We do that in the fetch event. => fetch event
        // But first, we also need to clean up any old cache => activate event
      })
      .then(() => self.skipWaiting())
  )
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated'); // lifecycle: 3. Activated
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cache => {
        if (cache !== cacheName) {
          console.log('Service Worker: Clearing Old Cache');
          return caches.delete(cache);
        }
      })
    ))
  )
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching'); // lifecycle: 4. Activated
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})
