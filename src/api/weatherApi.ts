import axios, { AxiosResponse } from 'axios';
import { WeatherResponse } from '@/@types/weather.type';

const fetchWeatherInfo = ({
  latitude,
  longitude,
}: GeolocationCoordinates): Promise<AxiosResponse<WeatherResponse>> => {
  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
      units: 'metric',
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
    },
  });

  return instance.get('weather');
};

export { fetchWeatherInfo };
