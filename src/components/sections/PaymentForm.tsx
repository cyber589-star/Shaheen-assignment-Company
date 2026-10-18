'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Clock, Copy, ExternalLink, Banknote } from 'lucide-react'
import { companyInfo, packages } from '@/data/content'
import { addUser, generateReferralCode, uploadScreenshot, updateUser } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function PaymentForm({ selectedPackage: initialPkg, onClose }: { selectedPackage?: string; onClose?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', whatsapp: '', email: '', course: '', qualification: '',
    gender: '', package: initialPkg || '', paymentMethod: '', paymentNumber: '',
    transactionId: '', referralCode: '', notes: '',
    screenshot: null as File | null,
  })

  useEffect(() => {
    if (initialPkg) setForm(prev => ({ ...prev, package: initialPkg }))
  }, [initialPkg])

  useEffect(() => {
    if (ref.current && initialPkg) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }, [initialPkg])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setForm({ ...form, screenshot: e.target.files[0] })
  }

  const copyNumber = (n: string) => { navigator.clipboard.writeText(n.replace(/\s/g, '')); toast.success('Copied!') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const referralCode = generateReferralCode(form.name)
      const user = await addUser({
        name: form.name, whatsapp: form.whatsapp, email: form.email,
        course: form.course, qualification: form.qualification, gender: form.gender,
        package: form.package, payment_method: form.paymentMethod,
        payment_number: form.paymentNumber, transaction_id: form.transactionId,
        referral_code: referralCode, notes: form.notes,
      })
      if (form.screenshot) {
        try {
          const url = await uploadScreenshot(form.screenshot, user.id)
          await updateUser(user.id, { screenshot_url: url } as any)
        } catch (e: any) {
          console.error('Screenshot save failed:', e?.message)
          toast.error('Screenshot upload failed, but registration saved')
        }
      }
      setSubmitted(true)
      toast('Registration Pending', { duration: Infinity, style: { background: '#1a1a1a', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '1rem', fontSize: '14px', fontWeight: 600 } })
      setTimeout(() => {
        document.getElementById('referral')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
    } catch (e: any) {
      console.error('Registration error:', e?.message || JSON.stringify(e))
      const msg = e?.message || ''
      if (msg.includes('relation') && msg.includes('does not exist')) {
        toast.error('Database table missing — contact admin')
      } else if (msg.includes('duplicate') || msg.includes('unique')) {
        toast.error('This email or number is already registered')
      } else if (msg.includes('row-level security') || msg.includes('RLS')) {
        toast.error('Permission error — run SQL setup')
      } else {
        toast.error('Registration failed — try again later')
      }
    } finally { setLoading(false) }
  }

  if (submitted) {
    return (
      <section id="referral" className="section-padding relative">
        <div className="max-w-2xl mx-auto px-4" ref={ref}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-5">
            <Clock size={36} className="text-amber-400 shrink-0" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center text-safe" style={{ letterSpacing: '-0.04em' }}>Registration Pending</motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/50 text-sm sm:text-base mb-6 text-center max-w-lg mx-auto text-safe">
            <p>Your registration and payment have been submitted successfully.</p>
            <p className="mt-2">Admin will approve your payment and registration within 12 hours.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-5 sm:p-6 mb-6 text-center border border-amber-500/20 bg-amber-500/5 overflow-hidden card-safe">
            <p className="text-amber-400 font-semibold text-sm sm:text-base text-safe">⚠️ Contact your Appliner for Getting Work</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="glass rounded-[2.5rem] p-6 sm:p-8 border border-lime/20 overflow-hidden card-safe">
            <div className="text-center mb-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-safe" style={{ letterSpacing: '-0.04em' }}>Join WhatsApp Channel</h3>
              <p className="text-white/40 text-sm mt-1 text-safe">Get updates, work notifications, and support.</p>
            </div>
            <div className="glass rounded-2xl p-4 sm:p-5 flex items-center justify-between overflow-hidden card-safe border-lime/20">
              <div>
                <p className="text-xs text-white/40 mono mb-1">WhatsApp Channel</p>
                <p className="text-white font-semibold text-sm sm:text-base text-safe">Shaheen Assignments Channel</p>
              </div>
              <a href="https://www.whatsapp.com/channel/0029VbCOSaIJ93wT38mvGM0C"
                target="_blank" rel="noopener noreferrer"
                className="btn-lime text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap shrink-0">
                Join Now <ExternalLink size={13} className="inline shrink-0" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="payment" className="section-padding relative">
      <div className="glow-sphere bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-lime/5" />
      <div className="max-w-[1600px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="status-tag justify-center mb-4">
            <span className="status-dot" />
            <span>Registration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[0.9] tracking-[-0.06em] mb-4 text-safe">
            Complete Your{' '}
            <span className="gradient-text">Registration</span>
          </h2>
          <p className="text-white/40 text-base sm:text-lg max-w-xl mx-auto text-safe">
            Fill in your details and complete payment to get started.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass rounded-[2.5rem] p-5 sm:p-8 border-white/10 overflow-hidden card-safe">
              <h3 className="font-bold text-white mb-5 flex items-center gap-2.5 text-base sm:text-lg text-safe" style={{ letterSpacing: '-0.04em' }}>
                <Banknote size={18} className="text-lime shrink-0" />
                Send Payment To
              </h3>
              <div className="space-y-4">
                <div className="glass rounded-2xl p-4 sm:p-5 border-white/10 relative overflow-hidden card-safe">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-lime/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2 overflow-hidden">
                    <span className="text-sm font-semibold text-lime flex items-center gap-1.5 text-safe">
                      <span className="w-2 h-2 rounded-full bg-lime shrink-0" />
                      EasyPaisa
                    </span>
                    <span className="text-[10px] bg-lime/10 text-lime px-2 py-1 rounded-full mono uppercase whitespace-nowrap shrink-0">Active</span>
                  </div>
                  <p className="font-bold text-white text-lg sm:text-xl text-safe break-all">{companyInfo.easypaisa.number}</p>
                  <p className="text-white/50 text-sm mt-0.5 text-safe">Name: {companyInfo.easypaisa.name}</p>
                  <button onClick={() => copyNumber(companyInfo.easypaisa.number)}
                    className="mt-3 flex items-center gap-1.5 text-lime text-xs hover:text-lime-dark transition-colors bg-white/5 px-3 py-1.5 rounded-xl mono">
                    <Copy size={11} /> Copy Number
                  </button>
                </div>
                <div className="glass rounded-2xl p-4 sm:p-5 border-white/10 relative overflow-hidden card-safe">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-lime/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2 overflow-hidden">
                    <span className="text-sm font-semibold text-lime flex items-center gap-1.5 text-safe">
                      <span className="w-2 h-2 rounded-full bg-lime shrink-0" />
                      JazzCash
                    </span>
                    <span className="text-[10px] bg-lime/10 text-lime px-2 py-1 rounded-full mono uppercase whitespace-nowrap shrink-0">Active</span>
                  </div>
                  <p className="font-bold text-white text-lg sm:text-xl text-safe break-all">{companyInfo.jazzcash.number}</p>
                  <p className="text-white/50 text-sm mt-0.5 text-safe">Name: {companyInfo.jazzcash.name}</p>
                  <button onClick={() => copyNumber(companyInfo.jazzcash.number)}
                    className="mt-3 flex items-center gap-1.5 text-lime text-xs hover:text-lime-dark transition-colors bg-white/5 px-3 py-1.5 rounded-xl mono">
                    <Copy size={11} /> Copy Number
                  </button>
                </div>
              </div>
            </div>

            <div className="glass rounded-[2.5rem] p-5 sm:p-8 border-white/10 overflow-hidden card-safe">
              <h3 className="font-bold text-white mb-5 text-base sm:text-lg text-safe" style={{ letterSpacing: '-0.04em' }}>How to Pay</h3>
              <div className="space-y-3">
                {[
                  'Open EasyPaisa or JazzCash app',
                  'Send payment to the number above',
                  'Copy the transaction ID',
                  'Fill in the form and submit',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-lime/10 flex items-center justify-center text-lime text-xs font-bold shrink-0 mono">{String(i + 1).padStart(2, '0')}</div>
                    <p className="text-sm text-white/60 pt-0.5 text-safe">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-[2.5rem] p-5 sm:p-8 lg:p-10 border-white/10 overflow-hidden card-safe">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {[
                  { label: 'Full Name *', name: 'name', type: 'text', placeholder: 'Your full name' },
                  { label: 'WhatsApp Number *', name: 'whatsapp', type: 'tel', placeholder: '03XX XXXXXXX' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                ].map((f) => (
                  <div key={f.name} className="overflow-hidden">
                    <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">{f.label}</label>
                    <input type={f.type} name={f.name} value={(form as any)[f.name]} onChange={handleChange} required={f.label.includes('*')}
                      className="input-glass" placeholder={f.placeholder} />
                  </div>
                ))}
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Select Work *</label>
                  <select name="course" value={form.course} onChange={handleChange} required className="select-glass">
                    <option value="">Select work type</option>
                    <option value="Handwriting">Handwriting</option>
                    <option value="MS Writing">MS Writing</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Typing Work">Typing Work</option>
                  </select>
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Qualification *</label>
                  <select name="qualification" value={form.qualification} onChange={handleChange} required className="select-glass">
                    <option value="">Select</option>
                    {['matric', 'intermediate', 'bachelor', 'master', 'other'].map(o => (
                      <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Gender *</label>
                  <select name="gender" value={form.gender} onChange={handleChange} required className="select-glass">
                    <option value="">Select</option>
                    {['male', 'female', 'other'].map(o => (
                      <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Package *</label>
                  <select name="package" value={form.package} onChange={handleChange} required className="select-glass">
                    <option value="">Select package</option>
                    {packages.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.price}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Payment Method *</label>
                  <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required className="select-glass">
                    <option value="">Select</option>
                    <option value="easypaisa">EasyPaisa</option>
                    <option value="jazzcash">JazzCash</option>
                  </select>
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Your Payment Number *</label>
                  <input type="tel" name="paymentNumber" value={form.paymentNumber} onChange={handleChange} required className="input-glass" placeholder="Your account number" />
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Transaction ID</label>
                  <input type="text" name="transactionId" value={form.transactionId} onChange={handleChange} className="input-glass" placeholder="Enter transaction ID (optional)" />
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Referral Number</label>
                  <input type="text" name="referralCode" value={form.referralCode} onChange={handleChange} className="input-glass" placeholder="Referral number (optional)" />
                </div>
                <div className="overflow-hidden">
                  <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Screenshot</label>
                  <label className="flex items-center gap-3 w-full p-3.5 rounded-2xl glass border-white/10 text-sm text-white/40 cursor-pointer hover:border-lime/30 transition-all overflow-hidden">
                    <Upload size={15} className="text-white/40 shrink-0" />
                    <span className="flex-1 truncate">{form.screenshot ? form.screenshot.name : 'Upload screenshot'}</span>
                    <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="mt-5 overflow-hidden">
                <label className="block text-xs text-white/50 mb-1.5 mono uppercase tracking-wider truncate">Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="input-glass resize-none" placeholder="Any requirements..." />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                type="submit" disabled={loading}
                className="btn-lime w-full mt-6 text-sm sm:text-base py-3.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Processing...
                  </span>
                ) : 'Complete Registration'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
