/* MO Note のオフライン用キャッシュ。ファイルを更新したら VERSION を上げる（index.html の APP_VERSION も） */
const VERSION = 'mo-note-v9';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  // ブラウザの一時保存を通さず、必ず最新のファイルを取りに行く
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // 画面本体：つながっていれば最新を（3秒まで待つ）、だめならキャッシュ
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const res = await Promise.race([fetch(req, { cache: 'no-store' }), new Promise((_, rej) => setTimeout(() => rej('timeout'), 3000))]);
        if (res && res.ok) { cache.put('./index.html', res.clone()); return res; }
        throw 'bad';
      } catch (_) { return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error(); }
    })());
    return;
  }
  // アイコンなど：キャッシュ優先
  e.respondWith(caches.open(VERSION).then(async cache => (await cache.match(req, { ignoreSearch: true })) || fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })));
});
