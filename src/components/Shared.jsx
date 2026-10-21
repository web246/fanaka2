import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const placeholder = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#14263a"/><stop offset="1" stop-color="#060b14"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><path d="M0 650 360 290l220 220 190-190 430 430v50H0z" fill="#1a3a5f" opacity=".5"/><circle cx="850" cy="180" r="100" fill="#d4af37" opacity=".08"/></svg>')}`

export function Image({ src, alt = '', className, fittingType = 'fill', ...props }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      src={failed ? placeholder : src}
      alt={alt}
      className={cn(fittingType === 'fit' ? 'object-contain' : 'object-cover', className)}
      onError={() => setFailed(true)}
      loading={props.loading || 'lazy'}
      {...props}
    />
  )
}

export function GoldButton({
  to,
  href,
  variant = 'gold',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-body font-semibold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
    {
      gold: 'btn-shine gradient-gold relative overflow-hidden text-[#0B1420] shadow-[0_20px_44px_-18px_rgba(212,175,55,0.85)] hover:shadow-[0_26px_54px_-16px_rgba(212,175,55,1)]',
      outline: 'border border-gold/50 text-cream hover:border-gold hover:bg-gold/10',
      ink: 'border border-lapis-deep/30 text-lapis-deep hover:border-lapis-deep/60 hover:bg-lapis-deep/[0.06]',
      quiet: 'border border-cream/10 bg-lapis/25 text-cream hover:bg-lapis/45',
    }[variant],
    {
      sm: 'px-4 py-2 text-[13px]',
      md: 'px-6 py-3 text-[14px]',
      lg: 'px-8 py-4 text-[15px]',
    }[size],
    className,
  )
  const content = <><span>{children}</span>{Icon && <Icon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}</>

  if (href) {
    return <a href={href} className={classes} {...props}>{content}</a>
  }
  if (to) {
    return <Link to={to} className={classes} {...props}>{content}</Link>
  }
  return <button className={classes} {...props}>{content}</button>
}

export function Reveal({ children, className, delay = 0, y = 30, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', tone = 'dark', className }) {
  const left = align === 'left'
  const light = tone === 'light'
  return (
    <div className={cn('max-w-3xl', left ? 'text-left' : 'mx-auto text-center', className)}>
      {eyebrow && (
        <div className={cn('mb-5 flex items-center gap-3', !left && 'justify-center')}>
          <span className="gold-hairline h-px w-8" />
          <span className="font-heading text-[10.5px] font-medium uppercase tracking-[0.4em] text-gold">{eyebrow}</span>
          <span className="gold-hairline h-px w-8" />
        </div>
      )}
      <h2 className={cn('font-display text-[34px] leading-[1.08] sm:text-[44px] lg:text-[50px]', light ? 'text-lapis-deep' : 'text-cream')}>{title}</h2>
      {subtitle && <p className={cn('mt-6 text-[17px] leading-relaxed', light ? 'text-lapis-deep/80' : 'text-cream/70')}>{subtitle}</p>}
    </div>
  )
}

export function MarqueeBand({ items, className }) {
  const list = [...items, ...items]
  return (
    <div className={cn('relative overflow-hidden border-y border-gold/15 bg-lapis-deep/40 py-4', className)}>
      <div className="marquee-track items-center gap-12">
        {list.map((item, index) => <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-12 whitespace-nowrap font-heading text-[11px] uppercase tracking-[0.42em] text-cream/45">{item}<i className="h-1.5 w-1.5 rotate-45 bg-gold/70" /></span>)}
      </div>
    </div>
  )
}

export function TiltCard({ children, className, intensity = 8, glare = true }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, active: false })
  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    setTilt({ rx: (0.5 - py) * intensity * 2, ry: (px - 0.5) * intensity * 2, mx: px * 100, my: py * 100, active: true })
  }
  const reset = () => setTilt((state) => ({ ...state, rx: 0, ry: 0, active: false }))
  return (
    <div className={cn('p-1000', className)}>
      <div className="preserve-3d relative h-full w-full rounded-3xl transition-transform duration-200 ease-out" onMouseMove={move} onMouseLeave={reset} style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}>
        {children}
        {glare && <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200" style={{ opacity: tilt.active ? 0.6 : 0, background: `radial-gradient(460px circle at ${tilt.mx}% ${tilt.my}%, rgba(212,175,55,0.22), transparent 62%)` }} />}
      </div>
    </div>
  )
}

export function FlipCard({ front, back, className, heightClass = 'h-[330px]' }) {
  const [flipped, setFlipped] = useState(false)
  const toggle = () => setFlipped((value) => !value)
  return (
    <div
      className={cn('flip-scene', heightClass, className)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle() } }}
    >
      <div className={cn('flip-inner', flipped && 'is-flipped')}>
        <div className="flip-face h-full">{front}</div>
        <div className="flip-face flip-face-back">{back}</div>
      </div>
    </div>
  )
}

export function CtaSection({ eyebrow, title, text }) {
  return (
    <section className="relative overflow-hidden bg-obsidian-soft py-24 sm:py-32">
      <div aria-hidden="true" className="drift-slow pointer-events-none absolute -right-20 top-8 h-80 w-80 rounded-full bg-gold/[0.07] blur-3xl" />
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={text} />
        <div className="mt-9"><GoldButton to="/contact" size="lg" icon={ArrowRight}>Book a consultation</GoldButton></div>
      </Reveal>
    </section>
  )
}

export function ServiceLink({ service, className }) {
  return (
    <Link to={`/services/${service.slug}`} className={className}>
      <span>{service.title}</span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  )
}
