import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@/pages/myPlantPage/mainPagePlantList.scss';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import { UserPlant } from '@/@types/plant.type';
import Toast from '@/components/notification/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/custom-toast-styles.scss';
import { successNoti } from '@/utils/myPlantUtil';
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@/firebaseApp';

const MainPagePlantList = ({ userEmail }) => {
  const navigate = useNavigate();
  const [myPlantData, setMyPlantData] = useState<UserPlant[]>([]);

  const handleIsMain = async (clickedPlant: UserPlant) => {
    if (clickedPlant.isMain === false) {
      const previousMain = myPlantData.filter(item => (item.isMain = true));
      previousMain[0].isMain = false;
      clickedPlant.isMain = true;
      const documentTrueRef = doc(db, 'plant', clickedPlant.id);
      const updatedTrueFields = {
        isMain: true,
      };

      try {
        await updateDoc(documentTrueRef, updatedTrueFields);
        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }

      const documentFalseRef = doc(db, 'plant', previousMain[0].id);
      const updatedFalseFields = {
        isMain: false,
      };

      try {
        await updateDoc(documentFalseRef, updatedFalseFields);
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
    setTimeout(() => {
      successNoti('메인 식물을 변경하였습니다.');
    }, 1000);
    window.location.reload();
  };

  const handleEditData = (clickedPlant: UserPlant) => {
    const dataFromList = {
      imgUrlFromList: clickedPlant.imgUrl,
      nicknameFromList: clickedPlant.nickname,
      plantNameFromList: clickedPlant.plantName,
      purchasedDayFromList: clickedPlant.purchasedDay,
      wateredDayFromList: clickedPlant.wateredDays.at(-1),
      frequencyFromList: clickedPlant.frequency,
    };
    navigate(`/myplant/${clickedPlant.id}/edit`, { state: dataFromList });
  };
  const compare = (a: UserPlant, b: UserPlant): number => {
    if (a.isMain === b.isMain) {
      return 0;
    } else if (a.isMain) {
      return -1;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, 'plant'),
      where('userEmail', '==', userEmail),
    );
    const getNotMainPlants = async () => {
      const querySnapshot = await getDocs(q);
      const plantData: Array<UserPlant> = [];
      querySnapshot.forEach(doc => {
        plantData.push({ ...doc.data(), id: doc.id });
        plantData.sort(compare);
        setMyPlantData(plantData);
      });
    };
    getNotMainPlants();
  }, []);

  return (
    <>
      <Toast />
      <div className="subplant_container">
        {myPlantData.map(plant => (
          <div key={plant.id} className="subplant_list_box">
            <div className="subplant_main_data">
              <img
                className="subplant_img"
                src={plant.imgUrl}
                alt="subPlantImg"
              />
              <Link to={`/myplant/${plant.id}`}>
                <p className="subplant_name">{plant.nickname}</p>
              </Link>
            </div>
            <div className="main_check_and_edit">
              <img
                onClick={() => handleIsMain(plant)}
                className="mainPlantOrNot"
                src={plant.isMain ? mainPlantTrueIcon : mainPlantFalseIcon}
                alt="mainPlantOrNotImg"
              />
              <img
                src={myPlantEditIcon}
                alt="EditPlantImg"
                onClick={() => handleEditData(plant)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPagePlantList;
