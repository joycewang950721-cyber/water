self.addEventListener("install",function(e){
    e.waitUntill(
        caches.open("water-app").then(function(cache){
            return cache.addAll([
                "/",
                "/index.html",
                "/style.css",
                "script.js",
                "/manifest.json"
            ]);
        })
    );
});