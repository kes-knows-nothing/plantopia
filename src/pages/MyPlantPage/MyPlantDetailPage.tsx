import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './myPlantDetailPage.scss';
import previousPageIcon from '@/assets/images/icons/my_plant_detail_back_to_previous_page_icon.png';
import ellipseImage from './img/Ellipse_200.png';
import editIcon from '@/assets/images/icons/my_plant_detail_edit_icon.png';
import sunOn from '@/assets/images/icons/sun_on_icon.png';
import sunOff from '@/assets/images/icons/sun_off_icon.png';
import waterOn from '@/assets/images/icons/water_on_icon.png';
import waterOff from '@/assets/images/icons/water_off_icon.png';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';

interface WateredDay {
  seconds: number;
  nanoseconds: number;
}

interface MyPlantProps {
  frequency: number;
  imgUrl: string;
  isMain: boolean;
  nickname: string;
  plantName: string;
  purchasedDay: {
    seconds: number;
    nanoseconds: number;
  };
  userEmail: string;
  wateredDay: WateredDay[];
}

const dummyData = [
  {
    name: '이상혁',
    mainPlantName: '쑥쑥이',
    imgUrl: ellipseImage,
    purchasedDate: '2023-06-13',
    watering: 5,
    lastWatering: '2023-08-02',
  },
];

const MyPlantDetailPage = () => {
  const { id } = useParams();
  const getPlantDetail = async () => {
    const docRef = doc(db, 'plant', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
      console.log('문서가 존재하지 않습니다.');
    }
  };

  useEffect(() => {
    getPlantDetail();
  }, []);

  return (
    <>
      <div className="my_plant_detail_header">
        <img src={previousPageIcon} alt="goToPreviousPage" />
        <p>식물 상세</p>
      </div>
      <div className="my_plant_detail_upper_container">
        <div className="main_plant_main_data">
          <p className="main_plant_head">메인 식물</p>
          <img
            className="main_plant_img"
            src={dummyData[0].imgUrl}
            alt="mainPlantImg"
          />
          <p className="main_plant_name">{dummyData[0].mainPlantName}</p>
        </div>
        <div className="my_plant_detail_edit_btn">
          <div className="my_plant_detail_edit_btn_inner_contents">
            <img src={editIcon} alt="editIcon" />
            <p>식물 정보 수정하기</p>
          </div>
        </div>
      </div>
      <div className="my_plant_detail_lower_container">
        <div className="my_plant_detail_info_box">
          <div className="my_plant_detail_info_head">
            <p>
              ⏰ {dummyData[0].mainPlantName}와 함께한지 <span>6개월</span>이
              지났어요
            </p>
          </div>
          <div className="my_plant_detail_info_metadata">
            <div className="watering_info">
              <span>물주기</span>
              <span>{dummyData[0].watering} Days</span>
            </div>
            <div className="last_watering_info">
              <span>마지막 물준 날</span>
              <span>2023-08-02</span>
            </div>
            <div className="first_day_info">
              <span>처음 함께한 날</span>
              <span>2023-06-13</span>
            </div>
          </div>
        </div>
        <div className="my_plant_detail_info_box">
          <div className="my_plant_detail_info_head">
            <p>👍 잘 자라는 환경</p>
          </div>
          <div className="my_plant_detail_info_metadata gridset">
            <div>
              <span>햇빛</span>
              <span className="sun_on_off">
                <img src={sunOn} alt="" />
                <img src={sunOn} alt="" />
                <img src={sunOff} alt="" />
              </span>
            </div>
            <div>
              <span>물</span>
              <span className="water_on_off">
                <img src={waterOn} alt="" />
                <img src={waterOn} alt="" />
                <img src={waterOff} alt="" />
              </span>
            </div>
            <div>
              <span>생육 적정 온도</span>
              <span className="optimal_temp">16 ~ 20 ℃</span>
            </div>
          </div>
        </div>
        <div className="my_plant_detail_info_box">
          <div className="my_plant_detail_info_head">
            <p>📌 관리 Tip</p>
          </div>
          <div className="my_plant_detail_info_metadata management_tip_box">
            <p className="management_tip">
              진달래과의 작은 관목으로 척박한 산성 토양에서 잘 자라며 키는
              20cm정도로 포복형이다. 암석정원에 잘 어울린다.
            </p>
          </div>
        </div>
        <p className="more_info_btn">식물 도감에서 이 식물 정보 더 알아보기!</p>
      </div>
    </>
  );
};

export default MyPlantDetailPage;
