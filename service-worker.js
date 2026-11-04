const CACHE_NAME = "tennis-coach-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

const isAppShell = (request) =>
  request.mode === "navigate" ||
  request.url.endsWith("/index.html") ||
  request.url.endsWith("/manifest.json") ||
  request.url.endsWith("/service-worker.js");

// Google Fonts CSS arrives as an opaque response: cache it too, so the
// display font keeps working offline.
const cacheable = (response) => response.ok || response.type === "opaque";

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // App shell: network-first, so an update is picked up as soon as there's
  // signal, with the cached copy only as an offline fallback.
  if (isAppShell(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Static assets (icons, fonts): cache-first for speed and offline use.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (cacheable(response)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
