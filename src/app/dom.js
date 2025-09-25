import { $in, loader } from './state.js'

export const mountHTML = (root, html) => {
  root.innerHTML = html
}

export const showStep = (root, n) => {
  loader(root, true)
  setTimeout(() => {
    root.querySelectorAll('.st').forEach(s => s.classList.remove('on'))
    const t = $in(root, '#s'+n)
    if (t) {
      t.classList.add('on')
      setTimeout(() => {
        const f = t.querySelector('input,select,button')
        if (f) {
          f.focus({ preventScroll: true })
        } else {
          t.setAttribute('tabindex', '-1')
          t.focus()
        }
        if (root && root.scrollIntoView) root.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
    loader(root, false)
  }, 300)
}

export const withLoader = async (root, fn) => {
  try { loader(root, true); return await fn() }
  finally { loader(root, false) }
}

export const ctxSet = (root, html) => {
  const c = $in(root, '#ctx')
  if (c) c.innerHTML = html
}

