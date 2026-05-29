'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Crown, Zap, ArrowRight } from 'lucide-react'
import { packages } from '@/data/content'

export default function Packages({ onSelect }: { onSelect?: (pkgId: string) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="packages" className="section-padding relative">
      <div className="glow-sphere top-[50%] right-[-5%] w-[400px] h-[400px] bg-lime/5" />
      <div className="max-w-[1600px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="status-tag justify-center mb-4">
            <span className="status-dot" />
            <span>Pricing Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[0.9] tracking-[-0.06em] mb-4 text-safe">
            Choose Your{' '}
            <span className="gradient-text">Package</span>
          </h2>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto text-safe">
            Select the perfect plan and start earning daily.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-lime text-black text-[10px] font-bold shadow-lg shadow-lime/30 whitespace-nowrap">
                    <Crown size={9} />
                    POPULAR
                  </div>
                </div>
              )}

              <div className="glass rounded-[1.5rem] p-[2px] overflow-hidden card-safe">
                <div className={`rounded-[1.45rem] p-4 sm:p-6 h-full flex flex-col relative overflow-hidden card-safe ${pkg.popular ? 'bg-obsidian-light' : 'bg-obsidian-light'}`}>
                  <div className="absolute top-0 right-0 w-36 h-36 bg-lime/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="text-center mb-3 relative">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 ${pkg.popular ? 'bg-lime/20' : 'bg-white/5'}`}>
                      {pkg.popular ? <Zap size={11} className="text-lime shrink-0" /> : <Zap size={11} className="text-white/40 shrink-0" />}
                      <span className={`font-bold text-xs ${pkg.popular ? 'text-lime' : 'text-white/80'}`}>
                        {pkg.name}
                      </span>
                    </div>
                    {/* Modern eCommerce pricing */}
                    <div className="flex items-baseline justify-center gap-2.5 mb-1">
                      <span className="text-sm sm:text-lg text-white/30 line-through font-medium">{pkg.comparePrice}</span>
                      <span className="text-2xl sm:text-4xl font-bold text-lime tracking-[-0.04em] text-safe">{pkg.price}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold mono tracking-wider mb-1">
                      Save PKR {(pkg.comparePriceValue - pkg.priceValue).toLocaleString()} · {Math.round((1 - pkg.priceValue / pkg.comparePriceValue) * 100)}% OFF
                    </div>
                    <p className="text-white/40 text-xs text-safe">{pkg.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3">
                    <div className="glass rounded-xl p-1.5 sm:p-2.5 text-center overflow-hidden">
                      <p className="text-[9px] text-white/40 mono uppercase tracking-wider truncate">Price</p>
                      <p className="text-lime font-bold text-xs mt-0.5 truncate">{pkg.price}</p>
                    </div>
                    <div className="glass rounded-xl p-1.5 sm:p-2.5 text-center overflow-hidden">
                      <p className="text-[9px] text-white/40 mono uppercase tracking-wider truncate">Daily</p>
                      <p className="text-white font-bold text-xs mt-0.5 truncate">{pkg.dailySalary}</p>
                    </div>
                    <div className="glass rounded-xl p-1.5 sm:p-2.5 text-center overflow-hidden">
                      <p className="text-[9px] text-white/40 mono uppercase tracking-wider truncate">Pages</p>
                      <p className="text-white font-bold text-xs mt-0.5 truncate">{pkg.pageWrite}</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5 mb-3">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-lime/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={8} className="text-lime" />
                        </div>
                        <span className="text-xs text-white/60 text-safe leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => onSelect?.(pkg.id)}
                    className={`block text-center py-2.5 rounded-xl font-bold text-xs transition-all w-full cursor-pointer ${
                      pkg.popular
                        ? 'btn-lime'
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}>
                    Get {pkg.name} <ArrowRight size={11} className="inline shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
