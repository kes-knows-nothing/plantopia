import { useEffect, useState } from 'react';
import './mainPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { Timestamp } from 'firebase/firestore';
import { differenceInDays, format, addDays } from 'date-fns';
import { db } from '@/utils/firebaseApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import weather from '@/assets/images/weather';
import plants from '@/assets/images/plants';

import LOCATION from '@/assets/images/icons/location.png';
import WATERING from '@/assets/images/icons/watering.png';

interface UserPlant {
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
  const navigate = useNavigate();
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

  const navigateToDetail = (id?: string) => {
    if (id) {
      navigate(`/myplant/detail`, {
        state: mainPlant?.id,
      });
    }
  };

  const getWateringDday = (
    lastWateringDate: number | null,
    frequency?: number,
  ): string => {
    if (!lastWateringDate || !frequency) return '정보 없음';

    const nextWateringDate = addDays(lastWateringDate, frequency);
    const diffDays = differenceInDays(Date.now(), nextWateringDate);

    /* 물을 주어야할 날이 지났다면 모두 D-day로 표시 */
    if (diffDays > 0) {
      return 'D-day';
    }

    return `D${diffDays}`;
  };

  useEffect(() => {
    getUserPlant();
  }, []);

  const wateringDate = mainPlant?.wateredDays[0].seconds
    ? mainPlant?.wateredDays[0].seconds * 1000
    : null;

  const firstDate = mainPlant?.purchasedDay.seconds
    ? mainPlant?.purchasedDay.seconds * 1000
    : null;

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
            <button
              className="main_plant"
              onClick={() => navigateToDetail(mainPlant?.id)}
            >
              <div className="inner_circle">
                <img src={plants.MAIN_PLANT} alt="plant" />
              </div>
              <button className="watering_btn">
                <img src={WATERING} alt="watering" />
                <div className="watering_label">물주기</div>
              </button>
            </button>
            {/* main_plant_info */}
            <div className="main_plant_info">
              <div className="eng_name_label">{mainPlant?.plantName}</div>
              <h2 className="nickname">{mainPlant?.nickname}</h2>
              <div className="plant_info_wrapper">
                <div className="plant_info">
                  <span className="title">물주기</span>
                  <div className="content cotent_label">
                    <span>
                      {getWateringDday(wateringDate, mainPlant?.frequency)}
                    </span>
                  </div>
                </div>
                <div className="plant_info">
                  <span className="title">마지막 물준 날</span>
                  <span className="content">
                    {wateringDate
                      ? format(wateringDate, 'yyyy-MM-dd')
                      : '정보 없음'}
                  </span>
                </div>
                <div className="plant_info">
                  <span className="title">처음 함께한 날</span>
                  <span className="content">
                    {firstDate ? format(firstDate, 'yyyy-MM-dd') : '정보 없음'}
                  </span>
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
