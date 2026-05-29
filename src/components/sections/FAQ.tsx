'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { faqs } from '@/data/content'

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="section-padding relative">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="status-tag justify-center mb-4">
            <span className="status-dot" />
            <span>FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-[0.9] tracking-[-0.06em] mb-3 text-safe">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="glass glass-hover rounded-2xl overflow-hidden card-safe"
            >
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <HelpCircle size={14} className="text-lime shrink-0" />
                  </div>
                  <span className="font-medium text-white text-sm sm:text-base text-safe">{faq.question}</span>
                </div>
                <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                  <ChevronDown size={15} className="text-white/30" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-3.5 ml-[3.25rem] text-safe">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
