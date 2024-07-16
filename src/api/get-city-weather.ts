import { api } from '@/lib/axios'

interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  localtime: string
}

interface Condition {
  icon: string
}

interface Current {
  temp_c: number
  temp_f: number
  condition: Condition
}

interface Hour {
  time: string
  temp_c: number
  temp_f: number
  wind_mph: number
  wind_kph: number
  condition: Condition
}

interface Forecast {
  forecastday: Array<{
    hour: Hour[]
  }>
}

export interface City {
  location: Location
  current: Current
  forecast: Forecast
}

export async function getCityWeather(city: string) {
  const response = await api.get<City>('forecast.json', {
    params: {
      q: city,
      days: 1,
    },
  })

  return response.data
}
