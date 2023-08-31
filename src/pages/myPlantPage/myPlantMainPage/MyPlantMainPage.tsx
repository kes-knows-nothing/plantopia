import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './myPlantMainPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import MainPagePlantList from '@/pages/myPlantPage/MainPagePlantList';
import editIcon from '@/assets/images/icons/my_plant_detail_edit_icon.png';
import samplePlant from '@/assets/images/icons/sample_plant1.png';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAuth } from '@/hooks';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import { UserPlant } from '@/@types/plant.type';
import { infoNoti } from '@/utils/myPlantUtil';

const MyPlantMainPage = () => {
  const user = useAuth();
  const [myMainPlant, setMyMainPlant] = useState<UserPlant>();
  const [plantCount, setPlantCount] = useState(0);
  const navigate = useNavigate();
  const navigateRegi = () => {
    if (plantCount >= 10) {
      infoNoti('식물 등록은 10개까지 가능합니다.');
      return;
    }
    navigate('/myplant/register');
  };

  useEffect(() => {
    const getQuerySnapshot = async () => {
      if (user?.email) {
        const q = query(
          collection(db, 'plant'),
          where('userEmail', '==', user?.email),
          where('isMain', '==', true),
        );
        const mainData = (await getDocs(q)).docs[0]?.data();
        setMyMainPlant(mainData);
      }
    };
    getQuerySnapshot();
  }, [user]);
  return (
    <>
      <Header />
      <main>
        <div className="my_plant_info_message">
          <span className="username">{user?.displayName}</span> 님의 식물을
          한눈에 보기!
        </div>
        <div className="main_plant_info_box">
          {myMainPlant ? (
            <div className="main_plant_main_data">
              <img
                className="main_plant_img"
                src={myMainPlant?.imgUrl}
                alt="mainPlantImg"
              />
              <div className="main_plant_head">
                <img src={mainPlantTrueIcon} alt="" />{' '}
                <p className="main_plant_title">메인 식물</p>
              </div>
              <p className="main_plant_name">{myMainPlant?.plantName}</p>
              <p className="main_plant_nickname">{myMainPlant?.nickname}</p>
              <p className="plant_plus_btn" onClick={navigateRegi}>
                <img
                  src={plusIcon}
                  alt="plusIcon"
                  className="plant_plus_icon"
                />
                식물 등록
              </p>
            </div>
          ) : (
            <div className="main_plant_main_data">
              <img
                className="main_plant_sample_img"
                src={samplePlant}
                alt="samplePlantImg"
              />
              <button
                className="my_plant_main_add_btn_inner_contents"
                onClick={navigateRegi}
              >
                <div className="my_plant_main_add_btn_inner_contents_box">
                  <img src={editIcon} alt="editIcon" />
                  <p>내 식물 등록하기</p>
                </div>
              </button>
            </div>
          )}
          {user && (
            <MainPagePlantList
              userEmail={user?.email}
              setMyMainPlant={setMyMainPlant}
              setPlantCount={setPlantCount}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyPlantMainPage;
