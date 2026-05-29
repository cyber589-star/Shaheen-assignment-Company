'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { companyInfo } from '@/data/content'

const images = [
  { src: '/jjjj.PNG', alt: 'Payment screenshot 1' },
  { src: '/Capturea.PNG', alt: 'Payment screenshot 2' },
  { src: '/Capturejj.PNG', alt: 'Payment screenshot 3' },
  { src: '/Capturejjjjj.PNG', alt: 'Payment screenshot 4' },
]

export default function PaymentScreenshots() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="payments" className="section-padding relative">
      <div className="max-w-[1600px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="status-tag justify-center mb-3">
            <span className="status-dot" />
            <span>Payment Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-[-0.04em] mb-3 text-safe">
            Payment{' '}
            <span className="gradient-text">Screenshots</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto text-safe">
            Real payments made to our team members — proof of our commitment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass glass-hover rounded-2xl overflow-hidden card-safe group"
            >
              <div className="relative w-full aspect-[3/4] bg-black/40">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center mt-8"
        >
          <a href={companyInfo.whatsappChannel} target="_blank" rel="noopener noreferrer"
            className="btn-lime-outline text-xs sm:text-sm">
            <ExternalLink size={13} />
            View More on WhatsApp Channel
          </a>
        </motion.div>
      </div>
    </section>
  )
}
