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
            <div className="flex gap-3 mb-6">
              {[
                { href: companyInfo.whatsappChannel, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
                { href: companyInfo.facebook, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                { href: companyInfo.telegram, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg> },
              ].map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-lime hover:text-lime hover:bg-lime/10 transition-all shrink-0">
                  {link.icon}
                </a>
              ))}
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
