import { useState, useEffect } from 'react';
import './myPlantMainPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ellipseImage from './img/Ellipse_200.png';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import MyPlantList from '@/pages/MyPlantPage/components/SubPlantList';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';

// interface MyPlantProps {
//   frequency: number,
//   imgUrl: string,
//   isMain: boolean,
//   nickname: string,
//   plantName: string,
//   purchasedDay:

// }

const dummyData = [
  {
    name: '이상혁',
    mainPlantName: '쑥쑥이',
    imgUrl: ellipseImage,
  },
];

const MyPlantMainPage = () => {
  const [myPlantData, setMyPlantData] = useState();

  useEffect(() => {
    const docRef = doc(db, 'plant', 'zEpCaZp6bG55uRSckG6h');
    const getDocSnap = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const data = docSnap.data();
        setMyPlantData(data);
      } else {
        console.log('No such document!');
      }
    };
    getDocSnap();
  }, []);
  return (
    <>
      <Header />
      <p className="my_plant_info_message">
        <span className="username">{dummyData[0].name}</span>님의 식물을 한눈에
        보기!
      </p>
      <div className="main_plant_info_box">
        <div className="main_plant_main_data">
          <p className="main_plant_head">메인 식물</p>
          <img
            className="main_plant_img"
            src={dummyData[0].imgUrl}
            alt="mainPlantImg"
          />
          <p className="main_plant_name">{dummyData[0].mainPlantName}</p>
        </div>
        <p className="plant_plus_btn">
          <img src={plusIcon} alt="plusIcon" className="plant_plus_icon" />
          식물 등록
        </p>
        <MyPlantList />
      </div>

      <Footer />
    </>
  );
};

export default MyPlantMainPage;
