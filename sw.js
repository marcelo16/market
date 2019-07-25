const arquivos_offline = [
  './',
];

const nome_cache = 'pages-cache-v1';

self.addEventListener('install', evento => {
  // Tentando instalar os arquivos offline
  evento.waitUntil(
    caches.open(nome_cache)
    .then(cache => {
      return cache.addAll(arquivos_offline);
    })
  );
});

self.addEventListener('fetch', evento => {
  console.log('Captura requisição para ', evento.request.url);
  evento.respondWith(
    caches.match(evento.request)
    .then(response => {
      if (response) {
        console.log('Encontrado ', evento.request.url, ' no cache');
        return response;
      }
      console.log('Network request for ', evento.request.url);
      return fetch(evento.request);
    })
  );
});