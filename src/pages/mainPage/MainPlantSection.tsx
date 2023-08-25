import { differenceInDays, format, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { UserPlant } from './MainPage';

import WATERING from '@/assets/images/icons/watering.png';

interface MainPlantProps {
  mainPlant: UserPlant;
  onWaterPlant: (event: React.MouseEvent<HTMLElement>) => void;
}

const MainPlant = ({ mainPlant, onWaterPlant }: MainPlantProps) => {
  const {
    id,
    frequency,
    imgUrl,
    nickname,
    plantName,
    purchasedDay,
    wateredDays,
  } = mainPlant;

  const getWateringDday = (
    lastWateringDate: number | null,
    frequency: number,
  ): string => {
    if (!lastWateringDate) return '정보 없음';

    const nextWateringDate = addDays(lastWateringDate, frequency);
    const diffDays = differenceInDays(Date.now(), nextWateringDate);

    /* 물을 주어야할 날이 지났다면 모두 D-day로 표시 */
    if (diffDays > 0) {
      return 'D-day';
    }

    return `D${diffDays}`;
  };

  const lastWateringDate = (wateredDays.at(-1)?.seconds || 0) * 1000;

  const registerDate = purchasedDay.seconds * 1000;

  return (
    <>
      <Link to="/myplant/detail" state={id} className="main_plant">
        <div className="inner_circle">
          <img src={imgUrl} alt="plant" />
        </div>
        <button className="watering_btn" onClick={onWaterPlant}>
          <img src={WATERING} alt="watering" />
          <div className="watering_label">물주기</div>
        </button>
      </Link>
      {/* main_plant_info */}
      <div className="main_plant_info">
        <div className="eng_name_label">{plantName}</div>
        <h2 className="nickname">{nickname}</h2>
        <div className="plant_info_wrapper">
          <div className="plant_info">
            <span className="title">물주기</span>
            <div className="content cotent_label">
              <span>{getWateringDday(lastWateringDate, frequency)}</span>
            </div>
          </div>
          <div className="plant_info">
            <span className="title">마지막 물준 날</span>
            <span className="content">
              {lastWateringDate
                ? format(lastWateringDate, 'yyyy-MM-dd')
                : '정보 없음'}
            </span>
          </div>
          <div className="plant_info">
            <span className="title">처음 함께한 날</span>
            <span className="content">
              {registerDate ? format(registerDate, 'yyyy-MM-dd') : '정보 없음'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPlant;