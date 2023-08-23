import { useEffect, useState } from 'react';
import './mainPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { Timestamp } from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';
import { collection, getDocs, query, where } from 'firebase/firestore';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import MainPlant from './MainPlantSection';

import weather from '@/assets/images/weather';
import LOCATION from '@/assets/images/icons/location.png';

export interface UserPlant {
  id: string;
  frequency: number;
  imgUrl: string;
  isMain: boolean;
  nickname: string;
  plantName: string;
  purchasedDay: InstanceType<typeof Timestamp>;
  userEmail: string;
  wateredDays: InstanceType<typeof Timestamp>[];
}

interface PlantListProps {
  plants: UserPlant[];
  onClickItem: (plant: UserPlant) => void;
}

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
              <span className="name">{plant.nickname}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MainPage = () => {
  const [mainPlant, setMainPlant] = useState<UserPlant>();
  const [plantList, setPlantList] = useState<UserPlant[]>([]);

  const switchMainPlant = (plant: UserPlant) => {
    setMainPlant(plant);
  };

  const getUserPlant = async () => {
    // dummy
    const email = 'test@test.com';

    const emailRef = collection(db, 'plant');
    const q = query(emailRef, where('userEmail', '==', email));

    const userPlantList: UserPlant[] = [];
    let mainPlantData: UserPlant | null = null;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const plantData: UserPlant = {
        id: doc.id,
        ...(doc.data() as Omit<UserPlant, 'id'>),
      };

      if (plantData.isMain) {
        mainPlantData = plantData;
      }

      userPlantList.push(plantData);
    });

    setMainPlant(mainPlantData || userPlantList[0]);
    setPlantList(userPlantList);
  };

  useEffect(() => {
    getUserPlant();
  }, []);

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
            <MainPlant mainPlant={mainPlant} />
          </div>
          <PlantList plants={plantList} onClickItem={switchMainPlant} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
