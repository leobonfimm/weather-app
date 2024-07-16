import { api } from '@/lib/axios'

export interface TwelveHoursForecasts {
  DateTime: Date
  WeatherIcon: number
  Temperature: {
    Value: number
    Unit: string
  }
}

export async function get12HoursForecasts(cityId: string) {
  const response = await api.get<TwelveHoursForecasts[]>(
    `forecasts/v1/hourly/12hour/${cityId}`,
  )

  return response.data
}
