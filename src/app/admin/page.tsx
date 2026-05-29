'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Users, CheckCircle, XCircle, Trash2, Eye, EyeOff, LogOut, RefreshCw, Search, BarChart3, DollarSign, FileText, TrendingUp, Clock, ChevronDown, ExternalLink, ImageIcon, Phone, Mail, BookOpen, CreditCard, Hash, FileInput, User } from 'lucide-react'
import { getUsers, getAnalytics, updateUser, deleteUser, adminLogin, checkTables } from '@/lib/supabase'
import { companyInfo } from '@/data/content'
import Image from 'next/image'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [analytics, setAnalytics] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [enlargeImg, setEnlargeImg] = useState<string | null>(null)

  const handleLogin = () => {
    if (!password) return
    setLoading(true)
    setTimeout(() => {
      if (adminLogin(password)) { setAuthenticated(true); loadData(); setLoading(false) }
      else { alert('Invalid password'); setLoading(false) }
    }, 600)
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [a, u] = await Promise.all([getAnalytics(), getUsers()])
      setAnalytics(a)
      setUsers(u || [])
    } catch (e: any) {
      console.error('Admin load error:', e?.message || JSON.stringify(e))
    }
    setLoading(false)
  }

  useEffect(() => {
    checkTables()
    if (authenticated) loadData()
  }, [authenticated])

  const handleApprove = async (id: string) => {
    await updateUser(id, { status: 'approved' } as any)
    loadData()
  }
  const handleReject = async (id: string) => {
    await updateUser(id, { status: 'rejected' } as any)
    loadData()
  }
  const handleDelete = async (id: string) => {
    if (confirm('Delete this user permanently?')) { await deleteUser(id); loadData() }
  }

  const filteredUsers = users.filter((u: any) => {
    const match = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.whatsapp?.includes(searchTerm) || u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const status = filterStatus === 'all' || u.status === filterStatus
    return match && status
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'orders', label: 'Orders', icon: FileText },
  ]

  const formatDate = (d: string) => {
    if (!d) return 'N/A'
    const date = new Date(d)
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const detailFields = (u: any) => [
    { label: 'User ID', value: u.id?.slice(0, 8) + '...', icon: Hash },
    { label: 'Full Name', value: u.name, icon: User },
    { label: 'WhatsApp', value: u.whatsapp, icon: Phone },
    { label: 'Email', value: u.email || '—', icon: Mail },
    { label: 'Package', value: u.package?.toUpperCase(), icon: CreditCard },
    { label: 'Course', value: u.course, icon: BookOpen },
    { label: 'Qualification', value: u.qualification, icon: FileInput },
    { label: 'Gender', value: u.gender, icon: Users },
    { label: 'Payment Method', value: u.payment_method?.toUpperCase(), icon: DollarSign },
    { label: 'Payment Number', value: u.payment_number, icon: Phone },
    { label: 'Transaction ID', value: u.transaction_id, icon: Hash },
    { label: 'Referral Code', value: u.referral_code || '—', icon: ExternalLink },
    { label: 'Notes', value: u.notes || '—', icon: FileText },
    { label: 'Registered', value: formatDate(u.created_at), icon: Clock },
  ]

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="glow-sphere top-[-10%] left-[-5%] w-[500px] h-[500px] bg-lime/10 pointer-events-none" />
        <div className="glow-sphere bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald/10 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-sm relative z-10">
          <div className="glass rounded-[2.5rem] p-8 sm:p-10 border border-white/10 text-center shadow-2xl shadow-lime/5">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime to-lime-dark flex items-center justify-center mx-auto mb-5 shadow-lg shadow-lime/20">
              <Shield size={30} className="text-black" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: '-0.04em' }}>Welcome Back</motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-white/40 text-xs mono uppercase tracking-wider mb-8">Shaheen Assignments Limited</motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
              <div className="text-left">
                <label className="block text-[10px] text-white/40 mono uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 rounded-xl glass border-white/10 text-sm text-white placeholder:text-white/20 focus:border-lime/50 focus:outline-none transition-all pr-12"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
                  <button onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-lime transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button onClick={handleLogin} disabled={!password}
                className="btn-lime w-full text-sm py-3 disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Authenticating...
                  </span>
                ) : 'Login to Dashboard'}
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-6 pt-4 border-t border-white/5">
              <p className="text-[10px] text-white/20 mono">Secured Access • Admin Only</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Image Enlarge Modal */}
      <AnimatePresence>
        {enlargeImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setEnlargeImg(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="relative max-w-lg w-full max-h-[80vh] rounded-2xl overflow-hidden">
              <Image src={enlargeImg} alt="Screenshot" width={600} height={800} className="w-full h-auto object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center">
              <Shield size={20} className="text-black" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">Admin Panel</h1>
              <p className="text-xs text-white/30 mono">Shaheen Assignments Limited</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} className="p-2.5 rounded-xl glass text-white/50 hover:text-lime transition-all" title="Refresh">
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-white/50 text-sm hover:text-white transition-all">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Users', value: analytics?.totalUsers || 0, icon: Users, color: 'text-lime' },
            { label: 'Pending', value: analytics?.pendingUsers || 0, icon: Clock, color: 'text-yellow-400' },
            { label: 'Approved', value: analytics?.approvedUsers || 0, icon: CheckCircle, color: 'text-emerald-400' },
            { label: 'Premium', value: analytics?.premiumUsers || 0, icon: TrendingUp, color: 'text-lime' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={14} className={s.color} />
                <p className="text-xs text-white/40 mono">{s.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all mono ${
                activeTab === tab.id ? 'bg-lime text-black' : 'glass text-white/50 hover:text-white'
              }`}>
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="glass rounded-[2rem] p-6 border-white/10">
            <h2 className="font-bold text-white mb-4">Analytics Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                {[
                  { label: 'Total Referrals', value: analytics?.totalReferrals || 0 },
                  { label: 'Conversion Rate', value: analytics?.totalUsers ? `${Math.round(((analytics?.approvedUsers || 0) / analytics?.totalUsers) * 100)}%` : '0%' },
                  { label: 'Referrals per User', value: analytics?.totalUsers ? (analytics?.totalReferrals / analytics?.totalUsers).toFixed(1) : '0' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 glass rounded-xl border-white/5">
                    <span className="text-sm text-white/40">{item.label}</span>
                    <span className="font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-6 flex flex-col items-center justify-center border-lime/20">
                <BarChart3 size={32} className="text-lime mb-2" />
                <p className="text-white font-semibold text-sm">System Online</p>
                <p className="text-white/30 text-xs mono mt-0.5">{users.length} user{users.length !== 1 ? 's' : ''} registered</p>
              </div>
              <div className="glass rounded-xl p-6 border-white/5">
                <h3 className="text-xs text-white/40 mono mb-3">Package Distribution</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Small', count: users.filter((u: any) => u.package === 'small').length, pct: users.length ? Math.round(users.filter((u: any) => u.package === 'small').length / users.length * 100) : 0 },
                    { label: 'Big Offer', count: users.filter((u: any) => u.package === 'big').length, pct: users.length ? Math.round(users.filter((u: any) => u.package === 'big').length / users.length * 100) : 0 },
                  ].map((p) => (
                    <div key={p.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{p.label}</span>
                        <span className="text-white font-semibold">{p.count} ({p.pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.label === 'Small' ? 'bg-white/30' : 'bg-lime'}`} style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="glass rounded-[2rem] border-white/10 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="font-bold text-white text-sm">All Registrations ({users.length})</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="text" placeholder="Search name, WhatsApp, email..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-56 pl-9 pr-3 py-1.5 rounded-xl glass border-white/10 text-sm text-white placeholder:text-white/30" />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                  className="select-glass py-1.5 text-sm">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {filteredUsers.map((user: any) => (
                <div key={user.id}>
                  {/* Compact row */}
                  <div className="px-4 sm:px-5 py-3 flex items-center gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === user.id ? null : user.id)}>
                    <div className="w-8 h-8 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
                      <User size={14} className="text-lime" />
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{user.name || 'N/A'}</p>
                        <p className="text-white/30 mono truncate">{user.whatsapp || 'N/A'}</p>
                      </div>
                      <div className="hidden sm:block min-w-0">
                        <p className="text-white/50 truncate">{user.email || '—'}</p>
                        <p className="text-white/30 mono truncate">{user.course || '—'}</p>
                      </div>
                      <div className="min-w-0">
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          user.package === 'big' ? 'bg-lime/10 text-lime' : 'bg-white/5 text-white/50'
                        }`}>{user.package ? user.package.toUpperCase() : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                          user.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                          'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${
                            user.status === 'approved' ? 'bg-emerald-400' :
                            user.status === 'rejected' ? 'bg-red-400' : 'bg-yellow-400'
                          }`} />
                          {user.status || 'pending'}
                        </span>
                        <ChevronDown size={12} className={`text-white/30 transition-transform ${expandedId === user.id ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expandedId === user.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-white/5">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                            {detailFields(user).map((f) => (
                              <div key={f.label} className="flex items-center gap-2 p-2.5 glass rounded-xl border-white/5">
                                <f.icon size={12} className="text-lime shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-[9px] text-white/30 mono uppercase truncate">{f.label}</p>
                                  <p className="text-xs text-white font-medium truncate">{String(f.value)}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Screenshot */}
                          <div className="mb-4">
                            <p className="text-[10px] text-white/30 mono uppercase mb-2">Payment Screenshot</p>
                            {user.screenshot_url ? (
                              <div className="relative w-32 h-40 rounded-xl overflow-hidden glass border border-white/10 cursor-pointer group"
                                onClick={() => setEnlargeImg(user.screenshot_url)}>
                                <Image src={user.screenshot_url} alt="Payment screenshot" width={128} height={160} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                  <Eye size={18} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                              </div>
                            ) : (
                              <div className="w-32 h-32 rounded-xl glass border-white/5 flex flex-col items-center justify-center text-white/20">
                                <ImageIcon size={20} />
                                <p className="text-[10px] mt-1">No screenshot</p>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {user.status === 'pending' && (
                              <>
                                <button onClick={() => handleApprove(user.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs font-semibold">
                                  <CheckCircle size={12} /> Approve
                                </button>
                                <button onClick={() => handleReject(user.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-semibold">
                                  <XCircle size={12} /> Reject
                                </button>
                              </>
                            )}
                            <button onClick={() => handleDelete(user.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/30 hover:bg-red-500/20 hover:text-red-400 transition-all text-xs font-semibold">
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="px-5 py-16 text-center text-white/20">
                  <Users size={28} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">{users.length === 0 ? 'No users registered yet' : 'No matches found'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payments */}
        {activeTab === 'payments' && (
          <div className="glass rounded-[2rem] p-6 border-white/10">
            <h2 className="font-bold text-white mb-4">Payment Accounts</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="glass rounded-xl p-5 border-white/10">
                <p className="text-lime font-bold text-xs mono mb-2">EASYPAISA</p>
                <p className="text-xl font-bold text-white">{companyInfo.easypaisa.number}</p>
                <p className="text-white/40 text-sm mt-0.5">{companyInfo.easypaisa.name}</p>
              </div>
              <div className="glass rounded-xl p-5 border-white/10">
                <p className="text-white/60 font-bold text-xs mono mb-2">JAZZCASH</p>
                <p className="text-xl font-bold text-white">{companyInfo.jazzcash.number}</p>
                <p className="text-white/40 text-sm mt-0.5">{companyInfo.jazzcash.name}</p>
              </div>
            </div>
            <div className="glass rounded-xl p-5 border-white/5 text-center">
              <DollarSign size={28} className="mx-auto text-lime/30 mb-2" />
              <p className="text-white/40 text-sm">Payment tracking active for {users.length} registration{users.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="glass rounded-[2rem] p-6 border-white/10">
            <h2 className="font-bold text-white mb-4">Orders Breakdown</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Small Package', value: users.filter((u: any) => u.package === 'small').length, color: 'text-white' },
                { label: 'Big Offer', value: users.filter((u: any) => u.package === 'big').length, color: 'text-lime' },
                { label: 'Approved', value: analytics?.approvedUsers || 0, color: 'text-emerald-400' },
                { label: 'Pending', value: analytics?.pendingUsers || 0, color: 'text-yellow-400' },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 border-white/5 text-center">
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="glass rounded-xl p-5 border-lime/10 bg-lime/[0.02]">
              <h3 className="text-sm font-semibold text-lime mb-2">Recent Activity</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {users.slice(0, 10).map((u: any) => (
                  <div key={u.id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-white/60 truncate max-w-[200px]">{u.name} — {u.package?.toUpperCase()}</span>
                    <span className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                      u.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                      u.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>{u.status || 'pending'}</span>
                  </div>
                ))}
                {users.length === 0 && <p className="text-white/20 text-xs text-center py-4">No activity yet</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
