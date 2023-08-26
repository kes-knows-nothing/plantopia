import { useState, useEffect } from 'react';
import { WeatherResponse } from '@/@types/weather.types';
import { mockWeather } from '@/mock/weatherMock';
import { fetchWeatherInfo } from '@/api/weatherApi';

import weather from '@/assets/images/weather';
import LOCATION from '@/assets/images/icons/location.png';

interface WeatherContentType {
  imgSrc: string;
  title: string;
  content: string;
}

const weatherContents: { [code: string]: WeatherContentType } = {
  200: {
    imgSrc: weather.THUNDER,
    title: '천둥번개',
    content: '집에서 영화나 책을 보는 건 어떨까요?',
  },
  300: {
    imgSrc: weather.RAIN,
    title: '한때 비',
    content: '오늘은 창밖으로 빗소리가 들리겠어요.',
  },
  500: {
    imgSrc: weather.SHOWER,
    title: '비',
    content: '실내에서 빗소리를 감상해보세요.',
  },
  600: {
    imgSrc: weather.SNOW,
    title: '눈',
    content: '눈사람을 만들어보는건 어떨까요?',
  },
  800: {
    imgSrc: weather.SUN,
    title: '맑음',
    content: '맑은 날, 기분 좋은 하루를 보내세요.',
  },
  801: {
    imgSrc: weather.SUN_CLOUD,
    title: '구름 조금',
    content: '가볍게 산책하며 시간을 보내보세요.',
  },
  802: {
    imgSrc: weather.SUN_CLOUD,
    title: '구름 조금',
    content: '가볍게 산책하며 시간을 보내보세요.',
  },
  803: {
    imgSrc: weather.CLOUD,
    title: '흐림',
    content: '음악을 들으며 여유를 느껴보세요.',
  },
  804: {
    imgSrc: weather.CLOUD,
    title: '흐림',
    content: '음악을 들으며 여유를 느껴보세요.',
  },
};

const WeatherSection = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse>(mockWeather);

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      // 위치 정보 서비스를 지원하는 경우
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          fetchWeatherInfo(coords);
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

  const generateTempFormat = (temp: number) => `${Math.floor(temp)}°`;

  useEffect(() => {
    getUserLocation();
  }, []);

  const { imgSrc, title, content } = weatherContents[weatherInfo.weather[0].id];

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
