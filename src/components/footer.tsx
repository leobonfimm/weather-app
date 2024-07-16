import { useWeather } from '@/context/weather-provider'
import { differenceInHours, getHours } from 'date-fns'
import { HourForecast } from './hour-forecast'
import { Card, CardContent, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

export function Footer() {
  const { weatherCityInfo, isCelsiusSelected } = useWeather()
  const { forecast } = weatherCityInfo

  if (!forecast) {
    return (
      <div className="bg-gray-400 border-none p-6 rounded-md flex flex-col justify-between items-center">
        <Skeleton className="w-[250px] h-[30px] text-center" />
        <div className="flex gap-1 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 flex-1 justify-center items-center bg-gray-600 rounded-md p-2 h-[208px] w-[153px]"
            >
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const weatherInfoHour = forecast.forecastday[0].hour.filter((info) => {
    const moreThan3Hours =
      differenceInHours(new Date(), new Date(info.time)) < 3
    const lessThan3Hours =
      differenceInHours(new Date(), new Date(info.time)) > -3
    const differentCurrentTime =
      getHours(new Date()) !== getHours(new Date(info.time))

    return moreThan3Hours && lessThan3Hours && differentCurrentTime
  })

  return (
    <footer className="w-full">
      <Card className="bg-gray-400">
        <CardHeader className="font-bold text-center text-white text-2xl">
          Hourly Forecast
        </CardHeader>
        <CardContent className="flex items-center gap-1 justify-between">
          {weatherInfoHour.map((info) => (
            <HourForecast
              key={info.time}
              time={info.time}
              temp={isCelsiusSelected ? info.temp_c : info.temp_f}
              wind_speed={isCelsiusSelected ? info.wind_kph : info.wind_mph}
              icon={info.condition.icon}
            />
          ))}
        </CardContent>
      </Card>
    </footer>
  )
}
