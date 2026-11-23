import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, ArrowDown, ArrowUp, CloudSun, Droplets, Gauge, Heart, LocateFixed, MapPin, Moon, RefreshCw, Search, Sun, Sunrise, Sunset, Wind, X, Eye, CloudRain, Clock3, Cloud, Sparkles } from 'lucide-react'
import { TemperatureChart, RainChart } from './components/WeatherCharts'
import { useWeather } from './hooks/useWeather'
import { useFavorites } from './hooks/useFavorites'
import { useGeolocation } from './hooks/useGeolocation'
import { searchCities } from './lib/api'
import { aqiColor, aqiLabel, formatClock, formatDay, formatHour, tempLabel, windDirection } from './lib/units'
import { getWeatherMeta } from './lib/weatherCodes'
import type { GeoLocation, TemperatureUnit, ThemeMode } from './types/weather'

function App() {
  const { bundle, loading, refreshing, error, load, retry } = useWeather()
  const { favorites, add, remove, has } = useFavorites()
  const { locate, locating, locationError } = useGeolocation()
  const [query,setQuery]=useState(''); const [suggestions,setSuggestions]=useState<GeoLocation[]>([]); const [searching,setSearching]=useState(false)
  const [unit,setUnit]=useState<TemperatureUnit>(()=>(localStorage.getItem('atmos-unit') as TemperatureUnit)||'celsius')
  const [mode,setMode]=useState<ThemeMode>(()=>(localStorage.getItem('atmos-mode') as ThemeMode)||'dark')
  const [favoriteTemps,setFavoriteTemps]=useState<Record<number,number>>({})
  const [searchError,setSearchError]=useState('')
  const searchRef=useRef<HTMLDivElement>(null)
  const weather=bundle?.weather; const current=weather?.current; const daily=weather?.daily
  const meta= current ? getWeatherMeta(current.weather_code, current.is_day===1) : null
  const themeKind=meta?.kind ?? 'cloudy'
  useEffect(()=>{document.documentElement.dataset.theme=mode;localStorage.setItem('atmos-mode',mode)},[mode])
  useEffect(()=>{localStorage.setItem('atmos-unit',unit)},[unit])
  useEffect(()=>{if(!query.trim()){setSuggestions([]);return}const controller=new AbortController();const timer=window.setTimeout(async()=>{try{setSearching(true);setSearchError('');setSuggestions(await searchCities(query.trim(),controller.signal))}catch(e){if(!controller.signal.aborted)setSearchError('Could not search cities. Check your connection.')}finally{setSearching(false)}},280);return()=>{controller.abort();window.clearTimeout(timer)}},[query])
  useEffect(()=>{const close=(e:MouseEvent)=>{if(!searchRef.current?.contains(e.target as Node))setSuggestions([])};document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close)},[])
  useEffect(()=>{favorites.forEach(async city=>{try{const {weather:w}=await import('./lib/api').then(m=>m.fetchWeather(city));setFavoriteTemps(old=>({...old,[city.id]:w.current.temperature_2m}))}catch{/* Keep the last visible favorite temperature. */}})},[favorites])
  const choose=(city:GeoLocation)=>{setQuery('');setSuggestions([]);setSearchError('');void load(city)}
  const useMyLocation=async()=>{try{const city=await locate();choose(city)}catch{/* locationError is shown below the search bar */}}
  const toggleFavorite=()=>{if(!bundle)return;has(bundle.location)?remove(bundle.location.id):add(bundle.location)}
  const hourly=useMemo(()=>weather?.hourly.time.slice(0,24).map((time,i)=>({time,temp:weather.hourly.temperature_2m[i],code:weather.hourly.weather_code[i],rain:weather.hourly.precipitation_probability[i]}))??[],[weather])
  const aqi=bundle?.air?.current?.european_aqi
  const airColor=aqi===undefined?'bg-slate-400':aqiColor(aqi)
  const bgClass=`weather-bg ${themeKind} ${mode}`
  return <main className={bgClass}>
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    <div className="dashboard-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Atmos home"><span className="brand-mark"><CloudSun size={20}/></span><span>atmos<span className="brand-dot">.</span></span></a>
        <div className="top-actions">
          <button className="icon-button" onClick={()=>setUnit(unit==='celsius'?'fahrenheit':'celsius')} aria-label={unit==='celsius'?'Switch to Fahrenheit':'Switch to Celsius'} title="Temperature unit"><span className={unit==='celsius'?'selected':''}>°C</span><span className="unit-divider">/</span><span className={unit==='fahrenheit'?'selected':''}>°F</span></button>
          <button className="icon-button" onClick={()=>setMode(mode==='dark'?'light':'dark')} aria-label={mode==='dark'?'Switch to light mode':'Switch to dark mode'} title="Toggle appearance">{mode==='dark'?<Sun size={17}/>:<Moon size={17}/>}</button>
          <button className="icon-button" onClick={()=>retry?.()} aria-label="Refresh weather" title="Refresh"><RefreshCw size={16} className={refreshing?'spin':''}/></button>
        </div>
      </header>

      <section className="welcome-row"><div><p className="eyebrow"><span className="live-dot"/> LIVE WEATHER · OPEN-METEO</p><h1>Weather, <em>beautifully</em> clear.</h1><p className="subtitle">A little more sunshine in your day starts here.</p></div><div className="updated">{refreshing?'Updating…':bundle?<>Updated {new Intl.DateTimeFormat('en',{hour:'numeric',minute:'2-digit'}).format(new Date(bundle.fetchedAt))}</>:''}</div></section>

      <section className="search-row">
        <div className="search-wrap" ref={searchRef}><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Escape')setSuggestions([]);if(e.key==='Enter'&&suggestions[0])choose(suggestions[0]);if(e.key==='ArrowDown'&&suggestions.length)document.getElementById('suggestion-0')?.focus()}} placeholder="Search country, city, state, continent or place…" aria-label="Search country, city, state, continent or place" aria-autocomplete="list" aria-expanded={suggestions.length>0}/>{query&&<button className="clear-search" onClick={()=>{setQuery('');setSuggestions([])}} aria-label="Clear search"><X size={16}/></button>}
          {(suggestions.length>0||searching||searchError)&&<div className="suggestions" role="listbox">{searching&&<div className="suggestion-muted">Searching countries, cities, states and continents…</div>}{suggestions.map((city,i)=><button id={`suggestion-${i}`} role="option" aria-selected="false" className="suggestion" key={city.id} onClick={()=>choose(city)}><MapPin size={16}/><span>{city.name}<small>{[city.admin2,city.admin1,city.country,city.country_code,city.feature_code==='CONTINENT'?'Continent':city.feature_code==='COUNTRY_CAPITAL'?'Country centre':''].filter(Boolean).join(' · ')}</small></span></button>)}{!searching&&!suggestions.length&&!searchError&&query.length>1&&<div className="suggestion-muted">No matching places found. Try a country, city, state, continent or landmark name.</div>}{searchError&&<div className="suggestion-muted">{searchError}</div>}</div>}
        </div>
        <button className="location-button" onClick={useMyLocation} disabled={locating}><LocateFixed size={17}/>{locating?'Locating…':'Use my location'}</button>
      </section>
      {locationError&&<p className="inline-error">{locationError}</p>}
      {error&&<div className="error-banner" role="alert"><span>{error.includes('fetch')?'You appear to be offline.':error}</span><button onClick={()=>retry?.()}>Try again <RefreshCw size={14}/></button></div>}

      {loading&&!bundle?<div className="skeleton-grid"><div className="skeleton hero-skeleton"/><div className="skeleton side-skeleton"/><div className="skeleton wide-skeleton"/></div>:weather&&current&&daily&&bundle&&meta&&<div className="content-grid">
        <section className="panel current-panel">
          <div className="panel-top"><div className="location-heading"><MapPin size={15}/><span>{[bundle.location.name,bundle.location.admin2,bundle.location.admin1,bundle.location.country].filter(Boolean).join(', ')}</span><span className="now-pill">NOW</span></div><button className={has(bundle.location)?'favorite-button active':'favorite-button'} onClick={toggleFavorite} aria-label={has(bundle.location)?'Remove saved city':'Save city'} title={has(bundle.location)?'Remove from saved cities':'Save this city'}><Heart size={18} fill={has(bundle.location)?'currentColor':'none'}/></button></div>
          <div className="current-main"><div><div className="temperature">{tempLabel(current.temperature_2m,unit)}<span>{unit==='celsius'?'C':'F'}</span></div><p className="condition">{meta.label}</p><p className="feels">Feels like {tempLabel(current.apparent_temperature,unit)}</p></div><div className="weather-art"><meta.icon size={100} strokeWidth={1.25} className={`weather-icon ${meta.tone}`}/><span className="art-orbit orbit-a"/><span className="art-orbit orbit-b"/></div></div>
          <div className="high-low"><span><ArrowUp size={14}/> {tempLabel(daily.temperature_2m_max[0],unit)} <small>H</small></span><span><ArrowDown size={14}/> {tempLabel(daily.temperature_2m_min[0],unit)} <small>L</small></span><span className="high-low-separator"/><span><Droplets size={14}/> {current.relative_humidity_2m}% <small>humidity</small></span></div>
          <div className="condition-strip"><div><Wind/><span><b>{Math.round(current.wind_speed_10m)} km/h</b><small>{windDirection(current.wind_direction_10m)} wind</small></span></div><div><Gauge/><span><b>{Math.round(current.pressure_msl)} hPa</b><small>Pressure</small></span></div><div><Eye/><span><b>{Math.round((hourly[0]?.rain??0)*0+((weather.hourly.visibility[0]??0)/1000))} km</b><small>Visibility</small></span></div><div><Sparkles/><span><b>{weather.hourly.uv_index[0]?.toFixed(1)??'—'}</b><small>UV index</small></span></div></div>
          <div className="sun-times"><div><Sunrise size={19}/><span><small>Sunrise</small><b>{formatClock(daily.sunrise[0],weather.timezone)}</b></span></div><div><Sunset size={19}/><span><small>Sunset</small><b>{formatClock(daily.sunset[0],weather.timezone)}</b></span></div></div>
        </section>

        <section className="panel air-panel"><div className="section-heading"><div><p className="eyebrow">BREATHE EASY</p><h2>Air quality</h2></div><Activity size={20}/></div>{aqi!==undefined?<><div className="aqi-reading"><strong>{Math.round(aqi)}</strong><span>{aqiLabel(aqi)}</span></div><div className="aqi-track"><div className={airColor} style={{width:`${Math.min(100,aqi/150*100)}%`}}/></div><p className="air-note">European Air Quality Index</p><div className="pollutants"><div><small>PM2.5</small><b>{bundle.air?.current?.pm2_5?.toFixed(1)??'—'} <small>µg/m³</small></b></div><div><small>PM10</small><b>{bundle.air?.current?.pm10?.toFixed(1)??'—'} <small>µg/m³</small></b></div></div></>:<div className="air-unavailable"><Cloud size={25}/><p>Air quality data is temporarily unavailable for this location.</p></div>}</section>

        <section className="panel hourly-panel"><div className="section-heading"><div><p className="eyebrow">THE NEXT 24 HOURS</p><h2>Hourly forecast</h2></div><Clock3 size={19}/></div><div className="hourly-strip">{hourly.map((item,i)=>{const Icon=getWeatherMeta(item.code,true).icon;return <div className="hour-item" key={item.time}><small>{i===0?'Now':formatHour(item.time,weather.timezone)}</small><Icon size={22} className={getWeatherMeta(item.code,true).tone}/><b>{tempLabel(item.temp,unit)}</b><span><Droplets size={11}/>{item.rain}%</span></div>})}</div><div className="chart-heading"><span>Temperature trend</span><small>Next 24 hours</small></div><TemperatureChart weather={weather} unit={unit}/></section>

        <section className="panel forecast-panel"><div className="section-heading"><div><p className="eyebrow">PLAN AHEAD</p><h2>7-day forecast</h2></div><span className="week-label">THIS WEEK</span></div><div className="forecast-list">{daily.time.map((day,i)=>{const Icon=getWeatherMeta(daily.weather_code[i],true).icon;return <div className="forecast-row" key={day}><b>{i===0?'Today':formatDay(day,weather.timezone)}</b><Icon size={21} className={getWeatherMeta(daily.weather_code[i],true).tone}/><span className="forecast-desc">{getWeatherMeta(daily.weather_code[i],true).label}</span><span className="rain-chance"><Droplets size={12}/>{daily.precipitation_probability_max[i]}%</span><div className="temp-range"><b>{tempLabel(daily.temperature_2m_max[i],unit)}</b><span/><small>{tempLabel(daily.temperature_2m_min[i],unit)}</small></div></div>})}</div></section>

        <section className="panel rain-panel"><div className="section-heading"><div><p className="eyebrow">DON'T FORGET YOUR UMBRELLA</p><h2>Precipitation</h2></div><CloudRain size={20}/></div><div className="rain-summary"><strong>{current.precipitation.toFixed(1)} <small>mm</small></strong><span>Right now</span></div><RainChart weather={weather}/></section>
      </div>}

      <section className="saved-section"><div className="saved-heading"><div><p className="eyebrow">YOUR PLACES</p><h2>Saved cities</h2></div><span>{favorites.length} saved</span></div>{favorites.length?<div className="saved-grid">{favorites.map(city=>{const t=favoriteTemps[city.id];return <div className="saved-card" key={city.id}><div><MapPin size={14}/><b>{city.name}</b><small>{city.country}</small></div><strong>{t===undefined?'—':tempLabel(t,unit)}</strong><button onClick={()=>remove(city.id)} aria-label={`Remove ${city.name}`}><X size={15}/></button><button className="saved-open" onClick={()=>choose(city)} aria-label={`Show weather for ${city.name}`}/></div>})}</div>:<div className="empty-saved"><Heart size={17}/><span>Save a city with the heart icon to keep an eye on the places you love.</span></div>}</section>
      <footer><span>Made for the curious skies.</span><span>Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span></footer>
    </div>
  </main>
}
export default App