let cacheName = "v2";

let filesToCache = [
    "/",
    "/manifest.json",
    "/css/app.css",
    "/js/app.js",
    // Fonts
    "/assets/fonts/poppins-regular.woff2",
    "/assets/fonts/poppins-regular.woff",
    // Icons
    "/assets/icons/bars.svg",
    "/assets/icons/bin.svg",
    "/assets/icons/bookmark.svg",
    "/assets/icons/chevron-left.svg",
    "/assets/icons/ghost.svg",
    "/assets/icons/search.svg",
    "/assets/icons/shopping-basket.svg",
    "/assets/images/webcipe-text-w.svg",
    "/assets/images/webcipe-text.svg",
    "/assets/images/webcipe.svg",
    "/assets/icons/x.svg"
];

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

self.addEventListener("activate", e => {
    e.waitUntil(

        // Remove unwanted Caches
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName){
                        console.log("Delete Cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        // If requested fetch is cached, return cached version.
        caches.match(e.request).then( res =>{
            // return res || fetch(e.request);

            return res || false;
        })
    );
});