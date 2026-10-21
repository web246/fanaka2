import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight,
  Compass, FileCheck2, GraduationCap, MapPin, Play, Scale, ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '@/data/site'
import { approach, services } from '@/data/services'
import { CtaSection, GoldButton, Image, Reveal, SectionHeading, TiltCard } from '@/components/Shared'
import { cn } from '@/lib/utils'

const heroSlides = [
  {
    eyebrow: 'Corporate Trustee · Nairobi, Kenya',
    lead: 'Wealth, governed with',
    highlight: 'noble intent.',
    body: 'Fanaka Noblewealth Advisory holds retirement benefits, investments, trusts and employee benefits in independent trust — with governance your board can stand behind and reporting your members can actually read.',
  },
  {
    eyebrow: 'Retirement Benefits & Employee Trusts',
    lead: 'Your people’s future, held',
    highlight: 'in trust.',
    body: 'Governance, compliance and steady oversight for pension schemes, gratuity funds, ESOPs and employee benefit trusts — so the promises made at recruitment are kept at the end of service.',
  },
  {
    eyebrow: 'Family Trusts & Succession',
    lead: 'Legacies that outlive',
    highlight: 'generations.',
    body: 'Structured family trusts, succession planning and ongoing trustee administration for families and businesses that have built something worth protecting.',
  },
  {
    eyebrow: 'Financial Trainings',
    lead: 'Capability your board can',
    highlight: 'stand on.',
    body: 'Practical, Kenya-focused training for trustees, boards and finance teams — fiduciary duty, investments, compliance and controls, taught around the decisions you actually make.',
  },
]

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    let particles = []
    let width = 0
    let height = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: width < 640 ? 20 : 46 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.6,
        vy: -(0.07 + Math.random() * 0.26),
        vx: (Math.random() - 0.5) * 0.14,
        alpha: 0.12 + Math.random() * 0.45,
      }))
    }
    const draw = () => {
      context.clearRect(0, 0, width, height)
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.y < -20) particle.y = height + 20
        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.r * 7)
        gradient.addColorStop(0, `rgba(236,210,131,${particle.alpha})`)
        gradient.addColorStop(1, 'rgba(236,210,131,0)')
        context.fillStyle = gradient
        context.beginPath()
        context.arc(particle.x, particle.y, particle.r * 7, 0, Math.PI * 2)
        context.fill()
      })
      frame = window.requestAnimationFrame(draw)
    }
    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}

function MiniServicesScroller() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % services.length), 3800)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <div className="w-[280px] lg:w-[320px]">
      <div className="mb-3 flex items-center gap-2.5"><span className="gold-hairline hairline-anim h-px w-6" /><span className="font-heading text-[9px] uppercase tracking-[0.36em] text-gold">Explore our services</span></div>
      <div className="p-1000 relative h-[152px] lg:h-[168px]">
        {services.map((service, index) => {
          let distance = index - active
          if (distance > services.length / 2) distance -= services.length
          if (distance < -services.length / 2) distance += services.length
          const hidden = Math.abs(distance) > 2
          return (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              aria-hidden={hidden}
              tabIndex={hidden ? -1 : 0}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-gold/25 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.95)] transition-colors duration-500 hover:border-gold/60"
              style={{
                transform: `translateX(${distance * 34}%) translateZ(${-Math.abs(distance) * 150}px) rotateY(${-distance * 30}deg) scale(${1 - Math.abs(distance) * 0.12})`,
                opacity: hidden ? 0 : 1 - Math.abs(distance) * 0.3,
                zIndex: 20 - Math.abs(distance),
                pointerEvents: hidden ? 'none' : 'auto',
                transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease, border-color 0.4s ease',
              }}
            >
              <div className="media-frame sheen absolute inset-0"><Image src={service.image} alt="" className="h-full w-full" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/5" /></div>
              <span className="absolute bottom-3.5 left-4 right-12 font-display text-[17px] leading-snug text-cream">{service.title}</span>
              <ArrowUpRight className="absolute bottom-4 right-4 h-4 w-4 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          )
        })}
      </div>
      <div className="mt-3.5 flex items-center gap-2.5">
        {services.map((service, index) => <button key={service.slug} type="button" aria-label={`Show ${service.title}`} aria-current={active === index ? 'true' : undefined} onClick={() => setActive(index)} className={cn('h-1 rounded-full transition-all duration-500', active === index ? 'w-7 bg-gold' : 'w-1 bg-cream/30 hover:bg-cream/60')} />)}
      </div>
      <p className="mt-2.5 text-[11.5px] text-cream/55">Tap a card to open that mandate.</p>
    </div>
  )
}

function HeroSlider() {
  const [active, setActive] = useState(0)
  const next = () => setActive((index) => (index + 1) % heroSlides.length)
  const previous = () => setActive((index) => (index - 1 + heroSlides.length) % heroSlides.length)
  useEffect(() => {
    const timer = window.setInterval(next, 8200)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <section className="relative isolate flex min-h-[100svh] items-start overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Image src={site.images.tower} alt="" loading="eager" className="kenburns absolute inset-0 h-full w-full" />
        <ParticleCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_10%,rgba(6,11,20,0.25)_0%,rgba(6,11,20,0.9)_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/60 to-obsidian" />
        <div className="pointer-events-none absolute -inset-y-24 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-3xl" style={{ animation: 'fanaka-sweep 15s ease-in-out infinite' }} />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>
      <div className="p-1000 relative mx-auto w-full max-w-7xl px-5 pb-10 pt-32 sm:px-8 sm:pt-36 md:pb-32">
        <div className="max-w-xl text-left lg:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, rotateX: 14, y: 30 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, rotateX: -10, y: -22 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="preserve-3d">
              <div className="mb-7 flex items-center gap-3"><span className="gold-hairline hairline-anim h-px w-10" /><span className="font-heading text-[10px] uppercase tracking-[0.36em] text-gold sm:text-[11px]">{heroSlides[active].eyebrow}</span></div>
              <h1 className="font-display text-[40px] leading-[1.04] text-cream sm:text-[56px] lg:text-[64px]">{heroSlides[active].lead} <span className="gradient-gold-text">{heroSlides[active].highlight}</span></h1>
              <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-cream/75 sm:text-[17.5px]">{heroSlides[active].body}</p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><GoldButton to="/contact" size="lg" icon={ArrowRight}>Book a consultation</GoldButton></div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                {['Independent trusteeship', 'Governance-led decisions', 'Transparent reporting'].map((item) => <span key={item} className="flex items-center gap-2 text-[13.5px] text-cream/70"><Check className="h-4 w-4 text-gold" />{item}</span>)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative z-10 mb-28 mt-12 md:absolute md:bottom-24 md:right-8 md:mb-0 md:mt-0 md:px-0 lg:right-12"><MiniServicesScroller /></div>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-start gap-5 px-5 sm:px-8">
        <button type="button" aria-label="Previous slide" onClick={previous} className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-cream transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex items-center gap-2.5">{heroSlides.map((slide, index) => <button type="button" key={slide.eyebrow} aria-label={`Go to slide ${index + 1}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)} className={cn('h-1.5 rounded-full transition-all duration-500', index === active ? 'w-10 bg-gold' : 'w-1.5 bg-cream/30 hover:bg-cream/60')} />)}</div>
        <button type="button" aria-label="Next slide" onClick={next} className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-cream transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </section>
  )
}

function AssuranceStrip() {
  const items = [
    [ShieldCheck, 'Independent trusteeship', 'Fiduciary duty held apart from any product provider.'],
    [Scale, 'Governance-led', 'Documented decisions that stand up to scrutiny.'],
    [FileCheck2, 'Transparent reporting', 'Plain-language reporting for boards and members.'],
    [MapPin, 'Kenya-focused', 'Built around local regulation and market practice.'],
  ]
  return <section className="relative border-b border-gold/15 bg-lapis-deep/40 py-14"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">{items.map(([Icon, title, text], index) => <Reveal key={title} delay={index * 0.08}><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-obsidian/60"><Icon className="h-5 w-5 text-gold" /></div><div><h3 className="font-display text-[19px] text-cream">{title}</h3><p className="mt-1.5 text-[14px] leading-relaxed text-cream/65">{text}</p></div></div></Reveal>)}</div></section>
}

function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-lapis/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="p-1000">
          <div className="preserve-3d relative"><div className="absolute -inset-4 rounded-[2rem] border border-gold/15" style={{ transform: 'translateZ(-60px)' }} /><div className="relative overflow-hidden rounded-[1.75rem] border border-gold/25 shadow-[0_60px_130px_-70px_rgba(212,175,55,0.75)]" style={{ transform: 'rotateY(-7deg) rotateX(3deg)' }}><Image src={site.images.boardroom} alt="Boardroom prepared for a trustee meeting in Nairobi" className="h-[300px] w-full sm:h-[430px]" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" /><div className="glass-panel absolute bottom-5 left-5 rounded-2xl px-5 py-4"><p className="font-heading text-[9.5px] uppercase tracking-[0.36em] text-gold">Established 2026</p><p className="mt-1 font-display text-[19px] text-cream">Nairobi, Kenya</p></div></div></div>
        </Reveal>
        <Reveal>
          <SectionHeading align="left" eyebrow="Who we are" title="A trustee that answers to the people whose money it holds." subtitle="Fanaka Noblewealth Advisory is an independent corporate trustee and wealth advisory firm. We hold retirement benefits schemes, collective investment schemes, family trusts and employee benefit trusts in trust — and we govern them the way a fiduciary should: deliberately, transparently and on the record." />
          <div className="mt-9 space-y-4">{['Independent by design — we do not sell products or take commissions from providers.', 'Governance you can evidence — minutes, policies and decisions documented as they happen.', 'Reporting in plain language — trustees, members and regulators each get what they need.'].map((text) => <p key={text} className="flex gap-3.5 text-[15.5px] leading-relaxed text-cream/75"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/40"><Check className="h-3.5 w-3.5 text-gold" /></span>{text}</p>)}</div>
          <div className="mt-10"><GoldButton to="/about" variant="outline" icon={ArrowRight}>More about Fanaka Noblewealth</GoldButton></div>
        </Reveal>
      </div>
    </section>
  )
}

function ServicesCarousel3D() {
  const [active, setActive] = useState(0)
  const touchStart = useRef(null)
  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % services.length), 5600)
    return () => window.clearInterval(timer)
  }, [])
  const go = (index) => setActive((index + services.length) % services.length)
  const startTouch = (event) => { touchStart.current = event.touches[0].clientX }
  const endTouch = (event) => {
    if (touchStart.current == null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 45) go(active + (delta < 0 ? 1 : -1))
    touchStart.current = null
  }
  return (
    <>
      <div className="p-1400 relative h-[540px] w-full overflow-hidden px-4 sm:h-[560px]" onTouchStart={startTouch} onTouchEnd={endTouch}>
        <div className="preserve-3d relative h-full w-full">
          {services.map((service, index) => {
            let distance = index - active
            if (distance > services.length / 2) distance -= services.length
            if (distance < -services.length / 2) distance += services.length
            const hidden = Math.abs(distance) > 2
            const isActive = index === active
            const Icon = service.icon
            const style = {
              transform: `translateX(-50%) translateX(${distance * 50}%) translateZ(${-Math.abs(distance) * 200}px) rotateY(${-distance * 32}deg) scale(${1 - Math.abs(distance) * 0.08})`,
              opacity: hidden ? 0 : 1 - Math.abs(distance) * 0.24,
              zIndex: 40 - Math.abs(distance),
              pointerEvents: hidden ? 'none' : 'auto',
              filter: isActive ? 'none' : 'saturate(0.7) brightness(0.82)',
              boxShadow: isActive ? '0 60px 120px -55px rgba(0,0,0,0.95), 0 0 80px -26px rgba(212,175,55,0.5)' : '0 50px 100px -55px rgba(0,0,0,0.95)',
            }
            const card = <><div className="media-frame sheen relative h-40 shrink-0"><Image src={service.image} alt="" className="h-full w-full" /><div className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-obsidian/50 to-transparent" /><div className="hairline-anim gold-hairline absolute inset-x-0 bottom-0 h-px" /><div className="absolute bottom-4 left-5 grid h-11 w-11 place-items-center rounded-2xl border border-gold/35 bg-obsidian/70 backdrop-blur-sm"><Icon className="h-5 w-5 text-gold" /></div><span className="absolute bottom-5 right-5 font-heading text-[11px] tracking-[0.3em] text-gold/80">{String(index + 1).padStart(2, '0')}</span></div><div className="flex flex-1 flex-col p-6"><h3 className="font-display text-[25px] leading-tight text-cream">{service.title}</h3><p className="mt-3 text-[14px] italic leading-relaxed text-gold/85">{service.tagline}</p><p className="mt-4 text-[14px] leading-relaxed text-cream/70">{service.summary}</p><span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-semibold text-gold">{isActive ? 'Explore this service' : 'Bring to front'} {isActive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}</span></div></>
            return isActive ? (
              <Link key={service.slug} to={`/services/${service.slug}`} aria-hidden={hidden} tabIndex={hidden ? -1 : 0} className="monolith glass-panel absolute left-1/2 top-0 flex h-full w-[300px] flex-col overflow-hidden rounded-3xl text-left sm:w-[346px]" style={style}>{card}</Link>
            ) : (
              <button key={service.slug} type="button" aria-label={`Bring ${service.title} to front`} aria-hidden={hidden} tabIndex={hidden ? -1 : 0} onClick={() => go(index)} className="monolith glass-panel absolute left-1/2 top-0 flex h-full w-[300px] flex-col overflow-hidden rounded-3xl text-left sm:w-[346px]" style={style}>{card}</button>
            )
          })}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6">
        <button type="button" aria-label="Previous service" onClick={() => go(active - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 text-cream transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"><ArrowLeft className="h-4 w-4" /></button>
        <div className="flex items-center gap-2.5">{services.map((service, index) => <button key={service.slug} type="button" aria-label={`Show ${service.title}`} aria-current={index === active ? 'true' : undefined} onClick={() => go(index)} className={cn('h-1.5 rounded-full transition-all duration-500', index === active ? 'w-9 bg-gold' : 'w-1.5 bg-cream/30 hover:bg-cream/60')} />)}</div>
        <button type="button" aria-label="Next service" onClick={() => go(active + 1)} className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 text-cream transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"><ArrowRight className="h-4 w-4" /></button>
      </div>
      <p className="mt-4 text-center font-heading text-[10px] uppercase tracking-[0.4em] text-cream/35">Swipe or drag to revolve · 0{active + 1} / 07</p>
    </>
  )
}

function ServicesShowcase() {
  return <section className="relative overflow-hidden bg-obsidian-soft py-24 sm:py-32"><div className="absolute left-1/2 top-24 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-lapis/20 blur-3xl" /><div className="relative mx-auto max-w-7xl px-5 sm:px-8"><Reveal><SectionHeading eyebrow="What we do" title="Seven disciplines, one standard of stewardship." subtitle="Revolve the vault to explore each mandate. From pension schemes to family trusts, employee share plans and board-level training — every service is delivered under the same governance discipline." /></Reveal><div className="mt-16"><ServicesCarousel3D /></div><div className="mt-12 flex justify-center"><GoldButton to="/services" variant="outline" icon={ArrowRight}>View all services in detail</GoldButton></div></div></section>
}

function ValuesCube() {
  const values = [
    ['Integrity', 'We do what we said, in writing and on time.'],
    ['Stewardship', 'Other people’s money is a duty, never a resource.'],
    ['Independence', 'Advice that is not for sale to any product provider.'],
    ['Foresight', 'Governance built for the next generation, not the next quarter.'],
  ]
  return (
    <section className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
      <div className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-gold/[0.07] blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <div><SectionHeading align="left" eyebrow="Why boards appoint us" title="The values are not decoration. They are the mandate." subtitle="A trustee holds other people’s futures. That only works if the institution holding them is independent, evidenced and unhurried — four principles, applied to every scheme, fund and family we serve." /><dl className="mt-10 grid gap-6 sm:grid-cols-2">{values.map(([title, text], index) => <Reveal key={title} delay={index * 0.08}><div className="glass-panel rounded-2xl p-6"><dt className="font-display text-[22px] text-cream"><span className="mr-3 font-heading text-[11px] tracking-[0.3em] text-gold">{`0${index + 1}`}</span>{title}</dt><dd className="mt-3 text-[14.5px] leading-relaxed text-cream/70">{text}</dd></div></Reveal>)}</dl></div>
        <Reveal className="p-1400"><div className="cube-scene flex items-center justify-center py-8"><div className="cube">{values.map(([title, text]) => <div key={title} className="cube-face"><span className="font-heading text-[10px] uppercase tracking-[0.4em] text-gold">Fanaka Noblewealth</span><strong className="font-display text-[34px] leading-none text-cream">{title}</strong><span className="mt-2 text-[13.5px] leading-relaxed text-cream/70">{text}</span></div>)}</div></div><p className="mt-8 text-center font-heading text-[10px] uppercase tracking-[0.4em] text-cream/35">The rotating vault · principles in motion</p></Reveal>
      </div>
    </section>
  )
}

function ProcessSection() {
  return <section className="relative overflow-hidden bg-obsidian-soft py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading eyebrow="How we begin" title="Four steps from first meeting to first report." subtitle="Appointing a trustee should feel like transferring weight, not creating work. This is the path every new mandate follows." /><div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">{approach.map((step, index) => <Reveal key={step.number} delay={index * 0.09} className="h-full"><TiltCard intensity={7} className="h-full"><div className="glass-panel relative flex h-full flex-col rounded-3xl p-7"><span className="font-heading text-[42px] leading-none text-gold/25">{step.number}</span><h3 className="mt-5 font-display text-[23px] text-cream">{step.title}</h3><p className="mt-3 text-[14.5px] leading-relaxed text-cream/70">{step.text}</p><div className="gold-hairline mt-6 h-px w-full" /></div></TiltCard></Reveal>)}</div></div></section>
}

function TrainingBand() {
  const topics = ['Trustee governance & fiduciary duty', 'Retirement benefits compliance', 'Investment fundamentals & oversight', 'Reading fund reports and valuations', 'Risk, controls & fraud prevention', 'Board and committee development']
  return (
    <section className="relative overflow-hidden bg-cream py-24 text-lapis-deep sm:py-32">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal><div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-lapis-deep/30" /><span className="font-heading text-[10.5px] uppercase tracking-[0.4em] text-lapis-deep/70">Financial Trainings</span></div><h2 className="font-display text-[34px] leading-[1.08] text-lapis-deep sm:text-[46px]">Train the people who hold the money.</h2><p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-lapis-deep/80">Trustees, board members and finance teams make decisions worth millions in a single sitting. Our programmes build the judgement to make those decisions well — practical, Kenya-focused, and taught around the realities of the rooms you actually sit in.</p><div className="mt-9 grid gap-3 sm:grid-cols-2">{topics.map((topic) => <p key={topic} className="flex gap-3 text-[15px] text-lapis-deep/85"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lapis-deep/10"><Check className="h-3 w-3" /></span>{topic}</p>)}</div><div className="mt-9"><GoldButton to="/services/financial-trainings" variant="ink" icon={ArrowRight}>Explore our training programmes</GoldButton></div></Reveal>
        <Reveal className="p-1000"><div className="relative overflow-hidden rounded-[1.75rem] border border-lapis-deep/15 shadow-[0_45px_100px_-45px_rgba(6,11,20,0.55)]" style={{ transform: 'rotateY(5deg) rotateX(2deg)' }}><Image src={site.images.training} alt="A training room prepared for a governance programme" className="h-[320px] w-full sm:h-[440px]" /><div className="absolute inset-0 bg-gradient-to-t from-lapis-deep/70 via-transparent to-transparent" /></div></Reveal>
      </div>
    </section>
  )
}

export function WordArtVideo() {
  const lines = [['Fanaka', 'Noblewealth Advisory'], ['Wealth', 'held in trust'], ['Governance', 'on the record'], ['Legacy', 'built to outlast']]
  const [active, setActive] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % lines.length), 3400)
    return () => window.clearInterval(timer)
  }, [lines.length])
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-obsidian">
      <Image src={site.images.reception} alt="" className="kenburns absolute inset-0 h-full w-full opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_50%,rgba(6,11,20,0.35)_0%,rgba(6,11,20,0.94)_75%)]" />
      <div className="pointer-events-none absolute -inset-y-24 left-0 w-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-3xl" style={{ animation: 'fanaka-sweep 17s ease-in-out infinite' }} />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="p-1400 relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
        <div className="mb-8 flex items-center justify-center gap-3"><span className="gold-hairline h-px w-10" /><span className="font-heading text-[10px] uppercase tracking-[0.4em] text-gold">Our promise · in motion</span><span className="gold-hairline h-px w-10" /></div>
        <div className="flex min-h-[220px] items-center justify-center sm:min-h-[260px]">
          <AnimatePresence mode="wait"><motion.h2 key={active} className="font-display text-[44px] leading-[1.05] sm:text-[74px] lg:text-[92px]" initial="hidden" animate="show" exit={{ opacity: 0, rotateX: -30, y: -20 }}><motion.span className="gradient-gold-text mr-3 inline-block" initial={{ opacity: 0, rotateX: 60, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>{lines[active][0]}</motion.span><motion.span className="inline-block text-cream/90" initial={{ opacity: 0, rotateX: 60, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>{lines[active][1]}</motion.span></motion.h2></AnimatePresence>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-[16.5px] leading-relaxed text-cream/70">An independent trustee, an evidenced mandate and a long horizon — that is the whole idea. The words above are the four promises we are measured against.</p>
        <div className="mx-auto mt-12 flex max-w-md items-center gap-3">{lines.map((line, index) => <button key={line[0]} type="button" aria-label={`Play line ${index + 1}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)} className={cn('h-1 flex-1 rounded-full transition-colors', index === active ? 'bg-gold' : 'bg-cream/20 hover:bg-cream/40')} />)}</div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AssuranceStrip />
      <IntroSection />
      <ServicesShowcase />
      <ValuesCube />
      <ProcessSection />
      <TrainingBand />
      <WordArtVideo />
      <CtaSection eyebrow="Start a mandate" title="Which of these should we take on for you?" text="Choose the service closest to your situation and book a working session. If it is not the right fit, we will tell you that too." />
    </>
  )
}
