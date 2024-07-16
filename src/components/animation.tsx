import Lottie from 'react-lottie'

import { useWeather } from '@/context/weather-provider'
import { Loader2 } from 'lucide-react'
import coldAnimation from '../assets/cold.json'
import springAnimation from '../assets/spring.json'
import sunnyAnimation from '../assets/sunny.json'

const ANIMATION_DATA = {
  cold: coldAnimation,
  spring: springAnimation,
  sunny: sunnyAnimation,
} as const

export function Animation() {
  const {
    weatherCityInfo: { current },
  } = useWeather()

  if (!current)
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader2 size={48} className="animate-spin" />
      </div>
    )

  const categorizeTemperature = (): 'cold' | 'spring' | 'sunny' => {
    if (current.temp_c < 18) {
      return 'cold'
    } else if (current.temp_c >= 18 && current.temp_c <= 27) {
      return 'spring'
    } else if (current.temp_c > 27) {
      return 'sunny'
    }

    return 'cold'
  }

  const animationOptions = {
    animationData: ANIMATION_DATA[categorizeTemperature()],
    loop: true,
    autoplay: true,
  }

  return (
    <div className="flex items-center justify-center">
      <Lottie options={animationOptions} width={400} height={200} />
    </div>
  )
}
