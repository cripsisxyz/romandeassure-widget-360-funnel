export const buildBase = (opts) => (opts.apiBase || 'https://romandeassure.ch/api')

export async function getPrimes(opts, { npa, age, franchise, accident }) {
  const BASE = buildBase(opts)
  const u = `${BASE}/primes?npa=${npa}&age=${age}&franchise=${franchise}&accident=${accident}&year=latest&limit=20`
  const headers = opts.apiKey ? { 'X-API-Key': opts.apiKey } : {}
  const r = await fetch(u, { headers })
  if (!r.ok) throw new Error('Primes request failed')
  return r.json()
}

export async function getPrimesMeta(opts, { npa, age, f=2500, x=0 }) {
  const BASE = buildBase(opts)
  const u = `${BASE}/primes?npa=${npa}&age=${age}&franchise=${f}&accident=${x}&year=latest&limit=0`
  const headers = opts.apiKey ? { 'X-API-Key': opts.apiKey } : {}
  const r = await fetch(u, { headers })
  if (!r.ok) throw new Error('Meta request failed')
  return r.json()
}

export async function getCompare(opts, { npa, age, franchise, accident }) {
  const BASE = buildBase(opts)
  const u = `${BASE}/compare?npa=${npa}&age=${age}&franchise=${franchise}&accident=${accident}&year=latest`
  const headers = opts.apiKey ? { 'X-API-Key': opts.apiKey } : {}
  const r = await fetch(u, { headers })
  if (!r.ok) return { stats:{}, offers:[] }
  return r.json()
}

export async function registerLead(opts, payload) {
  const BASE = buildBase(opts)
  const u = `${BASE}/register_lead`
  const headers = { 'Content-Type': 'application/json' }
  if (opts.apiKey) headers['X-API-Key'] = opts.apiKey
  try {
    const r = await fetch(u, { method: 'POST', headers, body: JSON.stringify(payload) })
    return r.status === 200
  } catch {
    return false
  }
}

