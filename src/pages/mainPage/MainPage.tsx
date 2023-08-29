import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { useAuth } from '@/hooks';
import { UserPlant } from '@/@types/plant.type';
import { db } from '@/firebaseApp';
import { errorNoti, successNoti } from '@/utils/myPlantUtil';
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
import Progress from '@/components/progress/Progress';
import Toast from '@/components/notification/ToastContainer';
import MainPlant from './MainPlantSection';
import WeatherSection from './WeatherSection';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './mainPage.scss';

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
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuth();

  const onWaterPlant = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (!mainPlant) return;

    const plantRef = doc(db, 'plant', mainPlant.id);

    try {
      setIsLoading(true);

      await updateDoc(plantRef, {
        wateredDays: [...mainPlant.wateredDays, Timestamp.fromDate(new Date())],
      });
      await getUserPlant();

      // 컨펌추가
      successNoti('물을 잘 먹었어요!');
    } catch (error) {
      errorNoti('에러가 발생하였습니다. 잠시 후 다시 시도해주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMainPlant = (plant: UserPlant) => {
    setMainPlant(plant);
  };

  const getUserPlant = async () => {
    if (!user) return;

    const emailRef = collection(db, 'plant');
    const q = query(emailRef, where('userEmail', '==', user.email));

    try {
      setIsLoading(true);

      const userPlantList: UserPlant[] = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const plantData = doc.data() as Omit<UserPlant, 'id'>;

        userPlantList.push({
          id: doc.id,
          ...plantData,
        });
      });

      const mainPlantData = userPlantList.find(({ id, isMain }) => {
        return mainPlant ? mainPlant.id === id : isMain;
      });

      setMainPlant(mainPlantData || userPlantList[0]);
      setPlantList(userPlantList);
    } catch (error) {
      errorNoti('에러가 발생하였습니다. 새로고침을 해주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPlant();
  }, [user]);

  const hasUserPlant = !!(mainPlant && plantList.length > 0);

  return (
    <>
      <Toast />
      <Header isMainPage />
      <main className="main_page">
        <section>
          <WeatherSection />
          {hasUserPlant && (
            <>
              <div className="inner">
                <MainPlant mainPlant={mainPlant} onWaterPlant={onWaterPlant} />
              </div>
              <PlantList plants={plantList} onClickItem={switchMainPlant} />
            </>
          )}
        </section>
      </main>
      <Footer />
      {isLoading && <Progress />}
    </>
  );
};

export default MainPage;
