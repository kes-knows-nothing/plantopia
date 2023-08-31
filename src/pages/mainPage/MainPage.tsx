import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { useAuth } from '@/hooks';
import { UserPlant } from '@/@types/plant.type';
import { errorNoti, successNoti } from '@/utils/myPlantUtil';
import { getPlantList, fetchWateringPlant } from '@/api/userPlant';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Progress from '@/components/progress/Progress';
import MainPlantSection from './MainPlantSection';
import WeatherSection from './WeatherSection';
import './mainPage.scss';

interface PlantListProps {
  plants: UserPlant[];
  onClickItem: (plant: UserPlant) => void;
}

const PlantList = ({ plants, onClickItem }: PlantListProps) => {
  if (plants.length > 0) {
    return (
      <div className="slide_wrapper">
        <Swiper slidesPerView={3.5} className="swiper">
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
  }
};

const MainPage = () => {
  const [focusPlant, setFocusPlant] = useState<UserPlant>();
  const [plantList, setPlantList] = useState<UserPlant[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuth();

  const onWaterPlant = async () => {
    if (!(focusPlant && user?.email)) return;

    try {
      setIsLoading(true);

      await fetchWateringPlant(focusPlant);
      const userPlantList = await getPlantList(user.email);
      const mainVisiblePlant = userPlantList.find(({ id, isMain }) => {
        return focusPlant ? focusPlant.id === id : isMain;
      });

      setFocusPlant(mainVisiblePlant || userPlantList[0]);
      successNoti('물을 잘 먹었어요!');
    } catch (error) {
      errorNoti('에러가 발생하였습니다. 잠시 후 다시 시도해주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPlant = async () => {
    if (!user?.email) return;

    setIsLoading(true);

    try {
      const userPlantList = await getPlantList(user.email);

      const mainVisiblePlant = userPlantList.find(({ id, isMain }) => {
        return focusPlant ? focusPlant.id === id : isMain;
      });

      setFocusPlant(mainVisiblePlant || userPlantList[0]);
      setPlantList(userPlantList);
    } catch (error) {
      errorNoti('에러가 발생하였습니다. 새로고침을 해주세요!');
      setPlantList(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPlant();
  }, [user]);

  return (
    <>
      <Header isMainPage />
      <main className="main_page">
        <section>
          <WeatherSection />
          {plantList && (
            <>
              <MainPlantSection
                plant={focusPlant}
                onWaterPlant={onWaterPlant}
              />
              <PlantList
                plants={plantList}
                onClickItem={(plant: UserPlant) => setFocusPlant(plant)}
              />
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
