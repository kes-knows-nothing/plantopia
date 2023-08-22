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

interface PlantInfo {
  imgUrl: string;
  nickName: string;
  plantName: string;
}

interface PlantListProps {
  plants: PlantInfo[];
  onClickItem: (plant: PlantInfo) => void;
}

/* Dummy Data */
const mockPlants: PlantInfo[] = [
  {
    imgUrl: plants.SUB_PLANT_1,
    nickName: '이상해풀',
    plantName: '백량금',
  },
  {
    imgUrl: plants.SUB_PLANT_2,
    nickName: '치코리타',
    plantName: '부겐빌레아',
  },
  {
    imgUrl: plants.SUB_PLANT_3,
    nickName: '늘푸른',
    plantName: '네마탄투스',
  },
  {
    imgUrl: plants.SUB_PLANT_2,
    nickName: '늘푸른2',
    plantName: '인삼벤자민',
  },
  {
    imgUrl: plants.SUB_PLANT_1,
    nickName: '쑥쑥이',
    plantName: '동백',
  },
];

const PlantList = ({ plants, onClickItem }: PlantListProps) => {
  return (
    <div className="slide_wrapper">
      <Swiper slidesPerView={4} className="swiper">
        {plants.map(plant => (
          <SwiperSlide key={nanoid()}>
            <button className="slide" onClick={() => onClickItem(plant)}>
              <div className="avatar">
                <img src={plant.imgUrl} alt="plant" />
              </div>
              <span className="name">{plant.nickName}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MainPage = () => {
  const [mainPlant, setMainPlant] = useState(mockPlants[0]);
  const [plantList, setPlantList] = useState(mockPlants);

  const switchMainPlant = (plant: PlantInfo) => {
    setMainPlant(plant);
  };

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
              <div className="eng_name_label">{mainPlant.plantName}</div>
              <h2 className="nickname">{mainPlant.nickName}</h2>
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
          <PlantList plants={plantList} onClickItem={switchMainPlant} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
