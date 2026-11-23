import { useCallback, useEffect, useState } from 'react'
import { fetchWeather } from '../lib/api'
import type { GeoLocation, WeatherBundle } from '../types/weather'
const CACHE = 'atmos-weather-cache'
export function useWeather() {
  const [bundle, setBundle] = useState<WeatherBundle | null>(() => { try { return JSON.parse(localStorage.getItem(CACHE) || 'null') as WeatherBundle | null } catch { return null } })
  const [loading, setLoading] = useState(!bundle)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const load = useCallback(async (location: GeoLocation) => {
    setError(''); if (bundle) setRefreshing(true); else setLoading(true)
    try {
      const data = await fetchWeather(location)
      const next = { location, ...data, fetchedAt: Date.now() }
      setBundle(next); localStorage.setItem(CACHE, JSON.stringify(next))
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to load weather. Check your connection.') }
    finally { setLoading(false); setRefreshing(false) }
  }, [bundle])
  useEffect(() => { void load(bundle?.location ?? { id: 0, name: 'Kasaragod', country: 'India', latitude: 12.4996, longitude: 74.9869 }) }, [])
  return { bundle, loading, refreshing, error, load, retry: () => bundle ? load(bundle.location) : undefined }
}