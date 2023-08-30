import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './myPlantRegisterPage.scss';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseApp';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseApp';
import Toast from '@/components/notification/ToastContainer';
import {
  dateToTimestamp,
  errorNoti,
  successNoti,
  waterCodeToNumber,
} from '@/utils/myPlantUtil';
import 'firebase/storage';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';

const MyPlantRegisterPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name;
  const image = location.state?.image;
  const waterCode = location.state?.waterCode;
  const [searchInputValue, setSearchInputValue] = useState(name);
  const [plantName, setPlantName] = useState<string>('');
  const [purchasedDay, setPurchasedDay] = useState<string>('');
  const [wateredDays, setWateredDays] = useState<string>('');
  const [frequency, setFrequency] = useState<number>();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string>();
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const navigateSearch = () => {
    navigate('/dict/search', {
      state: { inputValue: '' },
    });
  };

  const plantNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantName(e.target.value);
  };

  const handleFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(Number(e.target.value));
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
    if (
      plantName.trim() === '' ||
      purchasedDay === '' ||
      searchInputValue === '' ||
      frequency === null
    ) {
      if (!searchInputValue) {
        errorNoti('식물을 지정해주세요.');
      }
      if (!plantName) {
        errorNoti('식물 닉네임을 설정해주세요.');
      }
      if (!frequency) {
        errorNoti('식물의 물 주기를 설정해주세요.');
      }
      if (!purchasedDay) {
        errorNoti('식물과 함께한 날을 지정해주세요.');
      }
      return;
    }

    const isPlant = query(collection(db, 'plant'));
    const isEmpty = (await getDocs(isPlant)).empty;

    const newPlantData = {
      frequency: waterCodeToNumber(waterCode),
      imgUrl: imgUrl || image,
      isMain: isEmpty ? true : false,
      nickname: plantName,
      plantName: searchInputValue,
      purchasedDay: dateToTimestamp(purchasedDay),
      userEmail: 'test@test.com',
      wateredDays: wateredDays ? [dateToTimestamp(wateredDays)] : [],
    };
    await addDoc(collection(db, 'plant'), newPlantData);
    successNoti('새 식물 등록에 성공하였습니다');
    navigate('/myplant');
  };
  return (
    <>
      <Toast />
      <HeaderBefore ex={true} title="식물 등록" />
      <main>
        <form action="" onSubmit={handleRegister}>
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
              <div className="my_plant_input_wrapper" onClick={navigateSearch}>
                <input
                  className="my_plant_input"
                  type="text"
                  placeholder="식물 이름으로 검색해보세요."
                  value={searchInputValue}
                  onChange={handleSearchInput}
                  readOnly
                />
                <img
                  className="input_glass"
                  src={inputGlass}
                  alt="inputGlass"
                />
              </div>
            </div>
            <div className="my_plant_info_form">
              <div className="my_plant_name_title">
                식물이름<p>* 5글자 이내로 설정해주세요.</p>
              </div>
              <input
                className="my_plant_name"
                maxLength={5}
                value={plantName}
                onChange={plantNameHandler}
              />
              <div className="watering_frequency">
                물 주는 날<p>* 주변 환경에 맞게 조절해주세요.</p>
              </div>
              <div className="watering_frequency_input_box">
                <input
                  className="watering_frequency_input"
                  value={frequency}
                  defaultValue={waterCodeToNumber(waterCode)}
                  onChange={handleFrequency}
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

          <button className="my_plant_register_btn" type="submit">
            등록
          </button>
        </form>
      </main>
    </>
  );
};

export default MyPlantRegisterPage;
