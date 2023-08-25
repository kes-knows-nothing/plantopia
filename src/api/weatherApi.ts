import { WeatherResponse } from '@/@types/weather.types';
import axios, { AxiosResponse, AxiosError } from 'axios';

const fetchWeatherInfo = ({
  latitude,
  longitude,
}: GeolocationCoordinates): Promise<
  AxiosResponse<WeatherResponse> | AxiosError
> => {
  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
      units: 'metric',
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
    },
  });

  return instance
    .get('weather')
    .then(res => {
      const data: WeatherResponse = res.data;
      return data;
    })
    .catch(err => err);
};

export { fetchWeatherInfo };
