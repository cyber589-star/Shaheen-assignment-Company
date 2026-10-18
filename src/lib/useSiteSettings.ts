'use client'

import { useEffect, useState } from 'react'

// ===== Site settings loaded from src/data/site-settings.json (via /api/settings) =====
export interface SiteSettings {
  easypaisa_number: string
  easypaisa_name: string
  jazzcash_number: string
  jazzcash_name: string
  appliner_whatsapp: string
  ceo_name: string
  vice_owner_name: string
  senior_appliners: string // comma-separated names
}

export const defaultSettings: SiteSettings = {
  easypaisa_number: '03420423970',
  easypaisa_name: 'Ansha Gull',
  jazzcash_number: '03420423970',
  jazzcash_name: 'Mateen Ahmad',
  appliner_whatsapp: '+923128268793',
  ceo_name: 'Malik-Mateen',
  vice_owner_name: 'Kainat Waseem',
  senior_appliners: 'Sania Gafoor, Alia Waheed, Mishal Malik, Fizza Sami, Abeera Safdar, Muskan Malik, Zarish Hayyat, Muqadas Quyyum',
}

// Module-level cache so every component shares ONE fetch,
// and the whole site updates as soon as admin saves new values.
let cache: SiteSettings | null = null
let promise: Promise<SiteSettings> | null = null
const listeners = new Set<(s: SiteSettings) => void>()

function merge(fetched: any): SiteSettings {
  return { ...defaultSettings, ...(fetched || {}) }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch('/api/settings', { cache: 'no-store' })
    if (res.ok) return merge(await res.json())
  } catch (e) {
    console.warn('Settings fetch error:', e)
  }
  return { ...defaultSettings }
}

export function refreshSiteSettings() {
  cache = null
  promise = fetchSiteSettings().then((s) => {
    cache = s
    listeners.forEach((l) => l(s))
    return s
  })
  return promise
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const res = await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  })
  const data = await res.json().catch(() => ({} as any))
  if (!res.ok || !data.ok) throw new Error(data?.error || 'Failed to save settings')
  const saved = merge(data.settings)
  cache = saved
  listeners.forEach((l) => l(saved))
  return saved
}

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(cache || defaultSettings)

  useEffect(() => {
    if (cache) {
      setSettings(cache)
    } else {
      if (!promise) promise = refreshSiteSettings()
      promise.then(setSettings).catch(() => {})
    }
    listeners.add(setSettings)
    return () => { listeners.delete(setSettings) }
  }, [])

  return settings
}
