let cacheName = "v1";

// Must cache all necessary files in order to work offline.
let filesToCache = [
    "/",
    "/manifest.json",
    "/css/app.css",
    "/js/app.min.js",
    "/sw.js",
    // Fonts
    "/assets/fonts/poppins-regular.woff2",
    // Icons
    "/assets/icons/bars.svg",
    "/assets/icons/bin-alt.svg",
    "/assets/icons/bookmark.svg",
    "/assets/icons/check.svg",
    "/assets/icons/chevron-down.svg",
    "/assets/icons/chevron-left.svg",
    "/assets/icons/chevron-up.svg",
    "/assets/icons/ghost.svg",
    "/assets/icons/search.svg",
    "/assets/icons/shopping-basket.svg",
    "/assets/icons/x.svg",
    // Logos
    "/assets/images/webcipe-text.svg",
    "/assets/images/webcipe-text-w.svg",
];

// On installing the service worker.
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
            cache.addAll(filesToCache)
        })
        .then(()=> self.skipWaiting())
        .catch(err=> console.log(err))
    );
});

// On the service worker's activation.
self.addEventListener("activate", e => {
    e.waitUntil(

        // Remove unwanted Caches
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Keywords to cache
let assetsToCache = ["fonts", "images", "icons"];

// Listen for fetch requests.
self.addEventListener("fetch", e => {

    // Loop over Keywords to cache assets which match.
    for(asset of assetsToCache){
        if(e.request.url.includes(asset)){
            return e.respondWith(
                caches.match(e.request).then(res=>{
                    return res || caches.open(cacheName).then((cache)=>{
                        // Carry out fetch request and cache response.
                        return fetch(e.request).then(resp => {
                            cache.put(e.request, resp.clone());
                            return resp;
                        }).catch(err=>{
                            console.log(err);
                            return false;
                        });
                    })
                })
                
            );
        }
    }
    
    e.respondWith(
        // If requested fetch is cached, return cached version.
        caches.match(e.request).then( res =>{
            // Uncomment and comment out the line below to block connections.
            // return res || false;
            return res || fetch(e.request).catch(err=>{return false});
        })
    ); 
});