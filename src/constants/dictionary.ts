import { RecommendProps } from '@/@types/dictionary.type';
import { codeToImg } from '@/utils/dictionaryUtil';
import SUN_ON_ICON from '@/assets/images/icons/dict_sun_on.png';
import SUN_OFF_ICON from '@/assets/images/icons/dict_sun_off.png';
import WATER_ON_ICON from '@/assets/images/icons/dict_water_on.png';
import WATER_OFF_ICON from '@/assets/images/icons/dict_water_off.png';
import PLANT1_ICON from '@/assets/images/icons/dict_plant1.png';
import PLANT2_ICON from '@/assets/images/icons/dict_plant2.png';
import WATER_ICON from '@/assets/images/icons/dict_water2.png';
import MOON_ICON from '@/assets/images/icons/dict_moon.png';

const codeInfo = {
  HC: '',
  HC01: '~ 40%',
  HC02: '40 ~ 70%',
  HC03: '70% ~ 100%',
  RC: '',
  RC01: '초보자',
  RC02: '경험자',
  RC03: '전문가',
  TC: '',
  TC01: '10 ~ 15℃',
  TC02: '16 ~ 20℃',
  TC03: '21 ~ 25℃',
  TC04: '26 ~ 30℃',
  LC: '',
  LC01: codeToImg([SUN_ON_ICON, SUN_OFF_ICON, SUN_OFF_ICON]),
  LC02: codeToImg([SUN_ON_ICON, SUN_ON_ICON, SUN_OFF_ICON]),
  LC03: codeToImg([SUN_ON_ICON, SUN_ON_ICON, SUN_ON_ICON]),
  WC: '',
  WC01: codeToImg([WATER_ON_ICON, WATER_ON_ICON, WATER_ON_ICON]),
  WC02: codeToImg([WATER_ON_ICON, WATER_ON_ICON, WATER_OFF_ICON]),
  WC03: codeToImg([WATER_ON_ICON, WATER_OFF_ICON, WATER_OFF_ICON]),
};

const targetQuery = {
  beginner: ['recommendCode', 'RC01'],
  growWell: ['growCode', 'GC01'],
  lessWater: ['waterCode', 'WC03'],
  dark: ['lightCode', 'LC01'],
};

const recommend: RecommendProps[] = [
  { icon: PLANT1_ICON, title: '식린이를 위한 추천 식물!', target: 'beginner' },
  {
    icon: PLANT2_ICON,
    title: '쑥쑥 자라는 식물만 모았어요.',
    target: 'growWell',
  },
  {
    icon: WATER_ICON,
    title: '물을 조금만 줘도 잘 자라요.',
    target: 'lessWater',
  },
  { icon: MOON_ICON, title: '어두운 집에서도 OK!', target: 'dark' },
];

const targetClassName = {
  beginner: 'img_wrapper_white',
  growWell: 'img_wrapper_navy',
  lessWater: 'img_wrapper_blue',
  dark: 'img_wrapper_gray',
};

export { codeInfo, targetQuery, recommend, targetClassName };
