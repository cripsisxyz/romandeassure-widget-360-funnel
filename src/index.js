import styles from './style.css?inline'

const API_URL = 'https://romandeassure.ch/api/register_lead'
const REASONS = ['Assurance Auto', 'Ménage', 'Santé', 'Complémentaire', 'LaMAL']

const TEMPLATE = `
  <style>${styles}</style>
  <div id="ra">
    <div class="wrap">
    <div class="ra-card-grid">
      <div id="accompagnement" class="ra-card ra-card--aura-blue ra-card--pulse" role="button" tabindex="0" aria-expanded="false">
        <div class="ra-card__body">
          <div class="ra-card__header">
            <div class="ra-card__icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <defs><linearGradient id="raGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6"/><stop offset="55%" stop-color="#6ea8ff"/><stop offset="100%" stop-color="#FF6B00"/></linearGradient></defs>
                <circle cx="32" cy="32" r="18" stroke="url(#raGrad)"/>
                <path d="M32 12v8M32 44v8M12 32h8M44 32h8" stroke="url(#raGrad)"/>
                <path d="M32 24l2.8 5.2 5.7.8-4.1 4 1 5.6-5.4-2.8-5.4 2.8 1-5.6-4.1-4 5.7-.8L32 24z" stroke="url(#raGrad)"/>
              </svg>
            </div>
            <h3 class="ra-card__title">Diagnostique 360º</h3>
          </div>
          <p class="ra-card__hook"><strong>Trop d’assurances&nbsp;? Pas assez de temps&nbsp;?</strong><span class="br"></span>On s’en occupe pour vous — <span class="accent">gratuitement</span>.</p>
          <div class="ra-badges" aria-label="Catégories populaires"></div>
          <div class="ra-reassure" aria-label="Avantages">
            <span class="ra-chip">⚖️&nbsp;Service neutre & gratuit</span>
            <span class="ra-chip">🔓&nbsp;Sans engagement</span>
            <span class="ra-chip">⚡&nbsp;Réponse rapide</span>
          </div>
          <span class="ra-card__cta" role="link" aria-label="Je veux mon diagnostic gratuit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.11 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.33 1.7.62 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.19a2 2 0 0 1 2.11-.45c.8.29 1.64.5 2.5.62A2 2 0 0 1 22 16.92z"/></svg>
            Je veux mon diagnostic gratuit →
          </span>
        </div>
      </div>
    </div>

    <div id="accompagnement-expander" class="ra-expander" aria-hidden="true" tabindex="-1">
      <div class="ra-intro" id="ra-intro">
        <h4>Vous ne savez pas par où commencer ? Pas de stress.</h4>
        <p>Nos conseillers <strong>RomandeAssure</strong> s’occupent de tout, en toute confidentialité et <strong>sans engagement</strong>.</p>
        <p class="muted">Remplissez le formulaire ci-dessous et recevez votre <strong>diagnostic personnalisé</strong> en moins de <strong>24&nbsp;h</strong>.</p>
      </div>

      <div id="ra-success" class="ra-success" role="status" aria-live="polite">
        Merci beaucoup de votre confiance, un agent vous contactera bientôt !
        <svg class="ra-success__icon" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>

      <form id="accompagnement-form" class="ra-form" novalidate>
        <div class="ra-field">
          <label for="acf-firstname">Prénom</label>
          <input id="acf-firstname" class="input" type="text" placeholder="p. ex. Marie" required>
        </div>

        <div class="ra-field">
          <label for="acf-phone">Téléphone</label>
          <div class="ra-phone-row">
            <select id="acf-code" class="select" aria-label="Code pays">
              <option value="+41" selected>CH +41</option>
            </select>
            <input id="acf-phone" class="input" type="tel" inputmode="tel" placeholder="79 232 93 23" maxlength="12" required>
          </div>
        </div>

        <div class="ra-field">
          <label for="acf-raison">Raison</label>
          <input id="acf-raison" class="input" type="text" list="raison-list" placeholder="LaMAL, Complémentaire, Auto… (ou écrivez la vôtre)" required>
          <datalist id="raison-list"></datalist>
        </div>

        <div class="consent">
          <input type="checkbox" id="wa" checked>
          <label for="wa"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">Oui, je veux recevoir <strong>gratuitement</strong> mes offres détaillées sur WhatsApp.</label>
        </div>

        <div class="consent">
          <input id="c" type="checkbox" required>
          <label for="c">J’accepte que mes données soient utilisées pour me recontacter*. Voir <a href="https://romandeassure.ch/fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>.</label>
        </div>

        <button type="submit" class="ra-btn">Envoyer la demande</button>

        <p class="ra-form-hint"><strong>Service 100% gratuit.</strong> +500 personnes ont trouvé leur assurance idéale cette année via RomandeAssure.</p>
        <p class="ra-form-hint ra-form-hint--muted">Comparaison gratuite – Sans engagement – Réseau de confiance</p>
      </form>
    </div>
    </div>
  </div>
`

function formatPhone(value) {
  let digits = value.replace(/\D+/g, '')
  if (digits.startsWith('0')) digits = digits.slice(1)
  digits = digits.slice(0, 9)

  let out = ''
  if (digits.length > 0) out += digits.slice(0, 2)
  if (digits.length > 2) out += ' ' + digits.slice(2, 5)
  if (digits.length > 5) out += ' ' + digits.slice(5, 7)
  if (digits.length > 7) out += ' ' + digits.slice(7, 9)
  return out
}

function mountWidget(host) {
  if (!host) throw new Error('RA360Widget: host element not found')

  const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' })
  shadow.innerHTML = TEMPLATE

  const root = shadow
  const rootElement = root.getElementById('ra')
  if (!rootElement) throw new Error('RA360Widget: root element not found')

  if (typeof window !== 'undefined' && window.location.pathname.includes('/blog')) {
    rootElement.classList.add('ra-article')
  }
  const card = root.getElementById('accompagnement')
  const expander = root.getElementById('accompagnement-expander')
  const form = root.getElementById('accompagnement-form')
  const badgesContainer = root.querySelector('.ra-badges')
  const datalist = root.getElementById('raison-list')
  const codeSelect = root.getElementById('acf-code')
  const phoneInput = root.getElementById('acf-phone')
  const successBox = root.getElementById('ra-success')

  REASONS.forEach(reason => {
    const badge = document.createElement('span')
    badge.className = 'ra-badge'
    badge.textContent = reason
    badgesContainer.appendChild(badge)

    const option = document.createElement('option')
    option.value = reason
    datalist.appendChild(option)
  })

  const enforceMask = () => {
    phoneInput.value = formatPhone(phoneInput.value)
  }

  ;['input', 'blur', 'paste'].forEach(evt => phoneInput.addEventListener(evt, enforceMask))

  function openExpander() {
    expander.setAttribute('aria-hidden', 'false')
    card.setAttribute('aria-expanded', 'true')
    expander.style.height = expander.scrollHeight + 'px'
    expander.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function closeExpander() {
    expander.setAttribute('aria-hidden', 'true')
    card.setAttribute('aria-expanded', 'false')
    expander.style.height = '0px'
  }

  function toggleExpander() {
    const open = expander.getAttribute('aria-hidden') === 'false'
    if (open) closeExpander()
    else openExpander()
  }

  card.addEventListener('click', toggleExpander)
  card.addEventListener('keydown', evt => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault()
      toggleExpander()
    }
  })

  new ResizeObserver(() => {
    if (expander.getAttribute('aria-hidden') === 'false') {
      expander.style.height = expander.scrollHeight + 'px'
    }
  }).observe(expander)

  function showSuccess() {
    successBox.classList.add('show')
    expander.style.height = expander.scrollHeight + 'px'
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => {
      successBox.classList.remove('show')
      expander.style.height = expander.scrollHeight + 'px'
    }, 6000)
  }

  form.addEventListener('submit', async evt => {
    evt.preventDefault()
    if (!form.reportValidity()) return

    enforceMask()
    const countryCode = codeSelect.value || '+41'
    const localPhone = phoneInput.value.trim()
    const fullPhone = `${countryCode} ${localPhone}`.trim()

    const submitBtn = form.querySelector('.ra-btn')
    const prevLabel = submitBtn.textContent
    submitBtn.disabled = true
    submitBtn.textContent = 'Envoi…'

    const payload = {
      firstname: root.getElementById('acf-firstname').value.trim(),
      phone: fullPhone,
      raison: root.getElementById('acf-raison').value.trim(),
      whatsapp: root.getElementById('wa').checked,
      consent: root.getElementById('c').checked,
      ua: navigator.userAgent
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error(await res.text())

      form.reset()
      submitBtn.textContent = 'Reçu ✔'
      showSuccess()
      setTimeout(() => {
        submitBtn.textContent = prevLabel
        submitBtn.disabled = false
      }, 1600)
    } catch (err) {
      console.error('RA360Widget: lead error', err)
      alert('Oups, une erreur est survenue. Réessayez plus tard.')
      submitBtn.disabled = false
      submitBtn.textContent = prevLabel
    }
  })
}

export function init(selector = '#ra') {
  const host = document.querySelector(selector)
  if (!host) throw new Error(`RA360Widget: selector not found: ${selector}`)
  mountWidget(host)
}

export function RAInit(host) {
  mountWidget(host)
}

if (typeof window !== 'undefined') {
  window.RAInit = RAInit
}

