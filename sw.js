"use strict";

const CACHE_PREFIX = "justyna3-testy-z-ustaw-";
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const APP_FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/csv.js",
  "./js/app.js",
  "./js/pwa.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./materialy-do-nauki/01_Ustawa_uslugi_hotelarskie.pdf",
  "./materialy-do-nauki/02_OJ_L_202401028_PL_TXT.pdf",
  "./materialy-do-nauki/03_Ustawa_samorzad_gminny.pdf",
  "./materialy-do-nauki/04_Ustawa_pracownicy_samorzadowi.pdf",
  "./materialy-do-nauki/05_Kodeks_postepowania_administracyjnego.pdf",
  "./materialy-do-nauki/KPA Podlaskie.png",
  "./materialy-do-nauki/KPA-definicje.png",
  "./materialy-do-nauki/KPA-terminy.png",
  "./materialy-do-nauki/Kodeks postępowania.png",
  "./materialy-do-nauki/Kodeks-postępowania.png",
  "./materialy-do-nauki/Najem_krótkoterminowy_w_UE.png",
  "./materialy-do-nauki/Samorząd_Gminny.png",
  "./materialy-do-nauki/Usługi_hotelarskie_w_Polsce.png",
  "./materialy-do-nauki/kpo-praktyka.png",
  "./materialy-do-nauki/miniatury/kpa.png",
  "./materialy-do-nauki/miniatury/najem-krotkoterminowy.png",
  "./materialy-do-nauki/miniatury/pracownicy-samorzadowi.png",
  "./materialy-do-nauki/miniatury/samorzad-gminny.png",
  "./materialy-do-nauki/miniatury/uslugi-hotelarskie.png",
  "./data/pytania_uslugi_hotelarskie.csv",
  "./data/pytania_najem_krotkoterminowy.csv",
  "./data/pytania_samorzad_gminny.csv",
  "./data/pytania_pracownicy_samorzadowi.csv",
  "./data/pytania_Kodeks_postepowania_administracyjnego_KPA.csv"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate" && !url.pathname.toLowerCase().endsWith(".pdf")) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html", { cacheName: CACHE_NAME }))
    );
    return;
  }

  event.respondWith(
    caches.match(request, { cacheName: CACHE_NAME }).then(cachedResponse => {
      const networkResponse = fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkResponse;
    })
  );
});
