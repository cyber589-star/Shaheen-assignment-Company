'use client'

import { useEffect, useState } from 'react'
import { getSiteSettings, defaultSettings, type SiteSettings } from './supabase'

// Module-level cache so every component shares ONE fetch,
// and the whole site updates as soon as admin saves new numbers.
let cache: SiteSettings | null = null
let promise: Promise<SiteSettings> | null = null
const listeners = new Set<(s: SiteSettings) => void>()

export function refreshSiteSettings() {
  cache = null
  promise = getSiteSettings().then((s) => {
    cache = s
    listeners.forEach((l) => l(s))
    return s
  })
  return promise
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
