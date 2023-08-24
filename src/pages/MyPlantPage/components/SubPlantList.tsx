import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import '@/pages/MyPlantPage/components/subplantlist.scss';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import ellipseImage from '@/pages/MyPlantPage/img/Ellipse_200.png';
import { getDocs, collection, where, query, doc } from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';

interface WateredDay {
  seconds: number;
  nanoseconds: number;
}

interface MyPlantProps {
  id: string;
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

const SubPlantList = () => {
  const [myPlantData, setMyPlantData] = useState<MyPlantProps[]>([]);

  const isMainHandler = (clickedPlant: MyPlantProps) => {
    const updatedData = myPlantData.map(item => {
      if (item === clickedPlant) {
        return { ...item, isMain: true };
      } else if (item.isMain) {
        return { ...item, isMain: false };
      }
      return item;
    });
    updatedData.sort(compare);
    setMyPlantData(updatedData);
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
  console.log(myPlantData);
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
              <p className="subplant_name">{plant.plantName}</p>
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
