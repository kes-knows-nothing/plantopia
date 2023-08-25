import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import '@/pages/MyPlantPage/components/subplantlist.scss';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import ellipseImage from '@/pages/MyPlantPage/img/Ellipse_200.png';
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  Timestamp,
  updateDoc,
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

const SubPlantList = () => {
  const [myPlantData, setMyPlantData] = useState<MyPlantProps[]>([]);

  const isMainHandler = async (clickedPlant: MyPlantProps) => {
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

  const compare = (a: MyPlantProps, b: MyPlantProps): number => {
    if (a.isMain === b.isMain) {
      return 0;
    } else if (a.isMain) {
      return -1;
    } else {
      return 1;
    }
  };
  const userId = 'test@test.com';
  const q = query(collection(db, 'plant'), where('userEmail', '==', userId));

  const getNotMainPlants = async () => {
    const querySnapshot = await getDocs(q);
    const plantData: Array<MyPlantProps> = [];
    querySnapshot.forEach(doc => {
      plantData.push({ ...doc.data(), id: doc.id });
      plantData.sort(compare);
      setMyPlantData(plantData);
    });
  };
  useEffect(() => {
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

            <img src={myPlantEditIcon} alt="EditPlantImg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubPlantList;
