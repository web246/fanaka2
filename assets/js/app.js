(() => {
  'use strict'

  const data = window.FANAKA
  const brand = data.brand
  const services = data.services
  const page = document.body.dataset.page || pageFromPath()
  const iconPaths = {
    vault: '<path d="M4 5.5 12 2l8 3.5v13L12 22l-8-3.5z"/><path d="M8 8h8v8H8zM12 8v8m-4-4h8"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 6-7"/><path d="M17 7h4v4"/>',
    hands: '<path d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z"/><path d="m8 12 2 2 4-4"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 3 4.6V20"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.4 5.9-5.9 2.5 2.4-6z"/>',
    cap: '<path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v5c4 3 8 3 12 0v-5m4-2v6"/>',
    scale: '<path d="m12 3 9 4-9 4-9-4 9-4Z"/><path d="M3 7v6m18-6v6M5 13c0 2 1 3 3 3s3-1 3-3M13 13c0 2 1 3 3 3s3-1 3-3M12 11v9m-5 1h10"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6m-11 5 2 2 4-4"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
    up: '<path d="M7 17 17 7M7 7h10v10"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.1 10a16 16 0 0 0 6 6l1.5-1.9a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.6 1.9Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15m6-12v15"/>',
    play: '<path d="m8 5 12 7-12 7z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  }
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.check}</svg>`
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
  const image = (src, alt = '', cls = '', eager = false) => `<img src="${escapeHTML(src)}" alt="${escapeHTML(alt)}" class="${cls}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 600 400%27%3E%3Crect width=%27600%27 height=%27400%27 fill=%27%230b1522%27/%3E%3C/svg%3E'">`
  const link = (href, text, cls = '') => `<a class="${cls}" href="${href}">${text}</a>`
  const button = (action, text, cls = '', iconName = 'arrow') => `<button class="${cls}" type="button" data-action="${action}">${text}${icon(iconName)}</button>`
  const eyebrow = (text, align = '') => `<div class="eyebrow ${align}"><span class="hairline"></span><span>${text}</span><span class="hairline"></span></div>`
  const heading = (label, title, subtitle = '') => `<div class="section-heading">${eyebrow(label)}<h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`
  const serviceURL = (service) => `service.html?slug=${encodeURIComponent(service.slug)}`
  const selectedService = () => services.find((item) => item.slug === new URLSearchParams(location.search).get('slug'))
  let sliderTimer
  let miniTimer
  let cardTimer
  let wordTimer
  let activeSlide = 0
  let activeCard = 0
  let activeWord = 0

  function pageFromPath() {
    const path = location.pathname.split('/').pop()
    return ({
      'about.html': 'about',
      'services.html': 'services',
      'service.html': 'service',
      'contact.html': 'contact',
      'privacy-policy.html': 'legal',
      'terms.html': 'legal',
      'cookie-policy.html': 'legal',
      'disclaimer.html': 'legal',
    })[path] || 'home'
  }

  function renderHeader() {
    const navItems = [['Home', 'index.html', 'home'], ['About', 'about.html', 'about'], ['Services', 'services.html', 'services'], ['Contact', 'contact.html', 'contact']]
    document.getElementById('site-header').innerHTML = `
      <header class="site-header" id="top">
        <nav class="nav-shell wrap" aria-label="Main navigation">
          <a class="brand" href="index.html" aria-label="Fanaka Noblewealth Advisory home">${image(brand.logo, 'Fanaka Noblewealth Advisory', 'brand-logo', true)}</a>
          <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false">${icon('menu')}</button>
          <div class="nav-links">${navItems.map(([name, href, key]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ''}>${name}${name === 'Services' ? icon('down', 'nav-chevron') : ''}</a>`).join('')}</div>
          <a class="button button-gold nav-cta" href="contact.html">Book a consultation ${icon('arrow')}</a>
        </nav>
        <div class="mobile-panel" id="mobile-panel" hidden>
          ${navItems.map(([name, href]) => `<a href="${href}">${name}</a>`).join('')}
          <span class="mobile-label">Our services</span>
          ${services.map((service) => `<a class="mobile-service" href="${serviceURL(service)}">${service.title}</a>`).join('')}
          <a class="button button-gold" href="contact.html">Book a consultation ${icon('arrow')}</a>
          <p><a href="mailto:${brand.email}">${brand.email}</a><br><a href="${brand.phoneHref}">${brand.phone}</a><br>${brand.address.join(', ')}</p>
        </div>
      </header>`
    const header = document.querySelector('.site-header')
    const toggle = document.querySelector('.menu-toggle')
    const panel = document.querySelector('.mobile-panel')
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true'
      toggle.setAttribute('aria-expanded', String(open))
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu')
      toggle.innerHTML = icon(open ? 'close' : 'menu')
      panel.hidden = !open
      header.classList.toggle('menu-open', open)
      document.body.classList.toggle('menu-open', open)
    })
    window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true })
  }

  function renderFooter() {
    const legalLinks = [['Privacy Policy', 'privacy-policy.html'], ['Terms of Use', 'terms.html'], ['Cookie Policy', 'cookie-policy.html'], ['Regulatory Disclaimer', 'disclaimer.html']]
    document.getElementById('site-footer').innerHTML = `
      <footer class="site-footer">
        <div class="footer-glow"></div>
        <div class="wrap footer-grid">
          <div class="footer-brand"><a href="index.html">${image(brand.logo, 'Fanaka Noblewealth Advisory', 'brand-logo')}</a><p>Independent corporate trustee and wealth advisory — holding retirement benefits, investments, trusts and employee benefits in trust, with governance that stands up to scrutiny.</p><span class="footer-tag">${brand.tagline}</span></div>
          <div><h2 class="footer-label">Services</h2><ul>${services.map((service) => `<li><a href="${serviceURL(service)}">${service.title}</a></li>`).join('')}</ul></div>
          <div><h2 class="footer-label">Company</h2><ul><li><a href="about.html">About</a></li><li><a href="services.html">Services</a></li><li><a href="contact.html">Contact</a></li>${legalLinks.map(([name, href]) => `<li><a href="${href}">${name}</a></li>`).join('')}</ul></div>
          <div><h2 class="footer-label">Visit or call</h2><p>${brand.address.join('<br>')}</p><p><a href="${brand.phoneHref}">${brand.phone}</a><br><a href="mailto:${brand.email}">${brand.email}</a></p></div>
        </div>
        <div class="footer-bottom"><div class="wrap footer-bottom-inner"><span>© ${new Date().getFullYear()} Fanaka Noblewealth Advisory. All rights reserved.</span><span>Nairobi, Kenya · Independent by design.</span></div></div>
      </footer>`
  }

  function heroSlides() {
    return [
      { eyebrow: 'Corporate Trustee · Nairobi, Kenya', lead: 'Wealth, governed with', gold: 'noble intent.', body: 'Fanaka Noblewealth Advisory holds retirement benefits, investments, trusts and employee benefits in independent trust — with governance your board can stand behind and reporting your members can actually read.' },
      { eyebrow: 'Retirement Benefits & Employee Trusts', lead: 'Your people’s future, held', gold: 'in trust.', body: 'Governance, compliance and steady oversight for pension schemes, gratuity funds, ESOPs and employee benefit trusts — so the promises made at recruitment are kept at the end of service.' },
      { eyebrow: 'Family Trusts & Succession', lead: 'Legacies that outlive', gold: 'generations.', body: 'Structured family trusts, succession planning and ongoing trustee administration for families and businesses that have built something worth protecting.' },
      { eyebrow: 'Financial Trainings', lead: 'Capability your board can', gold: 'stand on.', body: 'Practical, Kenya-focused training for trustees, boards and finance teams — fiduciary duty, investments, compliance and controls, taught around the decisions you actually make.' },
    ]
  }

  function hero() {
    const slides = heroSlides()
    return `<section class="hero">
      ${image(brand.images.tower, '', 'hero-image', true)}<canvas class="particles" aria-hidden="true"></canvas><div class="hero-vignette"></div><div class="hero-scrim"></div><div class="light-sweep"></div><div class="grain"></div>
      <div class="wrap hero-content">
        <div class="hero-copy" id="hero-copy" aria-live="polite"></div>
        <div class="mini-deck">
          <div class="deck-label"><span class="hairline"></span>Explore our services</div>
          <div class="mini-stage" id="mini-stage"></div>
          <div class="deck-dots" id="mini-dots"></div>
          <p class="mini-caption">Tap a card to open that mandate.</p>
        </div>
      </div>
      <div class="hero-controls"><button type="button" class="round-control" data-action="slide-prev" aria-label="Previous slide">${icon('left')}</button><div class="slide-dots" id="slide-dots"></div><button type="button" class="round-control" data-action="slide-next" aria-label="Next slide">${icon('right')}</button></div>
    </section>`
  }

  function renderHeroSlide(index) {
    const slide = heroSlides()[index]
    document.getElementById('hero-copy').innerHTML = `
      <div class="eyebrow eyebrow-left"><span class="hairline"></span><span>${slide.eyebrow}</span></div>
      <h1>${slide.lead} <span class="gold-text">${slide.gold}</span></h1>
      <p class="hero-intro">${slide.body}</p>
      <a class="button button-gold button-large" href="contact.html">Book a consultation ${icon('arrow')}</a>
      <div class="trust-row"><span>${icon('check')}Independent trusteeship</span><span>${icon('check')}Governance-led decisions</span><span>${icon('check')}Transparent reporting</span></div>`
    document.getElementById('slide-dots').innerHTML = heroSlides().map((_, i) => `<button type="button" class="${i === index ? 'active' : ''}" aria-label="Go to slide ${i + 1}" aria-current="${i === index ? 'true' : 'false'}" data-action="slide-to" data-index="${i}"></button>`).join('')
  }

  function renderMiniDeck() {
    const stage = document.getElementById('mini-stage')
    stage.innerHTML = services.map((service, index) => `<a class="mini-card" data-mini-index="${index}" href="${serviceURL(service)}"><div class="media-frame">${image(service.image)}<span class="mini-scrim"></span></div><strong>${service.title}</strong>${icon('up')}</a>`).join('')
    document.getElementById('mini-dots').innerHTML = services.map((service, index) => `<button type="button" aria-label="Show ${service.title}" class="${index === activeMini ? 'active' : ''}" data-action="mini-to" data-index="${index}"></button>`).join('')
    updateMiniDeck()
  }

  let activeMini = 0
  function updateMiniDeck() {
    document.querySelectorAll('.mini-card').forEach((card, index) => {
      let distance = index - activeMini
      if (distance > services.length / 2) distance -= services.length
      if (distance < -services.length / 2) distance += services.length
      const hidden = Math.abs(distance) > 2
      card.style.transform = `translateX(${distance * 34}%) translateZ(${-Math.abs(distance) * 150}px) rotateY(${-distance * 30}deg) scale(${1 - Math.abs(distance) * .12})`
      card.style.opacity = hidden ? '0' : String(1 - Math.abs(distance) * .3)
      card.style.zIndex = String(20 - Math.abs(distance))
      card.style.pointerEvents = hidden ? 'none' : 'auto'
      card.tabIndex = hidden ? -1 : 0
      card.setAttribute('aria-hidden', String(hidden))
    })
    document.querySelectorAll('#mini-dots button').forEach((dot, i) => dot.classList.toggle('active', i === activeMini))
  }

  function assurance() {
    const items = [
      ['shield', 'Independent trusteeship', 'Fiduciary duty held apart from any product provider.'],
      ['scale', 'Governance-led', 'Documented decisions that stand up to scrutiny.'],
      ['file', 'Transparent reporting', 'Plain-language reporting for boards and members.'],
      ['pin', 'Kenya-focused', 'Built around local regulation and market practice.'],
    ]
    return `<section class="assurance"><div class="wrap assurance-grid">${items.map(([symbol, title, text], i) => `<article class="reveal" style="--delay:${i * .08}s"><span class="icon-tile">${icon(symbol)}</span><div><h2>${title}</h2><p>${text}</p></div></article>`).join('')}</div></section>`
  }

  function introSection() {
    return `<section class="section intro-section"><div class="glow glow-right"></div><div class="wrap split-grid"><div class="image-tilt reveal"><div class="tilt-frame">${image(brand.images.boardroom, 'Boardroom prepared for a trustee meeting in Nairobi')}<div class="image-scrim"></div><div class="image-caption"><span>Established 2026</span><strong>Nairobi, Kenya</strong></div></div></div><div class="reveal">${heading('Who we are', 'A trustee that answers to the people whose money it holds.', 'Fanaka Noblewealth Advisory is an independent corporate trustee and wealth advisory firm. We hold retirement benefits schemes, collective investment schemes, family trusts and employee benefit trusts in trust — and we govern them the way a fiduciary should: deliberately, transparently and on the record.')}<ul class="commitment-list"><li>${icon('check')}<span>Independent by design — we do not sell products or take commissions from providers.</span></li><li>${icon('check')}<span>Governance you can evidence — minutes, policies and decisions documented as they happen.</span></li><li>${icon('check')}<span>Reporting in plain language — trustees, members and regulators each get what they need.</span></li></ul><a class="button button-outline" href="about.html">More about Fanaka Noblewealth ${icon('arrow')}</a></div></div></section>`
  }

  function serviceCard(service, index) {
    return `<a class="service-card reveal" style="--delay:${(index % 3) * .08}s" href="${serviceURL(service)}"><div class="service-card-image media-frame">${image(service.image)}<span class="image-scrim"></span><span class="service-icon">${icon(service.icon)}</span><span class="number">${String(index + 1).padStart(2, '0')}</span><span class="animated-rule"></span></div><div class="service-card-body"><h3>${service.title}</h3><p class="service-tagline">${service.tagline}</p><p class="service-summary">${service.summary}</p><ul>${service.highlights.slice(0, 3).map((text) => `<li>${text}</li>`).join('')}</ul><span class="text-link">Explore this service ${icon('up')}</span></div></a>`
  }

  function servicesShowcase() {
    return `<section class="section section-muted"><div class="wrap"><div class="glow glow-center"></div>${heading('What we do', 'Seven disciplines, one standard of stewardship.', 'Revolve the vault to explore each mandate. From pension schemes to family trusts, employee share plans and board-level training — every service is delivered under the same governance discipline.')}<div class="carousel-wrap reveal"><div class="carousel-stage" id="service-carousel"></div><div class="carousel-controls"><button type="button" class="round-control" data-action="carousel-prev" aria-label="Previous service">${icon('left')}</button><div class="carousel-dots" id="carousel-dots"></div><button type="button" class="round-control" data-action="carousel-next" aria-label="Next service">${icon('right')}</button></div><p class="carousel-caption" id="carousel-caption"></p></div><div class="center-action"><a class="button button-outline" href="services.html">View all services in detail ${icon('arrow')}</a></div></div></section>`
  }

  function renderCarousel() {
    document.getElementById('service-carousel').innerHTML = services.map((service, index) => `<article class="carousel-card" data-card-index="${index}"><div class="carousel-card-image media-frame">${image(service.image)}<span class="image-scrim"></span><span class="service-icon">${icon(service.icon)}</span><span class="number">${String(index + 1).padStart(2, '0')}</span><span class="animated-rule"></span></div><div class="carousel-card-body"><h3>${service.title}</h3><p class="service-tagline">${service.tagline}</p><p class="service-summary">${service.summary}</p><a class="text-link" data-card-link href="${serviceURL(service)}">${icon('up')}<span></span></a><button class="card-select" type="button" data-action="card-to" data-index="${index}" aria-label="Bring ${service.title} to front"></button></div></article>`).join('')
    document.getElementById('carousel-dots').innerHTML = services.map((service, i) => `<button type="button" aria-label="Show ${service.title}" data-action="carousel-to" data-index="${i}"></button>`).join('')
    updateCarousel()
  }

  function updateCarousel() {
    document.querySelectorAll('.carousel-card').forEach((card, index) => {
      let distance = index - activeCard
      if (distance > services.length / 2) distance -= services.length
      if (distance < -services.length / 2) distance += services.length
      const hidden = Math.abs(distance) > 2
      card.style.transform = `translateX(-50%) translateX(${distance * 50}%) translateZ(${-Math.abs(distance) * 200}px) rotateY(${-distance * 32}deg) scale(${1 - Math.abs(distance) * .08})`
      card.style.opacity = hidden ? '0' : String(1 - Math.abs(distance) * .24)
      card.style.zIndex = String(40 - Math.abs(distance))
      card.style.pointerEvents = hidden ? 'none' : 'auto'
      card.style.filter = index === activeCard ? 'none' : 'saturate(.7) brightness(.82)'
      card.tabIndex = hidden ? -1 : 0
      const isActive = index === activeCard
      card.classList.toggle('is-active', isActive)
      card.querySelector('[data-card-link]').innerHTML = `${icon(isActive ? 'up' : 'arrow')}<span>${isActive ? 'Explore this service' : 'Bring to front'}</span>`
      card.querySelector('[data-card-link]').tabIndex = isActive && !hidden ? 0 : -1
      card.querySelector('[data-card-link]').style.pointerEvents = isActive ? 'auto' : 'none'
      card.querySelector('.card-select').hidden = isActive
      card.setAttribute('aria-hidden', String(hidden))
    })
    document.querySelectorAll('#carousel-dots button').forEach((dot, i) => dot.classList.toggle('active', i === activeCard))
    const caption = document.getElementById('carousel-caption')
    if (caption) caption.textContent = `Swipe or drag to revolve · 0${activeCard + 1} / 07`
  }

  function valuesSection() {
    const values = [
      ['Integrity', 'We do what we said, in writing and on time.'],
      ['Stewardship', 'Other people’s money is a duty, never a resource.'],
      ['Independence', 'Advice that is not for sale to any product provider.'],
      ['Foresight', 'Governance built for the next generation, not the next quarter.'],
    ]
    return `<section class="section values-section"><div class="glow glow-left"></div><div class="wrap values-grid"><div>${heading('Why boards appoint us', 'The values are not decoration. They are the mandate.', 'A trustee holds other people’s futures. That only works if the institution holding them is independent, evidenced and unhurried — four principles, applied to every scheme, fund and family we serve.')}<dl class="values-list">${values.map(([name, description], i) => `<div class="value-card reveal" style="--delay:${i * .08}s"><dt><span>${String(i + 1).padStart(2, '0')}</span>${name}</dt><dd>${description}</dd></div>`).join('')}</dl></div><div class="cube-wrap reveal"><div class="cube-scene"><div class="cube">${values.map(([name, text]) => `<div class="cube-face"><span>Fanaka Noblewealth</span><strong>${name}</strong><p>${text}</p></div>`).join('')}</div></div><p class="cube-caption">The rotating vault · principles in motion</p></div></div></section>`
  }

  function processSection() {
    return `<section class="section section-muted"><div class="wrap">${heading('How we begin', 'Four steps from first meeting to first report.', 'Appointing a trustee should feel like transferring weight, not creating work. This is the path every new mandate follows.')}<div class="process-grid">${data.approach.map(([num, title, text], i) => `<article class="process-card tilt-card reveal" style="--delay:${i * .09}s"><span>${num}</span><h3>${title}</h3><p>${text}</p><div class="gold-rule"></div></article>`).join('')}</div></div></section>`
  }

  function trainingBand() {
    const topics = ['Trustee governance & fiduciary duty', 'Retirement benefits compliance', 'Investment fundamentals & oversight', 'Reading fund reports and valuations', 'Risk, controls & fraud prevention', 'Board and committee development']
    return `<section class="training-band"><div class="wrap training-grid"><div class="reveal"><div class="eyebrow eyebrow-left dark-eyebrow"><span class="hairline"></span><span>Financial Trainings</span></div><h2>Train the people who hold the money.</h2><p class="training-intro">Trustees, board members and finance teams make decisions worth millions in a single sitting. Our programmes build the judgement to make those decisions well — practical, Kenya-focused, and taught around the realities of the rooms you actually sit in.</p><ul class="topic-grid">${topics.map((topic) => `<li>${icon('check')}${topic}</li>`).join('')}</ul><a class="button button-ink" href="${serviceURL(services[6])}">Explore our training programmes ${icon('arrow')}</a></div><div class="training-image reveal">${image(brand.images.training, 'A training room prepared for a governance programme')}<span class="image-scrim"></span></div></div></section>`
  }

  function wordBand() {
    return `<section class="word-band"><div class="word-background">${image(brand.images.reception, '', 'word-image')}<span class="word-vignette"></span><span class="light-sweep"></span><span class="grain"></span></div><div class="wrap word-content">${eyebrow('Our promise · in motion')}<div class="word-stage"><h2 id="word-line"></h2></div><p>An independent trustee, an evidenced mandate and a long horizon — that is the whole idea. The words above are the four promises we are measured against.</p><div class="word-progress" id="word-progress"></div></div></section>`
  }

  function renderWord(index) {
    const phrases = [['Fanaka', 'Noblewealth Advisory'], ['Wealth', 'held in trust'], ['Governance', 'on the record'], ['Legacy', 'built to outlast']]
    document.getElementById('word-line').innerHTML = `<span>${phrases[index][0]}</span> ${phrases[index][1]}`
    document.querySelectorAll('.word-progress button').forEach((button, i) => button.classList.toggle('active', i === index))
  }

  function cta(label, title, text) {
    return `<section class="cta-section"><div class="glow"></div><div class="wrap cta-inner reveal">${heading(label, title, text)}<a class="button button-gold button-large" href="contact.html">Book a consultation ${icon('arrow')}</a></div></section>`
  }

  function homePage() {
    return `${hero()}${assurance()}${introSection()}${servicesShowcase()}${valuesSection()}${processSection()}${trainingBand()}${wordBand()}${cta('Start a mandate', 'Which of these should we take on for you?', 'Choose the service closest to your situation and book a working session. If it is not the right fit, we will tell you that too.')}`
  }

  function pageHero(imageURL, eyebrowText, title, highlighted, body, minHeight = '70svh') {
    return `<section class="page-hero" style="--hero-height:${minHeight}">${image(imageURL, '', 'hero-image')}<span class="page-hero-scrim"></span><div class="wrap page-hero-content reveal">${eyebrow(eyebrowText, 'eyebrow-left')}<h1>${title} <span class="gold-text">${highlighted}</span></h1><p>${body}</p></div></section>`
  }

  function aboutPage() {
    const pillars = [
      ['shield', 'Our mission', 'Hold what people cannot hold themselves.', 'To provide independent, evidenced trusteeship and advisory services that protect the funds, benefits and legacies Kenyan employers, members and families have entrusted to us.'],
      ['compass', 'Our vision', 'The trustee of choice for institutions that take governance seriously.', 'A market where every scheme, fund and family trust is governed by people who document their decisions, report plainly and answer for the outcome.'],
      ['hands', 'Our promise', 'No surprises, no gaps, no quiet decisions.', 'You will always know what we are doing and why. Every mandate, every fee and every decision is agreed in writing before it is acted on.'],
    ]
    const expectations = ['A named relationship lead, not a call centre.', 'A written mandate before any fee is charged.', 'Minutes, policies and decisions documented as they happen.', 'Reporting your trustees, members and auditors can each use.', 'Independent advice — we take no provider commissions.', 'Reviews on a rhythm you can plan your year around.']
    return `${pageHero(brand.images.boardroom, 'About Fanaka Noblewealth', 'Built to hold what', 'matters.', 'Fanaka Noblewealth Advisory is an independent corporate trustee and wealth advisory firm in Nairobi. We exist because the funds, benefits and legacies that people depend on deserve a custodian whose only interest is doing the job properly.', '78svh')}
    <section class="section"><div class="glow glow-left"></div><div class="wrap split-grid"><div class="reveal">${heading('Our story', 'Founded on a simple observation.', 'Money held in trust is often administered at a distance from the people it belongs to. Decisions are taken quietly, records are thin, and members find out how well their scheme was run only when they retire.')}<div class="prose"><p>We started Fanaka Noblewealth Advisory to work the other way round: governance that is visible, documentation that is real, and reporting written for the person reading it — whether that is a trustee board, a member who has just turned 55, or a family deciding how to pass on a business.</p><p>Our practice covers retirement benefits schemes, collective investment schemes, family trusts, employee share ownership plans, employee benefits trusts, governance and investment advisory, and practical training for the boards and committees making those decisions. The disciplines differ; the standard does not.</p></div><div class="stats"><article><strong>07</strong><span>Service disciplines</span></article><article><strong>01</strong><span>Relationship lead per mandate</span></article><article><strong>100%</strong><span>Independent, commission-free</span></article></div></div><div class="image-tilt reveal"><div class="tilt-frame">${image(brand.images.stillLife, 'Brass scales, a gold pen and a bound ledger on a desk')}<span class="image-scrim"></span></div></div></div></section>
    <section class="section section-muted"><div class="wrap">${heading('What drives us', 'Mission, vision and the promise we make.', 'Hover, focus or tap each panel to turn it over.')}<div class="pillar-grid">${pillars.map(([symbol, title, summary, detail], index) => `<button type="button" class="flip-card reveal" style="--delay:${index * .08}s" aria-pressed="false"><span class="flip-inner"><span class="flip-face"><span class="icon-tile">${icon(symbol)}</span><span><strong>${title}</strong><span class="pillar-summary">${summary}</span><span class="flip-hint">Turn to read</span></span></span><span class="flip-face flip-back"><span class="flip-back-title">${title}</span><span>${detail}</span></span></span></button>`).join('')}</div></div></section>
    ${wordBand()}
    <section class="section"><div class="wrap expect-grid"><div class="reveal">${heading('Working with us', 'What you can expect from the first meeting.', 'Trusteeship is a relationship built on evidence. These six things are true on every mandate we accept.')}<a class="button button-gold button-large" href="contact.html">Book a consultation ${icon('arrow')}</a></div><div class="expect-cards">${expectations.map((text, i) => `<article class="expect-card reveal" style="--delay:${i * .06}s"><span>${String(i + 1).padStart(2, '0')}</span>${text}</article>`).join('')}</div></div></section>
    ${cta('Our approach', 'Independent stewardship, built around the people it serves.', 'Bring us the questions your board, members or family needs answered. We will start with the evidence and tell you plainly what comes next.')}`
  }

  function servicesPage() {
    return `${pageHero(brand.images.tower, 'Corporate Trustee Services', 'Seven disciplines, one', 'standard.', 'From pension schemes and pooled funds to family trusts, employee share plans and board-level training — each mandate is delivered under the same governance discipline, documentation and reporting rhythm.')}
    <section class="section"><div class="glow glow-center"></div><div class="wrap"><div class="service-grid">${services.map(serviceCard).join('')}<article class="service-help"><h2>Not sure which mandate you need?</h2><p>Tell us what you hold in trust and we will map it to the right structure in one conversation — no obligation, no fee.</p><a class="button button-gold" href="contact.html">Talk to an adviser ${icon('arrow')}</a></article></div></div></section>
    <section class="section section-muted"><div class="wrap">${heading('The method', 'How a mandate is taken on.', 'Every appointment follows the same four steps, so nothing is assumed and nothing is left undocumented.')}<div class="process-grid">${data.approach.map(([num, title, text]) => `<article class="process-card"><span>${num}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div><div class="check-strip">${['Independent trusteeship', 'Written mandate and fees', 'Documented governance', 'Member-ready reporting'].map((label) => `<span>${icon('check')}${label}</span>`).join('')}</div></div></section>
    ${cta('Start a mandate', 'Which of these should we take on for you?', 'Choose the service closest to your situation and book a working session. If it is not the right fit, we will tell you that too.')}`
  }

  function servicePage() {
    const service = selectedService()
    if (!service) return `<section class="not-found wrap"><span class="footer-tag">404 · Page not found</span><h1>This mandate is not in the record.</h1><p>Choose one of our listed services or contact the office for guidance.</p><a class="button button-gold" href="services.html">View all services ${icon('arrow')}</a></section>`
    const index = services.indexOf(service)
    const related = [1, 2, 3].map((step) => services[(index + step) % services.length])
    return `<section class="detail-hero"><div class="glow glow-center"></div><div class="wrap detail-wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="services.html">Services</a><span>/</span><span>${service.title}</span></nav><div class="detail-grid"><div class="reveal"><div class="service-kicker"><span class="service-icon">${icon(service.icon)}</span><span>Service ${String(index + 1).padStart(2, '0')}</span></div><h1>${service.title}</h1><p class="detail-tagline">${service.tagline}</p><p class="detail-summary">${service.summary}</p><a class="button button-gold button-large" href="contact.html?service=${service.slug}">Book a consultation ${icon('arrow')}</a><a class="button button-outline button-large" href="services.html">${icon('left')} All services</a></div><aside class="glass-panel detail-highlights"><span class="footer-tag">What the mandate covers</span><ul>${service.highlights.map((text) => `<li>${icon('check')}${text}</li>`).join('')}</ul></aside></div></div></section>
    <section class="section section-muted"><div class="wrap detail-grid"><div><h2 class="subheading">How we deliver it</h2><div class="prose">${service.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div><div class="approach-detail">${data.approach.map(([num, title, text]) => `<article><span>${num}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div><aside class="glass-panel audience-panel"><h2>Who this is for</h2><div class="tag-list">${service.audience.map((item) => `<span>${item}</span>`).join('')}</div><div class="gold-rule"></div><p>Not certain this is the right mandate for your situation? Book a working session and we will map your options in one conversation.</p><a class="button button-outline" href="contact.html?service=${service.slug}">Book a consultation ${icon('arrow')}</a></aside></div></section>
    <section class="section"><div class="wrap"><div class="related-title"><h2>Other services</h2><a href="services.html">View all seven ${icon('arrow')}</a></div><div class="related-grid">${related.map((item) => `<a class="related-card" href="${serviceURL(item)}"><span class="service-icon">${icon(item.icon)}</span><h3>${item.title}</h3><p>${item.tagline}</p><span class="text-link">Read more ${icon('up')}</span></a>`).join('')}</div></div></section>
    ${cta(service.title, 'Ready to put this mandate in place?', 'Book a working session and we will tell you exactly how this service would run for your scheme, trust, fund or board — including what it costs.')}`
  }

  function contactPage() {
    const prefill = getServiceBySlug(new URLSearchParams(location.search).get('service'))
    return `<section class="contact-hero"><div class="glow glow-center"></div><div class="wrap reveal"><div class="eyebrow eyebrow-left"><span class="hairline"></span><span>Book a consultation</span></div><h1>Start the <span class="gold-text">conversation.</span></h1><p>Tell us what you hold in trust — a scheme, a fund, a family business or a board that needs its people trained. Three short steps and a relationship lead takes it from there.</p><div class="contact-pills"><a href="${brand.phoneHref}">${icon('phone')}${brand.phone}</a><a href="mailto:${brand.email}">${icon('mail')}${brand.email}</a></div></div></section>
    <section class="section booking-section"><div class="wrap booking-grid"><div class="booking-card glass-panel" id="booking-card" data-prefill="${prefill ? prefill.slug : ''}"></div><aside class="contact-aside">
      <section class="glass-panel aside-card"><h2>Our office</h2><p class="aside-line">${icon('pin')}<span>${brand.address.join('<br>')}</span></p><p class="aside-line">${icon('phone')}<a href="${brand.phoneHref}">${brand.phone}</a></p><p class="aside-line">${icon('mail')}<a href="mailto:${brand.email}">${brand.email}</a></p></section>
      <section class="glass-panel aside-card"><h2>Opening hours</h2>${brand.hours.map(([days, hours]) => `<p class="hours-row">${icon('clock')}<span>${days}</span><span>${hours}</span></p>`).join('')}</section>
      <section class="glass-panel aside-card"><h2>What happens after you book</h2><ol class="after-booking"><li>${icon('users')}<span><strong>A relationship lead is assigned</strong><small>The person who will handle your mandate calls to confirm the session.</small></span></li><li>${icon('shield')}<span><strong>We prepare before we meet</strong><small>You receive a short agenda and the documents we would like to see.</small></span></li><li>${icon('clock')}<span><strong>You leave with a written view</strong><small>Within days of the session you get our structure, duties, reporting and fees in writing.</small></span></li></ol></section>
    </aside></div></section>
    <section class="section section-muted"><div class="wrap">${heading('Prefer to talk first?', 'Call the office and speak to a person.', 'If your question is about a live scheme, a benefit payment or an urgent governance matter, call us directly — we will tell you straight away whether it is something we can help with.')}<div class="contact-actions"><a class="button button-gold button-large" href="${brand.phoneHref}">${icon('phone')} Call our office</a><a class="button button-outline button-large" href="mailto:${brand.email}">${icon('mail')} Email our office</a></div></div><div class="marquee"><div>${['Nairobi', 'Westlands', 'Kenya-wide mandates', 'Mon – Fri 8am – 5pm', 'One working day response', 'Nairobi', 'Westlands', 'Kenya-wide mandates', 'Mon – Fri 8am – 5pm', 'One working day response'].map((text) => `<span>${text}<i></i></span>`).join('')}</div></div></section>`
  }

  function getServiceBySlug(slug) {
    return services.find((service) => service.slug === slug)
  }

  function renderBookingForm() {
    const root = document.getElementById('booking-card')
    if (!root) return
    const state = {
      step: 0,
      service: root.dataset.prefill || '',
      date: '',
      time: '',
      mode: '',
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
      sending: false,
    }
    const slots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']
    const modes = [['At our offices', 'shield'], ['Virtual meeting', 'video'], ['Phone call', 'clock']]

    function field(label, name, type, placeholder, full = false) {
      const value = escapeHTML(state[name])
      return `<label class="field ${full ? 'field-full' : ''}"><span>${label}</span><input name="${name}" type="${type}" value="${value}" placeholder="${placeholder}" ${name === 'date' ? `min="${new Date().toISOString().slice(0, 10)}"` : ''} autocomplete="${name === 'name' ? 'name' : name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'off'}" aria-describedby="error-${name}"><small class="field-error" id="error-${name}"></small></label>`
    }

    function render() {
      const currentService = getServiceBySlug(state.service)
      root.innerHTML = `<ol class="booking-progress" aria-label="Booking steps">${['Service', 'Date & time', 'Your details'].map((name, i) => `<li class="${i <= state.step ? 'reached' : ''}"><span></span><small>${name}</small></li>`).join('')}</ol>
      <div class="booking-step" id="booking-step">
        ${state.step === 0 ? `<h2>What do you need us for?</h2><p>Choose the closest match — we can adjust it in the meeting.</p><div class="service-options">${services.map((service) => `<button type="button" class="service-option ${service.slug === state.service ? 'selected' : ''}" aria-pressed="${service.slug === state.service}" data-book-service="${service.slug}">${icon(service.icon)}<span>${service.title}</span></button>`).join('')}</div><small class="field-error" id="error-service"></small>` : ''}
        ${state.step === 1 ? `<h2>When suits you?</h2><p>Requests are confirmed by a relationship lead within one working day.</p>${field('Preferred date', 'date', 'date', '')}<fieldset class="booking-fieldset"><legend>Time slot</legend><div class="time-options">${slots.map((time) => `<button type="button" class="${state.time === time ? 'selected' : ''}" aria-pressed="${state.time === time}" data-book-time="${time}">${time}</button>`).join('')}</div><small class="field-error" id="error-time"></small></fieldset><fieldset class="booking-fieldset"><legend>How would you like to meet?</legend><div class="mode-options">${modes.map(([name, symbol]) => `<button type="button" class="${state.mode === name ? 'selected' : ''}" aria-pressed="${state.mode === name}" data-book-mode="${name}">${icon(symbol)}${name}</button>`).join('')}</div><small class="field-error" id="error-mode"></small></fieldset>` : ''}
        ${state.step === 2 ? `<h2>Where do we reach you?</h2><p>We only use these details to arrange and prepare for your session.</p><div class="fields-grid">${field('Full name', 'name', 'text', 'e.g. Wanjiru Kamau', true)}${field('Email address', 'email', 'email', 'you@company.co.ke')}${field('Phone number', 'phone', 'tel', '+254 7xx xxx xxx')}<label class="field field-full"><span>Anything we should know? (optional)</span><textarea name="message" rows="4" placeholder="Tell us about the scheme, trust, fund or board you have in mind.">${escapeHTML(state.message)}</textarea></label></div><label class="consent"><input name="consent" type="checkbox" ${state.consent ? 'checked' : ''}><span>I am happy for Fanaka Noblewealth Advisory to contact me about this request.</span></label><small class="field-error" id="error-consent"></small><div class="request-summary"><span class="footer-tag">Your request</span><p>${icon('calendar')}${currentService ? currentService.title : 'Service not selected'}</p><p>${icon('clock')}${state.date && state.time ? `${escapeHTML(state.date)} · ${escapeHTML(state.time)}` : 'Date not selected · Time not selected'}</p><p>${icon('shield')}${escapeHTML(state.mode || 'Meeting mode not selected')}</p></div>` : ''}
      </div>
      <div class="booking-error" id="booking-error" role="alert" hidden></div>
      <div class="booking-footer">${state.step === 0 ? '<span>Two minutes, three steps, no obligation.</span>' : '<button type="button" class="button button-outline" data-book-back>' + icon('left') + ' Back</button>'}<button type="button" class="button button-gold" data-book-next ${state.sending ? 'disabled' : ''}>${state.sending ? 'Preparing request…' : state.step < 2 ? 'Continue' + icon('arrow') : 'Prepare email request' + icon('mail')}</button></div>`
      bindForm()
    }

    function bindForm() {
      root.querySelectorAll('[data-book-service]').forEach((control) => control.addEventListener('click', () => { state.service = control.dataset.bookService; render() }))
      root.querySelectorAll('[data-book-time]').forEach((control) => control.addEventListener('click', () => { state.time = control.dataset.bookTime; render() }))
      root.querySelectorAll('[data-book-mode]').forEach((control) => control.addEventListener('click', () => { state.mode = control.dataset.bookMode; render() }))
      root.querySelectorAll('input[name], textarea[name]').forEach((control) => control.addEventListener('input', () => {
        const key = control.name
        state[key] = control.type === 'checkbox' ? control.checked : control.value
        const error = root.querySelector(`#error-${key}`)
        if (error) error.textContent = ''
      }))
      root.querySelector('[data-book-back]')?.addEventListener('click', () => { state.step -= 1; render() })
      root.querySelector('[data-book-next]')?.addEventListener('click', () => {
        if (!validateStep()) return
        if (state.step < 2) { state.step += 1; render() } else prepareEmail()
      })
    }

    function showError(key, text) {
      const node = root.querySelector(`#error-${key}`)
      if (node) node.textContent = text
      return Boolean(text)
    }

    function validateStep() {
      let invalid = false
      if (state.step === 0) invalid = showError('service', state.service ? '' : 'Please choose the service you need.') || invalid
      if (state.step === 1) {
        invalid = showError('date', !state.date ? 'Choose a preferred date.' : state.date < new Date().toISOString().slice(0, 10) ? 'Choose today or a future date.' : '') || invalid
        invalid = showError('time', state.time ? '' : 'Choose a time slot.') || invalid
        invalid = showError('mode', state.mode ? '' : 'Tell us how you would like to meet.') || invalid
      }
      if (state.step === 2) {
        invalid = showError('name', state.name.trim() ? '' : 'Please enter your full name.') || invalid
        invalid = showError('email', !state.email.trim() ? 'Please enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()) ? '' : 'That email address does not look complete.') || invalid
        invalid = showError('phone', state.phone.trim() ? '' : 'Please enter a phone number we can reach you on.') || invalid
        invalid = showError('consent', state.consent ? '' : 'Please confirm we may contact you about this request.') || invalid
      }
      return !invalid
    }

    function prepareEmail() {
      const service = getServiceBySlug(state.service)
      const subject = encodeURIComponent(`Consultation request — ${service ? service.title : 'General enquiry'}`)
      const body = encodeURIComponent([
        'Please arrange a consultation with me.',
        '',
        `Name: ${state.name.trim()}`,
        `Email: ${state.email.trim()}`,
        `Phone: ${state.phone.trim()}`,
        `Service: ${service ? service.title : 'General enquiry'}`,
        `Preferred date: ${state.date}`,
        `Preferred time: ${state.time}`,
        `Meeting mode: ${state.mode}`,
        `Message: ${state.message.trim() || 'None provided'}`,
      ].join('\n'))
      state.sending = true
      render()
      window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`
      window.setTimeout(() => {
        root.innerHTML = `<section class="booking-success"><span class="success-mark">${icon('check')}</span><h2>Your request is ready to send.</h2><p>An email draft should open with the details you provided. Your request is <strong>not submitted or confirmed</strong> until you send that email. If your email app does not open, write to <a href="mailto:${brand.email}">${brand.email}</a>.</p><dl><div><dt>Service</dt><dd>${service ? service.title : 'General enquiry'}</dd></div><div><dt>Preferred time</dt><dd>${escapeHTML(state.date)} · ${escapeHTML(state.time)}</dd></div><div><dt>Meeting mode</dt><dd>${escapeHTML(state.mode)}</dd></div><div><dt>Contact</dt><dd>${escapeHTML(state.name)} · ${escapeHTML(state.email)}</dd></div></dl><div class="success-actions"><a class="button button-gold" href="mailto:${brand.email}">Email our office ${icon('arrow')}</a><button class="button button-outline" type="button" data-book-reset>Submit another request</button></div></section>`
        root.querySelector('[data-book-reset]').addEventListener('click', () => {
          state.step = 0; state.service = ''; state.date = ''; state.time = ''; state.mode = ''; state.name = ''; state.email = ''; state.phone = ''; state.message = ''; state.consent = false; state.sending = false
          render()
        })
      }, 500)
    }

    render()
  }

  function legalPage() {
    const documentData = data.legal[document.body.dataset.document]
    if (!documentData) return notFound()
    const legal = [['Privacy Policy', 'privacy-policy.html'], ['Terms of Use', 'terms.html'], ['Cookie Policy', 'cookie-policy.html'], ['Regulatory Disclaimer', 'disclaimer.html']]
    return `<article class="legal-page"><div class="glow glow-center"></div><div class="wrap legal-wrap"><div class="reveal"><span class="footer-tag">Legal</span><h1>${documentData.title}</h1><p class="legal-intro">${documentData.intro}</p><p class="updated">Last updated ${documentData.updated}</p></div><div class="gold-rule"></div>${documentData.sections.map(([title, paragraphs, bullets]) => `<section class="legal-section reveal"><h2>${title}</h2>${paragraphs.map((text) => `<p>${text}</p>`).join('')}${bullets ? `<ul>${bullets.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}</section>`).join('')}<div class="gold-rule legal-close-rule"></div><div class="legal-contact"><p>Questions about this page? Write to <a href="mailto:${brand.email}">${brand.email}</a>.</p><a class="button button-outline" href="contact.html">${icon('mail')} Contact our office</a></div><div class="other-docs"><h2>Other documents</h2><div>${legal.filter(([, href]) => href !== location.pathname.split('/').pop()).map(([title, href]) => `<a href="${href}">${title}</a>`).join('')}</div></div></div></article>`
  }

  function notFound() {
    return `<section class="not-found wrap"><span class="footer-tag">404 · Page not found</span><h1>This page is not in the record.</h1><p>The page may have moved or the address may be incorrect.</p><a class="button button-gold" href="index.html">Return home ${icon('arrow')}</a></section>`
  }

  function initParticles() {
    const canvas = document.querySelector('.particles')
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let width = 0
    let height = 0
    let frame
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const scale = Math.min(devicePixelRatio || 1, 2)
      width = rect.width; height = rect.height
      canvas.width = width * scale; canvas.height = height * scale
      ctx.setTransform(scale, 0, 0, scale, 0, 0)
      particles = Array.from({ length: width < 640 ? 20 : 46 }, () => ({ x: Math.random() * width, y: Math.random() * height, r: .5 + Math.random() * 1.6, vx: (Math.random() - .5) * .14, vy: -(Math.random() * .26 + .07), alpha: .12 + Math.random() * .45 }))
    }
    const paint = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        particle.x += particle.vx; particle.y += particle.vy
        if (particle.y < -20) particle.y = height + 20
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.r * 7)
        glow.addColorStop(0, `rgba(236,210,131,${particle.alpha})`); glow.addColorStop(1, 'rgba(236,210,131,0)')
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(particle.x, particle.y, particle.r * 7, 0, Math.PI * 2); ctx.fill()
      })
      frame = requestAnimationFrame(paint)
    }
    resize(); paint()
    window.addEventListener('resize', resize)
    window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true })
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('in-view')); return }
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); currentObserver.unobserve(entry.target) }
    }), { threshold: .12 })
    items.forEach((item) => observer.observe(item))
  }

  function initScrollProgress() {
    const progress = document.createElement('div')
    progress.className = 'scroll-progress'
    progress.setAttribute('aria-hidden', 'true')
    document.body.append(progress)
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  }

  function initFlipCards() {
    document.querySelectorAll('.flip-card').forEach((card) => {
      const flip = (value) => {
        card.classList.toggle('is-flipped', value)
        card.setAttribute('aria-pressed', String(value))
      }
      card.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') flip(true) })
      card.addEventListener('pointerleave', (event) => { if (event.pointerType === 'mouse') flip(false) })
      card.addEventListener('click', (event) => {
        if (event.detail === 0 || event.pointerType === 'touch') flip(!card.classList.contains('is-flipped'))
      })
    })
  }

  function initializePage() {
    renderHeader()
    renderFooter()
    const main = document.getElementById('main-content')
    const templates = {
      home: homePage,
      about: aboutPage,
      services: servicesPage,
      service: servicePage,
      contact: contactPage,
      legal: legalPage,
    }
    main.innerHTML = (templates[page] || notFound)()
    if (page === 'service') {
      const selected = selectedService()
      if (selected) document.title = `${selected.title} | Fanaka Noblewealth Advisory`
      else document.title = 'Service not found | Fanaka Noblewealth Advisory'
    }
    if (page === 'home') {
      activeSlide = 0; activeCard = 0; activeMini = 0
      renderHeroSlide(activeSlide); renderMiniDeck(); renderCarousel(); renderWord(activeWord)
      sliderTimer = window.setInterval(() => { activeSlide = (activeSlide + 1) % heroSlides().length; renderHeroSlide(activeSlide) }, 8200)
      miniTimer = window.setInterval(() => { activeMini = (activeMini + 1) % services.length; updateMiniDeck() }, 3800)
      cardTimer = window.setInterval(() => { activeCard = (activeCard + 1) % services.length; updateCarousel() }, 5600)
      wordTimer = window.setInterval(() => { activeWord = (activeWord + 1) % 4; renderWord(activeWord) }, 3400)
      document.getElementById('word-progress').innerHTML = Array.from({ length: 4 }, (_, i) => `<button type="button" aria-label="Play line ${i + 1}" data-action="word-to" data-index="${i}"></button>`).join('')
      renderWord(activeWord)
      initParticles()
    }
    if (page === 'contact') renderBookingForm()
    initReveal()
    initFlipCards()
    initScrollProgress()
  }

  document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-action]')
    if (!control) return
    const index = Number(control.dataset.index)
    switch (control.dataset.action) {
      case 'slide-prev': activeSlide = (activeSlide + heroSlides().length - 1) % heroSlides().length; renderHeroSlide(activeSlide); break
      case 'slide-next': activeSlide = (activeSlide + 1) % heroSlides().length; renderHeroSlide(activeSlide); break
      case 'slide-to': activeSlide = index; renderHeroSlide(activeSlide); break
      case 'mini-to': activeMini = index; updateMiniDeck(); break
      case 'carousel-prev': activeCard = (activeCard + services.length - 1) % services.length; updateMiniDeck(); updateCarousel(); break
      case 'carousel-next': activeCard = (activeCard + 1) % services.length; updateMiniDeck(); updateCarousel(); break
      case 'carousel-to':
      case 'card-to': activeCard = index; updateMiniDeck(); updateCarousel(); break
      case 'word-to': activeWord = index; renderWord(index); break
    }
  })

  initializePage()
})()
