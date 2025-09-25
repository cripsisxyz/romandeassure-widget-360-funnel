/**
 * app-push.js — RomandeAssure Web Push (robusto)
 * Requisitos: HTTPS + SW en /cus-assets/scripts/sw.js con header Service-Worker-Allowed: /
 */

const RA_PUSH = {
  VAPID_URL: '/api/push/vapid-public-key',
  SUB_URL: '/api/push/subscribe',
  UNSUB_URL: '/api/push/unsubscribe',
  SW_PATH: '/cus-assets/scripts/sw.js',
  DEFAULT_TAGS: ['primes_2026','lamal'],
};

// base64url → Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function getVapidKey() {
  const res = await fetch(RA_PUSH.VAPID_URL, { method: 'GET', credentials: 'omit' });
  if (!res.ok) throw new Error('vapid-fetch-failed');
  const { publicKey } = await res.json();
  if (!publicKey) throw new Error('vapid-missing');
  return publicKey;
}

async function ensureSW() {
  if (!('serviceWorker' in navigator)) throw new Error('sw-unsupported');
  if (!('PushManager' in window)) throw new Error('push-unsupported');
  const reg = await navigator.serviceWorker.register(RA_PUSH.SW_PATH, { scope: '/' });
  // en algunos navegadores ready puede tardar: esperamos con carrera a 5s
  const ready = Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, rej) => setTimeout(() => rej(new Error('sw-ready-timeout')), 5000)),
  ]).catch(() => reg); // si timeout, usamos reg igualmente
  await ready;
  return reg;
}

async function ensurePermission() {
  if (!('Notification' in window)) throw new Error('notif-unsupported');

  const cur = Notification.permission; // 'granted' | 'denied' | 'default'
  if (cur === 'granted') return 'granted';
  if (cur === 'denied') throw new Error('blocked-by-user');

  // 'default' → pedimos
  const res = await Notification.requestPermission();
  if (res !== 'granted') throw new Error('user-dismissed-or-blocked');
  return 'granted';
}

export async function subscribePush({ tags = RA_PUSH.DEFAULT_TAGS } = {}) {
  const reg = await ensureSW();
  await ensurePermission();

  const publicKey = await getVapidKey();
  const applicationServerKey = urlBase64ToUint8Array(publicKey);

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey });
  }
  const j = sub.toJSON?.() || {};
  const keys = (j && j.keys) || {};
  if (!keys.p256dh || !keys.auth) throw new Error('sub-keys-missing');

  const payload = {
    endpoint: sub.endpoint,
    keys: { p256dh: keys.p256dh, auth: keys.auth },
    ua: navigator.userAgent,
    lang: navigator.language || 'fr-CH',
    tags,
  };

  const res = await fetch(RA_PUSH.SUB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('subscribe-api-failed:' + res.status);
  return true;
}

export async function unsubscribePush() {
  const reg = await ensureSW();
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return true;

  const endpoint = sub.endpoint;
  await sub.unsubscribe().catch(()=>{});

  await fetch(RA_PUSH.UNSUB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ endpoint }),
  }).catch(()=>{});
  return true;
}

export async function isSubscribed() {
  try {
    const reg = await ensureSW();
    const sub = await reg.pushManager.getSubscription();
    return !!sub;
  } catch { return false; }
}

export async function currentPermission() {
  return (typeof Notification !== 'undefined' && Notification.permission) || 'default';
}

export function wireDefaultButton(root) {
  const scope = root || document;
  const btns = Array.from(scope.querySelectorAll('.notify-2026'));
  if (!btns.length) return;

  const setOK = (btn) => {
    btn.textContent = '✓ Nous vous avertirons dès la sortie des primes 2026';
    btn.disabled = false;
    btn.classList.add('subscribed');
  };

  const handleClick = async (e) => {
    e.preventDefault();
    btns.forEach(b => b.disabled = true);
    try {
      await subscribePush({ tags: RA_PUSH.DEFAULT_TAGS });
      btns.forEach(setOK);
    } catch (err) {
      console.error('[push] subscribe error', err);
      const msg = String(err?.message || err);
      if (msg.includes('blocked-by-user')) {
        alert('Notifications bloquées pour ce site. Autorisez-les dans les réglages du navigateur et réessayez.');
      } else if (msg.includes('user-dismissed-or-blocked')) {
        alert('Vous devez autoriser les notifications pour les activer.');
      } else if (msg.includes('sw-unsupported') || msg.includes('push-unsupported')) {
        alert('Votre navigateur ne supporte pas les notifications.');
      } else {
        alert('Impossible d’activer les notifications. Réessayez.');
      }
      btns.forEach(b => b.disabled = false);
    }
  };

  btns.forEach((btn) => btn.addEventListener('click', handleClick));

  isSubscribed().then((ok) => { if (ok) btns.forEach(setOK); });
}

// Exponer API global también para uso no-ESM
// (si cargas como <script type="module"> esto también funciona)
window.RApush = {
  subscribe: subscribePush,
  unsubscribe: unsubscribePush,
  isSubscribed,
  permission: currentPermission,
  wireDefaultButton,
  config: RA_PUSH,
};
