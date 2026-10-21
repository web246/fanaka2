import { ArrowRight, Check, Compass, HeartHandshake, ShieldCheck } from 'lucide-react'
import { site } from '@/data/site'
import { CtaSection, FlipCard, GoldButton, Image, Reveal, SectionHeading } from '@/components/Shared'
import { WordArtVideo } from '@/pages/Home'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Our mission',
    summary: 'Hold what people cannot hold themselves.',
    detail: 'To provide independent, evidenced trusteeship and advisory services that protect the funds, benefits and legacies Kenyan employers, members and families have entrusted to us.',
  },
  {
    icon: Compass,
    title: 'Our vision',
    summary: 'The trustee of choice for institutions that take governance seriously.',
    detail: 'A market where every scheme, fund and family trust is governed by people who document their decisions, report plainly and answer for the outcome.',
  },
  {
    icon: HeartHandshake,
    title: 'Our promise',
    summary: 'No surprises, no gaps, no quiet decisions.',
    detail: 'You will always know what we are doing and why. Every mandate, every fee and every decision is agreed in writing before it is acted on.',
  },
]

const expectations = [
  'A named relationship lead, not a call centre.',
  'A written mandate before any fee is charged.',
  'Minutes, policies and decisions documented as they happen.',
  'Reporting your trustees, members and auditors can each use.',
  'Independent advice — we take no provider commissions.',
  'Reviews on a rhythm you can plan your year around.',
]

export default function About() {
  return (
    <>
      <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden">
        <Image src={site.images.boardroom} alt="" className="kenburns absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/50" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 sm:px-8">
          <Reveal>
            <Eyebrow>About Fanaka Noblewealth</Eyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-[42px] leading-[1.03] text-cream sm:text-[64px]">Built to hold what <span className="gradient-gold-text">matters.</span></h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-cream/75">Fanaka Noblewealth Advisory is an independent corporate trustee and wealth advisory firm in Nairobi. We exist because the funds, benefits and legacies that people depend on deserve a custodian whose only interest is doing the job properly.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
        <div className="absolute -left-32 top-16 h-96 w-96 rounded-full bg-lapis/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Our story" title="Founded on a simple observation." subtitle="Money held in trust is often administered at a distance from the people it belongs to. Decisions are taken quietly, records are thin, and members find out how well their scheme was run only when they retire." />
            <div className="mt-7 space-y-5 text-[16.5px] leading-relaxed text-cream/75">
              <p>We started Fanaka Noblewealth Advisory to work the other way round: governance that is visible, documentation that is real, and reporting written for the person reading it — whether that is a trustee board, a member who has just turned 55, or a family deciding how to pass on a business.</p>
              <p>Our practice covers retirement benefits schemes, collective investment schemes, family trusts, employee share ownership plans, employee benefits trusts, governance and investment advisory, and practical training for the boards and committees making those decisions. The disciplines differ; the standard does not.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">{[['07', 'Service disciplines'], ['01', 'Relationship lead per mandate'], ['100%', 'Independent, commission-free']].map(([number, text]) => <div key={number} className="glass-panel rounded-2xl p-5"><strong className="font-display text-[30px] leading-none text-gold">{number}</strong><p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-cream/60">{text}</p></div>)}</div>
          </div>
          <Reveal className="p-1000">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/25 shadow-[0_60px_130px_-70px_rgba(212,175,55,0.7)]" style={{ transform: 'rotateY(7deg) rotateX(2deg)' }}><Image src={site.images.stillLife} alt="Brass scales, a gold pen and a bound ledger on a desk" className="h-[330px] w-full sm:h-[460px]" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" /></div>
          </Reveal>
        </div>
      </section>

      <section className="bg-obsidian-soft py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="What drives us" title="Mission, vision and the promise we make." subtitle="Hover or tap each panel to turn it over." />
          <div className="mt-16 grid gap-7 md:grid-cols-3">
            {pillars.map(({ icon: Icon, ...pillar }, index) => <Reveal key={pillar.title} delay={index * 0.08}>
              <FlipCard heightClass="h-[360px]"
                front={<div className="glass-panel flex h-full flex-col justify-between rounded-3xl p-8"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/35 bg-obsidian/50"><Icon className="h-5 w-5 text-gold" /></span><div><h3 className="font-display text-[28px] text-cream">{pillar.title}</h3><p className="mt-3 text-[15px] leading-relaxed text-cream/70">{pillar.summary}</p><p className="mt-6 font-heading text-[10px] uppercase tracking-[0.3em] text-gold/70">Turn to read</p></div></div>}
                back={<div className="flex h-full flex-col justify-center rounded-3xl border border-gold/40 bg-gradient-to-br from-lapis/70 to-lapis-deep p-8"><p className="font-heading text-[11px] uppercase tracking-[0.34em] text-gold">{pillar.title}</p><p className="mt-5 text-[15.5px] leading-relaxed text-cream/90">{pillar.detail}</p></div>}
              />
            </Reveal>)}
          </div>
        </div>
      </section>

      <WordArtVideo />

      <section className="bg-obsidian py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal><SectionHeading align="left" eyebrow="Working with us" title="What you can expect from the first meeting." subtitle="Trusteeship is a relationship built on evidence. These six things are true on every mandate we accept." /><div className="mt-10"><GoldButton to="/contact" size="lg" icon={ArrowRight}>Book a consultation</GoldButton></div></Reveal>
          <div className="grid gap-4 sm:grid-cols-2">{expectations.map((text, index) => <Reveal key={text} delay={index * 0.06}><div className="glass-panel h-full rounded-2xl p-6 text-[15px] leading-relaxed text-cream/80"><span className="mb-3 block font-heading text-[11px] tracking-[0.3em] text-gold">{`0${index + 1}`}</span>{text}</div></Reveal>)}</div>
        </div>
      </section>
      <CtaSection eyebrow="Our approach" title="Independent stewardship, built around the people it serves." text="Bring us the questions your board, members or family needs answered. We will start with the evidence and tell you plainly what comes next." />
    </>
  )
}

function Eyebrow({ children }) {
  return <div className="flex items-center gap-3"><span className="gold-hairline h-px w-10" /><span className="font-heading text-[10px] uppercase tracking-[0.42em] text-gold">{children}</span></div>
}
