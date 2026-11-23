import type { AirQualityResponse, GeoLocation, WeatherResponse } from '../types/weather'
const BASE = 'https://api.open-meteo.com/v1/forecast'
const AIR = 'https://air-quality-api.open-meteo.com/v1/air-quality'
const GEO = 'https://geocoding-api.open-meteo.com/v1/search'

const specialPlaces: Array<{ name: string; country: string; admin1: string; admin2: string; latitude: number; longitude: number; aliases: string[] }> = [
  { name: 'Ooty (Udhagamandalam)', country: 'India', admin1: 'Tamil Nadu', admin2: 'The Nilgiris', latitude: 11.4102, longitude: 76.6950, aliases: ['ooty', 'udhagamandalam', 'ootacamund'] },
]

const continents: Array<{ name: string; latitude: number; longitude: number; aliases: string[] }> = [
  { name: 'Africa', latitude: 0, longitude: 20, aliases: ['africa'] },
  { name: 'Antarctica', latitude: -82, longitude: 0, aliases: ['antarctica', 'antartica', 'south pole'] },
  { name: 'Asia', latitude: 34, longitude: 100, aliases: ['asia'] },
  { name: 'Europe', latitude: 50, longitude: 15, aliases: ['europe'] },
  { name: 'North America', latitude: 45, longitude: -100, aliases: ['north america', 'n america'] },
  { name: 'South America', latitude: -15, longitude: -60, aliases: ['south america', 's america'] },
  { name: 'Oceania', latitude: -25, longitude: 135, aliases: ['oceania', 'australia and oceania'] },
]

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(response.status === 404 ? 'The requested data could not be found.' : `Weather service error (${response.status}).`)
  return response.json() as Promise<T>
}

type CountryResult = {
  name: { common: string; official?: string }
  cca2: string
  capital?: string[]
  capitalInfo?: { latlng?: [number, number] }
  latlng?: [number, number]
  region?: string
  subregion?: string
}

export async function searchCities(query: string, signal?: AbortSignal): Promise<GeoLocation[]> {
  const normalized = query.trim().toLowerCase()
  const specialMatches = specialPlaces
    .filter(place => place.aliases.some(alias => alias.includes(normalized) || normalized.includes(alias)))
    .map((place, index): GeoLocation => ({
      id: -3000 - index, name: place.name, country: place.country, admin1: place.admin1,
      admin2: place.admin2, latitude: place.latitude, longitude: place.longitude,
      timezone: 'Asia/Kolkata', feature_code: 'LOCAL_ALIAS'
    }))

  const continentMatches = continents
    .filter(item => item.aliases.some(alias => alias.includes(normalized) || normalized.includes(alias)))
    .map((item, index): GeoLocation => ({
      id: -1000 - index, name: item.name, country: 'Continent', admin1: 'Continent-wide weather view',
      latitude: item.latitude, longitude: item.longitude, timezone: 'auto', feature_code: 'CONTINENT'
    }))

  const params = new URLSearchParams({ name: query, count: '15', language: 'en', format: 'json' })
  const geoPromise = request<{ results?: GeoLocation[] }>(`${GEO}?${params}`, signal)
    .then(data => data.results ?? [])
    .catch(error => { if (signal?.aborted) throw error; return [] })

  // Country capitals provide a reliable weather-search coordinate for country-name queries.
  const countryPromise = fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=name,cca2,capital,capitalInfo,latlng,region,subregion`, {
    signal, headers: { Accept: 'application/json' }
  }).then(async response => {
    if (!response.ok) return []
    return await response.json() as CountryResult[]
  }).then((countries): GeoLocation[] => countries.slice(0, 8).flatMap((country, index) => {
    const coordinates = country.capitalInfo?.latlng ?? country.latlng
    if (!coordinates || coordinates.length < 2) return []
    const [latitude, longitude] = coordinates
    return [{
      id: -2000 - index - country.cca2.charCodeAt(0) * 10, name: country.capital?.[0] ?? country.name.common,
      country: country.name.common, country_code: country.cca2, admin1: country.region,
      admin2: country.subregion, latitude, longitude, feature_code: 'COUNTRY_CAPITAL'
    }]
  })).catch(error => { if (signal?.aborted) throw error; return [] })

  const [geo, countryResults] = await Promise.all([geoPromise, countryPromise])
  const all = [...specialMatches, ...continentMatches, ...countryResults, ...geo]
  const seen = new Set<string>()
  return all.filter(place => {
    const key = `${place.name.toLowerCase()}|${place.country.toLowerCase()}|${place.latitude.toFixed(2)}|${place.longitude.toFixed(2)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).slice(0, 18)
}

export async function fetchWeather(location: GeoLocation, signal?: AbortSignal): Promise<{ weather: WeatherResponse; air: AirQualityResponse | null }> {
  const common = { latitude: String(location.latitude), longitude: String(location.longitude), timezone: 'auto' }
  const weatherParams = new URLSearchParams({ ...common, current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m', hourly: 'temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,relative_humidity_2m,wind_speed_10m,visibility,uv_index', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max,wind_speed_10m_max', forecast_days: '7', forecast_hours: '48', wind_speed_unit: 'kmh' })
  const airParams = new URLSearchParams({ ...common, current: 'european_aqi,us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide' })
  const [weather, air] = await Promise.all([request<WeatherResponse>(`${BASE}?${weatherParams}`, signal), request<AirQualityResponse>(`${AIR}?${airParams}`, signal).catch(() => null)])
  return { weather, air }
}
