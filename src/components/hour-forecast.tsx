import { useWeather } from '@/context/weather-provider'
import { Wind } from 'lucide-react'

interface HourForecastProps {
  time: string
  temp: number
  wind_speed: number
  icon: string
}

export function HourForecast({
  time,
  temp,
  wind_speed: windSpeed,
  icon,
}: HourForecastProps) {
  const { isCelsiusSelected } = useWeather()

  return (
    <div className="flex flex-col gap-2 flex-1 justify-center items-center bg-gray-600 text-white rounded-md p-2">
      <header>
        <time dateTime={time}>
          {new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
          }).format(new Date(time))}
        </time>
      </header>

      <img src={icon} alt="" />
      <span>{`${temp}${isCelsiusSelected ? '°C' : '°F'}`}</span>

      <Wind />
      <span>{`${windSpeed}${isCelsiusSelected ? 'km' : 'mp'}`}/h</span>
    </div>
  )
}
