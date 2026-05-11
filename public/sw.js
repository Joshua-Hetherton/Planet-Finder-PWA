//Service worker taken from Lab 10, with modifications to fit my Planet Finder PWA
// Files to cache
var cacheName= "Planet-Finder-PWA-v1";
var appShellFiles = [
    '/index.html',
    '/calendar.html',
    '/planet-info.html',
    '/css/main.css',
    '/css/planet-info.css',
    '/css/calendar.css',
    '/js/astronomy.browser.min.js',
    '/js/planets_detail.js',
    '/js/astronomy-calc.js',
    '/images/planets/Cassini-Saturn.jpg',
    '/images/planets/Earth_Moon.jpg',
    '/images/planets/Mariner_10_Mercury.jpg',
    '/images/planets/Mariner_10_Venus.jpg',
    '/images/planets/Mars-valles-marineris-enhanced.jpg',
    '/images/planets/Neptune.jpg',

    
    
];

// INSTALL: Save all files into the browser cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(appShellFiles);
    })
    );
});

// FETCH: Serve from cache first, then try the network
self.addEventListener('fetch', (e) => {
    const url_path = new URL(e.request.url);
    //MongoDB+Nasa API Backend Requests
    if (url_path.pathname.startsWith("/api/planet-info")) {
        e.respondWith(
            fetch(e.request)
            .then((response) => {
                const clone = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(e.request, clone);
                });
                return response;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    //Le Systeme Solaire API
    if(url_path.pathname.startsWith("/api/solarsystem")) {
        e.respondWith(
            fetch(e.request)
            .then((response) => {
                const clone = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(e.request, clone);
                });
                return response;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    //NASA images
    if(url_path.pathname.startsWith("/api/nasa-images")) {
        e.respondWith(
            fetch(e.request)
            .then((response) => {
                const clone = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(e.request, clone);
                });
                return response;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    //For Static Assets/files
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).then((networkResponse) => {
                return caches.open(cacheName).then((cache) => {
                    // Save a copy of the new network response for next time
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

// ACTIVATE: Delete old caches if the cacheName changes
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

