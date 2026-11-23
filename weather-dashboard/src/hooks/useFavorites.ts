import { useEffect, useState } from 'react'
import type { GeoLocation } from '../types/weather'
const KEY = 'atmos-favorite-cities'
export function useFavorites() {
  const [favorites, setFavorites] = useState<GeoLocation[]>(() => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') as GeoLocation[] } catch { return [] } })
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(favorites)) }, [favorites])
  const add = (city: GeoLocation) => setFavorites(old => old.some(item => item.id === city.id || (item.latitude === city.latitude && item.longitude === city.longitude)) ? old : [...old, city])
  const remove = (id: number) => setFavorites(old => old.filter(item => item.id !== id))
  const has = (city: GeoLocation) => favorites.some(item => item.id === city.id || (item.latitude === city.latitude && item.longitude === city.longitude))
  return { favorites, add, remove, has }
}