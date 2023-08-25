import './myPlantRegisterPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import xIcon from '@/assets/images/icons/my_plant_regi_x_icon.png';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/utils/firebaseApp';
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PlantType } from '@/pages/dictPage/Recommend';
import 'firebase/storage';

interface MyPlantProps {
  frequency: number;
  imgUrl: string;
  isMain: boolean;
  nickname: string;
  plantName: string;
  purchasedDay: InstanceType<typeof Timestamp>;
  userEmail: string;
  wateredDays: InstanceType<typeof Timestamp>[];
}

const MyPlantRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { plantNameFromDict, image } = location.state;
  // 기존 검색값으로 데이터 찾는대신 dict에서 데이터 받아서 처리
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchResult, setSearchResult] = useState<PlantType>();
  const [plantName, setPlantName] = useState<string>('');
  const [purchasedDay, setPurchasedDay] = useState<Timestamp>();
  const [wateredDays, setWateredDays] = useState<Timestamp[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string>();
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInputValue(e.target.value);
  };

  const plantNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantName(e.target.value);
    console.log(plantName);
  };

  const purchasedDayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasedDay(e.target.value);
  };
  const wateredDaysHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWateredDays([...wateredDays, e.target.value]);
  };
  const q = query(
    collection(db, 'dictionary'),
    where('name', '==', searchInputValue),
  );

  // 이미지 저장 로직
  const cleanFileName = (fileName: string) => {
    const cleanedName = fileName.replace(/[^\w\s.-]/gi, '');
    return cleanedName;
  };

  const readFileAsDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const previewUrl = await readFileAsDataURL(file);
      setPreviewImg(previewUrl);
      const storagePath = `myplant_imgs/${cleanFileName(file.name)}`;
      const imageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImgUrl(url);
    } catch (error) {
      console.error('파일 업로드 에러:', error);
    }
    event.target.value = null;
  };

  // 이미지 저장 로직

  const moveToSearch = () => {
    navigate('/myplant/search');
  };

  const getSearchResult = async () => {
    const querySnapshot = await getDocs(q);
    let plantData;
    querySnapshot.forEach(doc => {
      plantData = doc.data();
    });
    setSearchResult(plantData);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const defaultImageUrl =
      'https://firebasestorage.googleapis.com/v0/b/plantopia-8452c.appspot.com/o/sub_plant_3.png?alt=media&token=8bba9cbc-4f54-4cbc-9c4f-1b8e097bd060';
    const newPlantData = {
      frequency: 7,
      imgUrl: imgUrl || defaultImageUrl,
      isMain: false,
      nickname: plantName,
      plantName: searchInputValue,
      purchasedDay: purchasedDay,
      userEmail: 'test@test.com',
      wateredDays: wateredDays,
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
              <img
                className="main_img"
                src={previewImg || samplePlant1}
                alt="samplePlant1"
              />
              <div className="edit_icon_wrapper">
                <label htmlFor="photoInput" className="photo_label">
                  <img
                    className="edit_icon"
                    src={myPlantImgEditIcon}
                    alt="editIcon"
                  />
                </label>
                <input
                  className="photo_input"
                  id="photoInput"
                  accept="image/*"
                  type="file"
                  onChange={handleFileSelect}
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
                onClick={moveToSearch}
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
              <input
                type="date"
                className="date_selector"
                value={wateredDays}
                onChange={wateredDaysHandler}
              />
            </div>
            <p className="my_plant_register_small_title">
              식물과 처음 함께한 날
            </p>
            <div className="my_plant_register_calender_value">
              <input
                className="date_selector"
                type="date"
                value={purchasedDay}
                onChange={purchasedDayHandler}
              />
            </div>
          </div>
        </div>
        <Link to={'/myplant'}>
          <button className="my_plant_register_btn">등록</button>
        </Link>
      </form>
    </>
  );
};

export default MyPlantRegisterPage;
