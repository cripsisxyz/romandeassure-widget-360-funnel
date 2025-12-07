import { submitCheckup, submitLead } from './api.js'

const ARTICLE_ICONS = {
  auto: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 13.5h15l-.9-3.6a2 2 0 0 0-1.9-1.5H7.3a2 2 0 0 0-1.9 1.5z"></path><path d="M6 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5.5 13.5l-.8-2.8M18.5 13.5l.8-2.8M9 9.5l.6-2.2"></path></svg>',
  habitation: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4 11 8-6 8 6"></path><path d="M6.5 10.5V18a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-7.5"></path><path d="M10 17v-3.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V17"></path></svg>',
  sante: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 7v5.5c0 4.2 3.1 8 7.5 8s7.5-3.8 7.5-8.1V7z"></path><path d="M9.5 12h5m-2.5-2.5V14"></path></svg>'
}

const MODE_COPY = {
  home: {
    title: 'Bilan express de vos assurances 📊',
    subtitle: 'Répondez à quelques questions pour découvrir où vous pourriez économiser jusqu\'à 1 000 € par an.',
    startCta: 'Commencer le diagnostic',
    actionsCta: 'Voir mes actions concrètes'
  },
  article: {
    title: 'Analyse rapide de vos assurances',
    subtitle: 'Une mini vérification en 2 minutes pour confirmer que vous ne surpayez pas vos contrats.',
    startCta: 'Commencer mon check-up',
    actionsCta: 'Mes pistes d\'optimisation',
    bridge: 'Si vous voulez savoir si vous payez trop vos primes, voici un outil discret pour vérifier en quelques clics.',
    previewLead: 'Vérifiez en douceur si vos assurances sont toujours au bon prix.',
    previewCta: 'Lancer mon analyse',
    microBenefits: ['Conseil local et neutre', 'Moins de 2 minutes', 'Aucune démarche engagée']
  }
}

const CATEGORY_CONFIG = {
  auto: {
    label: 'Assurance Auto',
    icon: '🚗',
    articleIcon: ARTICLE_ICONS.auto,
    savings: 400,
    ctaLabel: 'Planifier un rappel auto',
    ctaUrl: 'https://romandeassure.ch/fr/assurance-auto',
    source: 'Source : lesfurets.com',
    leadCopy: 'Un conseiller Romande Assure vous aide à verrouiller le meilleur tarif auto.',
    leadSuccess: 'Merci ! Un expert auto vous contactera sous 24 h pour finaliser votre comparaison.',
    questions: [
      {
        id: 'auto_last_review',
        title: 'Depuis combien de temps n\'avez-vous pas comparé votre assurance auto ?',
        subtitle: 'Une mise à jour régulière vous protège contre les hausses silencieuses.',
        options: [
          { value: 'less_1', label: 'Moins d\'1 an', detail: 'Je suis à jour', score: 5 },
          { value: '1_3', label: 'Entre 1 et 3 ans', detail: 'Cela fait un moment', score: 3 },
          { value: 'more_3', label: 'Plus de 3 ans', detail: 'Je n\'ai jamais revu mon contrat', score: 1 }
        ]
      },
      {
        id: 'auto_satisfaction',
        title: 'Êtes-vous satisfait du prix de votre assurance auto ?',
        subtitle: 'Votre ressenti est un excellent signal pour déclencher une renégociation.',
        options: [
          { value: 'yes', label: 'Oui, tout va bien', detail: 'Je pense être bien positionné', score: 5 },
          { value: 'unsure', label: 'Je ne sais pas', detail: 'Je n\'ai pas comparé récemment', score: 3 },
          { value: 'no', label: 'Non, je paie trop', detail: 'Je soupçonne un tarif élevé', score: 1 }
        ]
      }
    ],
    evaluate: (answers) => {
      const last = answers.auto_last_review
      const satisfaction = answers.auto_satisfaction
      if (last === 'less_1' && satisfaction === 'yes') {
        return {
          tone: 'success',
          headline: 'Bravo, vous gardez votre contrat auto sous contrôle ✅',
          message: 'Continuez à comparer chaque année pour ne jamais manquer une opportunité. Une vigilance régulière évite les hausses surprises.'
        }
      }
      if (last === 'more_3' || satisfaction === 'no') {
        return {
          tone: 'critical',
          headline: 'Votre assurance auto mérite une comparaison immédiate ! ⚠️',
          message: 'Les automobilistes qui relancent leurs comparatifs économisent en moyenne ~400 € par an. Plus vous attendez, plus la facture grimpe. Ne laissez pas ces économies filer.'
        }
      }
      return {
        tone: 'warning',
        headline: 'Un check-up auto peut débloquer plusieurs centaines d\'euros',
        message: 'Si votre contrat a plus d\'un an, une comparaison maintenant peut dégager jusqu\'à 400 € d\'économies annuelles. Prenez 2 minutes pour valider que vous êtes bien couvert.'
      }
    }
  },
  habitation: {
    label: 'Assurance Habitation',
    icon: '🏡',
    articleIcon: ARTICLE_ICONS.habitation,
    savings: 450,
    ctaLabel: 'Planifier un rappel habitation',
    ctaUrl: 'https://romandeassure.ch/fr/assurance-habitation',
    source: 'Source : echangesassurances.org',
    leadCopy: 'Nos conseillers ajustent votre couverture habitation sans stress.',
    leadSuccess: 'Merci ! Un expert habitation vous rappelle rapidement pour optimiser votre contrat.',
    questions: [
      {
        id: 'home_last_review',
        title: 'Quand avez-vous renégocié votre assurance habitation pour la dernière fois ?',
        subtitle: 'Les garanties évoluent, vos besoins aussi.',
        options: [
          { value: 'less_1', label: 'Cette année', detail: 'Je viens de comparer', score: 5 },
          { value: '1_2', label: 'Il y a 1 à 2 ans', detail: 'Un rafraîchissement ne ferait pas de mal', score: 3 },
          { value: 'more_2', label: 'Plus de 2 ans', detail: 'Je n\'ai rien changé depuis longtemps', score: 1 }
        ]
      },
      {
        id: 'home_satisfaction',
        title: 'Êtes-vous satisfait du niveau de couverture et du prix ?',
        subtitle: 'Un contrat trop cher ou mal calibré coûte cher en cas de sinistre.',
        options: [
          { value: 'yes', label: 'Oui, je suis serein', detail: 'Mon prix est cohérent', score: 5 },
          { value: 'unsure', label: 'Je ne sais pas', detail: 'Je n\'ai jamais regardé en détail', score: 2 },
          { value: 'no', label: 'Non, je doute', detail: 'Je crains de payer trop', score: 1 }
        ]
      }
    ],
    evaluate: (answers) => {
      const last = answers.home_last_review
      const satisfaction = answers.home_satisfaction
      if (last === 'less_1' && satisfaction === 'yes') {
        return {
          tone: 'success',
          headline: 'Votre couverture habitation est bien tenue 👏',
          message: 'Restez attentif aux évolutions de valeur de vos biens et programmez une vérification annuelle pour conserver vos avantages.'
        }
      }
      if (last === 'more_2' || satisfaction === 'no') {
        return {
          tone: 'critical',
          headline: 'Votre logement peut cacher 450 € d\'économies potentielles',
          message: 'Les propriétaires qui renégocient leur assurance habitation économisent en moyenne 450 € la première année. Actualisez votre contrat pour ne plus surpayer.'
        }
      }
      return {
        tone: 'warning',
        headline: 'Bonne idée de revisiter votre assurance habitation',
        message: 'Une mise à jour rapide sécurise vos biens et peut alléger la facture. Comparez les offres pour vérifier si votre budget est optimisé.'
      }
    }
  },
  sante: {
    label: 'Assurance Santé (LAMal)',
    icon: '🩺',
    articleIcon: ARTICLE_ICONS.sante,
    savings: 416,
    ctaLabel: 'Accéder au comparateur LAMal',
    ctaUrl: 'https://romandeassure.ch/fr/comparateur-lamal',
    source: 'Sources : echangesassurances.org & lesfurets.com',
    questions: [
      {
        id: 'health_compare',
        title: 'Avez-vous comparé les primes de votre caisse maladie cette année ?',
        subtitle: 'Les primes évoluent tous les ans : rester immobile coûte cher.',
        options: [
          { value: 'yes', label: 'Oui, récemment', detail: 'Je suis les primes de près', score: 5 },
          { value: 'plan', label: 'C\'est prévu bientôt', detail: 'Je dois encore le faire', score: 3 },
          { value: 'no', label: 'Non, pas encore', detail: 'Je n\'ai pas eu le temps', score: 1 }
        ]
      },
      {
        id: 'health_priority',
        title: 'Quel est votre objectif principal ?',
        subtitle: 'Indiquez votre priorité pour adapter la recommandation.',
        options: [
          { value: 'price', label: 'Réduire ma prime', detail: 'Je veux payer moins', score: 1 },
          { value: 'coverage', label: 'Améliorer ma couverture', detail: 'Je cherche de meilleures garanties', score: 3 },
          { value: 'stability', label: 'Trouver un équilibre', detail: 'Je veux optimiser prix + service', score: 4 }
        ]
      }
    ],
    evaluate: (answers) => {
      const compared = answers.health_compare
      if (compared === 'yes') {
        return {
          tone: 'success',
          headline: 'Vous maîtrisez vos primes santé 🎯',
          message: 'Continuez à challenger votre caisse chaque automne. Quelques minutes suffisent pour confirmer que vous payez le juste prix.'
        }
      }
      if (compared === 'no') {
        return {
          tone: 'critical',
          headline: 'Votre caisse maladie peut coûter des centaines de francs de trop',
          message: 'Moins de 15 % des assurés comparent chaque année alors que les économies peuvent dépasser 400 CHF. Lancez une comparaison pour reprendre la main.'
        }
      }
      return {
        tone: 'warning',
        headline: 'Dernière ligne droite pour valider vos primes santé',
        message: 'Comparer maintenant permet souvent d\'économiser plusieurs centaines de francs sans sacrifier votre couverture. Ne laissez pas passer la prochaine échéance.'
      }
    }
  }
}

const CATEGORY_ENTRIES = Object.entries(CATEGORY_CONFIG)

const LAMAL_KEY = 'sante'
const LAMAL_DESTINATION = '/fr/comparateur-lamal'
const EVENT_DIMENSIONS = { ui_style: 'soft-card', aura: 'blue', variant: 'capture-like' }


const renderMicroBenefits = (items = []) => items.map(text => `<li>${text}</li>`).join('')

const buildWidgetHTML = (mode) => {
  const copy = MODE_COPY[mode] || MODE_COPY.home
  const microBenefits = renderMicroBenefits(copy.microBenefits)

  const modal = `
    <div class="modal" id="ra-modal" role="dialog" aria-modal="true" aria-labelledby="ra-modal-title">
      <header>
        <h2 id="ra-modal-title">${copy.title}</h2>
        <p>${copy.subtitle}</p>
        <div class="progress-bar"><span data-progress-bar></span></div>
        <div class="progress-label" data-progress-label>Étape 1 sur 4</div>
      </header>
      <main>
        <section class="step active" data-step="categories">
          <p>Sélectionnez les assurances que vous souhaitez analyser. Vous pouvez en choisir plusieurs.</p>
          <div class="categories-grid" data-categories></div>
          <div class="step-actions">
            <button type="button" class="primary-btn" data-action="start" disabled>${copy.startCta}</button>
          </div>
        </section>
        <section class="step" data-step="question">
          <div class="question-header">
            <div data-question-context></div>
            <div data-question-progress></div>
          </div>
          <div class="question-body">
            <h3 data-question-title></h3>
            <p data-question-subtitle></p>
            <div class="question-options" data-question-options></div>
          </div>
          <div class="step-actions">
            <button type="button" class="secondary-btn" data-action="back">Retour</button>
          </div>
        </section>
        <section class="step" data-step="results">
          <div class="overall-score">
            <strong data-overall-score></strong>
            <span data-overall-text></span>
          </div>
          <div class="results-summary" data-results></div>
          <div class="step-actions">
            <button type="button" class="primary-btn" data-action="to-cta">${copy.actionsCta}</button>
          </div>
        </section>
        <section class="step" data-step="actions">
          <div class="overall-score">
            <strong data-total-savings></strong>
            <span data-total-text></span>
          </div>
          <div class="cta-grid" data-cta-grid></div>
        </section>
      </main>
      <footer>
        <div class="footer-reminder">Ne laissez pas des centaines d'euros s'échapper 💡</div>
        <div>Processus 100 % gratuit – aucune obligation</div>
      </footer>
    </div>
  `

  const modalBackdrop = `
    <div class="modal-backdrop" data-modal hidden>
      ${mode === 'article' && microBenefits ? `<div class="micro-benefits" aria-label="Avantages">${microBenefits}</div>` : ''}
      ${modal}
    </div>
  `

  if (mode === 'article') {
    return `
      <div class="ra360 mode-article">
        <p class="article-bridge">${copy.bridge}</p>
        <button type="button" class="article-preview" data-article-preview>
          <span class="outline-icon" aria-hidden="true">${ARTICLE_ICONS.sante}</span>
          <span class="preview-text">${copy.previewLead}</span>
          <span class="preview-cta">${copy.previewCta}</span>
        </button>
        <div class="article-panel" data-article-panel hidden>
          <div class="article-panel-head">
            <div class="panel-kicker">Analyse personnelle</div>
            <div class="panel-title">Répondez à 4 étapes pour obtenir votre synthèse.</div>
            <button type="button" class="text-btn" data-article-close aria-label="Replier l'outil">Fermer</button>
          </div>
          ${modalBackdrop}
        </div>
      </div>
    `
  }

  return `
    <div class="ra360 mode-home">
      ${modalBackdrop}
    </div>
  `
}
const sentEvents = window.__raSentEvents || new Set()
window.__raSentEvents = sentEvents

function pushEvent(evt, payload = {}, dedupe = true) {
  try {
    if (!Array.isArray(window.dataLayer)) return
    if (dedupe && sentEvents.has(evt)) return
    window.dataLayer.push({ event: evt, ...EVENT_DIMENSIONS, ...payload })
    if (dedupe) sentEvents.add(evt)
  } catch (err) {
    console.error('RA widget – dataLayer push error', err)
  }
}

function trapFocus(container) {
  const selector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  const focusable = Array.from(container.querySelectorAll(selector)).filter(el => !el.hasAttribute('disabled'))
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const handler = (e) => {
    if (e.key !== 'Tab') return
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
  container.__trapHandler = handler
  container.addEventListener('keydown', handler)
}

function releaseTrap(container) {
  if (container?.__trapHandler) {
    container.removeEventListener('keydown', container.__trapHandler)
    delete container.__trapHandler
  }
}

function animateArticlePanel(panel, expand) {
  if (!panel) return
  const backdrop = panel.querySelector('[data-modal]')
  const duration = 220
  if (expand) {
    if (backdrop) backdrop.hidden = false
    panel.hidden = false
    panel.style.maxHeight = '0px'
    panel.style.opacity = '0'
    requestAnimationFrame(() => {
      panel.classList.add('open')
      panel.style.maxHeight = `${panel.scrollHeight}px`
      panel.style.opacity = '1'
    })
    setTimeout(() => {
      panel.style.maxHeight = 'none'
    }, duration)
    return
  }

  panel.style.maxHeight = `${panel.scrollHeight}px`
  panel.style.opacity = '1'
  requestAnimationFrame(() => {
    panel.classList.remove('open')
    panel.style.maxHeight = '0px'
    panel.style.opacity = '0'
  })
  setTimeout(() => {
    panel.hidden = true
    if (backdrop) backdrop.hidden = true
    panel.style.maxHeight = ''
  }, duration)
}

function buildCategoryButtons(container, mode = 'home') {
  const useArticleIcons = mode === 'article'
  container.innerHTML = CATEGORY_ENTRIES.map(([key, cfg]) => {
    const icon = useArticleIcons && cfg.articleIcon ? cfg.articleIcon : cfg.icon
    return `
      <button type="button" class="category-option" data-category="${key}" aria-pressed="false">
        <div class="category-icon">${icon}</div>
        <div>${cfg.label}</div>
        <span>Jusqu'à ${cfg.savings} ${key === 'sante' ? 'CHF' : '€'} d'économies</span>
      </button>
    `
  }).join('')
}

function computeMaxScores() {
  const map = {}
  for (const [key, cfg] of CATEGORY_ENTRIES) {
    map[key] = cfg.questions.reduce((total, q) => {
      const best = Math.max(...q.options.map(opt => opt.score))
      return total + best
    }, 0)
  }
  return map
}

const MAX_SCORES = computeMaxScores()

export function initApp(root, options = {}) {
  const isBlogContext = (() => {
    const href = window?.location?.href || ''
    return href.toLowerCase().includes('/blog')
  })()

  const mode = isBlogContext || options.mode === 'article' ? 'article' : 'home'
  root.innerHTML = buildWidgetHTML(mode)
  root.classList.add(`mode-${mode}`)

  const backdrop = root.querySelector('[data-modal]')
  const modal = root.querySelector('.modal')
  const progressBar = root.querySelector('[data-progress-bar]')
  const progressLabel = root.querySelector('[data-progress-label]')
  const stepSections = Array.from(root.querySelectorAll('.step'))
  const categoriesContainer = root.querySelector('[data-categories]')
  const startBtn = root.querySelector('[data-action="start"]')
  const backBtn = root.querySelector('[data-action="back"]')
  const toCtaBtn = root.querySelector('[data-action="to-cta"]')
  const questionTitle = root.querySelector('[data-question-title]')
  const questionSubtitle = root.querySelector('[data-question-subtitle]')
  const questionOptions = root.querySelector('[data-question-options]')
  const questionContext = root.querySelector('[data-question-context]')
  const questionProgress = root.querySelector('[data-question-progress]')
  const resultsContainer = root.querySelector('[data-results]')
  const overallScore = root.querySelector('[data-overall-score]')
  const overallText = root.querySelector('[data-overall-text]')
  const totalSavingsEl = root.querySelector('[data-total-savings]')
  const totalTextEl = root.querySelector('[data-total-text]')
  const ctaGrid = root.querySelector('[data-cta-grid]')
  const articlePanel = root.querySelector('[data-article-panel]')
  const articlePreview = root.querySelector('[data-article-preview]')
  const articleClose = root.querySelector('[data-article-close]')

  const triggerSelector = mode === 'article' ? null : (options.trigger || '#diag360')
  const externalTrigger = triggerSelector ? document.querySelector(triggerSelector) : null
  let lastFocusedBeforeOpen = null

  buildCategoryButtons(categoriesContainer, mode)

  const state = {
    categories: new Set(),
    questionQueue: [],
    answers: {},
    scores: {},
    answerScores: {},
    currentStep: 'categories',
    currentQuestionIndex: 0,
    openedAt: null,
    questionStart: null,
    hasResults: false,
    leadStatus: {},
    gtmSessionId: null,
    options,
    mode
  }

  const resolveGtmSessionId = () => {
    if (options?.gtmSessionId) return options.gtmSessionId
    try {
      const gtm = window?.google_tag_manager || {}
      for (const key of Object.keys(gtm)) {
        if (!key.startsWith('GTM-')) continue
        const dataLayer = gtm[key]?.dataLayer
        if (dataLayer?.get) {
          const id = dataLayer.get('gtm.sessionId')
          if (id) return id
        }
      }
    } catch (err) {
      console.warn('RA widget – unable to read GTM session', err)
    }
    if (Array.isArray(window.dataLayer)) {
      for (let i = window.dataLayer.length - 1; i >= 0; i -= 1) {
        const entry = window.dataLayer[i]
        if (entry && entry['gtm.sessionId']) return entry['gtm.sessionId']
      }
    }
    return null
  }

  state.gtmSessionId = resolveGtmSessionId()

  const totalSteps = () => 3 + state.questionQueue.length

  const stepIndex = () => {
    switch (state.currentStep) {
      case 'categories':
        return 1
      case 'question':
        return 2 + state.currentQuestionIndex
      case 'results':
        return state.questionQueue.length + 2
      case 'actions':
        return state.questionQueue.length + 3
      default:
        return 1
    }
  }

  const updateProgress = () => {
    const total = Math.max(totalSteps(), 4)
    const current = Math.min(stepIndex(), total)
    const percent = Math.max(8, Math.round((current / total) * 100))
    if (progressBar) progressBar.style.width = `${percent}%`
    if (progressLabel) progressLabel.textContent = `Étape ${current} sur ${total}`
  }

  const setStep = (name) => {
    state.currentStep = name
    stepSections.forEach(section => {
      section.classList.toggle('active', section.dataset.step === name)
    })
    updateProgress()
    if (name === 'categories') {
      const first = categoriesContainer?.querySelector('button')
      first?.focus()
    } else if (name === 'question') {
      questionOptions?.querySelector('.choice-btn.selected')?.focus()
    } else if (name === 'results') {
      root.querySelector('[data-action="to-cta"]').focus({ preventScroll: true })
    }
  }

  const resetState = () => {
    state.categories.clear()
    state.questionQueue = []
    state.answers = {}
    state.scores = {}
    state.answerScores = {}
    state.currentQuestionIndex = 0
    state.openedAt = null
    state.questionStart = null
    state.hasResults = false
    state.leadStatus = {}
    categoriesContainer?.querySelectorAll('.category-option').forEach(btn => {
      btn.classList.remove('active')
      btn.setAttribute('aria-pressed', 'false')
    })
    startBtn.disabled = true
    resultsContainer.innerHTML = ''
    overallScore.textContent = ''
    overallText.textContent = ''
    totalSavingsEl.textContent = ''
    totalTextEl.textContent = ''
    ctaGrid.innerHTML = ''
    questionTitle.textContent = ''
    questionSubtitle.textContent = ''
    questionOptions.innerHTML = ''
    questionContext.textContent = ''
    questionProgress.textContent = ''
    setStep('categories')
    if (state.mode === 'article' && articlePanel) {
      articlePanel.classList.remove('open')
      const innerBackdrop = articlePanel.querySelector('[data-modal]')
      if (innerBackdrop) innerBackdrop.hidden = true
      articlePanel.hidden = true
      articlePanel.style.maxHeight = ''
      articlePanel.style.opacity = ''
    }
  }

  const openModal = () => {
    if (!backdrop) return
    if (state.mode === 'article') {
      animateArticlePanel(articlePanel, true)
    }
    lastFocusedBeforeOpen = document.activeElement
    backdrop.hidden = false
    backdrop.classList.add('open')
    if (state.mode !== 'article') trapFocus(modal)
    state.openedAt = Date.now()
    pushEvent('ra360_open', {
      opened_at: new Date().toISOString()
    }, false)
    setTimeout(() => {
      categoriesContainer?.querySelector('button')?.focus({ preventScroll: true })
    }, 50)
  }

  const closeModal = (reason = 'close') => {
    if (!backdrop || (!backdrop.classList.contains('open') && state.mode !== 'article')) return
    if (state.mode !== 'article') {
      releaseTrap(modal)
      backdrop.classList.remove('open')
      backdrop.hidden = true
    } else {
      animateArticlePanel(articlePanel, false)
      backdrop.classList.remove('open')
    }
    if (!state.hasResults) {
      pushEvent('ra360_abandon', { step_abandon: state.currentStep }, false)
    }
    resetState()
    const focusTarget = lastFocusedBeforeOpen && document.contains(lastFocusedBeforeOpen)
      ? lastFocusedBeforeOpen
      : (externalTrigger || articlePreview)
    focusTarget?.focus({ preventScroll: true })
  }

  const buildQuestionQueue = () => {
    state.questionQueue = []
    state.categories.forEach(cat => {
      const cfg = CATEGORY_CONFIG[cat]
      cfg.questions.forEach(q => {
        state.questionQueue.push({ category: cat, question: q })
      })
    })
  }

  const renderQuestion = () => {
    const current = state.questionQueue[state.currentQuestionIndex]
    if (!current) return
    const { category, question } = current
    const cfg = CATEGORY_CONFIG[category]
    const ctxIcon = state.mode === 'article' && cfg.articleIcon ? cfg.articleIcon : cfg.icon
    if (questionContext) {
      questionContext.innerHTML = `${ctxIcon} ${cfg.label}`
      questionContext.classList.toggle('has-outline-icon', !!(state.mode === 'article' && cfg.articleIcon))
    }
    if (questionTitle) questionTitle.textContent = question.title
    if (questionSubtitle) {
      questionSubtitle.textContent = question.subtitle || ''
      questionSubtitle.style.display = question.subtitle ? 'block' : 'none'
    }
    if (questionProgress) {
      const humanIndex = state.currentQuestionIndex + 1
      questionProgress.textContent = `Question ${humanIndex} sur ${state.questionQueue.length}`
    }
    const prev = state.answers[category]?.[question.id]
    questionOptions.innerHTML = question.options.map(opt => `
      <button type="button" class="choice-btn${opt.value === prev ? ' selected' : ''}" data-value="${opt.value}" data-score="${opt.score}">
        <strong>${opt.label}</strong>
        <span>${opt.detail}</span>
      </button>
    `).join('')
    Array.from(questionOptions.querySelectorAll('.choice-btn')).forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value
        const score = Number(btn.dataset.score || 0)
        state.answers[category] = { ...(state.answers[category] || {}), [question.id]: value }
        const prevScores = state.answerScores[category] || {}
        const prevScore = prevScores[question.id] || 0
        state.answerScores[category] = { ...prevScores, [question.id]: score }
        state.scores[category] = Math.max(0, (state.scores[category] || 0) - prevScore + score)
        questionOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'))
        btn.classList.add('selected')
        setTimeout(() => {
          state.currentQuestionIndex += 1
          if (state.currentQuestionIndex >= state.questionQueue.length) {
            const duration = Math.max(1, Math.round((Date.now() - (state.questionStart || Date.now())) / 1000))
            pushEvent('ra360_questions_completed', {
              nombre_questions: state.questionQueue.length,
              duree_completion: duration
            })
            showResults()
          } else {
            renderQuestion()
          }
        }, 180)
      })
    })
    const selected = questionOptions.querySelector('.choice-btn.selected')
    const fallback = questionOptions.querySelector('.choice-btn')
    ;(selected || fallback)?.focus({ preventScroll: true })
  }

  const computeOverallScore = (items) => {
    if (!items.length) return { score: 0, text: '' }
    const total = items.reduce((sum, item) => sum + item.score, 0)
    const avg = total / items.length
    const rounded = Math.round(avg * 10) / 10
    let text = 'Plus le score est élevé, plus vos contrats sont sous contrôle.'
    if (rounded <= 3) text = 'Alerte : vos contrats nécessitent une action immédiate pour stopper l\'hémorragie.'
    else if (rounded <= 6) text = 'Encore un petit effort pour sécuriser vos économies potentielles.'
    else if (rounded >= 8) text = 'Excellent réflexe ! Continuez à vérifier vos assurances régulièrement.'
    return { score: rounded, text }
  }

  const buildCtaCards = (items) => {
    if (!ctaGrid) return
    const statusMap = state.leadStatus || (state.leadStatus = {})
    const gtmSessionId = state.gtmSessionId
    ctaGrid.innerHTML = items.map(item => {
      const isLamal = item.key === LAMAL_KEY
      const classes = ['cta-card', isLamal ? 'is-lamal' : 'is-lead']
      const successCopy = item.leadSuccess || 'Merci ! Un conseiller vous contactera rapidement.'
      const leadCopy = item.leadCopy || 'Un expert Romande Assure vous rappelle pour affiner votre contrat en toute sérénité.'
      return `
      <article class="${classes.join(' ')}" data-category="${item.key}">
        <div class="cta-intro">
          <div class="cta-icon-pill" aria-hidden="true"><span>${item.icon}</span></div>
          <div class="cta-copy">
            <h5>${item.label}</h5>
            <p>${item.ctaMessage}</p>
          </div>
        </div>
        ${isLamal ? `
          <button type="button" class="link-cta" data-cta-lamal data-url="${item.ctaUrl}">
            ${item.ctaLabel} <span aria-hidden="true">→</span>
          </button>
        ` : `
          <p class="lead-copy">${leadCopy}</p>
          <form class="lead-form" data-service="${item.key}" novalidate>
            <input type="hidden" name="service" value="${item.key}">
            <div class="form-grid">
              <label>
                <span>Nom complet</span>
                <input type="text" name="name" placeholder="Votre nom" autocomplete="name" required>
              </label>
              <label>
                <span>Email ou téléphone</span>
                <input type="text" name="email_or_phone" placeholder="vous@exemple.ch / +41…" autocomplete="email" required>
              </label>
              <label>
                <span>NPA ou Canton</span>
                <input type="text" name="npa_or_canton" placeholder="1204 Genève" autocomplete="postal-code" required>
              </label>
              <label>
                <span>Service</span>
                <input type="text" name="service_label" value="${item.label}" readonly aria-readonly="true">
              </label>
            </div>
            <button type="submit" class="primary-btn" data-submit>${item.ctaLabel} <span aria-hidden="true">→</span></button>
          </form>
          <div class="lead-feedback success" data-lead-success hidden>
            <div class="feedback-icon" aria-hidden="true">✔</div>
            <p>${successCopy}</p>
          </div>
          <div class="lead-feedback error" data-lead-error hidden>
            <div class="feedback-icon" aria-hidden="true">!</div>
            <p>Oups ! Impossible d'envoyer votre demande. Merci de réessayer.</p>
          </div>
        `}
      </article>
    `}).join('')

    Array.from(ctaGrid.querySelectorAll('[data-cta-lamal]')).forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.dataset.url
        pushEvent('ra360_lamal_redirect', { service: LAMAL_KEY, destination: LAMAL_DESTINATION }, false)
        if (url) {
          const win = window.open(url, '_blank', 'noopener')
          if (win) win.opener = null
        }
      })
    })

    Array.from(ctaGrid.querySelectorAll('form[data-service]')).forEach(form => {
      const service = form.dataset.service
      const card = form.closest('.cta-card')
      const successEl = card?.querySelector('[data-lead-success]')
      const errorEl = card?.querySelector('[data-lead-error]')
      const submitBtn = form.querySelector('[data-submit]')

      const setStatus = (status) => {
        if (!card) return
        card.dataset.leadStatus = status
        if (status === 'success') {
          form.hidden = true
          if (successEl) successEl.hidden = false
          if (errorEl) errorEl.hidden = true
        } else {
          form.hidden = false
          if (successEl) successEl.hidden = true
          if (errorEl) errorEl.hidden = status !== 'error'
        }
      }

      if (statusMap[service] === 'success') {
        setStatus('success')
      }

      form.addEventListener('submit', async (event) => {
        event.preventDefault()
        if (errorEl) errorEl.hidden = true
        const data = new FormData(form)
        const name = String(data.get('name') || '').trim()
        const contact = String(data.get('email_or_phone') || '').trim()
        const location = String(data.get('npa_or_canton') || '').trim()
        if (!name || !contact || !location) {
          statusMap[service] = 'error'
          setStatus('error')
          return
        }
        const originalText = submitBtn?.textContent || ''
        if (submitBtn) {
          submitBtn.disabled = true
          submitBtn.textContent = 'Envoi en cours…'
        }
        try {
          const payload = {
            service,
            user: {
              name,
              email_or_phone: contact,
              npa_or_canton: location
            },
            source: 'ra360_widget',
            variant: 'capture-like',
            ui_style: 'soft-card',
            aura: 'blue'
          }
          if (gtmSessionId) payload.gtm_session_id = gtmSessionId
          const ok = await submitLead(options, payload)
          pushEvent('ra360_lead_submit', { service, submit_status: ok ? 'success' : 'error' }, false)
          statusMap[service] = ok ? 'success' : 'error'
          setStatus(ok ? 'success' : 'error')
        } catch (err) {
          console.error('RA widget – lead submit failed', err)
          statusMap[service] = 'error'
          pushEvent('ra360_lead_submit', { service, submit_status: 'error' }, false)
          setStatus('error')
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.textContent = originalText
          }
        }
      })
    })
  }

  const showResults = async () => {
    state.hasResults = true
    const results = state.categories.size ? Array.from(state.categories).map(key => {
      const cfg = CATEGORY_CONFIG[key]
      const icon = state.mode === 'article' && cfg.articleIcon ? cfg.articleIcon : cfg.icon
      const evalResult = cfg.evaluate(state.answers[key] || {})
      const rawScore = state.scores[key] || 0
      const max = MAX_SCORES[key] || 1
      const normalized = Math.max(0, Math.min(10, Math.round((rawScore / max) * 10)))
      return {
        key,
        label: cfg.label,
        icon,
        tone: evalResult.tone,
        headline: evalResult.headline,
        message: evalResult.message,
        source: cfg.source,
        score: normalized,
        savings: cfg.savings,
        ctaLabel: cfg.ctaLabel,
        ctaUrl: cfg.ctaUrl,
        leadCopy: cfg.leadCopy,
        leadSuccess: cfg.leadSuccess,
        ctaMessage: `Débloquez jusqu'à ${cfg.savings}${key === 'sante' ? ' CHF' : ' €'} d'économies potentielles`,
        answers: state.answers[key] || {}
      }
    }) : []

    resultsContainer.innerHTML = results.map(item => `
      <article class="diagnosis-card" data-tone="${item.tone}">
        <div class="diagnosis-icon">${item.icon}</div>
        <div>
          <h4>${item.headline}</h4>
          <p>${item.message}</p>
          <p class="source">${item.source}</p>
        </div>
        <div class="score-pill">Score ${item.score}/10</div>
      </article>
    `).join('')

    const overall = computeOverallScore(results)
    overallScore.textContent = `Score de vigilance assurance : ${overall.score}/10`
    overallText.textContent = overall.text

    const totalSavings = results.reduce((sum, item) => sum + item.savings, 0)
    totalSavingsEl.textContent = `Potentiel d'économies estimé : jusqu'à ${totalSavings} € / CHF`
    totalTextEl.textContent = `Additionnez auto, habitation et santé et vous atteignez facilement 1 000 € d'économies annuelles.`

    buildCtaCards(results)

    const payload = {
      assurances_selectionnees: Array.from(state.categories),
      reponses: state.answers,
      score_vigilance: overall.score,
      estimation_economies_totales: totalSavings,
      source: options.source || 'widgetPageAccueil',
      variant: 'capture-like',
      ui_style: 'soft-card',
      aura: 'blue',
      timestamp: new Date().toISOString()
    }

    pushEvent('ra360_results_shown', {
      potential_savings: totalSavings,
      services: Array.from(state.categories),
      score_vigilance: overall.score
    })

    submitCheckup(options, payload).then(ok => {
      pushEvent('ra360_payload_sent', { status: ok ? 'success' : 'error' }, false)
    }).catch(() => {
      pushEvent('ra360_payload_sent', { status: 'error' }, false)
    })

    setStep('results')
  }

  // Listeners
  if (state.mode === 'article') {
    articlePreview?.addEventListener('click', () => openModal())
    articleClose?.addEventListener('click', () => closeModal('collapse'))
  }

  if (externalTrigger) {
    if (externalTrigger.tabIndex < 0) externalTrigger.tabIndex = 0
    if (!externalTrigger.getAttribute('role')) externalTrigger.setAttribute('role', 'button')
    externalTrigger.setAttribute('aria-haspopup', 'dialog')
    externalTrigger.setAttribute('aria-controls', 'ra-modal')
    externalTrigger.addEventListener('click', () => openModal())
    externalTrigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openModal()
      }
    })
  } else if (triggerSelector) {
    console.warn(`RA widget – trigger selector not found: ${triggerSelector}`)
  }

  categoriesContainer?.addEventListener('click', (event) => {
    const btn = event.target.closest('.category-option')
    if (!btn) return
    const key = btn.dataset.category
    if (!CATEGORY_CONFIG[key]) return
    if (state.categories.has(key)) {
      state.categories.delete(key)
      btn.classList.remove('active')
      btn.setAttribute('aria-pressed', 'false')
    } else {
      state.categories.add(key)
      btn.classList.add('active')
      btn.setAttribute('aria-pressed', 'true')
    }
    startBtn.disabled = state.categories.size === 0
  })

  startBtn?.addEventListener('click', () => {
    if (!state.categories.size) return
    buildQuestionQueue()
    state.currentQuestionIndex = 0
    state.questionStart = Date.now()
    const selectedServices = Array.from(state.categories)
    pushEvent('ra360_select', {
      services: selectedServices,
      count: selectedServices.length
    })
    setStep('question')
    renderQuestion()
  })

  backBtn?.addEventListener('click', () => {
    if (state.currentStep === 'question') {
      if (state.currentQuestionIndex === 0) {
        setStep('categories')
      } else {
        state.currentQuestionIndex = Math.max(0, state.currentQuestionIndex - 1)
        renderQuestion()
      }
    } else if (state.currentStep === 'results') {
      state.currentQuestionIndex = Math.max(0, state.questionQueue.length - 1)
      setStep('question')
      renderQuestion()
    }
  })

  toCtaBtn?.addEventListener('click', () => {
    setStep('actions')
  })

  backdrop?.addEventListener('click', (event) => {
    if (state.mode !== 'article' && event.target === backdrop) {
      closeModal('overlay')
    }
  })

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal('escape')
    }
  })

  resetState()
}
