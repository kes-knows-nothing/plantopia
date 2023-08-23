import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './myPlantMainPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ellipseImage from './img/Ellipse_200.png';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import MyPlantList from '@/pages/myPlantPage/components/SubPlantList';

import { getDocs, collection, where, query } from 'firebase/firestore';
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
  },
];

const MyPlantMainPage = () => {
  const [myPlantData, setMyPlantData] = useState<MyPlantProps[]>([]);
  const [myMainPlant, setMyMainPlant] = useState<MyPlantProps[]>();
  const userId = 'test@test.com';
  const q = query(collection(db, 'plant'), where('userEmail', '==', userId));
  const getQuerySnapshot = async () => {
    const querySnapshot = await getDocs(q);
    const plantData: Array<MyPlantProps> = [];
    querySnapshot.forEach(doc => {
      plantData.push(doc.data());
    });
    const mainPlant: Array<MyPlantProps> = plantData.filter(
      plant => plant.isMain == true,
    );
    const notMainPlant: Array<MyPlantProps> = plantData.filter(
      plant => plant.isMain == false,
    );
    setMyMainPlant(mainPlant);
    setMyPlantData(notMainPlant);
    console.log(myPlantData);
    console.log(myMainPlant);
  };
  useEffect(() => {
    getQuerySnapshot();
  }, []);

  return (
    <>
      <Header />
      {myMainPlant == undefined ? (
        <h1>메인 식물이 없습니다.</h1>
      ) : (
        <p className="my_plant_info_message">
          <span className="username">{myMainPlant[0].nickname}</span>님의 식물을
          한눈에 보기!
        </p>
      )}

      <div className="main_plant_info_box">
        <div className="main_plant_main_data">
          <p className="main_plant_head">메인 식물</p>

          <img
            className="main_plant_img"
            src={dummyData[0].imgUrl}
            alt="mainPlantImg"
          />
          {myMainPlant == undefined ? (
            <h1>메인 식물이 없습니다.</h1>
          ) : (
            <p className="main_plant_name">{myMainPlant[0].nickname}</p>
          )}
        </div>
        <Link to={'/myplant/register'}>
          <p className="plant_plus_btn">
            <img src={plusIcon} alt="plusIcon" className="plant_plus_icon" />
            식물 등록
          </p>
        </Link>
        <MyPlantList />
      </div>

      <Footer />
    </>
  );
};

export default MyPlantMainPage;
