import { useState } from 'react';
import '@/pages/MyPlantPage/components/subplantlist.scss';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import mainPlantTrueIcon from '@/assets/images/icons/main_plant_true_icon.png';
import mainPlantFalseIcon from '@/assets/images/icons/main_plant_false_icon.png';
import myPlantEditIcon from '@/assets/images/icons/my_plants_edit_icon.png';
import ellipseImage from '@/pages/MyPlantPage/img/Ellipse_200.png';

interface dummyData {
  imgUrl: string;
  name: string;
  main: boolean;
}

const dummyData = [
  {
    imgUrl: ellipseImage,
    name: '이상해풀',
    main: false,
  },
  { imgUrl: ellipseImage, name: '늘푸른', main: true },
];

const SubPlantList = () => {
  // const [plantData, setPlantData] = useState<dummyData[]>([])
  const [isMainPlant, setIsMainPlant] = useState<boolean>();
  return (
    <div className="subplant_container">
      {dummyData.map((plantData: dummyData, idx: number) => (
        <div key={idx} className="subplant_list_box">
          <div className="subplant_main_data">
            <img
              className="subplant_img"
              src={plantData.imgUrl}
              alt="subPlantImg"
            />
            <p className="subplant_name">{plantData.name}</p>
          </div>
          <div className="main_check_and_edit">
            <img
              className="mainPlantOrNot"
              src={isMainPlant ? mainPlantTrueIcon : mainPlantFalseIcon}
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
