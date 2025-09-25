import { submitCheckup } from './api.js'

const CATEGORY_CONFIG = {
  auto: {
    label: 'Assurance Auto',
    icon: '🚗',
    savings: 400,
    ctaLabel: 'Comparer les offres auto',
    ctaUrl: 'https://romandeassure.ch/fr/assurance-auto',
    source: 'Source : lesfurets.com',
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
    savings: 450,
    ctaLabel: 'Comparer les offres habitation',
    ctaUrl: 'https://romandeassure.ch/fr/assurance-habitation',
    source: 'Source : echangesassurances.org',
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
    savings: 416,
    ctaLabel: 'Comparer les primes santé',
    ctaUrl: 'https://romandeassure.ch/fr/lamal-comparateur',
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

const WIDGET_HTML = `
<div class="ra360">
  <article class="widget-card" data-role="card" tabindex="0" aria-haspopup="dialog" aria-controls="ra-modal">
    <div class="icons">🚗 🏡 🩺</div>
    <h3>Faites le bilan de vos assurances</h3>
    <p>En moins de 2 minutes, identifiez les économies potentielles sur vos contrats auto, habitation et santé.</p>
    <div class="cta-inline">Faites le test maintenant →</div>
  </article>
  <div class="modal-backdrop" data-modal hidden>
    <div class="modal" id="ra-modal" role="dialog" aria-modal="true" aria-labelledby="ra-modal-title">
      <button class="modal-close" data-close aria-label="Fermer le diagnostic">×</button>
      <header>
        <h2 id="ra-modal-title">Bilan express de vos assurances 📊</h2>
        <p>Répondez à quelques questions pour découvrir où vous pourriez économiser jusqu\'à 1 000 € par an.</p>
        <div class="progress-bar"><span data-progress-bar></span></div>
        <div class="progress-label" data-progress-label>Étape 1 sur 4</div>
      </header>
      <main>
        <section class="step active" data-step="categories">
          <p>Sélectionnez les assurances que vous souhaitez analyser. Vous pouvez en choisir plusieurs.</p>
          <div class="categories-grid" data-categories></div>
          <div class="step-actions">
            <button type="button" class="primary-btn" data-action="start" disabled>Commencer le diagnostic</button>
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
            <button type="button" class="primary-btn" data-action="to-cta">Voir mes actions concrètes</button>
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

function buildCategoryButtons(container) {
  container.innerHTML = CATEGORY_ENTRIES.map(([key, cfg]) => `
    <button type="button" class="category-option" data-category="${key}" aria-pressed="false">
      <div class="category-icon">${cfg.icon}</div>
      <div>${cfg.label}</div>
      <span>Jusqu'à ${cfg.savings} ${key === 'sante' ? 'CHF' : '€'} d'économies</span>
    </button>
  `).join('')
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
  root.innerHTML = WIDGET_HTML

  const card = root.querySelector('[data-role="card"]')
  const backdrop = root.querySelector('[data-modal]')
  const modal = root.querySelector('.modal')
  const closeButtons = root.querySelectorAll('[data-close]')
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

  buildCategoryButtons(categoriesContainer)

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
    options
  }

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
  }

  const openModal = () => {
    if (!backdrop) return
    backdrop.hidden = false
    backdrop.classList.add('open')
    trapFocus(modal)
    state.openedAt = Date.now()
    pushEvent('insuranceWidget_open')
    setTimeout(() => {
      categoriesContainer?.querySelector('button')?.focus({ preventScroll: true })
    }, 50)
  }

  const closeModal = (reason = 'close') => {
    if (!backdrop || !backdrop.classList.contains('open')) return
    releaseTrap(modal)
    backdrop.classList.remove('open')
    backdrop.hidden = true
    if (!state.hasResults) {
      pushEvent('insuranceWidget_abandon', { step_abandon: state.currentStep }, false)
    }
    resetState()
    card?.focus({ preventScroll: true })
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
    if (questionContext) questionContext.textContent = `${cfg.icon} ${cfg.label}`
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
            pushEvent('insuranceWidget_questionsCompleted', {
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
    ctaGrid.innerHTML = items.map(item => `
      <div class="cta-card" data-category="${item.key}">
        <div class="cta-text">
          <h5>${item.icon} ${item.label}</h5>
          <p>${item.ctaMessage}</p>
        </div>
        <button type="button" class="primary-btn" data-cta="${item.key}">${item.ctaLabel}</button>
      </div>
    `).join('')
    Array.from(ctaGrid.querySelectorAll('[data-cta]')).forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.cta
        const cfg = CATEGORY_CONFIG[key]
        const result = items.find(i => i.key === key)
        pushEvent('insuranceWidget_CTA_click', {
          assurance_type: key,
          potentiel_economie: cfg.savings,
          score_vigilance: result?.score || 0
        }, false)
        if (cfg.ctaUrl) {
          window.open(cfg.ctaUrl, '_blank', 'noopener')
        }
        closeModal('cta')
      })
    })
  }

  const showResults = async () => {
    state.hasResults = true
    const results = state.categories.size ? Array.from(state.categories).map(key => {
      const cfg = CATEGORY_CONFIG[key]
      const evalResult = cfg.evaluate(state.answers[key] || {})
      const rawScore = state.scores[key] || 0
      const max = MAX_SCORES[key] || 1
      const normalized = Math.max(0, Math.min(10, Math.round((rawScore / max) * 10)))
      return {
        key,
        label: cfg.label,
        icon: cfg.icon,
        tone: evalResult.tone,
        headline: evalResult.headline,
        message: evalResult.message,
        source: cfg.source,
        score: normalized,
        savings: cfg.savings,
        ctaLabel: cfg.ctaLabel,
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
      timestamp: new Date().toISOString()
    }

    pushEvent('insuranceWidget_resultsShown', {
      potentiel_economie: totalSavings,
      score_vigilance: overall.score
    })

    submitCheckup(options, payload).then(ok => {
      pushEvent('insuranceWidget_dataSent', { status: ok ? 'success' : 'error' }, false)
    }).catch(() => {
      pushEvent('insuranceWidget_dataSent', { status: 'error' }, false)
    })

    setStep('results')
  }

  // Listeners
  card?.addEventListener('click', () => openModal())
  card?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openModal()
    }
  })

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
    pushEvent('insuranceWidget_selectCategories', {
      categories: Array.from(state.categories),
      nombre_categories: state.categories.size
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
    if (event.target === backdrop) {
      closeModal('overlay')
    }
  })

  closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal('button')))

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal('escape')
    }
  })

  resetState()
}
