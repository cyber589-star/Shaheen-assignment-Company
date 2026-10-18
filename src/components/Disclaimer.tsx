'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export default function Disclaimer() {
  return (
    <section id="disclaimer" className="relative py-14 sm:py-16 px-4 sm:px-6">
      <div className="glow-sphere top-[-10%] right-[-5%] w-[350px] h-[350px] bg-lime/5 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto glass rounded-[2rem] border border-white/10 p-6 sm:p-10 relative"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-lime" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-lime mono uppercase tracking-widest">Disclaimer</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ letterSpacing: '-0.04em' }}>
              SHAHEEN ASSIGNMENT COMPANY
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/50 mono uppercase tracking-wider mb-6 pb-4 border-b border-white/5">
          Terms, Conditions &amp; Work Policy
        </p>

        <div className="space-y-5 text-white/60 text-sm sm:text-base leading-relaxed">
          <p>
            Participation in Shaheen Assignment Company is entirely voluntary. Individuals may choose to
            participate or discontinue work at their own discretion, without any form of coercion or undue
            pressure.
          </p>
          <p>
            Members who choose to participate are required to complete assigned tasks and comply with the
            company&rsquo;s established rules and guidelines. Proper instructions, work-related guidance, and
            necessary support will be provided as communicated.
          </p>
          <p>
            By choosing to participate, members acknowledge that they have been informed of the applicable
            terms and responsibilities. The company aims to maintain transparency, mutual understanding, and
            professional conduct in all working arrangements.
          </p>
        </div>

        <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-2 text-white/20 text-[10px] mono uppercase tracking-wider">
          <ShieldCheck size={11} className="shrink-0" />
          Shaheen Assignments Limited &bull; Transparent &amp; Voluntary Participation
        </div>
      </motion.div>
    </section>
  )
}
