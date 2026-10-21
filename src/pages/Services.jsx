import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { approach, services } from '@/data/services'
import { site } from '@/data/site'
import { CtaSection, GoldButton, Image, Reveal, SectionHeading, TiltCard } from '@/components/Shared'

function ServiceCard({ service, index }) {
  const Icon = service.icon
  return (
    <TiltCard intensity={7} className="h-full">
      <Link to={`/services/${service.slug}`} className="glass-panel group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-500 hover:border-gold/45">
        <div className="media-frame sheen relative h-44 shrink-0">
          <Image src={service.image} alt="" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent" />
          <div className="hairline-anim gold-hairline absolute inset-x-0 bottom-0 h-px" />
          <span className="absolute bottom-4 left-5 grid h-11 w-11 place-items-center rounded-2xl border border-gold/35 bg-obsidian/70 backdrop-blur-sm"><Icon className="h-5 w-5 text-gold" /></span>
          <span className="absolute bottom-5 right-5 font-heading text-[11px] tracking-[0.3em] text-gold/80">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-[24px] leading-tight text-cream">{service.title}</h3>
          <p className="mt-3 text-[14px] italic leading-relaxed text-gold/85">{service.tagline}</p>
          <p className="mt-5 text-[14.5px] leading-relaxed text-cream/70">{service.summary}</p>
          <ul className="mt-6 space-y-2.5">{service.highlights.slice(0, 3).map((item) => <li key={item} className="flex gap-2.5 text-[13.5px] text-cream/65"><span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold/70" />{item}</li>)}</ul>
          <span className="mt-auto flex items-center gap-2 pt-7 text-[13px] font-semibold text-gold">Explore this service <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </TiltCard>
  )
}

export default function Services() {
  return (
    <>
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden">
        <Image src={site.images.tower} alt="" className="kenburns absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/45" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 sm:px-8">
          <Reveal>
            <div className="flex items-center gap-3"><span className="gold-hairline h-px w-10" /><span className="font-heading text-[10px] uppercase tracking-[0.42em] text-gold">Corporate Trustee Services</span></div>
            <h1 className="mt-5 max-w-3xl font-display text-[42px] leading-[1.03] text-cream sm:text-[64px]">Seven disciplines, one <span className="gradient-gold-text">standard.</span></h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-cream/75">From pension schemes and pooled funds to family trusts, employee share plans and board-level training — each mandate is delivered under the same governance discipline, documentation and reporting rhythm.</p>
          </Reveal>
        </div>
      </section>
      <section className="relative overflow-hidden bg-obsidian py-24 sm:py-28">
        <div className="absolute left-1/2 top-10 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-lapis/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => <Reveal key={service.slug} delay={(index % 3) * 0.08} className="h-full"><ServiceCard service={service} index={index} /></Reveal>)}
            <Reveal delay={0.1} className="h-full"><div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-gold/30 p-8"><h3 className="font-display text-[24px] text-cream">Not sure which mandate you need?</h3><p className="mt-4 text-[15px] leading-relaxed text-cream/70">Tell us what you hold in trust and we will map it to the right structure in one conversation — no obligation, no fee.</p><div className="mt-7"><GoldButton to="/contact" icon={ArrowRight}>Talk to an adviser</GoldButton></div></div></Reveal>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-obsidian-soft py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="The method" title="How a mandate is taken on." subtitle="Every appointment follows the same four steps, so nothing is assumed and nothing is left undocumented." />
          <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">{approach.map((step) => <div key={step.number} className="glass-panel flex h-full flex-col rounded-3xl p-7"><span className="font-heading text-[40px] leading-none text-gold/25">{step.number}</span><h3 className="mt-5 font-display text-[22px] text-cream">{step.title}</h3><p className="mt-3 text-[14.5px] leading-relaxed text-cream/70">{step.text}</p></div>)}</div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">{['Independent trusteeship', 'Written mandate and fees', 'Documented governance', 'Member-ready reporting'].map((item) => <span key={item} className="flex items-center gap-2 text-[14px] text-cream/70"><Check className="h-4 w-4 text-gold" />{item}</span>)}</div>
        </div>
      </section>
      <CtaSection eyebrow="Start a mandate" title="Which of these should we take on for you?" text="Choose the service closest to your situation and book a working session. If it is not the right fit, we will tell you that too." />
    </>
  )
}
