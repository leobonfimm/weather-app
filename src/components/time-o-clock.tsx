import { useWeather } from '@/context/weather-provider'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

export function TimeOClock() {
  const { weatherCityInfo, isCelsiusSelected } = useWeather()
  const { location, current } = weatherCityInfo

  if (!location || !current) {
    return (
      <div className="w-[450px] h-[272px] bg-gray-400 text-white border-none p-6 rounded-md flex flex-col justify-between items-center">
        <Skeleton className="w-[250px] h-[30px]" />
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  const currentTemp = isCelsiusSelected
    ? `${current.temp_c}°C`
    : `${current.temp_f}°F`

  return (
    <Card className="w-[450px] bg-gray-400 text-white border-none">
      <CardHeader className="font-bold text-center text-2xl">
        {location.name} - {location.region}, {location.country}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <img src={current.condition.icon} alt="" width={100} height={100} />
        <strong className="text-center text-4xl">{currentTemp}</strong>
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <time className="text-center text-xl" dateTime={location.localtime}>
          {new Intl.DateTimeFormat('en-US', {
            timeStyle: 'short',
          }).format(new Date(location.localtime))}
        </time>
        <span>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
          }).format(new Date(location.localtime))}
        </span>
      </CardFooter>
    </Card>
  )
}
