import { getCityWeather } from '@/api/get-city-weather'
import { useWeather } from '@/context/weather-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

const citySchema = z.object({
  name: z.string().min(1),
})

type CitySchema = z.infer<typeof citySchema>

export function Header() {
  const {
    onHandleSetWeatherCityInfo,
    onHandleChangeMeasure,
    isCelsiusSelected,
    onHandleGeoLocation,
  } = useWeather()
  const { register, handleSubmit, reset } = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
  })

  async function handleSearchCity(data: CitySchema) {
    try {
      const response = await getCityWeather(data.name)
      onHandleSetWeatherCityInfo(response)
    } catch (error) {
      toast.error('City not found, check if you typed correctly.')
    }
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          onHandleGeoLocation({ latitude, longitude })
        },

        (error) => {
          toast.error(`Error get user location: ${error}`)
        },
      )
    } else {
      toast.error('Geolocation is not supported by this browser')
    }

    reset()
  }

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-white">
        <Label htmlFor="measure-type">°F</Label>
        <Switch
          id="measure-type"
          className="data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-yellow-600"
          checked={isCelsiusSelected}
          onCheckedChange={onHandleChangeMeasure}
        />
        <Label htmlFor="measure-type">°C</Label>
      </div>

      <form
        onSubmit={handleSubmit(handleSearchCity)}
        className="flex items-center gap-4 justify-between w-full"
      >
        <Input
          className="flex-1"
          placeholder="Search for your city..."
          {...register('name')}
        />

        <Button type="submit" className="flex items-center gap-2">
          <Search size={20} />
          Search
        </Button>

        <Button
          type="button"
          variant="link"
          onClick={getUserLocation}
          className="flex items-center gap-2 text-white"
        >
          <MapPin size={20} />
          Use my current location
        </Button>
      </form>
    </header>
  )
}
