import './myPlantRegisterPage.scss';
import xIcon from '@/assets/images/icons/my_plant_regi_x_icon.png';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import calenderIcon from '@/assets/images/icons/my-plant-calender_icon.png';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';
import { useState } from 'react';
import { PlantType } from '@/pages/dictPage/Recommend';

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
  wateredDays: WateredDay[];
}

const MyPlantRegisterPage = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<PlantType>();
  const [plantName, setPlantName] = useState<string>('');
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInputValue(e.target.value);
  };

  const plantNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantName(e.target.value);
    console.log(plantName);
  };

  const q = query(
    collection(db, 'dictionary'),
    where('name', '==', searchInputValue),
  );
  const getSearchResult = async () => {
    const querySnapshot = await getDocs(q);
    let plantData;
    querySnapshot.forEach(doc => {
      plantData = doc.data();
    });
    setSearchResult(plantData);
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    {
      frequency = 7,
      imgUrl = 'https://firebasestorage.googleapis.com/v0/b/plantopia-8452c.appspot.com/o/sub_plant_3.png?alt=media&token=8bba9cbc-4f54-4cbc-9c4f-1b8e097bd060',
      isMain = false,
      nickname = '잘자라',
      plantName = '플랜토피아',
      purchasedDay = {
        seconds: Number(new Date()),
        nanoseconds: Number(new Date()),
      },
      userEmail = 'test@test.com',
      wateredDays = [],
    }: MyPlantProps,
  ) => {
    e.preventDefault();
    const newPlantData = {
      frequency,
      imgUrl,
      isMain,
      nickname,
      plantName,
      purchasedDay,
      userEmail,
      wateredDays,
    };
    const docRef = await addDoc(collection(db, 'plant'), newPlantData);
    console.log('Document written with ID: ', docRef.id);
  };
  return (
    <>
      <form action="" onSubmit={handleRegister}>
        <div className="plant_register_head">
          <p>식물 등록</p>
          <img src={xIcon} alt="xIcon" />
        </div>
        <div className="my_plant_registeration_container">
          <div className="my_plant_register_img_box">
            <div className="img_wrapper">
              <img className="main_img" src={samplePlant1} alt="samplePlant1" />
              <div className="edit_icon_wrapper">
                <img
                  className="edit_icon"
                  src={myPlantImgEditIcon}
                  alt="editIcon"
                />
              </div>
            </div>
          </div>
          <div className="my_plant_input_box">
            <p className="my_plant_input_title">식물선택</p>
            <div className="my_plant_input_wrapper">
              <input
                className="my_plant_input"
                type="text"
                placeholder="식물 이름으로 검색해보세요."
                value={searchInputValue}
                onChange={searchInputHandler}
              />
              <img src={inputGlass} alt="inputGlass" />
            </div>
          </div>
          <div className="my_plant_info_form">
            <p className="my_plant_name_title">식물이름</p>
            <input
              className="my_plant_name"
              value={plantName}
              onChange={plantNameHandler}
            />

            <p className="watering_frequency">물 주는 날</p>
            <div className="watering_frequency_input_box">
              <p className="watering_frequency_input">
                {searchResult?.waterCode}
              </p>
              <p className="watering_frequency_info">일에 한 번</p>
            </div>
            <p className="my_plant_register_small_title">마지막 물준 날</p>
            <div className="my_plant_register_calender_value">
              <p>2023-08-07</p>
              <img src={calenderIcon} alt="calender" />
            </div>
            <p className="my_plant_register_small_title">
              식물과 처음 함께한 날
            </p>
            <div className="my_plant_register_calender_value">
              <p>2023-06-07</p>
              <img src={calenderIcon} alt="calender" />
            </div>
          </div>
        </div>
        <button className="my_plant_register_btn">등록</button>
      </form>
    </>
  );
};

export default MyPlantRegisterPage;
