self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.wantUntil(
      caches.open("static")
        .then(function(cache){
            console.log("precaching");
            cache.add('/index.html');
            cache.add('/');
        })
    );
  });
  self.addEventListener('activate', function(event) {
 console.log('[Service Worker] Activating Service Worker ...', event);
 return self.clients.claim();
 });
   self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response)
                  return response;
                else
                  return fetch(event.request);
              }
          )
      );
  });