import { Toaster } from 'sonner'
import { Animation } from './components/animation'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { TimeOClock } from './components/time-o-clock'
import { WeatherProvider } from './context/weather-provider'
import './globals.css'

export function App() {
  return (
    <WeatherProvider>
      <main className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full bg-gray-700 rounded-md p-8 flex flex-col gap-3">
          <Header />

          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <TimeOClock />
              <Animation />
            </div>

            <Footer />
          </div>
        </div>
      </main>
      <Toaster richColors />
    </WeatherProvider>
  )
}
