import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getService, services } from '@/data/services'
import { CtaSection, GoldButton, Image, Reveal, TiltCard } from '@/components/Shared'
import PageNotFound from '@/pages/PageNotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <PageNotFound />
  const index = services.findIndex((item) => item.slug === slug)
  const related = [1, 2, 3].map((step) => services[(index + step) % services.length])
  const Icon = service.icon

  return (
    <>
      <section className="relative isolate overflow-hidden bg-obsidian pb-20 pt-36">
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(70%_100%_at_50%_0%,rgba(26,58,95,0.6),transparent)]" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px] text-cream/55"><Link to="/" className="hover:text-gold">Home</Link><span>/</span><Link to="/services" className="hover:text-gold">Services</Link><span>/</span><span className="text-cream/80">{service.title}</span></nav>
          <div className="mt-12 grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/40 bg-lapis-deep/60"><Icon className="h-6 w-6 text-gold" /></span><span className="font-heading text-[11px] uppercase tracking-[0.36em] text-gold">Service {String(index + 1).padStart(2, '0')}</span></div>
              <h1 className="mt-7 font-display text-[38px] leading-[1.05] text-cream sm:text-[56px]">{service.title}</h1>
              <p className="mt-5 font-display text-[22px] italic text-gold/90">{service.tagline}</p>
              <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-cream/75">{service.summary}</p>
              <div className="mt-10 flex flex-wrap gap-3"><GoldButton to={`/contact?service=${service.slug}`} size="lg" icon={ArrowRight}>Book a consultation</GoldButton><GoldButton to="/services" variant="outline" size="lg" icon={ArrowLeft}>All services</GoldButton></div>
            </Reveal>
            <Reveal delay={0.1} className="p-1000">
              <div className="glass-panel rounded-3xl p-7"><h2 className="font-heading text-[10.5px] uppercase tracking-[0.36em] text-gold">What the mandate covers</h2><ul className="mt-6 space-y-4">{service.highlights.map((item) => <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-cream/75"><Check className="mt-1 h-4 w-4 shrink-0 text-gold" />{item}</li>)}</ul><div className="gold-hairline mt-8 h-px" /><p className="mt-7 text-[14px] text-cream/60">A considered mandate starts with a clear scope and written responsibilities.</p></div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-obsidian-soft py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div><h2 className="font-display text-[30px] leading-tight text-cream sm:text-[38px]">How we deliver it</h2><div className="mt-6 space-y-5 text-[16.5px] leading-relaxed text-cream/75">{service.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="mt-12 grid gap-6 sm:grid-cols-2">{['Understand the mandate', 'Agree responsibilities', 'Govern and document', 'Review and report'].map((title, step) => <div key={title} className="border-t border-gold/20 pt-5"><span className="font-heading text-[11px] tracking-[0.3em] text-gold">{`0${step + 1}`}</span><h3 className="mt-3 font-display text-[21px] text-cream">{title}</h3><p className="mt-2 text-[14px] leading-relaxed text-cream/65">Clear, recorded work aligned with the duties of this mandate.</p></div>)}</div></div>
          <div className="glass-panel rounded-3xl p-7"><h2 className="font-display text-[25px] text-cream">Who this is for</h2><div className="mt-6 flex flex-wrap gap-2.5">{service.audience.map((item) => <span key={item} className="rounded-full border border-cream/15 bg-obsidian/50 px-4 py-2 text-[13.5px] text-cream/80">{item}</span>)}</div><div className="gold-hairline mt-9 h-px" /><p className="mt-8 text-[14.5px] leading-relaxed text-cream/70">Not certain this is the right mandate for your situation? Book a working session and we will map your options in one conversation.</p><div className="mt-6"><GoldButton to={`/contact?service=${service.slug}`} variant="outline" icon={ArrowRight}>Book a consultation</GoldButton></div></div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-obsidian py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-display text-[30px] text-cream">Other services</h2><Link to="/services" className="flex items-center gap-2 text-[14px] font-semibold text-gold hover:text-gold-light">View all seven <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">{related.map((item, i) => { const ItemIcon = item.icon; return <Reveal key={item.slug} delay={i * 0.08}><TiltCard intensity={6} className="h-full"><Link to={`/services/${item.slug}`} className="glass-panel group flex h-full flex-col rounded-3xl p-7 transition-colors duration-500 hover:border-gold/45"><span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/35 bg-obsidian/50"><ItemIcon className="h-5 w-5 text-gold" /></span><h3 className="mt-5 font-display text-[22px] leading-tight text-cream">{item.title}</h3><p className="mt-3 text-[14px] leading-relaxed text-cream/70">{item.tagline}</p><span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-semibold text-gold">Read more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link></TiltCard></Reveal> })}</div>
        </div>
      </section>
      <CtaSection eyebrow={service.title} title="Ready to put this mandate in place?" text="Book a working session and we will tell you exactly how this service would run for your scheme, trust, fund or board — including what it costs." />
    </>
  )
}
