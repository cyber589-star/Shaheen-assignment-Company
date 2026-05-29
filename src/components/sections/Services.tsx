'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const services = [
  { id: 1, title: 'Handwriting', src: '/d.PNG' },
  { id: 2, title: 'MS Word', src: '/djjjjj.PNG' },
  { id: 3, title: 'Assignment', src: '/ffg.PNG' },
  { id: 4, title: 'Typing Work', src: '/Captures.PNG' },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-[1600px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="status-tag justify-center mb-3">
            <span className="status-dot" />
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-[-0.04em] mb-3 text-safe">
            Services We{' '}
            <span className="gradient-text">Offer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass glass-hover rounded-2xl overflow-hidden card-safe group"
            >
              <div className="relative w-full aspect-[4/3] bg-black/40">
                <Image src={service.src} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-white font-semibold text-sm sm:text-base leading-tight text-safe">{service.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
