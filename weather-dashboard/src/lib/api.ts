import type { AirQualityResponse, GeoLocation, WeatherResponse } from '../types/weather'
const BASE = 'https://api.open-meteo.com/v1/forecast'
const AIR = 'https://air-quality-api.open-meteo.com/v1/air-quality'
const GEO = 'https://geocoding-api.open-meteo.com/v1/search'
async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(response.status === 404 ? 'The requested data could not be found.' : `Weather service error (${response.status}).`)
  return response.json() as Promise<T>
}
export async function searchCities(query: string, signal?: AbortSignal): Promise<GeoLocation[]> {
  const params = new URLSearchParams({ name: query, count: '7', language: 'en', format: 'json' })
  const data = await request<{ results?: GeoLocation[] }>(`${GEO}?${params}`, signal)
  return data.results ?? []
}
export async function fetchWeather(location: GeoLocation, signal?: AbortSignal): Promise<{ weather: WeatherResponse; air: AirQualityResponse | null }> {
  const common = { latitude: String(location.latitude), longitude: String(location.longitude), timezone: 'auto' }
  const weatherParams = new URLSearchParams({ ...common, current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m', hourly: 'temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,relative_humidity_2m,wind_speed_10m,visibility,uv_index', daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max,wind_speed_10m_max', forecast_days: '7', forecast_hours: '48', wind_speed_unit: 'kmh' })
  const airParams = new URLSearchParams({ ...common, current: 'european_aqi,us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide' })
  const [weather, air] = await Promise.all([request<WeatherResponse>(`${BASE}?${weatherParams}`, signal), request<AirQualityResponse>(`${AIR}?${airParams}`, signal).catch(() => null)])
  return { weather, air }
}