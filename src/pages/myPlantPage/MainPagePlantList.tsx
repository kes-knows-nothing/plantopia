import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import '@/pages/myPlantPage/mainPagePlantList.scss';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import { MyPlant } from '@/@types/myPlant.type';
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';

const MainPagePlantList = () => {
  const [myPlantData, setMyPlantData] = useState<MyPlant[]>([]);

  const isMainHandler = async (clickedPlant: MyPlant) => {
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
        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
    window.location.reload();
  };

  const compare = (a: MyPlant, b: MyPlant): number => {
    if (a.isMain === b.isMain) {
      return 0;
    } else if (a.isMain) {
      return -1;
    } else {
      return 1;
    }
  };
  const userId = 'test@test.com';
  useEffect(() => {
    const q = query(collection(db, 'plant'), where('userEmail', '==', userId));

    const getNotMainPlants = async () => {
      const querySnapshot = await getDocs(q);
      const plantData: Array<MyPlant> = [];
      querySnapshot.forEach(doc => {
        plantData.push({ ...doc.data(), id: doc.id });
        plantData.sort(compare);
        setMyPlantData(plantData);
      });
    };
    getNotMainPlants();
  }, []);

  return (
    <div className="subplant_container">
      {myPlantData.map(plant => (
        <div key={nanoid()} className="subplant_list_box">
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
              onClick={() => isMainHandler(plant)}
              className="mainPlantOrNot"
              src={plant.isMain ? mainPlantTrueIcon : mainPlantFalseIcon}
              alt="mainPlantOrNotImg"
            />
            <Link to={`/myplant/${plant.id}/edit`}>
              <img src={myPlantEditIcon} alt="EditPlantImg" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPagePlantList;