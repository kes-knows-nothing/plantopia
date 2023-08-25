import { WeatherResponse } from '@/@types/weather.types';

export const mockWeather: WeatherResponse = {
  coord: {
    lon: 126.9027,
    lat: 37.623,
  },
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
  base: 'stations',
  main: {
    temp: 29.56,
    feels_like: 33.15,
    temp_min: 27.47,
    temp_max: 31.44,
    pressure: 1008,
    humidity: 66,
  },
  visibility: 10000,
  wind: {
    speed: 5.14,
    deg: 270,
  },
  clouds: {
    all: 40,
  },
  dt: 1692939584,
  sys: {
    type: 1,
    id: 8105,
    country: 'KR',
    sunrise: 1692910570,
    sunset: 1692958419,
  },
  timezone: 32400,
  id: 1842485,
  name: 'Goyang-si',
  cod: 200,
};
