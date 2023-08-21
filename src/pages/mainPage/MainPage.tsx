import { useState } from 'react';
import './mainPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import weather from '@/assets/images/weather';
import plants from '@/assets/images/plants';
import LOCATION from '@/assets/images/icons/location.png';
import WATERING from '@/assets/images/icons/watering.png';

interface PlantInfoProps {
  plants: typeof mockPlants;
}

/* Dummy Data */
const mockPlants = [
  {
    imgUrl: plants.SUB_PLANT_1,
    plantName: '이상해풀',
  },
  {
    imgUrl: plants.SUB_PLANT_2,
    plantName: '치코리타',
  },
  {
    imgUrl: plants.SUB_PLANT_3,
    plantName: '늘푸른',
  },
  {
    imgUrl: plants.SUB_PLANT_2,
    plantName: '늘푸른2',
  },
  {
    imgUrl: plants.SUB_PLANT_1,
    plantName: '쑥쑥이',
  },
];

const PlantList = ({ plants }: PlantInfoProps) => {
  return (
    <div className="slide_wrapper">
      <Swiper slidesPerView={4} className="swiper">
        {plants.map(({ imgUrl, plantName }) => (
          <SwiperSlide key={nanoid()}>
            <button className="slide">
              <div className="avatar">
                <img src={imgUrl} alt="plant" />
              </div>
              <span className="name">{plantName}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MainPage = () => {
  const [plantList, setPlantList] = useState(mockPlants);

  return (
    <>
      <Header isMainPage />
      <main className="container">
        <section>
          <div className="inner">
            <div className="weather_wrapper">
              <div className="text_wrapper">
                <div className="location_wrapper">
                  <img src={LOCATION} className="weather_icon" alt="location" />
                  <span className="text">서울, 후암동</span>
                </div>
                <div className="weather_text_box temperature_wrapper">
                  <span className="text_lg">비 조금 36°</span>
                  <span className="text_sm">36°</span>
                  <span className="text_sm">27°</span>
                </div>
                <div className="weather_text_box">
                  오늘은 창밖으로 빗소리가 들리겠어요
                </div>
              </div>
              <img src={weather.RAIN} className="weather_icon" alt="weather" />
            </div>
            <div className="main_plant">
              <div className="inner_circle">
                <img src={plants.MAIN_PLANT} alt="plant" />
              </div>
              <button className="watering_btn">
                <img src={WATERING} alt="watering" />
                <div className="watering_label">물주기</div>
              </button>
            </div>
            {/* main_plant_info */}
            <div className="main_plant_info">
              <div className="eng_name_label">아글라오네마</div>
              <h2 className="nickname">쑥쑥이</h2>
              <div className="plant_info_wrapper">
                <div className="plant_info">
                  <span className="title">물주기</span>
                  <div className="content cotent_label">
                    <span>D-5</span>
                  </div>
                </div>
                <div className="plant_info">
                  <span className="title">마지막 물준 날</span>
                  <span className="content">2023-08-02</span>
                </div>
                <div className="plant_info">
                  <span className="title">처음 함께한 날</span>
                  <span className="content">2023-06-13</span>
                </div>
              </div>
            </div>
          </div>
          <PlantList plants={plantList} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
