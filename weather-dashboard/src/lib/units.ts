import type { TemperatureUnit } from '../types/weather'
export const temperature = (value: number, unit: TemperatureUnit) => Math.round(unit === 'fahrenheit' ? value * 9 / 5 + 32 : value)
export const tempLabel = (value: number, unit: TemperatureUnit) => `${temperature(value, unit)}°`
export const windDirection = (degrees: number) => {
  const directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW']
  return directions[Math.round(degrees / 22.5) % 16]
}
export const formatHour = (time: string, timezone?: string) => new Intl.DateTimeFormat('en', { hour: 'numeric', timeZone: timezone }).format(new Date(time))
export const formatDay = (time: string, timezone?: string) => new Intl.DateTimeFormat('en', { weekday: 'short', timeZone: timezone }).format(new Date(time))
export const formatClock = (time: string, timezone?: string) => new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', timeZone: timezone }).format(new Date(time))
export const aqiLabel = (aqi: number) => aqi <= 20 ? 'Good' : aqi <= 40 ? 'Fair' : aqi <= 60 ? 'Moderate' : aqi <= 80 ? 'Poor' : aqi <= 100 ? 'Very poor' : 'Extremely poor'
export const aqiColor = (aqi: number) => aqi <= 20 ? 'bg-emerald-400' : aqi <= 40 ? 'bg-lime-400' : aqi <= 60 ? 'bg-amber-400' : aqi <= 80 ? 'bg-orange-500' : aqi <= 100 ? 'bg-rose-500' : 'bg-purple-600'