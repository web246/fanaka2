import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import Legal from '@/pages/Legal'
import PageNotFound from '@/pages/PageNotFound'
import ServiceDetail from '@/pages/ServiceDetail'
import Services from '@/pages/Services'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/cookie-policy" element={<Legal />} />
          <Route path="/disclaimer" element={<Legal />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
