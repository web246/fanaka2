import { ArrowRight, Mail } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { legalLinks, site } from '@/data/site'
import { cookiePolicy, disclaimer, privacyPolicy, terms } from '@/data/legal'
import { GoldButton, Reveal } from '@/components/Shared'

const documents = {
  '/privacy-policy': privacyPolicy,
  '/terms': terms,
  '/cookie-policy': cookiePolicy,
  '/disclaimer': disclaimer,
}

export default function Legal() {
  const { pathname } = useLocation()
  const doc = documents[pathname]
  if (!doc) return null
  const otherLinks = legalLinks.filter((link) => link.to !== pathname)
  return (
    <article className="relative bg-obsidian pb-28 pt-36">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(75%_100%_at_50%_0%,rgba(26,58,95,0.55),transparent)]" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal><p className="font-heading text-[10px] uppercase tracking-[0.42em] text-gold">Legal</p><h1 className="mt-6 font-display text-[40px] leading-[1.06] text-cream sm:text-[56px]">{doc.title}</h1><p className="mt-7 text-[17px] leading-relaxed text-cream/75">{doc.intro}</p><p className="mt-6 font-heading text-[10px] uppercase tracking-[0.3em] text-cream/45">Last updated {doc.updated}</p></Reveal>
        <div className="gold-hairline mt-10 h-px" />
        {doc.sections.map((section, index) => <Reveal key={section.heading} delay={index * 0.03} className="mt-12"><h2 className="font-display text-[26px] leading-snug text-cream sm:text-[30px]">{section.heading}</h2><div className="mt-4 space-y-4 text-[16.5px] leading-relaxed text-cream/75">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.bullets && <ul className="mt-5 space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-[16px] leading-relaxed text-cream/75"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{bullet}</li>)}</ul>}</Reveal>)}
        <div className="gold-hairline mt-16 h-px" />
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-[14px] text-cream/70">Questions about this page? Write to <a className="font-semibold text-gold hover:text-gold-light" href={`mailto:${site.email}`}>{site.email}</a>.</p><GoldButton to="/contact" variant="outline" icon={Mail}>Contact our office</GoldButton></div>
        <div className="mt-12"><h2 className="font-display text-[24px] text-cream">Other documents</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">{otherLinks.map((link) => <Link key={link.to} to={link.to} className="text-[15px] text-cream/70 hover:text-gold">{link.label}</Link>)}</div></div>
      </div>
    </article>
  )
}
