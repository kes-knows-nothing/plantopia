import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './myPlantMainPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import MainPagePlantList from '@/pages/myPlantPage/MainPagePlantList';

import {
  getDocs,
  collection,
  where,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';

interface MyPlantProps {
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

const MyPlantMainPage = () => {
  const [myPlantData, setMyPlantData] = useState<MyPlantProps[]>([]);
  const [myMainPlant, setMyMainPlant] = useState<MyPlantProps[]>([]);
  const userId = 'test@test.com';

  useEffect(() => {
    const q = query(collection(db, 'plant'), where('userEmail', '==', userId));
    const getQuerySnapshot = async () => {
      const querySnapshot = await getDocs(q);
      const plantData: Array<MyPlantProps> = [];
      querySnapshot.forEach(doc => {
        plantData.push(doc.data());
      });
      const mainPlant: Array<MyPlantProps> = plantData.filter(
        plant => plant.isMain === true,
      );
      const notMainPlant: Array<MyPlantProps> = plantData.filter(
        plant => plant.isMain === false,
      );
      setMyMainPlant(mainPlant);
      setMyPlantData(notMainPlant);
    };
    getQuerySnapshot();
  }, []);
  console.log(myMainPlant);
  console.log(myPlantData);
  return (
    <>
      <Header />
      {myMainPlant[0] ? (
        <>
          <p className="my_plant_info_message">
            <span className="username">{myMainPlant[0].nickname}</span>님의
            식물을 한눈에 보기!
          </p>
          <div className="main_plant_info_box">
            <div className="main_plant_main_data">
              <p className="main_plant_head">메인 식물</p>

              <img
                className="main_plant_img"
                src={myMainPlant[0].imgUrl}
                alt="mainPlantImg"
              />
              <p className="main_plant_name">{myMainPlant[0].plantName}</p>
              <p className="main_plant_nickname">{myMainPlant[0].nickname}</p>
            </div>
            <Link to={'/myplant/register'}>
              <p className="plant_plus_btn">
                <img
                  src={plusIcon}
                  alt="plusIcon"
                  className="plant_plus_icon"
                />
                식물 등록
              </p>
            </Link>
            <MainPagePlantList />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </>
  );
};

export default MyPlantMainPage;
