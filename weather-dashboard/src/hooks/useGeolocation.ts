import { useState } from 'react'
import type { GeoLocation } from '../types/weather'
export function useGeolocation() {
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const locate = () => new Promise<GeoLocation>((resolve, reject) => {
    if (!navigator.geolocation) { const message = 'Your browser does not support location services.'; setError(message); reject(new Error(message)); return }
    setLocating(true); setError('')
    navigator.geolocation.getCurrentPosition(position => {
      setLocating(false)
      resolve({ id: Date.now(), name: 'Your location', country: '', latitude: position.coords.latitude, longitude: position.coords.longitude })
    }, err => {
      setLocating(false)
      const message = err.code === 1 ? 'Location permission was denied. You can search for a city instead.' : 'Could not determine your location. Please try again.'
      setError(message); reject(new Error(message))
    }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 })
  })
  return { locate, locating, locationError: error }
}