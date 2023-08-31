import weather from '@/assets/images/weather';

interface WeatherContentType {
  imgSrc: string;
  title: string;
  description: string;
}

/*
 * 날씨 코드 200 ~ 800까지 (400대 코드는 정의되어있지 않은 코드)
 */
export const weatherContents: { [code: string]: WeatherContentType } = {
  200: {
    imgSrc: weather.THUNDER,
    title: '천둥번개',
    description: '집에서 영화나 책을 보는 건 어떨까요?',
  },
  300: {
    imgSrc: weather.RAIN,
    title: '한때 비',
    description: '오늘은 창밖으로 빗소리가 들리겠어요',
  },
  500: {
    imgSrc: weather.SHOWER,
    title: '비',
    description: '실내에서 빗소리를 감상해보세요',
  },
  600: {
    imgSrc: weather.SNOW,
    title: '눈',
    description: '눈사람을 만들어보는건 어떨까요?',
  },
  700: {
    imgSrc: weather.FOG,
    title: '안개',
    description: '차분하고 평온한 하루를 보내세요',
  },
  800: {
    imgSrc: weather.SUN,
    title: '맑음',
    description: '맑은 날, 기분 좋은 하루를 보내세요',
  },
  801: {
    imgSrc: weather.SUN_CLOUD,
    title: '구름 조금',
    description: '가볍게 산책하며 시간을 보내보세요',
  },
  802: {
    imgSrc: weather.SUN_CLOUD,
    title: '구름 조금',
    description: '가볍게 산책하며 시간을 보내보세요',
  },
  803: {
    imgSrc: weather.CLOUD,
    title: '흐림',
    description: '음악을 들으며 여유를 느껴보세요',
  },
  804: {
    imgSrc: weather.CLOUD,
    title: '흐림',
    description: '음악을 들으며 여유를 느껴보세요',
  },
};
