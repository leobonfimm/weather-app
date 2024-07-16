import { City, getCityWeather } from '@/api/get-city-weather'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface GeoLocation {
  latitude: number
  longitude: number
}

interface WeatherContext {
  weatherCityInfo: City
  isCelsiusSelected: boolean
  onHandleSetWeatherCityInfo: (city: City) => Promise<void>
  onHandleChangeMeasure: () => void
  onHandleGeoLocation: (position: GeoLocation) => void
}

const WeatherContext = createContext({} as WeatherContext)

interface WeatherProviderProps {
  children: ReactNode
}

export function WeatherProvider({ children }: WeatherProviderProps) {
  const [weatherCityInfo, setWeatherCityInfo] = useState<City>({} as City)
  const [isCelsiusSelected, setIsCelsiusSelected] = useState(true)

  useEffect(() => {
    getCityWeather('brasilia').then((response) => setWeatherCityInfo(response))
  }, [])

  async function onHandleSetWeatherCityInfo(city: City) {
    setWeatherCityInfo(city)
  }

  function onHandleChangeMeasure() {
    setIsCelsiusSelected(!isCelsiusSelected)
  }

  function onHandleGeoLocation(position: GeoLocation) {
    const { latitude, longitude } = position
    getCityWeather(`${latitude},${longitude}`).then((response) =>
      setWeatherCityInfo(response),
    )
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherCityInfo,
        onHandleSetWeatherCityInfo,
        isCelsiusSelected,
        onHandleChangeMeasure,
        onHandleGeoLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)

  return context
}
