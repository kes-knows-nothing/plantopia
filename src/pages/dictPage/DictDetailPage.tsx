import React from 'react';
import { Link } from 'react-router-dom';
import './DictDetailPage.scss';
import PLANT_ICON from '@/assets/images/icons/dict_plant2.png';
import ADD_ICON from '@/assets/images/icons/dict_post.png';
import PLANT3_ICON from '@/assets/images/icons/dict_plant3.png';
import WATER_ICON from '@/assets/images/icons/dict_plant4.png';
import WATERPOT_ICON from '@/assets/images/icons/dict_waterpot.png';
import BUG_ICON from '@/assets/images/icons/dict_bug.png';

import { BsFillSunFill } from 'react-icons/bs';
import { IoWaterSharp } from 'react-icons/io5';

const plantInfo = [
  { image: PLANT3_ICON, title: '분류', content: '잎&꽃보기 식물' },
  { image: WATER_ICON, title: '습도', content: '40 ~ 70%' },
  { image: WATERPOT_ICON, title: '관리 수준', content: '초보자' },
  { image: BUG_ICON, title: '병해충 정보', content: '응애, 깍지벌레' },
];

const plantEnv = [
  {
    type: '햇빛',
    value: (
      <>
        <BsFillSunFill color="#E0B871" /> <BsFillSunFill color="#E0B871" />{' '}
        <BsFillSunFill color="#ECECEC" />
      </>
    ),
  },
  {
    type: '물',
    value: (
      <>
        <IoWaterSharp color="#04c0c9" /> <IoWaterSharp color="#04c0c9" />{' '}
        <IoWaterSharp color="#ECECEC" />
      </>
    ),
  },
  { type: '생육적정온도', value: '16 ~ 20℃' },
];

const DictDetailPage = () => {
  return (
    <div>
      <header>
        <Link to="/dict">
          <span className="back_button">←</span>
        </Link>
        <span className="detail_header">식물 상세(임시 헤더)</span>
      </header>
      <main className="detail_container">
        <section className="thumbnail_wrapper">
          <img src={PLANT_ICON} alt="plant image" />
          <h3 className="english_name">Banana Croton</h3>
          <h3 className="korean_name">바나나 크로톤</h3>
          <button>
            <img src={ADD_ICON} alt="plant add image" />내 식물로 등록
          </button>
        </section>
        <div className="info_container">
          <section className="info_wrapper">
            <h3>🌱 식물정보</h3>
            {plantInfo.map(({ image, title, content }) => (
              <div key={title} className="info_type">
                <h4>
                  <img src={image} alt="plant icon" />
                  {title}
                </h4>
                <p>{content}</p>
              </div>
            ))}
          </section>
          <section className="env_wrapper">
            <h3>👍 잘 자라는 환경</h3>
            {plantEnv.map(({ type, value }) => (
              <div key={type} className="plant_env">
                <h4>{type}</h4>
                <p>{value}</p>
              </div>
            ))}
          </section>
          <section className="info_wrapper">
            <h3>📌 관리 Tip</h3>
            <div className="info_type">
              <p>
                진달래과의 작은 관목으로 척박한 산성토양에서 잘 자라며 키는
                20cm정도로 포복형이다. 암석정원에 잘 어울린다.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DictDetailPage;
