'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ExternalLink, Send, MessageCircle } from 'lucide-react'
import { companyInfo } from '@/data/content'

const contactItems = [
  { icon: Phone, label: 'WhatsApp', value: companyInfo.whatsapp, href: `https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`, color: 'text-lime' },
  { icon: Mail, label: 'Email', value: companyInfo.email, href: `mailto:${companyInfo.email}`, color: 'text-lime' },
  { icon: MapPin, label: 'Location', value: 'Pakistan', href: '#', color: 'text-white/50' },
  { icon: Clock, label: 'Office Hours', value: companyInfo.officeHours, href: '#', color: 'text-white/50' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section-padding relative">
      <div className="glow-sphere top-[30%] right-[-5%] w-[400px] h-[400px] bg-lime/5" />
      <div className="max-w-[1600px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="status-tag justify-center mb-4">
            <span className="status-dot" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-[0.9] tracking-[-0.06em] mb-3 text-safe">
            Contact{' '}
            <span className="gradient-text">Us</span>
          </h2>
        </motion.div>

        <div className="max-w-xl mx-auto space-y-3 sm:space-y-4">
          {contactItems.map((item) => (
            <motion.a key={item.label} href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-3 sm:p-5 glass glass-hover rounded-2xl border-white/10 transition-all group overflow-hidden card-safe">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-lime/20 transition-all">
                <item.icon size={16} className={`${item.color} group-hover:text-lime transition-colors shrink-0`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/30 mono uppercase tracking-wider mb-0.5 truncate">{item.label}</p>
                <p className="font-semibold text-white text-xs sm:text-sm text-safe truncate">{item.value}</p>
              </div>
              {item.href.startsWith('http') && <ExternalLink size={12} className="text-white/20 group-hover:text-lime transition-colors shrink-0" />}
            </motion.a>
          ))}

          <div className="glass rounded-[1.5rem] p-4 sm:p-5 border-white/10 overflow-hidden card-safe">
            <h4 className="font-semibold text-lime mb-1 text-xs sm:text-sm text-safe">Need Urgent Help?</h4>
            <p className="text-white/40 text-xs mb-3 text-safe">Chat directly with our HR team on WhatsApp.</p>
            <a href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi! I need assistance.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-lime text-xs px-4 py-2">
              <Send size={12} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
