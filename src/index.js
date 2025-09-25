import styles from './style.css?inline'
import { initApp } from './app/flow.js'

/**
 * RAWidget.init('#ra', { apiBase, apiKey })
 *  - selector: contenedor donde montar el widget
 *  - opciones: apiBase (default https://romandeassure.ch/api), apiKey (opcional, no recomendado en cliente)
 */
export function init(selector = '#ra', options = {}) {
  const host = document.querySelector(selector)
  if (!host) throw new Error(`RAWidget: selector not found: ${selector}`)

  const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' })

  let styleEl = shadow.querySelector('style[data-ra-widget-style]')
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.setAttribute('data-ra-widget-style', '')
    styleEl.textContent = styles
    shadow.appendChild(styleEl)
  }

  let root = shadow.querySelector('#ra')
  if (!root) {
    root = document.createElement('div')
    root.id = 'ra'
    shadow.appendChild(root)
  }

  initApp(root, options)
}

