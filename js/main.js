// SW lifecycle 1

// Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js') // caching option 1
      // .register('../sw_cached_site.js') // caching option 2
      .then(reg => console.log('Service worker: Registered')) // lifecycle: 1. Register
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })
}
