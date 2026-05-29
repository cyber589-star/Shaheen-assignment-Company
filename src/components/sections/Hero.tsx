'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star, Sparkles } from 'lucide-react'
import { companyInfo } from '@/data/content'
import Image from 'next/image'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0, end = 2000, dur = 2500
    const inc = end / (dur / 16)
    const t = setInterval(() => {
      start += inc
      if (start >= end) { setCount(end); clearInterval(t) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden bg-obsidian">
      <div className="glow-sphere top-[-10%] right-[-5%] w-[500px] h-[500px] bg-lime/10 pointer-events-none" />
      <div className="glow-sphere bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald/10 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-10 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-28 sm:pt-32 pb-20">
            <div className="lg:col-span-7 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center gap-3 mb-6 sm:mb-8"
              >
                <span className="status-dot" />
                <span className="mono text-[10px] text-white/40 tracking-[0.2em] uppercase truncate">AI-Powered Assignment Service</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-[6rem] font-bold text-white leading-[0.85] tracking-[-0.06em] mb-4 sm:mb-6 text-safe"
              >
                Shaheen{' '}
                <span className="gradient-text italic">Assignment</span>
                <br />
                Services
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-sm sm:text-base text-white/60 max-w-lg mb-5 sm:mb-8 leading-normal text-safe"
              >
                Professional academic writing trusted by 2000+ students. Expert help with assignments, thesis, and projects — delivered on time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10"
              >
                <a href="#packages" className="btn-lime text-xs sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Get Started <ArrowRight size={13} />
                </a>
                <a href="https://wa.me/923128268793" target="_blank" rel="noopener noreferrer"
                  className="btn-lime-outline text-xs sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Chat with HR
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center gap-3 sm:gap-5 flex-wrap"
              >
                <div className="flex -space-x-2">
                  {['A', 'S', 'F', 'M'].map((l, i) => (
                    <div key={i} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-lime border-2 border-obsidian flex items-center justify-center text-black text-[10px] sm:text-xs font-bold shrink-0">
                      {l}
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} className="text-yellow-400 fill-yellow-400 shrink-0" />)}
                  </div>
                  <p className="text-xs text-white/40 text-safe truncate">
                    Trusted by <span className="text-white font-semibold">{count}+</span> students
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 hidden lg:block relative h-[500px]"
            >
              <div className="absolute inset-0 glass rounded-[2.5rem] border-white/10 p-6 overflow-hidden card-safe">
                <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full bg-lime text-black text-xs font-bold shadow-lg shadow-lime/30 whitespace-nowrap z-10"
                  style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em' }}>
                  AI CURSOR
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-40 h-40">
                    <Image src="/zkzb.PNG" alt="Shaheen Logo" fill className="object-contain opacity-20" />
                  </div>
                </div>
                <div className="absolute top-8 right-8 w-56 sm:w-64 p-4 sm:p-5 rounded-2xl glass border-white/10 animate-float-card card-safe">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime/20 flex items-center justify-center shrink-0">
                      <Sparkles size={16} className="text-lime shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm text-safe truncate">Assignment Ready</p>
                      <p className="text-white/40 text-xs mono truncate">Quality checked</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-full rounded-full bg-lime" />
                  </div>
                </div>
                <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 w-48 sm:w-56 p-3 sm:p-4 rounded-2xl glass border-white/10 animate-float-card-2 card-safe">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald/20 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="shrink-0">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm text-safe truncate">Payment Secure</p>
                      <p className="text-white/40 text-xs mono truncate">EasyPaisa • JazzCash</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 w-52 sm:w-60 p-3 sm:p-4 rounded-2xl glass border-white/10 animate-float-card-3 card-safe">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime/20 flex items-center justify-center shrink-0">
                      <ArrowRight size={16} className="text-lime shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm text-safe truncate">Fast Delivery</p>
                      <p className="text-white/40 text-xs mono truncate">&lt; 24 hours</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-grid opacity-20 rounded-[2.5rem] pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
