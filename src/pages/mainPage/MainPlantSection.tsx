import { differenceInDays, format, addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { UserPlant } from './MainPage';

import plants from '@/assets/images/plants';
import WATERING from '@/assets/images/icons/watering.png';

interface MainPlantProps {
  mainPlant?: UserPlant;
}

const MainPlant = ({ mainPlant }: MainPlantProps) => {
  const navigate = useNavigate();

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

  const wateringDate = mainPlant?.wateredDays[0].seconds
    ? mainPlant?.wateredDays[0].seconds * 1000
    : null;

  const firstDate = mainPlant?.purchasedDay.seconds
    ? mainPlant?.purchasedDay.seconds * 1000
    : null;

  return (
    <>
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
              <span>{getWateringDday(wateringDate, mainPlant?.frequency)}</span>
            </div>
          </div>
          <div className="plant_info">
            <span className="title">마지막 물준 날</span>
            <span className="content">
              {wateringDate ? format(wateringDate, 'yyyy-MM-dd') : '정보 없음'}
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
    </>
  );
};

export default MainPlant;
