import React from 'react';
import './Recommend.scss';
import NEXT_ICON from '@/assets/images/icons/dict_next.png';
import 'swiper/css';
import 'swiper/css/pagination';

interface RecommendProps {
  icon: string;
  title: string;
  target: string;
}

const Recommend = (props: RecommendProps) => {
  const { icon, title, target } = props;

  return (
    <div className="recommend_container">
      <div className="title_wrapper">
        <div
          className={
            target === 'beginner'
              ? 'img_wrapper_white'
              : target === 'growWell'
              ? 'img_wrapper_navy'
              : target === 'lessWater'
              ? 'img_wrapper_blue'
              : target === 'dark'
              ? 'img_wrapper_gray'
              : 'img_wrapper'
          }
        >
          <img className="plant_img" src={icon} alt="search icon" />
        </div>
        <span>{title}</span>
      </div>
      <div className="plants_container">
        <div className="plant_wrapper">
          <img src={icon} alt="plant image" />
          <p className="english_name">Philodendron Congo</p>
          <p className="korean_name">필로덴드론 콩고</p>
        </div>
        <div className="plant_wrapper">
          <img src={icon} alt="plant image" />
          <p className="english_name">Philodendron Congo</p>
          <p className="korean_name">필로덴드론 콩고</p>
        </div>
        <div className="plant_wrapper">
          <img src={icon} alt="plant image" />
          <p className="english_name">Philodendron Congo</p>
          <p className="korean_name">필로덴드론 콩고</p>
        </div>
        <div className="plant_wrapper">
          <img src={icon} alt="plant image" />
          <p className="english_name">Philodendron Congo</p>
          <p className="korean_name">필로덴드론 콩고</p>
        </div>
        <button className="next_button">
          <img className="search_img" src={NEXT_ICON} alt="search icon" />
        </button>
      </div>
    </div>
  );
};

export default Recommend;
