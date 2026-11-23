import { Sun, CloudSun, Cloud, CloudDrizzle, CloudRain, CloudLightning, Snowflake, CloudFog, Moon, CloudMoon, type LucideIcon } from 'lucide-react'
export type WeatherMeta = { label: string; icon: LucideIcon; tone: string; kind: 'sunny'|'cloudy'|'rain'|'storm'|'snow'|'fog'|'night' }
export function getWeatherMeta(code: number, isDay = true): WeatherMeta {
  if (!isDay && code <= 1) return { label: code === 0 ? 'Clear night' : 'Partly cloudy', icon: code === 0 ? Moon : CloudMoon, tone: 'text-indigo-300', kind: 'night' }
  if (code === 0) return { label: 'Clear sky', icon: Sun, tone: 'text-amber-400', kind: 'sunny' }
  if (code <= 2) return { label: 'Partly cloudy', icon: CloudSun, tone: 'text-amber-300', kind: 'cloudy' }
  if (code === 3) return { label: 'Overcast', icon: Cloud, tone: 'text-slate-300', kind: 'cloudy' }
  if ([45,48].includes(code)) return { label: 'Foggy', icon: CloudFog, tone: 'text-slate-300', kind: 'fog' }
  if ([51,53,55,56,57].includes(code)) return { label: 'Drizzle', icon: CloudDrizzle, tone: 'text-sky-300', kind: 'rain' }
  if ([61,63,65,66,67,80,81,82].includes(code)) return { label: 'Rain', icon: CloudRain, tone: 'text-sky-300', kind: 'rain' }
  if ([71,73,75,77,85,86].includes(code)) return { label: 'Snow', icon: Snowflake, tone: 'text-cyan-200', kind: 'snow' }
  if ([95,96,99].includes(code)) return { label: 'Thunderstorm', icon: CloudLightning, tone: 'text-violet-300', kind: 'storm' }
  return { label: 'Cloudy', icon: Cloud, tone: 'text-slate-300', kind: 'cloudy' }
}