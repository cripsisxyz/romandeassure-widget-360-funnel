import * as state from './state.js'
import * as dom from './dom.js'
import { getPrimes, getPrimesMeta, getCompare, registerLead } from './api.js'
import { wireDefaultButton } from './push.js'

const PHONE_PREFIXES = [
  { code: "+39", mask: "999 999 9999", flag: "🇮🇹", country: "Italy" },
  { code: "+49", mask: "999 9999999", flag: "🇩🇪", country: "Germany" },
  { code: "+351", mask: "999 999 999", flag: "🇵🇹", country: "Portugal" },
  { code: "+33", mask: "9 99 99 99 99", flag: "🇫🇷", country: "France" },
  { code: "+383", mask: "999 999 999", flag: "🇽🇰", country: "Kosovo" },
  { code: "+34", mask: "999 99 99 99", flag: "🇪🇸", country: "Spain" },
  { code: "+90", mask: "999 999 9999", flag: "🇹🇷", country: "Turkey" },
  { code: "+389", mask: "99 999 999", flag: "🇲🇰", country: "North Macedonia" },
  { code: "+381", mask: "99 999 9999", flag: "🇷🇸", country: "Serbia" },
  { code: "+43", mask: "999 9999999", flag: "🇦🇹", country: "Austria" },
  { code: "+44", mask: "9999 999999", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+387", mask: "99 999 999", flag: "🇧🇦", country: "Bosnia and Herzegovina" },
  { code: "+385", mask: "99 999 999", flag: "🇭🇷", country: "Croatia" },
  { code: "+94", mask: "99 999 9999", flag: "🇱🇰", country: "Sri Lanka" },
  { code: "+41", mask: "99 999 99 99", flag: "🇨🇭", country: "Switzerland" },
  { code: "+1", mask: "999-999-9999", flag: "🇺🇸", country: "United States" },
  { code: "+420", mask: "999 999 999", flag: "🇨🇿", country: "Czech Republic" },
  { code: "+48", mask: "999 999 999", flag: "🇵🇱", country: "Poland" },
  { code: "+36", mask: "99 999 9999", flag: "🇭🇺", country: "Hungary" },
  { code: "+47", mask: "999 99 999", flag: "🇳🇴", country: "Norway" },
  { code: "+46", mask: "999-999 999", flag: "🇸🇪", country: "Sweden" },
  { code: "+358", mask: "999 999999", flag: "🇫🇮", country: "Finland" },
  { code: "+372", mask: "9999 9999", flag: "🇪🇪", country: "Estonia" },
  { code: "+371", mask: "9999 9999", flag: "🇱🇻", country: "Latvia" },
  { code: "+370", mask: "999 99999", flag: "🇱🇹", country: "Lithuania" },
  { code: "+61", mask: "(99) 9999 9999", flag: "🇦🇺", country: "Australia" },
  { code: "+64", mask: "9999 999 999", flag: "🇳🇿", country: "New Zealand" },
  { code: "+971", mask: "9 999 9999", flag: "🇦🇪", country: "United Arab Emirates" },
  { code: "+964", mask: "9999 999 999", flag: "🇮🇶", country: "Iraq" },
  { code: "+98", mask: "999 9999 9999", flag: "🇮🇷", country: "Iran" },
  { code: "+961", mask: "## ### ###", flag: "🇱🇧", country: "Lebanon" },
  { code: "+7", mask: "999 999-99-99", flag: "🇷🇺", country: "Russia" },
  { code: "+380", mask: "99 999 9999", flag: "🇺🇦", country: "Ukraine" },
  { code: "+20", mask: "99 999 9999", flag: "🇪🇬", country: "Egypt" },
  { code: "+212", mask: "5 99 999 999", flag: "🇲🇦", country: "Morocco" },
  { code: "+213", mask: "5 999 9999", flag: "🇩🇿", country: "Algeria" },
  { code: "+254", mask: "7 999 999999", flag: "🇰🇪", country: "Kenya" },
  { code: "+27", mask: "## ### ####", flag: "🇿🇦", country: "South Africa" },
  { code: "+60", mask: "##-#### ####", flag: "🇲🇾", country: "Malaysia" },
  { code: "+65", mask: "9999 9999", flag: "🇸🇬", country: "Singapore" },
  { code: "+91", mask: "99999 99999", flag: "🇮🇳", country: "India" },
  { code: "+852", mask: "9999 9999", flag: "🇭🇰", country: "Hong Kong" },
  { code: "+886", mask: "9 9999 9999", flag: "🇹🇼", country: "Taiwan" },
  { code: "+82", mask: "99-9999-9999", flag: "🇰🇷", country: "South Korea" },
  { code: "+81", mask: "99-9999-9999", flag: "🇯🇵", country: "Japan" },
  { code: "+86", mask: "999 9999 9999", flag: "🇨🇳", country: "China" },
  { code: "+84", mask: "99 999 9999", flag: "🇻🇳", country: "Vietnam" },
  { code: "+66", mask: "99 999 9999", flag: "🇹🇭", country: "Thailand" },
  { code: "+62", mask: "89 9999 9999", flag: "🇮🇩", country: "Indonesia" },
  { code: "+63", mask: "99 999 9999", flag: "🇵🇭", country: "Philippines" },
  { code: "+54", mask: "99 9999-9999", flag: "🇦🇷", country: "Argentina" },
  { code: "+55", mask: "(99) 99999-9999", flag: "🇧🇷", country: "Brazil" },
  { code: "+52", mask: "(99) 9999 9999", flag: "🇲🇽", country: "Mexico" },
  { code: "+57", mask: "999 999 9999", flag: "🇨🇴", country: "Colombia" },
  { code: "+58", mask: "9999-999999", flag: "🇻🇪", country: "Venezuela" },
  { code: "+56", mask: "9 9999 9999", flag: "🇨🇱", country: "Chile" },
  { code: "+51", mask: "999 999 999", flag: "🇵🇪", country: "Peru" },
  { code: "+507", mask: "999-9999", flag: "🇵🇦", country: "Panama" },
  { code: "+502", mask: "9999 9999", flag: "🇬🇹", country: "Guatemala" },
  { code: "+503", mask: "9999-9999", flag: "🇸🇻", country: "El Salvador" },
  { code: "+505", mask: "9999 9999", flag: "🇳🇮", country: "Nicaragua" },
  { code: "+965", mask: "9999 9999", flag: "🇰🇼", country: "Kuwait" },
  { code: "+966", mask: "9 999 9999", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+974", mask: "9999 9999", flag: "🇶🇦", country: "Qatar" }
]

const PHONE_PREFIX_OPTIONS = PHONE_PREFIXES.map(p =>
  `<option value="${p.code}" data-mask="${p.mask}"${p.code === '+41' ? ' selected' : ''}>${p.flag} ${p.code}</option>`
).join('')

const DEFAULT_MASK = PHONE_PREFIXES.find(p => p.code === '+41')?.mask || ''

// Pega aquí SOLO el contenido interno del widget (sin el <div id="ra"> externo)
const WIDGET_HTML = `
<div class="box" role="form">
<div class="announcement" role="status">Les primes LAMal 2026 sont-là!</div>
<div class="overlay" aria-hidden="true"><div class="sp" aria-label="Chargement"></div><div class="load-msg">🔎 Analyse de vos offres personnalisées en cours…</div></div>
<div class="hd">
  <p>Comparez gratuitement les meilleures assurances avec <img src="https://romandeassure.ch/cus-assets/images/logo-romandeassure-lamal-compare.webp" alt="RomandeAssure LAMal"></p>
  <p>🚀 Résultats en <strong style="color:#ff6b00">30&nbsp;secondes</strong>!</p>
</div>
<div id="t" class="toast" role="status" aria-live="polite"></div>

<div class="st on" id="s1">
  <div style="margin-bottom:12px">
    <div class="progress"><div class="progress-bar" style="width:25%"></div></div>
    <div style="margin-top:4px;font-size:13px;color:#374151;text-align:right">Étape 1 sur 4</div>
  </div>
  <label for="n">Votre Code postal (NPA)</label><input type="number" id="n" inputmode="numeric" pattern="[0-9]*" min="1000" max="9999" placeholder="Code Postal" required>
  <label for="a">Votre âge</label><input type="number" id="a" inputmode="numeric" pattern="[0-9]*" min="18" max="99" placeholder="Âge" required>
  <div class="btns"><button class="btn p" data-act="next">Suivant</button></div><p class="fine">Comparaison gratuite – Sans engagement – Réseau de confiance</p>
</div>

<div class="st" id="s2">
  <div style="margin-bottom:12px">
    <div class="progress"><div class="progress-bar" style="width:50%"></div></div>
    <div style="margin-top:4px;font-size:13px;color:#374151;text-align:right">Étape 2 sur 4</div>
  </div>
  <div id="ctx" class="ctx" aria-live="polite"></div>
  <label for="f">Franchise (CHF)</label><select id="f"><option>300</option><option>500</option><option>1000</option><option>1500</option><option>2000</option><option selected>2500</option></select>
  <label for="x">Couverture accident <span class="ibtn" tabindex="0">i<div class="ibubble"><ul><li>Non (par défaut): salarié ≥8h/sem.</li><li>Oui: indépendant, étudiant, retraité, sans emploi, salarié &lt;8h/sem.</li></ul></div></span></label><select id="x"><option value="0" selected>Non</option><option value="1">Oui</option></select>
  <div class="btns"><button class="btn p" data-act="compute">Afficher les résultats</button></div>
</div>

<div class="st" id="s3">
  <div style="margin-bottom:12px">
    <div class="progress"><div class="progress-bar" style="width:75%"></div></div>
  <div style="margin-top:4px;font-size:13px;color:#374151;text-align:right">Étape 3 sur 4</div>
  </div>
  <div id="r"></div>
  <div class="btns"><button class="btn p" data-go="4">Voir plus d'informations</button></div>
</div>

<div class="st" id="s4">
<!-- K() inyecta aquí el bloque rc (overview mercado) -->

  <div class="rc rc-in" style="margin-top:8px">
    <div style="margin-bottom:12px">
      <div class="progress"><div class="progress-bar" style="width:100%"></div></div>
      <div style="margin-top:4px;font-size:13px;color:#374151;text-align:right">Étape 4 sur 4 – presque terminé 🎉</div>
    </div>
    <div id="s4-msg" style="margin-bottom:8px;color:#111827;font-weight:700">
      Vos offres détaillées sont prêtes ! Débloquez-les immédiatement 👇
    </div>

  <label for="fn">Prénom</label>
  <input type="text" id="fn" placeholder="p. ex. Marie" required>

  <div style="margin-bottom:6px;font-size:13px">📲 Recevez vos offres détaillées immédiatement par WhatsApp ou SMS.</div>
  <div class="row">
    <div style="flex:1">
      <label for="ph_prefix">Code</label>
      <select id="ph_prefix">${PHONE_PREFIX_OPTIONS}</select>
    </div>
    <div style="flex:2">
      <label for="ph">Téléphone</label>
      <input type="text" id="ph" placeholder="${DEFAULT_MASK}" required>
    </div>
  </div>
  <div class="consent">
    <input type="checkbox" id="wa" checked style="width:18px;height:18px">
      <label for="wa" style="display:flex;align-items:center;gap:6px">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width:14px;height:14px">
        ✅ Oui, je veux recevoir mes offres détaillées sur WhatsApp.
      </label>
  </div>

  <div class="consent">
    <input id="c" type="checkbox" required style="width:18px;height:18px">
    <label for="c">J’accepte que mes données soient utilisées pour me recontacter*.
      Voir <a href="https://romandeassure.ch/fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>.
    </label>
  </div>

  <div class="btns">
        <button class="btn p" data-act="lead" style="flex:2;height:60px;font-size:17px">🔓 Voir mes offres détaillées maintenant</button>
    </div>
  <p style="margin:8px 0 0;text-align:center;color:#374151;font-size:13px">+320 personnes ont trouvé leur assurance idéale cette semaine via RomandeAssure.</p>
  <p class="fine">Comparaison gratuite – Sans engagement – Réseau de confiance</p>
</div>
</div>

<div class="st" id="s5">
  <div class="thanks">Merci beaucoup de vôtre confiance, un agent vous contactera bientôt!</div>
  <div class="checkmark" aria-hidden="true">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
  </div>
  <div class="note">comme promis, Voici les résultats complets de votre recherche</div>
  <div id="r5"></div>
</div>
</div>
`

const sentEvents = window.__raSentEvents || new Set()
window.__raSentEvents = sentEvents

function pushEvent(evt, payload = {}, dedupe = true) {
  try {
    if (!Array.isArray(window.dataLayer)) return
    if (dedupe && sentEvents.has(evt)) return
    window.dataLayer.push({ event: evt, ...payload })
    console.log(`RA > ${evt} pushed`)
    if (dedupe) sentEvents.add(evt)
  } catch (e) {
    console.error('RA > dataLayer push error', e)
  }
}

export function initApp(root, options = {}) {
  // Monta HTML
  dom.mountHTML(root, WIDGET_HTML)
  // Wire push notification button
  wireDefaultButton(root)
  // Ensure widget is in view on load
  if (root && root.scrollIntoView) root.scrollIntoView({ block: 'start' })

  // Bind inputs
  const n = state.$in(root, '#n')
  const a = state.$in(root, '#a')
  if (n) state.clampInput(n, 1000, 9999)
  if (a) state.clampInput(a, 18, 99)
  const ph = state.$in(root, '#ph')
  const phPref = state.$in(root, '#ph_prefix')
  const maskPhone = () => {
    if (!ph || !phPref) return
    const mask = phPref.selectedOptions?.[0]?.dataset?.mask || ''
    const digits = ph.value.replace(/\D/g, '')
    let res = ''
    let di = 0
    for (const ch of mask) {
      if (/[9#]/.test(ch)) {
        if (digits[di]) { res += digits[di++]; }
        else break
      } else {
        if (digits[di] !== undefined) res += ch
      }
    }
    ph.value = res
    ph.placeholder = mask
  }
  if (ph && phPref) {
    ph.addEventListener('input', maskPhone)
    phPref.addEventListener('change', () => { ph.value = ''; maskPhone() })
    maskPhone()
  }

  // Botones

  const nextBtn = state.$in(root, '.btn.p[data-act="next"]')
  if (nextBtn) nextBtn.addEventListener('click', () => nextFromStep1(root, options))
  const compBtn = state.$in(root, '.btn.p[data-act="compute"]')
  if (compBtn) compBtn.addEventListener('click', () => compute(root, options))

  let from2026 = false

  const toggle2026Block = () => {
    const blk = state.$in(root, '#info2026')
    const market = state.$in(root, '#s4 > .wrap.rc')
    const msg = state.$in(root, '#s4 > .market-msg')
    const title = state.$in(root, '#s4-msg')
    if (blk) blk.style.display = from2026 ? 'block' : 'none'
    if (market) market.style.display = from2026 ? 'none' : 'block'
    if (msg) msg.style.display = from2026 ? 'none' : 'block'
    if (title) title.textContent = from2026
      ? 'Soyez parmi les premiers à recevoir les primes 2026 ! 🎁'
      : 'Vos offres détaillées sont prêtes ! Débloquez-les immédiatement 🎁'
  }

  // Navegación (retours y demás)
  state.$inAll(root, '.btn[data-go]')?.forEach(btn => {
    const to = btn.getAttribute('data-go')
    if (to) btn.addEventListener('click', () => {
      state.toastClear(root)
      if (to === '4') {
        from2026 = btn.hasAttribute('data-from2026')
        pushEvent('form_step4')
      }
      dom.showStep(root, Number(to))
      if (to === '4') toggle2026Block()
    })
  })

  toggle2026Block()

  // CTA final
  const finalBtn = state.$in(root, '.btn.p[data-act="lead"]')
  if (finalBtn) finalBtn.addEventListener('click', (e) => lead(root, e, options))

  // Fallback global handlers for legacy integrations
  Object.assign(window, {
    N: () => nextFromStep1(root, options),
    C: () => compute(root, options),
    S: (to) => {
      state.toastClear(root)
      const stepMap = { '2': 'form_step2', '3': 'form_step3', '4': 'form_step4' }
      const evt = stepMap[to]
      if (evt) pushEvent(evt)
      dom.showStep(root, Number(to))
    }
  })
}

async function nextFromStep1(root, opts) {
  const N = +(state.$in(root, '#n')?.value || 0)
  const A = +(state.$in(root, '#a')?.value || 0)
  if (!N || !A) { state.toast(root, 'Complétez NPA et Âge.', true); return }
  if (N < 1000 || N > 9999) { state.toast(root, 'NPA invalide (1000–9999).', true); return }
  if (A < 18 || A > 99) { state.toast(root, 'Âge invalide (18–99).', true); return }

  state.toast(root, 'OK')
  pushEvent('form_step2')
  try {
    const meta = await dom.withLoader(root, () => getPrimesMeta(opts, { npa:N, age:A }))
    const P = meta?.params || {}
    state.setX(P)
    const l = P.npa_localite || ''
    const y = P.year_resolved || (P.year === 'latest' ? 'dernière année disponible' : P.year) || ''
    const rawC = P.canton_phrase_fr || ''
    const c = rawC
      ? rawC.toLowerCase().includes('canton')
        ? rawC
        : (/^(?:de|du|des|d['’])/i.test(rawC) ? `canton ${rawC}` : `canton de ${rawC}`)
      : ''
    const npa = P.npa || N
    if (l) dom.ctxSet(root, `Calcul pour <strong>${l}</strong>${c?` <strong>${c}</strong>`:''} (${npa}) – année des primes <strong>${y}</strong>.`)
  } catch {}
  dom.showStep(root, 2)
}

async function compute(root, opts) {
  const n = state.$in(root, '#n')?.value
  const a = state.$in(root, '#a')?.value
  const f = state.$in(root, '#f')?.value
  const x = state.$in(root, '#x')?.value

  if (!n || !a) { state.toast(root, 'Complétez NPA et Âge.', true); return }

  pushEvent('form_step3')
  let d
  try {
    d = await dom.withLoader(root, () => getPrimes(opts, { npa:n, age:a, franchise:f, accident:x }))
  } catch (e) {
    console.error('RA > primes fetch error', e)
    state.toast(root, 'Erreur lors du calcul des primes.', true)
    return
  }
  const rows = d.rows || []
  const P = d.params || {}
  state.setX({ ...(state.X||{}), params:P, rows })

  const y = P.year_resolved || (P.year==='latest' ? 'dernière année disponible' : P.year)
  const l = P.npa_localite || 'votre localité'
  const rawC = P.canton_phrase_fr || ''
  const c = rawC
    ? rawC.toLowerCase().includes('canton')
      ? rawC
      : (/^(?:de|du|des|d['’])/i.test(rawC) ? `canton ${rawC}` : `canton de ${rawC}`)
    : ''
  const npa = P.npa || n
  dom.ctxSet(root, `Calcul pour <strong>${l}</strong>${c?` <strong>${c}</strong>`:''} (${npa}) – année des primes <strong>${y}</strong>.`)

  const head = `<div class="sum">Voici <strong>quelques</strong> résultats des primes <strong>${y}</strong> pour une personne de <strong>${a}</strong> ans résidant à <strong>${l}</strong>${c?` <strong>${c}</strong>`:''}, pour une franchise de <strong>CHF ${f}</strong>.</div>`
  const body = rows.slice(0,5).map((i,k)=>{
    const p = +i.prime
    const net = p - 5.15
    const isFirst = k === 0
    const isSecond = k === 1
    const insurer = isFirst
      ? '<span class="obf">Assureur masqué</span>'
      : isSecond
        ? `<span class="obf">${i.insurer}</span>`
        : i.insurer
    const netCell = isFirst
      ? `<strong><span class="obf">${net.toFixed(2)}</span></strong>`
      : `<strong>${net.toFixed(2)}</strong>`
    const grossCell = isFirst
      ? `<span class="obf">${p.toFixed(2)}</span>`
      : p.toFixed(2)
    return `<tr${isFirst?' class="first"':''}><td>${insurer}${isFirst?'<br/><span class="badgi">Meilleur prix</span>':''}</td><td>${netCell}</td><td>${grossCell}</td><td>${i.franchise}</td><td>${i.accident?'Oui':'Non'}</td></tr>`
  }).join('')
  const ghost = '<tr class="ghost"><td colspan="5">Plus de résultats disponibles...</td></tr>'
  const table = rows.length
    ? `<div class="wrap">
         ${head}
         <div class="hscroll">
           <table aria-label="Résultats des primes" style="text-align:center">
             <thead><tr><th>Assureur</th><th>Prime nette (CHF) <span class="ibtn" tabindex="0">i<div class="ibubble">Du prix de la prime, CHF <strong>5.15</strong> de taxe<br/>environnementale sont déduits. <a href="https://www.parlament.ch/fr/ratsbetrieb/suche-curia-vista/geschaeft?AffairId=20223239" target="_blank" rel="noopener noreferrer">Voir plus</a></div></span></th><th>Prime brutte (CHF)</th><th>Franchise</th><th>Accident</th></tr></thead>
             <tbody>${body}${ghost}</tbody>
           </table>
         </div>
       </div>`
    : `<div class="wrap">${head}<div style="padding:12px 14px;color:#991b1b">Aucun résultat trouvé. Vérifiez le code postal.</div></div>`

  state.$in(root, '#r').innerHTML = table
  state.toast(root, 'Résultats chargés.')
  dom.showStep(root, 3)

  // Prepara pantalla 4 (stats)
  await buildMarket(root, opts, { npa:n, age:a, franchise:f, accident:x })
}

  async function buildMarket(root, opts, p) {
    const s4 = state.$in(root, '#s4')
    s4?.querySelectorAll('.wrap.rc, #info2026, .market-msg').forEach(el => el.remove())
    try {
      const { offers:of=[], stats:st={} } = await dom.withLoader(root, () => getCompare(opts, p))
      const listItems = (of || []).slice(0,3)
        .map((o,i)=>{
          const net = (+o.prime - 5.15)
          const insurer = i ? o.insurer : '<span class="obf">Nom masqué</span>'
          return `<li><strong>Top offre ${i+1}:</strong> ${insurer} – <strong>${net.toFixed(2)} CHF</strong></li>`
        }).join('')
      const list = listItems
        ? `<ul style="margin:0;padding-left:16px;font-size:14px;color:#374151">${listItems}</ul>`
        : '<div style="padding:0 0 6px 16px;color:#991b1b">Aucune offre à afficher</div>'
      const minNet = st.min_prime ? st.min_prime - 5.15 : 0
      const avgNet = st.avg_prime ? st.avg_prime - 5.15 : 0
      const p50Net = st.p50 ? st.p50 - 5.15 : 0
      const max = Math.max(minNet, avgNet, p50Net)
      const bar = (label,v)=>{
        if(!v) return ''
        const w = max ? (v/max*100) : 0
        return `<div style="display:flex;align-items:center;font-size:12px;margin-top:4px">
          <div style="width:70px;color:#374151">${label}</div>
          <div class="market-bar"><div class="bar" style="width:${w}%"></div></div>
          <div style="width:60px;text-align:right;color:#111827">${v.toFixed(2)} CHF</div>
        </div>`
      }
      const stats = (st && max)
        ? `<div style="margin-top:10px">${[
            bar('Min', minNet),
            bar('Moyenne', avgNet),
            bar('P50', p50Net)
          ].join('')}</div>`
        : ''
      const html = `
        <div class="wrap rc" style="margin:8px 8px 0 8px;padding:12px">
          <div style="font-weight:700;color:#111827;margin-bottom:8px">Aperçu du marché</div>
          ${list}
          ${stats}
        </div>
        <div id="info2026" style="display:none;margin:12px 8px 16px 8px;padding:12px 16px;background:#F9F9F9;border-left:3px solid #FF6B00;color:#333;font-size:14px">
          🔔 Soyez le premier à recevoir les primes 2026<br>👉 Entrez vos coordonnées maintenant pour être averti dès leur publication.
        </div>
        <div class="market-msg" style="margin:0 8px;padding:10px;border:1px dashed #6ee7b7;border-radius:10px;background:#ecfdf5;color:#065f46;font-size:13px">
          <strong>Une fois le formulaire complété</strong>, visualisez gratuitement <strong>ici</strong> toutes vos offres détaillées <strong>par la suite</strong>. 👇
        </div>`
      state.$in(root, '#s4')?.insertAdjacentHTML('afterbegin', html)
      state.setX({ ...(state.X||{}), compare:{ offers:of, stats:st } })
    } catch {}
  }

async function lead(root, e, opts) {
  const fn = state.$in(root, '#fn')?.value?.trim()
  const ph = state.$in(root, '#ph')?.value?.trim()
  const pref = state.$in(root, '#ph_prefix')?.value || ''
  const mask = state.$in(root, '#ph_prefix')?.selectedOptions?.[0]?.dataset?.mask || ''
  const cons = state.$in(root, '#c')?.checked
  const wa = state.$in(root, '#wa')?.checked
  if (!fn) { state.toast(root, 'Indiquez votre prénom.', true); return }
  if (!ph) { state.toast(root, 'Indiquez un numéro de téléphone.', true); return }
  const { ok:phOk, mob } = state.phoneValidate(pref, ph, mask)
  if (!phOk) { state.toast(root, 'Numéro invalide.', true); return }
  if (wa && !mob) { state.toast(root, 'Pour WhatsApp, utilisez un mobile (07X ou +417X).', true); return }
  if (!cons) { state.toast(root, 'Vous devez accepter la politique de confidentialité.', true); return }
  if (e && e.target) e.target.disabled = true
  const n = state.$in(root, '#n')?.value
  const a = state.$in(root, '#a')?.value
  const f = state.$in(root, '#f')?.value
  const x = state.$in(root, '#x')?.value
  const payload = {
    npa:n, age:a, franchise:f, accident:x,
    nom:fn, prenom:fn, telephone:`${pref} ${ph}`.trim(),
    whatsapp:wa, consentement:cons,
    data:{
      npa_localite: state.X?.params?.npa_localite,
      npa_canton: state.X?.params?.npa_canton,
      canton_name_fr: state.X?.params?.canton_name_fr,
      params:{ npa:+n, age:+a, franchise:+f, accident:+x }
    }
  }
  pushEvent('form_lead', {}, false)
  const ok = await dom.withLoader(root, () => registerLead(opts||{}, payload))
  if(!ok){ state.toast(root, "Erreur lors de l'enregistrement.", true); if(e && e.target) e.target.disabled=false; return }
  // --- CONVERSIÓN ---
  pushEvent('form_conversion', { value: 0.0, currency: 'CHF' })
  dom.showStep(root, 5)
  const rows = state.X?.rows || []
  const P = state.X?.params || {}
  const r5 = state.$in(root, '#r5')
  if (r5 && rows.length) {
    const y = P.year_resolved || (P.year === 'latest' ? 'dernière année disponible' : P.year)
    const l = P.npa_localite || 'votre localité'
    const rawC = P.canton_phrase_fr || ''
    const c = rawC
      ? rawC.toLowerCase().includes('canton')
        ? rawC
        : (/^(?:de|du|des|d['’])/i.test(rawC) ? `canton ${rawC}` : `canton de ${rawC}`)
      : ''
    const head = `<div class="sum">Voici <strong>toutes</strong> les primes <strong>${y}</strong> pour une personne de <strong>${a}</strong> ans résidant à <strong>${l}</strong>${c?` <strong>${c}</strong>`:''}, pour une franchise de <strong>CHF ${f}</strong>.</div>`
    const body = rows.map(i => {
      const p = +i.prime
      const net = p - 5.15
      return `<tr><td>${i.insurer}</td><td><strong>${net.toFixed(2)}</strong></td><td>${p.toFixed(2)}</td><td>${i.franchise}</td><td>${i.accident?'Oui':'Non'}</td></tr>`
    }).join('')
    const table = `<div class="wrap"><div class="hscroll"><table aria-label="Résultats des primes" style="text-align:center"><thead><tr><th>Assureur</th><th>Prime nette (CHF) <span class="ibtn" tabindex="0">i<div class="ibubble">Du prix de la prime, CHF <strong>5.15</strong> de taxe<br/>environnementale sont déduits. <a href="https://www.parlament.ch/fr/ratsbetrieb/suche-curia-vista/geschaeft?AffairId=20223239" target="_blank" rel="noopener noreferrer">Voir plus</a></div></span></th><th>Prime brutte (CHF)</th><th>Franchise</th><th>Accident</th></tr></thead><tbody>${body}</tbody></table></div></div>`
    r5.innerHTML = table
  }
  const box = state.$in(root, '.box')
  if (box) box.classList.add('wide')
  setTimeout(async () => {
    state.toastClear(root)
    root.querySelectorAll('input').forEach(i => {
      if (i.type === 'checkbox') i.checked = false
      else i.value = ''
    })
    const fEl = state.$in(root, '#f')
    if (fEl) fEl.value = '2500'
    const xEl = state.$in(root, '#x')
    if (xEl) xEl.value = '0'
    const ctxEl = state.$in(root, '#ctx')
    if (ctxEl) ctxEl.innerHTML = ''
    const rEl = state.$in(root, '#r')
    if (rEl) rEl.innerHTML = ''
    const r5El = state.$in(root, '#r5')
    if (r5El) r5El.innerHTML = ''
    state.setX(null)
    if (e && e.target) e.target.disabled = false
    await dom.withLoader(root, () => new Promise(r => setTimeout(r, 1000)))
    if (box) box.classList.remove('wide')
    dom.showStep(root, 1)
  }, 120000)
}

