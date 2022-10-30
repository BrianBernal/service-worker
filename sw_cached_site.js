// Option 2: Caching the whole site

const cacheName = 'v2';

/* SW lifecycle 2 and 3 */

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed'); // lifecycle: 2. Installed

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
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone()
        // Open cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to cache
            cache.put(e.request, resClone)
          })
        return res
      })
      .catch(err => caches.match(e.request).then(res => res))
  )
})
