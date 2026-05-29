'use client'

import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BottomNav from '@/components/BottomNav'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import CompanyStaff from '@/components/sections/CompanyStaff'
import PaymentScreenshots from '@/components/sections/PaymentScreenshots'
import Packages from '@/components/sections/Packages'
import PaymentForm from '@/components/sections/PaymentForm'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import { checkTables } from '@/lib/supabase'

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) localStorage.setItem('referral_code', ref)
    checkTables()
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <div className="shell mx-2 sm:mx-5 my-2 sm:my-4 overflow-hidden">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '14px',
              padding: '14px 18px',
              fontSize: '14px',
              fontWeight: '500',
              background: '#0c0c0c',
              color: '#ebebeb',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
        <Navbar />
        <Hero />
        <Services />
        <CompanyStaff />
        <PaymentScreenshots />
        <Packages onSelect={(pkgId) => setSelectedPackage(pkgId)} />
        {selectedPackage && <PaymentForm key={selectedPackage} selectedPackage={selectedPackage} />}
        <FAQ />
        <Contact />
        <Footer />
        <BottomNav />
        <WhatsAppButton />
      </div>
    </main>
  )
}
