import React from 'react';
import { Link } from 'react-router-dom';
import './Recommend.scss';
import NEXT_ICON from '@/assets/images/icons/dict_next.png';
import PLANT_IMG from '@/assets/images/icons/dict_plant2.png';

interface RecommendProps {
  icon: string;
  title: string;
  target: string;
}

const targetClassName = {
  beginner: 'img_wrapper_white',
  growWell: 'img_wrapper_navy',
  lessWater: 'img_wrapper_blue',
  dark: 'img_wrapper_gray',
};

const tartgetPlants = [
  {
    image: PLANT_IMG,
    englishName: 'Philodendron Congo',
    koreanName: '필로덴드론 콩고',
  },
  {
    image: PLANT_IMG,
    englishName: 'Monstera deliciosa',
    koreanName: '몬스테라',
  },
  {
    image: PLANT_IMG,
    englishName: 'Pachira aquatica',
    koreanName: '파키라',
  },
];

const Recommend = ({ icon, title, target }: RecommendProps) => {
  return (
    <div className="recommend_container">
      <div className="title_wrapper">
        <div
          className={targetClassName[target as keyof typeof targetClassName]}
        >
          <img className="plant_img" src={icon} alt="search icon" />
        </div>
        <span>{title}</span>
      </div>
      <div className="plants_container">
        {tartgetPlants.map(({ image, englishName, koreanName }) => (
          <div key={englishName} className="plant_wrapper">
            <Link to="/dict/detail">
              <img src={image} alt="plant image" />
              <p className="english_name">{englishName}</p>
              <p className="korean_name">{koreanName}</p>
            </Link>
          </div>
        ))}
        <button className="next_button">
          <img className="search_img" src={NEXT_ICON} alt="search icon" />
        </button>
      </div>
    </div>
  );
};

export default Recommend;
