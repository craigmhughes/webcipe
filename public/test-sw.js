let cacheName = "v1";

let filesToCache = [
    "/",
    "/manifest.json",
    "/css/app.css",
    "/js/app.js",
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

let assetsToCache = ["fonts", "images", "icons"]

self.addEventListener("fetch", e => {

    for(asset of assetsToCache){
        if(e.request.url.includes(asset)){
            return e.respondWith(
                caches.open(cacheName).then((cache)=>{
                    return fetch(e.request).then(resp => {
                        cache.put(e.request, resp.clone());
                        return resp;
                    })
                })
            );
        }
    }
    
    e.respondWith(
        // If requested fetch is cached, return cached version.
        caches.match(e.request).then( res =>{
            // return res || fetch(e.request);

            // Allow connections to chrome extensions
            if(e.request.url.includes("chrome-extension")) return e.request;

            // return res || false;
            return res || fetch(e.request);
        })
    );

    
});