export const buildBase = (opts = {}) => (opts.apiBase || 'https://romandeassure.ch/api')

export async function submitCheckup(opts = {}, payload = {}) {
  const BASE = buildBase(opts)
  const url = `${BASE}/insurances/checkup`
  const headers = { 'Content-Type': 'application/json' }
  if (opts.apiKey) headers['X-API-Key'] = opts.apiKey
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch (err) {
    console.error('RA widget – submitCheckup failed', err)
    return false
  }
}

export async function submitLead(opts = {}, payload = {}) {
  const BASE = buildBase(opts)
  const url = `${BASE}/insurances/leads`
  const headers = { 'Content-Type': 'application/json' }
  if (opts.apiKey) headers['X-API-Key'] = opts.apiKey
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
    return res.ok
  } catch (err) {
    console.error('RA widget – submitLead failed', err)
    return false
  }
}
