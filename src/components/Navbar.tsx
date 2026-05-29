'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Payment', href: '#payment' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-3 sm:py-4">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'glass rounded-full px-3 sm:px-6 py-1.5 sm:py-2' : ''
          }`}>
            <motion.a href="#home" whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shrink-0">
                <Image src="/zkzb.PNG" alt="Shaheen" width={40} height={40} className="object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg leading-none text-white text-safe" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.06em' }}>
                  Shaheen
                </h1>
                <p className="text-[10px] text-white/40 mono tracking-[0.2em] uppercase truncate">Assignments Limited</p>
              </div>
            </motion.a>

            <div className={`hidden md:flex items-center gap-1 px-4 sm:px-6 ${
              scrolled ? '' : 'glass rounded-full py-2'
            }`}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href}
                  className="px-3 sm:px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="status-tag">
                <span className="status-dot" />
                <span className="hidden lg:inline">System Online</span>
              </div>
              <a href="#payment" className="btn-lime text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5">
                Get Started <ArrowRight size={13} />
              </a>
            </div>

            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-full glass shrink-0">
              {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-4 top-20 z-50 glass rounded-2xl border border-white/10 overflow-hidden card-safe"
          >
            <div className="p-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}
                  className="px-4 py-3.5 rounded-xl text-white/80 font-medium hover:bg-white/5 transition-all text-sm">
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <a href="#payment" onClick={() => setIsOpen(false)} className="btn-lime text-sm mt-1 w-full">
                Get Started <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
