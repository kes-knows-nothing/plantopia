import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import PLANT_IMG from '@/assets/images/icons/dict_plant2.png';
import './Recommend.scss';

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
      <Swiper
        slidesPerView={target === 'beginner' ? 2 : 3}
        spaceBetween={target === 'beginner' ? 20 : 10}
        navigation={true}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="plants_container"
      >
        {tartgetPlants.map(({ image, englishName, koreanName }) => (
          <SwiperSlide key={Math.random()} className="plant_wrapper">
            <Link to="/dict/detail">
              <img
                className={target === 'beginner' ? 'img_two' : 'img_three'}
                src={image}
                alt="plant image"
              />
              <p className="english_name">{englishName}</p>
              <p className="korean_name">{koreanName}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
