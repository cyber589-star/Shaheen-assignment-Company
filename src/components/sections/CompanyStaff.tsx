'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Crown, Award, Shield } from 'lucide-react'
import { staff } from '@/data/content'

export default function CompanyStaff() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="staff" className="section-padding relative">
      <div className="max-w-[1600px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="status-tag justify-center mb-3">
            <span className="status-dot" />
            <span>Company Staff</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-[-0.04em] mb-2 text-safe">
            Meet Our{' '}
            <span className="gradient-text">Team</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto text-safe">
            Dedicated professionals committed to your success.
          </p>
        </motion.div>

        {/* CEO - no image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="glass rounded-[2rem] p-7 sm:p-9 border-lime/40 max-w-sm mx-auto mb-8 text-center relative overflow-hidden card-safe shadow-[0_0_80px_-8px_rgba(204,255,0,0.2)]"
        >
          {/* Top accent glow line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-lime to-transparent opacity-80" />
          <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-b from-lime/20 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-lime/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-lime/10 rounded-full blur-[80px]" />
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lime text-black text-[10px] font-bold mono uppercase tracking-wider shadow-lg shadow-lime/20">
              <Shield size={10} /> CEO
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold mono uppercase tracking-wider shadow-lg shadow-amber-500/10">
              <Crown size={10} /> KING
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white text-safe">{staff.ceo.name}</h3>
          <p className="text-lime text-sm font-semibold mono uppercase tracking-wider mt-1">{staff.ceo.role}</p>
        </motion.div>

        {/* Vice Owner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass glass-hover rounded-[2rem] p-6 sm:p-8 border-lime/20 max-w-sm mx-auto mb-10 text-center overflow-hidden card-safe"
        >
          <h3 className="text-xl font-bold text-white text-safe">{staff.viceOwner.name}</h3>
          <p className="text-lime text-sm font-semibold mono uppercase tracking-wider mt-1">{staff.viceOwner.role}</p>
        </motion.div>

        {/* Senior Appliners */}
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2 text-safe">
            <Award size={18} className="text-lime shrink-0" />
            Senior Appliners
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {staff.seniorAppliners.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.15 + idx * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover rounded-2xl p-4 sm:p-5 text-center group overflow-hidden card-safe"
            >
              <div className="w-11 h-11 rounded-2xl bg-lime/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-lime/20 transition-all shrink-0">
                <Users size={18} className="text-lime" />
              </div>
              <h4 className="text-white font-semibold text-sm sm:text-base leading-tight text-safe">{member.name}</h4>
              <p className="text-white/40 text-xs mt-1 text-safe">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
