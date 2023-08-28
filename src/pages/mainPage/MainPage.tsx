import { useEffect, useState } from 'react';
import './mainPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { db } from '@/firebaseApp';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import MainPlant from './MainPlantSection';
import WeatherSection from './WeatherSection';

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

  const onWaterPlant = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (!mainPlant) return;

    const plantRef = doc(db, 'plant', mainPlant.id);

    try {
      await updateDoc(plantRef, {
        wateredDays: [...mainPlant.wateredDays, Timestamp.fromDate(new Date())],
      });
      await getUserPlant();

      alert('물을 잘 먹었어요!');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요!');
    }
  };

  const switchMainPlant = (plant: UserPlant) => {
    setMainPlant(plant);
  };

  const getUserPlant = async () => {
    // dummy
    const email = 'test@test.com';

    const emailRef = collection(db, 'plant');
    const q = query(emailRef, where('userEmail', '==', email));

    try {
      const userPlantList: UserPlant[] = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const plantData: UserPlant = {
          id: doc.id,
          ...(doc.data() as Omit<UserPlant, 'id'>),
        };

        userPlantList.push(plantData);
      });

      let mainPlantData: UserPlant | undefined;

      if (mainPlant) {
        mainPlantData = userPlantList.find(plant => plant.id === mainPlant.id);
      } else {
        mainPlantData =
          userPlantList.find(plant => plant.isMain) || userPlantList[0];
      }

      setMainPlant(mainPlantData);
      setPlantList(userPlantList);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }

      alert('에러가 발생하였습니다. 새로고침을 해주세요!');
    }
  };

  useEffect(() => {
    getUserPlant();
  }, []);

  return (
    <>
      <Header isMainPage />
      <main className="main_page">
        <section>
          <div className="inner">
            <WeatherSection />
            {mainPlant && (
              <MainPlant mainPlant={mainPlant} onWaterPlant={onWaterPlant} />
            )}
          </div>
          <PlantList plants={plantList} onClickItem={switchMainPlant} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
