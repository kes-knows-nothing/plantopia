import { useState, useEffect } from 'react';
import { WeatherResponse } from '@/@types/weather.type';
import { fetchWeatherInfo } from '@/api/weatherApi';
import { weatherContents } from '@/constants/weather';

import { mockWeather } from '@/mock/weatherMock';
import LOCATION from '@/assets/images/icons/location.png';

const WeatherSection = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse>(mockWeather);

  const generateTempFormat = (temp: number) => `${Math.floor(temp)}°`;

  const getWeatherContent = (code: number) => {
    if (weatherContents[code]) {
      return weatherContents[code];
    }

    const commonCode = code - (code % 100);
    return weatherContents[commonCode];
  };

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      // 위치 정보 서비스를 지원하는 경우
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { data: weatherData } = await fetchWeatherInfo(coords);
          setWeatherInfo(weatherData);
        },
        ({ code }) => {
          if (code === 1) {
            throw new Error('위치 정보 수집을 거부하였습니다.');
          }

          throw new Error('알 수 없는 에러가 발생하였습니다.');
        },
      );
    } else {
      // 위치 정보 서비스를 지원하지 않는 경우
      throw new Error('위치 정보를 지원하지 않는 환경입니다.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const { imgSrc, title, content } = getWeatherContent(
    weatherInfo.weather[0].id,
  );

  return (
    <div className="weather_wrapper">
      <div className="text_wrapper">
        <div className="location_wrapper">
          <img src={LOCATION} className="weather_icon" alt="location" />
          <span className="text">{weatherInfo.name}</span>
        </div>
        <div className="weather_text_box temperature_wrapper">
          <span className="text_lg">
            {title} {generateTempFormat(weatherInfo.main.temp)}
          </span>
          <span className="text_sm">
            {generateTempFormat(weatherInfo.main.temp_max)}
          </span>
          <span className="text_sm">
            {generateTempFormat(weatherInfo.main.temp_min)}
          </span>
        </div>
        <div className="weather_text_box">{content}</div>
      </div>
      <img src={imgSrc} className="weather_icon" alt="weather" />
    </div>
  );
};

export default WeatherSection;
