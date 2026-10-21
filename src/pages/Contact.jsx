import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, Mail, MapPin,
  Phone, Send, ShieldCheck, Users, Video,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { approach, getService, services } from '@/data/services'
import { site } from '@/data/site'
import { CtaSection, GoldButton, MarqueeBand, Reveal, SectionHeading } from '@/components/Shared'
import { cn } from '@/lib/utils'

const TIME_SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']
const MODES = [
  { label: 'At our offices', icon: ShieldCheck },
  { label: 'Virtual meeting', icon: Video },
  { label: 'Phone call', icon: Clock },
]
const STEPS = ['Service', 'Date & time', 'Your details']
const inputClass = 'w-full rounded-2xl border border-cream/15 bg-obsidian/60 px-4 py-3.5 text-[15px] text-cream placeholder:text-cream/35 transition-colors duration-300 focus:border-gold/60 focus:outline-none'
const labelClass = 'mb-2 block font-heading text-[10px] uppercase tracking-[0.3em] text-gold/80'

function BookingForm() {
  const location = useLocation()
  const queryService = new URLSearchParams(location.search).get('service')
  const validPrefill = getService(queryService)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    service: validPrefill?.slug || '',
    preferred_date: '',
    preferred_time: '',
    meeting_mode: '',
    full_name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [draftPrepared, setDraftPrepared] = useState(false)
  const [failure, setFailure] = useState('')

  const selectedService = useMemo(() => getService(form.service), [form.service])
  const minDate = new Date().toISOString().slice(0, 10)
  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
    setFailure('')
  }
  const validate = () => {
    const next = {}
    if (step === 0 && !form.service) next.service = 'Please choose the service you need.'
    if (step === 1) {
      if (!form.preferred_date) next.preferred_date = 'Choose a preferred date.'
      else if (form.preferred_date < minDate) next.preferred_date = 'Choose today or a future date.'
      if (!form.preferred_time) next.preferred_time = 'Choose a time slot.'
      if (!form.meeting_mode) next.meeting_mode = 'Tell us how you would like to meet.'
    }
    if (step === 2) {
      if (!form.full_name.trim()) next.full_name = 'Please enter your full name.'
      if (!form.email.trim()) next.email = 'Please enter your email address.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'That email address does not look complete.'
      if (!form.phone.trim()) next.phone = 'Please enter a phone number we can reach you on.'
      if (!form.consent) next.consent = 'Please confirm we may contact you about this request.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const continueStep = () => {
    if (validate()) setStep((current) => current + 1)
  }
  const prepareRequest = () => {
    if (!validate()) return
    const details = [
      `Name: ${form.full_name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Service: ${selectedService?.title || 'General enquiry'}`,
      `Preferred date: ${form.preferred_date}`,
      `Preferred time: ${form.preferred_time}`,
      `Meeting mode: ${form.meeting_mode}`,
      `Message: ${form.message.trim() || 'None provided'}`,
    ].join('\n')
    const subject = encodeURIComponent(`Consultation request — ${selectedService?.title || 'General enquiry'}`)
    const body = encodeURIComponent(`Please arrange a consultation with me.\n\n${details}`)
    setFailure('')
    setDraftPrepared(true)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }
  const startAgain = () => {
    setForm({ service: '', preferred_date: '', preferred_time: '', meeting_mode: '', full_name: '', email: '', phone: '', message: '', consent: false })
    setErrors({})
    setDraftPrepared(false)
    setFailure('')
    setStep(0)
  }

  if (draftPrepared) {
    return (
      <motion.div initial={{ opacity: 0, rotateY: -14, y: 24 }} animate={{ opacity: 1, rotateY: 0, y: 0 }} transition={{ duration: 0.8 }} className="glass-panel rounded-3xl p-9 text-center sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-gold/10"><CheckCircle2 className="h-7 w-7 text-gold" /></span>
        <h2 className="mt-7 font-display text-[30px] text-cream">Your request is ready to send.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-cream/70">An email draft should open with the details you provided. Your request is not submitted or confirmed until you send that email. If your email app does not open, write to <a className="text-gold underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <dl className="mx-auto mt-9 max-w-md space-y-3 text-left">
          <SummaryRow label="Service" value={selectedService?.title || 'General enquiry'} />
          <SummaryRow label="Preferred time" value={`${form.preferred_date} · ${form.preferred_time}`} />
          <SummaryRow label="Meeting mode" value={form.meeting_mode} />
          <SummaryRow label="Contact" value={`${form.full_name} · ${form.email}`} />
        </dl>
        <div className="mt-9 flex flex-wrap justify-center gap-3"><GoldButton href={`mailto:${site.email}`} icon={ArrowRight}>Email our office</GoldButton><GoldButton onClick={startAgain} variant="outline">Submit another request</GoldButton></div>
      </motion.div>
    )
  }

  return (
    <div className="glass-panel rounded-3xl p-7 sm:p-10">
      <ol className="flex items-center gap-3" aria-label="Booking steps">
        {STEPS.map((label, index) => <li key={label} className="flex flex-1 flex-col gap-2"><span className={cn('h-1 rounded-full transition-all duration-500', index <= step ? 'bg-gold' : 'bg-cream/15')} /><span className={cn('font-heading text-[9.5px] uppercase tracking-[0.28em]', index <= step ? 'text-gold' : 'text-cream/40')}>{label}</span></li>)}
      </ol>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, rotateY: 12, x: 18 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="mt-9">
          {step === 0 && <>
            <h2 className="font-display text-[26px] text-cream">What do you need us for?</h2><p className="mt-2 text-[14.5px] text-cream/65">Choose the closest match — we can adjust it in the meeting.</p>
            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">{services.map((service) => { const Icon = service.icon; const selected = form.service === service.slug; return <button key={service.slug} type="button" aria-pressed={selected} onClick={() => update('service', service.slug)} className={cn('flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300', selected ? 'border-gold/70 bg-gold/10 shadow-[0_16px_40px_-22px_rgba(212,175,55,0.9)]' : 'border-cream/15 bg-obsidian/50 hover:border-gold/40 hover:bg-gold/[0.06]')}><Icon className={cn('h-4 w-4 shrink-0', selected ? 'text-gold' : 'text-cream/60')} /><span className={cn('text-[14px]', selected ? 'text-cream' : 'text-cream/80')}>{service.title}</span></button> })}</div>
            {errors.service && <p className="mt-3 text-[13.5px] text-red-300">{errors.service}</p>}
          </>}
          {step === 1 && <>
            <h2 className="font-display text-[26px] text-cream">When suits you?</h2><p className="mt-2 text-[14.5px] text-cream/65">Requests are confirmed by a relationship lead within one working day.</p>
            <div className="mt-7"><label className={labelClass} htmlFor="preferred-date">Preferred date</label><input id="preferred-date" type="date" min={minDate} value={form.preferred_date} onChange={(event) => update('preferred_date', event.target.value)} className={cn(inputClass, '[color-scheme:dark]')} />{errors.preferred_date && <p className="mt-2 text-[13.5px] text-red-300">{errors.preferred_date}</p>}</div>
            <fieldset className="mt-6"><legend className={labelClass}>Time slot</legend><div className="flex flex-wrap gap-2">{TIME_SLOTS.map((time) => <button key={time} type="button" aria-pressed={form.preferred_time === time} onClick={() => update('preferred_time', time)} className={cn('rounded-full border px-5 py-2.5 text-[14px] transition-colors', form.preferred_time === time ? 'border-gold/70 bg-gold/15 text-cream' : 'border-cream/15 text-cream/75 hover:border-gold/40 hover:text-cream')}>{time}</button>)}</div>{errors.preferred_time && <p className="mt-2 text-[13.5px] text-red-300">{errors.preferred_time}</p>}</fieldset>
            <fieldset className="mt-6"><legend className={labelClass}>How would you like to meet?</legend><div className="grid gap-2 sm:grid-cols-3">{MODES.map(({ label, icon: Icon }) => <button key={label} type="button" aria-pressed={form.meeting_mode === label} onClick={() => update('meeting_mode', label)} className={cn('flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-[13px] transition-colors', form.meeting_mode === label ? 'border-gold/70 bg-gold/10 text-cream' : 'border-cream/15 text-cream/75 hover:border-gold/40')}><Icon className="h-4 w-4 text-gold" />{label}</button>)}</div>{errors.meeting_mode && <p className="mt-2 text-[13.5px] text-red-300">{errors.meeting_mode}</p>}</fieldset>
          </>}
          {step === 2 && <>
            <h2 className="font-display text-[26px] text-cream">Where do we reach you?</h2><p className="mt-2 text-[14.5px] text-cream/65">We only use these details to arrange and prepare for your session.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field id="full-name" label="Full name" placeholder="e.g. Wanjiru Kamau" value={form.full_name} onChange={(value) => update('full_name', value)} error={errors.full_name} className="sm:col-span-2" />
              <Field id="email" label="Email address" type="email" placeholder="you@company.co.ke" value={form.email} onChange={(value) => update('email', value)} error={errors.email} />
              <Field id="phone" label="Phone number" type="tel" placeholder="+254 7xx xxx xxx" value={form.phone} onChange={(value) => update('phone', value)} error={errors.phone} />
              <div className="sm:col-span-2"><label className={labelClass} htmlFor="message">Anything we should know? (optional)</label><textarea id="message" rows={4} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Tell us about the scheme, trust, fund or board you have in mind." className={cn(inputClass, 'resize-none')} /></div>
            </div>
            <label className="mt-5 flex items-start gap-3 text-[13.5px] leading-relaxed text-cream/70"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} className="mt-1 h-4 w-4 accent-[#d4af37]" /><span>I am happy for Fanaka Noblewealth Advisory to contact me about this request.</span></label>
            {errors.consent && <p className="mt-2 text-[13.5px] text-red-300">{errors.consent}</p>}
            <div className="mt-8 rounded-2xl border border-gold/20 bg-obsidian/45 p-5"><h3 className="font-heading text-[10px] uppercase tracking-[0.32em] text-gold">Your request</h3><div className="mt-4 space-y-2.5 text-[13.5px] text-cream/70"><p className="flex gap-2.5"><CalendarDays className="h-4 w-4 text-gold" />{selectedService?.title || 'Service not selected'}</p><p className="flex gap-2.5"><Clock className="h-4 w-4 text-gold" />{form.preferred_date && form.preferred_time ? `${form.preferred_date} · ${form.preferred_time}` : 'Date not selected · Time not selected'}</p><p className="flex gap-2.5"><ShieldCheck className="h-4 w-4 text-gold" />{form.meeting_mode || 'Meeting mode not selected'}</p></div></div>
          </>}
        </motion.div>
      </AnimatePresence>
      {failure && <p role="alert" className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-[14px] text-red-200">{failure}</p>}
      <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step === 0 ? <p className="text-[13.5px] text-cream/50">Two minutes, three steps, no obligation.</p> : <GoldButton variant="outline" icon={ArrowLeft} onClick={() => { setErrors({}); setStep((current) => current - 1) }}>Back</GoldButton>}
        {step < 2 ? <GoldButton icon={ArrowRight} onClick={continueStep}>Continue</GoldButton> : <GoldButton icon={Send} onClick={prepareRequest}>Prepare email request</GoldButton>}
      </div>
    </div>
  )
}

function Field({ id, label, type = 'text', placeholder, value, onChange, error, className }) {
  return <div className={className}><label className={labelClass} htmlFor={id}>{label}</label><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={inputClass} />{error && <p className="mt-2 text-[13.5px] text-red-300">{error}</p>}</div>
}

function SummaryRow({ label, value }) {
  return <div className="flex justify-between gap-5 border-b border-cream/10 py-2.5 text-[13.5px]"><dt className="text-cream/55">{label}</dt><dd className="text-right text-cream/85">{value}</dd></div>
}

function ContactDetails() {
  return (
    <div className="space-y-5">
      <Reveal><div className="glass-panel rounded-3xl p-7"><h2 className="font-heading text-[10.5px] uppercase tracking-[0.36em] text-gold">Our office</h2><div className="mt-6 space-y-5 text-[15px] text-cream/80"><p className="flex gap-3.5"><MapPin className="h-5 w-5 shrink-0 text-gold" /><span>{site.addressLines.map((line) => <span key={line} className="block">{line}</span>)}</span></p><p className="flex gap-3.5"><Phone className="h-5 w-5 shrink-0 text-gold" /><a href={site.phoneHref}>{site.phoneDisplay}</a></p><p className="flex gap-3.5"><Mail className="h-5 w-5 shrink-0 text-gold" /><a href={`mailto:${site.email}`}>{site.email}</a></p></div></div></Reveal>
      <Reveal delay={0.06}><div className="glass-panel rounded-3xl p-7"><h2 className="font-heading text-[10.5px] uppercase tracking-[0.36em] text-gold">Opening hours</h2><div className="mt-6 space-y-4">{site.hours.map((row) => <p key={row.days} className="flex items-start justify-between gap-4 text-[14px]"><span className="flex gap-2.5 text-cream/80"><Clock className="mt-1 h-4 w-4 text-gold/70" />{row.days}</span><span className="text-right text-cream/60">{row.time}</span></p>)}</div></div></Reveal>
      <Reveal delay={0.12}><div className="glass-panel rounded-3xl p-7"><h2 className="font-heading text-[10.5px] uppercase tracking-[0.36em] text-gold">What happens after you book</h2><ol className="mt-6 space-y-5">{[[Users, 'A relationship lead is assigned', 'The person who will handle your mandate calls to confirm the session.'], [ShieldCheck, 'We prepare before we meet', 'You receive a short agenda and the documents we would like to see.'], [Clock, 'You leave with a written view', 'Within days of the session you get our structure, duties, reporting and fees in writing.']].map(([Icon, title, text]) => <li key={title} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-obsidian/50"><Icon className="h-4 w-4 text-gold" /></span><div><h3 className="font-display text-[18px] text-cream">{title}</h3><p className="mt-1 text-[13.5px] leading-relaxed text-cream/65">{text}</p></div></li>)}</ol></div></Reveal>
    </div>
  )
}

export default function Contact() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-obsidian pb-16 pt-36">
        <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(70%_100%_at_50%_0%,rgba(26,58,95,0.6),transparent)]" /><div className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8"><Reveal><div className="flex items-center gap-3"><span className="gold-hairline h-px w-10" /><span className="font-heading text-[10px] uppercase tracking-[0.42em] text-gold">Book a consultation</span></div><h1 className="mt-5 max-w-3xl font-display text-[42px] leading-[1.03] text-cream sm:text-[64px]">Start the <span className="gradient-gold-text">conversation.</span></h1><p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-cream/75">Tell us what you hold in trust — a scheme, a fund, a family business or a board that needs its people trained. Three short steps and a relationship lead takes it from there.</p><div className="mt-9 flex flex-wrap gap-3"><a href={site.phoneHref} className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 px-5 py-3 text-[14px] font-semibold text-cream transition-colors duration-300 hover:bg-gold/10"><Phone className="h-4 w-4 text-gold" />{site.phoneDisplay}</a><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 px-5 py-3 text-[14px] font-semibold text-cream transition-colors duration-300 hover:border-gold/40 hover:bg-gold/10"><Mail className="h-4 w-4 text-gold" />{site.email}</a></div></Reveal></div>
      </section>
      <section className="relative bg-obsidian pb-24 pt-10"><div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.3fr_0.7fr]"><Reveal><BookingForm /></Reveal><ContactDetails /></div></section>
      <section className="relative overflow-hidden bg-obsidian-soft py-20 sm:py-24"><div className="mx-auto max-w-5xl px-5 sm:px-8"><SectionHeading eyebrow="Prefer to talk first?" title="Call the office and speak to a person." subtitle="If your question is about a live scheme, a benefit payment or an urgent governance matter, call us directly — we will tell you straight away whether it is something we can help with." /><div className="mt-10 flex flex-wrap justify-center gap-3"><GoldButton href={site.phoneHref} size="lg" icon={Phone}>Call our office</GoldButton><GoldButton href={`mailto:${site.email}`} variant="outline" size="lg" icon={Mail}>Email our office</GoldButton></div></div><div className="mt-16"><MarqueeBand items={['Nairobi', 'Westlands', 'Kenya-wide mandates', 'Mon – Fri 8am – 5pm', 'One working day response']} /></div></section>
    </>
  )
}
