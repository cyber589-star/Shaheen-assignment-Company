'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, ArrowRight } from 'lucide-react'
import { companyInfo } from '@/data/content'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] sm:text-[16rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none"
        style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.06em' }}>
        SUPER
      </div>
      <div className="glow-sphere top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-lime/5 pointer-events-none" />
      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-10">
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[0.9] tracking-[-0.06em] mb-5 sm:mb-6 text-safe">
              Ready to{' '}
              <span className="gradient-text">Start?</span>
            </h2>
            <p className="text-white/30 text-base sm:text-lg max-w-md mx-auto mb-6 sm:mb-8 px-4 text-safe">
              Join hundreds of students earning daily through premium assignments.
            </p>
            <a href="#payment"
              className="group relative inline-flex items-center gap-2 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-lime text-black font-bold text-base sm:text-lg overflow-hidden transition-all hover:scale-105 card-safe"
              style={{ boxShadow: '0 0 40px rgba(204, 255, 0, 0.3)' }}>
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                Get Started Now <ArrowRight size={18} className="shrink-0" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <Image src="/zkzb.PNG" alt="Shaheen" width={40} height={40} className="object-contain" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-lg text-safe truncate" style={{ letterSpacing: '-0.04em' }}>Shaheen</h3>
                <p className="text-white/30 text-xs mono uppercase tracking-wider truncate">Assignments Limited</p>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs text-safe">
              Professional assignment services trusted by students across Pakistan since 2024.
            </p>
          </div>

          <div className="overflow-hidden">
            <h4 className="text-white/50 text-xs mono uppercase tracking-wider mb-5 truncate">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[['Home', '#home'], ['Services', '#services'], ['Packages', '#packages'], ['Payment', '#payment'], ['Contact', '#contact']].map(([l, h]) => (
                <a key={l} href={h} className="text-white/40 text-sm hover:text-lime transition-colors truncate">{l}</a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <h4 className="text-white/50 text-xs mono uppercase tracking-wider mb-5 truncate">Connect</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
              <a href={companyInfo.whatsappChannel} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-lime hover:text-lime hover:bg-lime/10 transition-all shrink-0"
                title="WhatsApp Channel">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@bussinessqueen786?_r=1&_t=ZN-96lTnz855Ik" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-lime hover:text-lime hover:bg-lime/10 transition-all shrink-0"
                title="TikTok - Business Queen">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@bussinesswork34?_r=1&_t=ZN-96lTsDGMvtm" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-lime hover:text-lime hover:bg-lime/10 transition-all shrink-0"
                title="TikTok - Business Work">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
              </a>
            </div>
            <p className="text-white/20 text-xs mono">&copy; 2024 Shaheen Assignments Limited</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs flex items-center gap-1 text-safe">
            Made with <Heart size={10} className="text-red-500 fill-red-500 shrink-0" /> in Pakistan
          </p>
          <div className="flex items-center gap-1 text-white/20 text-xs shrink-0">
            <Shield size={10} className="shrink-0" /> Secure & Trusted
          </div>
        </div>
      </div>
    </footer>
  )
}
