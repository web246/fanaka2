import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { GoldButton } from '@/components/Shared'

export default function PageNotFound() {
  return <section className="flex min-h-[70vh] items-center justify-center px-5 pt-28 text-center"><div><p className="font-heading text-[11px] uppercase tracking-[0.4em] text-gold">404 · Page not found</p><h1 className="mt-5 font-display text-5xl text-cream">This page is not in the record.</h1><p className="mx-auto mt-5 max-w-xl text-cream/70">The page may have moved or the address may be incorrect.</p><div className="mt-8"><GoldButton to="/" icon={ArrowLeft}>Return home</GoldButton></div><Link className="sr-only" to="/services">Explore services</Link></div></section>
}
