import './myPlantRegisterPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import xIcon from '@/assets/images/icons/my_plant_regi_x_icon.png';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseApp';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { dateToTimestamp, waterCodeToNumber } from '@/utils/myPlantUtil';
import 'firebase/storage';

const MyPlantRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name;
  const image = location.state?.image;
  const waterCode = location.state?.waterCode;
  const [searchInputValue, setSearchInputValue] = useState(name);
  const [plantName, setPlantName] = useState<string>('');
  const [purchasedDay, setPurchasedDay] = useState<string>('');
  const [wateredDays, setWateredDays] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string>();
  console.log(waterCodeToNumber(waterCode));

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const navigateSearchInput = () => {
    navigate('/dict/search', {
      state: { inputValue: searchInputValue },
    });
  };

  const plantNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantName(e.target.value);
  };

  const purchasedDayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasedDay(e.target.value);
  };
  const wateredDaysHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWateredDays(e.target.value);
  };

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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlantData = {
      frequency: waterCodeToNumber(waterCode),
      imgUrl: imgUrl || image,
      isMain: false,
      nickname: plantName,
      plantName: searchInputValue,
      purchasedDay: dateToTimestamp(purchasedDay),
      userEmail: 'test@test.com',
      wateredDays: [dateToTimestamp(wateredDays)],
    };
    const docRef = await addDoc(collection(db, 'plant'), newPlantData);
    console.log('Document written with ID: ', docRef.id);
    navigate('/myplant');
  };
  return (
    <>
      <form action="" onSubmit={handleRegister}>
        <div className="plant_register_head">
          <p>식물 등록</p>
          <Link to={'/myplant'}>
            <img src={xIcon} alt="xIcon" />
          </Link>
        </div>
        <div className="my_plant_registeration_container">
          <div className="my_plant_register_img_box">
            <div className="img_wrapper">
              <img
                className="main_img"
                src={previewImg || image || samplePlant1}
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
                onChange={handleSearchInput}
              />

              <img
                className="input_glass"
                src={inputGlass}
                alt="inputGlass"
                onClick={navigateSearchInput}
              />
            </div>
          </div>
          <div className="my_plant_info_form">
            <p className="my_plant_name_title">식물이름</p>
            <input
              className="my_plant_name"
              maxLength={5}
              value={plantName}
              onChange={plantNameHandler}
              placeholder="5글자 이내로 설정해주세요"
            />
            <p className="watering_frequency">물 주는 날</p>
            <div className="watering_frequency_input_box">
              <input
                className="watering_frequency_input"
                defaultValue={waterCodeToNumber(waterCode)}
                placeholder="주변 환경에 따라 적절하게 변경해주세요"
              />

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

        <button className="my_plant_register_btn">등록</button>
      </form>
    </>
  );
};

export default MyPlantRegisterPage;
