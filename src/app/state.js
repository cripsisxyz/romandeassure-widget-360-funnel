export const $in = (root, q) => root.querySelector(q)
export const $inAll = (root, q) => root.querySelectorAll(q)

export let X = null
export const setX = v => (X = v)

export const toast = (root, msg, isErr=false) => {
  const t = $in(root, '#t'); if (!t) return
  t.className = 'toast ' + (isErr ? 'err' : 'ok')
  t.textContent = msg
}
export const toastClear = (root) => {
  const t = $in(root, '#t'); if (!t) return
  t.className = 'toast'
  t.textContent = ''
}

export const loader = (root, on) => {
  const b = root.querySelector('.box'); if (!b) return
  on ? b.classList.add('l') : b.classList.remove('l')
}

export const clampInput = (el, min, max) => el.addEventListener('blur', () => {
  const r = el.value.trim(); if(!r) return
  const x = +r; if (isNaN(x)) return
  el.value = String(Math.min(Math.max(x, min), max))
})

export const phoneValidate = (pref, s, mask) => {
  const digits = s.replace(/\D/g, '')
  const expected = (mask.match(/[9#]/g) || []).length
  const ok = digits.length === expected
  let mob = true
  if (pref === '+41') {
    mob = /^7\d{8}$/.test(digits)
  }
  return { ok, mob }
}

