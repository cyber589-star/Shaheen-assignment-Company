'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface ServiceProps {
  service: {
    id: number
    title: string
    description: string
    price: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    color: string
    whatsappMessage: string
  }
}

export default function ServiceCard({ service }: ServiceProps) {
  const Icon = service.icon

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white rounded-2xl p-5 border border-[#e8e8ed] hover:border-primary-200/50 transition-all duration-400 hover:shadow-[0_8px_40px_rgba(255,123,0,0.08)] h-full flex flex-col"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <Icon size={22} className="text-white" />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-[#1d1d1f] text-base mb-1.5 leading-tight">{service.title}</h3>
      <p className="text-[#86868b] text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0f0f2]">
        <div>
          <span className="text-xs text-[#86868b]">Starting from</span>
          <p className="text-xl font-bold gradient-text">{service.price}</p>
        </div>
        <div className="flex gap-2">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={`https://wa.me/923128268793?text=${encodeURIComponent(service.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#payment"
            className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 hover:gradient-primary hover:text-white transition-all duration-200"
          >
            <CheckCircle size={16} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
