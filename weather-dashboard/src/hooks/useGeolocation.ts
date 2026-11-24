import { useState } from 'react'
import type { GeoLocation } from '../types/weather'

type ReverseResult = {
  city?: string
  locality?: string
  principalSubdivision?: string
  countryName?: string
  countryCode?: string
  localityInfo?: { administrative?: Array<{ name?: string; description?: string }> }
}

export function useGeolocation() {
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')

  const locate = () => new Promise<GeoLocation>((resolve, reject) => {
    if (!navigator.geolocation) {
      const message = 'Location is not available in this browser. Please search for your city.'
      setError(message)
      reject(new Error(message))
      return
    }

    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords
      let details: ReverseResult = {}
      try {
        const params = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          localityLanguage: 'en'
        })
        const response = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?' + params.toString(), {
          headers: { Accept: 'application/json' }
        })
        if (response.ok) details = await response.json() as ReverseResult
      } catch {
        // Coordinates remain usable if reverse lookup is temporarily unavailable.
      }

      const administrative = details.localityInfo?.administrative ?? []
      const district = administrative.find(item => /district|county/i.test(item.description ?? ''))?.name
      const city = details.city || details.locality || administrative[0]?.name || 'Nearby location'
      const state = details.principalSubdivision || administrative[1]?.name
      const location: GeoLocation = {
        id: Date.now(),
        name: city,
        country: details.countryName || '',
        country_code: details.countryCode,
        admin1: state,
        admin2: district,
        latitude,
        longitude,
        timezone: 'auto',
        feature_code: 'CURRENT_LOCATION'
      }
      setLocating(false)
      resolve(location)
    }, err => {
      setLocating(false)
      let message = 'Could not get your location. Check that Location is enabled, then try again.'
      if (err.code === 1) message = 'Location permission is blocked. Allow location access for this site in your browser settings, then retry.'
      else if (err.code === 2) message = 'Your device could not determine its position. Turn on device Location and try again.'
      else if (err.code === 3) message = 'Location lookup timed out. Move to an area with better GPS signal and retry.'
      setError(message)
      reject(new Error(message))
    }, {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 60000
    })
  })

  return { locate, locating, locationError: error }
}
