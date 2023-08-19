import React from 'react';
import Recommend from './Recommend';
import InputForm from './InputForm';
import './DictPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import PLANT1_ICON from '@/assets/images/icons/dict_plant1.png';
import PLANT2_ICON from '@/assets/images/icons/dict_plant2.png';
import WATER_ICON from '@/assets/images/icons/dict_water.png';
import MOON_ICON from '@/assets/images/icons/dict_moon.png';

const DictPage = () => {
  return (
    <div>
      <Header />
      <main className="main_container">
        <h2 className="search_title">
          <span>{'Joy'}</span>님, 어떤 식물을 찾고있나요?
        </h2>
        <InputForm nextPath={'/dict/search'} />
        <section>
          <Recommend
            icon={PLANT1_ICON}
            title={'식린이를 위한 추천 식물!'}
            // target="타겟 query params?"
            target="beginner"
          />
        </section>
        <section>
          <Recommend
            icon={PLANT2_ICON}
            title={'쑥쑥 자라는 식물만 모았어요.'}
            target="growWell"
          />
        </section>
        <section>
          <Recommend
            icon={WATER_ICON}
            title={'물을 조금만 줘도 잘 자라요.'}
            target="lessWater"
          />
        </section>
        <section>
          <Recommend
            icon={MOON_ICON}
            title={'어두운 집에서도 OK!'}
            target="dark"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DictPage;
