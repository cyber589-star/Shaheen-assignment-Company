'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://www.whatsapp.com/channel/0029VbCOSaIJ93wT38mvGM0C"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, delay: 1.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-4 z-50 md:bottom-8 md:right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-lime to-lime-dark flex items-center justify-center shadow-xl shadow-lime/30 hover:shadow-lime/50 transition-shadow"
    >
      <MessageCircle size={26} className="text-black" fill="black" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full">
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
      </span>
    </motion.a>
  )
}
