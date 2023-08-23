import React from 'react';
import Recommend from './Recommend';
import { TargetQuery } from './Recommend';
import InputForm from './InputForm';
import './DictPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import PLANT1_ICON from '@/assets/images/icons/dict_plant1.png';
import PLANT2_ICON from '@/assets/images/icons/dict_plant2.png';
import WATER_ICON from '@/assets/images/icons/dict_water2.png';
import MOON_ICON from '@/assets/images/icons/dict_moon.png';

interface RecommendType {
  icon: string;
  title: string;
  target: keyof typeof TargetQuery;
}

const recommend: RecommendType[] = [
  { icon: PLANT1_ICON, title: '식린이를 위한 추천 식물!', target: 'beginner' },
  {
    icon: PLANT2_ICON,
    title: '쑥쑥 자라는 식물만 모았어요.',
    target: 'growWell',
  },
  { icon: WATER_ICON, title: '식린이를 위한 추천 식물!', target: 'lessWater' },
  { icon: MOON_ICON, title: '어두운 집에서도 OK!', target: 'dark' },
];

const DictPage = () => {
  return (
    <div className="dict_conatiner">
      <Header />
      <main className="dict_wrapper">
        <h2 className="search_title">
          <span>{'Joy'}</span>님, 어떤 식물을 찾고있나요?
        </h2>
        <InputForm nextPath={'/dict/search'} />
        {recommend.map(({ icon, title, target }) => (
          <Recommend key={target} icon={icon} title={title} target={target} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default DictPage;
