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
import Toast from '@/components/notification/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/custom-toast-styles.scss';
import { useAuth } from '@/hooks';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { showAlert } from '@/utils/myPlantUtil';
import { UserPlant } from '@/@types/plant.type';

const MyPlantMainPage = () => {
  const user = useAuth();
  const [myMainPlant, setMyMainPlant] = useState<UserPlant>();
  const navigate = useNavigate();
  const navigateRegi = () => {
    navigate('/myplant/register');
  };

  useEffect(() => {
    const getQuerySnapshot = async () => {
      const q = query(
        collection(db, 'plant'),
        where('userEmail', '==', user?.email),
        where('isMain', '==', true),
      );
      const mainData = (await getDocs(q)).docs[0].data();
      setMyMainPlant(mainData);
    };
    getQuerySnapshot();
  }, [user]);
  return (
    <>
      <Toast />
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
              <div
                className="my_plant_main_add_btn_inner_contents"
                onClick={navigateRegi}
              >
                <img src={editIcon} alt="editIcon" />
                <p>내 식물 등록하기</p>
              </div>
            </div>
          )}
          {user && (
            <MainPagePlantList
              userEmail={user?.email}
              setMyMainPlant={setMyMainPlant}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyPlantMainPage;
