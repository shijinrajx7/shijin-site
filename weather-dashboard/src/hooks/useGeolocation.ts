import { useState } from 'react'
import type { GeoLocation } from '../types/weather'

type ReverseResult = {
  city?: string; locality?: string; principalSubdivision?: string;
  countryName?: string; countryCode?: string; localityInfo?: { administrative?: Array<{ name?: string }> }
}

export function useGeolocation() {
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const locate = () => new Promise<GeoLocation>((resolve, reject) => {
    if (!navigator.geolocation) {
      const message = 'Your browser does not support location services.'
      setError(message); reject(new Error(message)); return
    }
    setLocating(true); setError('')
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords
      let details: ReverseResult = {}
      try {
        const params = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), localityLanguage: 'en' })
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`)
        if (response.ok) details = await response.json() as ReverseResult
      } catch { /* Coordinates still let the weather service work if reverse lookup is unavailable. */ }
      const administrative = details.localityInfo?.administrative ?? []
      const city = details.city || details.locality || 'Your location'
      const state = details.principalSubdivision || administrative[0]?.name
      setLocating(false)
      resolve({
        id: Date.now(), name: city,
        country: details.countryName || '',
        country_code: details.countryCode,
        admin1: state, latitude, longitude
      })
    }, err => {
      setLocating(false)
      const message = err.code === 1 ? 'Location permission was denied. You can search for a city instead.' : 'Could not determine your location. Please try again.'
      setError(message); reject(new Error(message))
    }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 })
  })
  return { locate, locating, locationError: error }
}
