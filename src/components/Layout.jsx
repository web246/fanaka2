import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Link, NavLink, Outlet, useLocation, useNavigationType } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { services } from '@/data/services'
import { legalLinks, navLinks, site } from '@/data/site'
import { GoldButton, Image } from '@/components/Shared'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <Link to="/" aria-label="Fanaka Noblewealth Advisory home" className="flex items-center">
      <Image src={site.logoUrl} alt="Fanaka Noblewealth Advisory" fittingType="fit" className="h-12 w-44 object-left" loading="eager" />
    </Link>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 border-b transition-all duration-500', scrolled || menuOpen ? 'glass-nav border-gold/15' : 'border-transparent')}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8" aria-label="Main navigation">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <li key={item.to} className="relative" onMouseEnter={() => item.mega && setMegaOpen(true)} onMouseLeave={() => item.mega && setMegaOpen(false)}>
              <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => cn('flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors duration-300', isActive ? 'text-gold' : 'text-cream/80 hover:text-gold')}>
                {item.label}{item.mega && <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', megaOpen && 'rotate-180')} />}
              </NavLink>
              {item.mega && (
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, rotateX: -10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -10, rotateX: -6 }}
                      transition={{ duration: 0.3 }}
                      className="p-1000 absolute left-1/2 top-full z-50 w-[660px] -translate-x-1/2 pt-4"
                    >
                      <div className="glass-panel rounded-2xl p-6 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
                        <p className="mb-4 font-heading text-[10px] uppercase tracking-[0.4em] text-gold">Corporate Trustee Services</p>
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((service) => {
                            const Icon = service.icon
                            return <Link key={service.slug} to={`/services/${service.slug}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-cream/85 transition-colors duration-300 hover:bg-gold/10 hover:text-cream"><Icon className="h-4 w-4 shrink-0 text-gold" />{service.title}</Link>
                          })}
                        </div>
                        <Link to="/services" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 py-3 text-[13px] font-medium text-gold transition-colors duration-300 hover:bg-gold/10">View all services <ArrowRight className="h-3.5 w-3.5" /></Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden lg:block"><GoldButton to="/contact" size="sm">Book a consultation</GoldButton></div>
        <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 text-cream lg:hidden">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="fixed inset-x-0 top-20 z-40 h-[calc(100vh-5rem)] overflow-y-auto border-t border-gold/15 bg-obsidian/97 px-6 pb-16 pt-8 backdrop-blur-xl lg:hidden">
            <ul>
              {navLinks.map((item, index) => <motion.li key={item.to} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}><NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => cn('block border-b border-cream/10 py-4 font-display text-2xl', isActive ? 'text-gold' : 'text-cream')}>{item.label}</NavLink></motion.li>)}
            </ul>
            <p className="mb-2 mt-7 font-heading text-[10px] uppercase tracking-[0.36em] text-gold">Our services</p>
            <div className="grid gap-1">{services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`} className="block rounded-xl py-2.5 text-[15px] text-cream/80 transition-colors hover:text-gold">{service.title}</Link>)}</div>
            <GoldButton to="/contact" size="lg" icon={ArrowRight} className="mt-8 w-full">Book a consultation</GoldButton>
            <p className="mt-7 text-[14px] text-cream/70"><a href={`mailto:${site.email}`}>{site.email}</a><br /><a href={site.phoneHref}>{site.phoneDisplay}</a><br />{site.addressLines.join(', ')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-obsidian">
      <div aria-hidden="true" className="pointer-events-none absolute -top-44 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-lapis/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-cream/65">Independent corporate trustee and wealth advisory — holding retirement benefits, investments, trusts and employee benefits in trust, with governance that stands up to scrutiny.</p>
          <p className="mt-5 font-heading text-[10px] uppercase tracking-[0.4em] text-gold">{site.tagline}</p>
        </div>
        <div>
          <FooterLabel>Services</FooterLabel>
          <ul className="mt-5 space-y-3">{services.map((service) => <li key={service.slug}><Link className="text-[14px] text-cream/65 transition-colors hover:text-gold" to={`/services/${service.slug}`}>{service.title}</Link></li>)}</ul>
        </div>
        <div>
          <FooterLabel>Company</FooterLabel>
          <ul className="mt-5 space-y-3">{[...navLinks.filter((link) => link.to !== '/'), ...legalLinks].map((link) => <li key={link.to}><Link className="text-[14px] text-cream/65 transition-colors hover:text-gold" to={link.to}>{link.label}</Link></li>)}</ul>
        </div>
        <div>
          <FooterLabel>Visit or call</FooterLabel>
          <p className="mt-5 text-[14px] leading-relaxed text-cream/65">{site.addressLines.map((line) => <span key={line} className="block">{line}</span>)}</p>
          <a href={site.phoneHref} className="mt-4 block text-[14px] text-cream/75 hover:text-gold">{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`} className="mt-2 block text-[14px] text-cream/75 hover:text-gold">{site.email}</a>
        </div>
      </div>
      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[12px] text-cream/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Fanaka Noblewealth Advisory. All rights reserved.</span>
          <span>Nairobi, Kenya · Independent by design.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterLabel({ children }) {
  return <h3 className="font-heading text-[10px] uppercase tracking-[0.38em] text-gold">{children}</h3>
}

function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return
    if (location.hash) {
      const timeout = window.setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
      return () => window.clearTimeout(timeout)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location, navigationType])

  return null
}

export default function Layout() {
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-obsidian text-cream">
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="gradient-gold fixed inset-x-0 top-0 z-[60] h-[2px] origin-left" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] overflow-hidden opacity-70 mix-blend-screen">
        <div className="drift-slow absolute -left-40 top-[10%] h-[36rem] w-[36rem] rounded-full bg-lapis/25 blur-[140px]" />
        <div className="drift-slower absolute -right-44 top-[55%] h-[32rem] w-[32rem] rounded-full bg-gold/[0.09] blur-[150px]" />
      </div>
      <Navbar />
      <motion.main key={location.pathname} initial={{ opacity: 0, y: 26, rotateX: 5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'top center' }} className="relative z-10">
        <Outlet />
      </motion.main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
