let cacheName = "v1";

let cachedAssets = [
    "/",
    "../../css/app.css",
    "../../js/app.js",

    // IMAGES
    // "../../images/bars.svg",
    // "../../images/bin.svg",
    // "../../images/bookmark.svg",
    // "../../images/chevron-left.svg",
    // "../../images/ghost.svg",
    // "../../images/search.svg",
    // "../../images/shopping-basket.svg",
    // "../../images/webcipe-text-w.svg",
    // "../../images/webcipe-text/svg",
    // "../../images/webcipe.svg",
    // "../../images/x.svg"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
            cache.addAll(cachedAssets)
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