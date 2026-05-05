/* Spektrum Control Portal — vanilla JS.
   Two responsibilities: theme toggle + i18n switch. localStorage persists both. */

(function () {
  'use strict'

  /* ─── i18n catalog ────────────────────────────────────── */
  const CATALOG = {
    'sr-Latn': {
      htmlLang: 'sr-Latn',
      pageTitle: 'Spektrum Control — Platforma za upravljanje protivpožarnim kontrolama',
      pitch: 'Platforma za upravljanje protivpožarnim kontrolama',
      openAdmin: 'Admin dashboard',
      openMobile: 'Mobilna aplikacija',
      terms: 'Uslovi korišćenja',
      privacy: 'Politika privatnosti',
      requestDemo: 'Zatražite demo →',
      ownerLine: 'Vlasnik · MBS Spektrum d.o.o.',
      footerLocation: 'Sremska Mitrovica, 1992',
      themeToggleAria: 'Promeni temu',
      localeToggleAria: 'Promeni jezik',
    },
    'sr-Cyrl': {
      htmlLang: 'sr-Cyrl',
      pageTitle: 'Спектрум Контрол — Платформа за управљање противпожарним контролама',
      pitch: 'Платформа за управљање противпожарним контролама',
      openAdmin: 'Админ панел',
      openMobile: 'Мобилна апликација',
      terms: 'Услови коришћења',
      privacy: 'Политика приватности',
      requestDemo: 'Затражите демо →',
      ownerLine: 'Власник · МБС Спектрум д.о.о.',
      footerLocation: 'Сремска Митровица, 1992',
      themeToggleAria: 'Промени тему',
      localeToggleAria: 'Промени језик',
    },
    'en': {
      htmlLang: 'en',
      pageTitle: 'Spektrum Control — Fire-protection inspection platform',
      pitch: 'Fire-protection inspection management platform',
      openAdmin: 'Admin dashboard',
      openMobile: 'Mobile app',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      requestDemo: 'Request a demo →',
      ownerLine: 'Owner · MBS Spektrum d.o.o.',
      footerLocation: 'Sremska Mitrovica, 1992',
      themeToggleAria: 'Toggle theme',
      localeToggleAria: 'Change language',
    },
    'ro': {
      htmlLang: 'ro',
      pageTitle: 'Spektrum Control — Platformă pentru gestionarea controalelor PSI',
      pitch: 'Platformă pentru gestionarea controalelor PSI',
      openAdmin: 'Panou administrator',
      openMobile: 'Aplicație mobilă',
      terms: 'Termeni de utilizare',
      privacy: 'Politică de confidențialitate',
      requestDemo: 'Solicitați un demo →',
      ownerLine: 'Proprietar · MBS Spektrum d.o.o.',
      footerLocation: 'Sremska Mitrovica, 1992',
      themeToggleAria: 'Comutare temă',
      localeToggleAria: 'Schimbare limbă',
    },
  }

  const SUPPORTED = Object.keys(CATALOG)
  const DEFAULT_LOCALE = 'sr-Latn'

  /* ─── Theme ───────────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('spektrum-control-theme', theme) } catch (e) {}
  }
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light'
  }

  document.getElementById('theme-toggle').addEventListener('click', function () {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark')
  })

  /* ─── i18n ────────────────────────────────────────────── */
  function detectInitialLocale() {
    try {
      const stored = localStorage.getItem('spektrum-control-locale')
      if (stored && SUPPORTED.includes(stored)) return stored
    } catch (e) {}
    const url = new URL(window.location.href)
    const qp = url.searchParams.get('lang')
    if (qp && SUPPORTED.includes(qp)) return qp
    const nav = (navigator.language || 'sr-Latn').toLowerCase()
    if (nav.startsWith('sr')) return nav.includes('cyrl') ? 'sr-Cyrl' : 'sr-Latn'
    if (nav.startsWith('en')) return 'en'
    if (nav.startsWith('ro')) return 'ro'
    return DEFAULT_LOCALE
  }

  function applyLocale(locale) {
    if (!SUPPORTED.includes(locale)) locale = DEFAULT_LOCALE
    const t = CATALOG[locale]

    document.documentElement.setAttribute('lang', t.htmlLang)
    document.title = t.pageTitle

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n')
      if (t[key] !== undefined) el.textContent = t[key]
    })

    document.getElementById('theme-toggle').setAttribute('aria-label', t.themeToggleAria)
    const sel = document.getElementById('locale-toggle')
    sel.setAttribute('aria-label', t.localeToggleAria)
    sel.value = locale

    try { localStorage.setItem('spektrum-control-locale', locale) } catch (e) {}
  }

  document.getElementById('locale-toggle').addEventListener('change', function (e) {
    applyLocale(e.target.value)
  })

  applyLocale(detectInitialLocale())
})()
