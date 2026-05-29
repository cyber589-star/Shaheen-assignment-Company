'use client'

import { motion } from 'framer-motion'
import { Home, Briefcase, Package, CreditCard, Phone } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Services', href: '#services', icon: Briefcase },
  { label: 'Packages', href: '#packages', icon: Package },
  { label: 'Payment', href: '#payment', icon: CreditCard },
  { label: 'Contact', href: '#contact', icon: Phone },
]

export default function BottomNav() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="mx-3 mb-3">
        <div className="glass rounded-2xl border border-white/10 shadow-xl px-2 py-2 overflow-hidden card-safe">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <motion.a key={item.label} href={item.href}
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl text-white/40 hover:text-lime transition-colors min-w-0 flex-1 max-w-[64px]">
                <item.icon size={18} strokeWidth={1.5} className="shrink-0" />
                <span className="text-[9px] font-semibold mono uppercase tracking-wider truncate w-full text-center">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
