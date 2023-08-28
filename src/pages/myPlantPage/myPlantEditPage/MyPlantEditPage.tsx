import './myPlantEditPage.scss';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import xIcon from '@/assets/images/icons/my_plant_regi_x_icon.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '@/firebaseApp';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { secondsToDate, dateToTimestamp } from '@/utils/myPlantUtil';
import { useState, useEffect } from 'react';
import { MyPlant } from '@/@types/myPlant.type';
import 'firebase/storage';

const MyPlantEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = useParams();

  const nicknameFromDetail = location.state?.nicknameFromDetail;
  const plantNameFromDetail = location.state?.plantNameFromDetail;
  const purchasedDayFromDetail = location.state?.purchasedDayFromDetail;
  const wateredDayFromDetail = location.state?.wateredDayFromDetail;
  const imgUrlFromDetail = location.state?.imgUrlFromDetail;
  const frequencyFromDetail = location.state?.frequencyFromDetail;

  const imgUrlFromList = location.state?.imgUrlFromList;
  const plantNameFromList = location.state?.plantNameFromList;
  const purchasedDayFromList = location.state?.purchasedDayFromList;
  const nicknameFromList = location.state?.nicknameFromList;
  const wateredDayFromList = location.state?.wateredDayFromList;
  const frequencyFromList = location.state?.frequencyFromList;

  const [myPlantData, setMyPlantData] = useState<MyPlant>();
  const [plantNickname, setPlantNickname] = useState<string>(
    nicknameFromDetail || nicknameFromList,
  );
  const [plantName, setPlantName] = useState<string>(
    plantNameFromDetail || plantNameFromList,
  );
  const [purchasedDay, setPurchasedDay] = useState<string>(
    secondsToDate(
      purchasedDayFromDetail?.seconds || purchasedDayFromList?.seconds,
    ),
  );
  const [wateredDay, setWateredDay] = useState<string>(
    secondsToDate(wateredDayFromDetail?.seconds || wateredDayFromList?.seconds),
  );
  const [frequency, setFrequency] = useState<number>(
    frequencyFromDetail || frequencyFromList,
  );

  const [imgUrl, setImgUrl] = useState<string>(
    imgUrlFromDetail || imgUrlFromList,
  );
  const [previewImg, setPreviewImg] = useState<string>();

  const handlePlantNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantNickname(e.target.value);
  };
  const purchasedDayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasedDay(e.target.value);
  };
  const wateredDaysHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWateredDay(e.target.value);
  };

  const handleFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrequency(Number(e.target.value));
  };

  const handleGoBack = () => {
    window.history.back();
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

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const documentRef = doc(db, 'plant', docId);
    myPlantData?.wateredDays.push(dateToTimestamp(wateredDay));
    const updatedFields = {
      imgUrl: imgUrl,
      nickname: plantNickname,
      purchasedDay: dateToTimestamp(purchasedDay),
      wateredDays: myPlantData?.wateredDays,
      frequency: frequency,
    };

    try {
      await updateDoc(documentRef, updatedFields);
      console.log('Document successfully updated!');
      navigate('/myplant');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  useEffect(() => {
    const getMyPlantData = async () => {
      try {
        const docRef = doc(db, 'plant', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const plantData = docSnap.data();
          setMyPlantData(plantData);
        } else {
          throw new Error('문서가 존재하지 않습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMyPlantData();
    if (myPlantData) {
      setPlantName(myPlantData?.plantName);
      setPlantNickname(myPlantData?.nickname);
    }
  }, []);

  return (
    <>
      <div className="plant_register_head">
        <p>식물 수정</p>
        <img src={xIcon} alt="xIcon" onClick={handleGoBack} />
      </div>
      <div className="my_plant_registeration_container">
        <div className="my_plant_register_img_box">
          <div className="img_wrapper">
            <img className="main_img" src={imgUrl} alt="samplePlant1" />
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
          <p className="my_plant_input_title">식물 이름</p>
          <div className="my_plant_input_wrapper">
            <input className="my_plant_input" value={plantName} disabled />
          </div>
        </div>
        <div className="my_plant_info_form">
          <p className="my_plant_name_title">식물 별명</p>
          <input
            className="my_plant_name"
            value={plantNickname}
            onChange={handlePlantNickname}
          />

          <p className="watering_frequency">물 주는 날</p>
          <div className="watering_frequency_input_box">
            <input
              className="watering_frequency_input"
              onChange={handleFrequency}
              defaultValue={frequencyFromDetail || frequencyFromList}
            />
            <p className="watering_frequency_info">일에 한 번</p>
          </div>
          <p className="my_plant_register_small_title">마지막 물준 날</p>
          <div className="my_plant_register_calender_value">
            <input
              type="date"
              className="date_selector"
              value={wateredDay}
              onChange={wateredDaysHandler}
            />
          </div>
          <p className="my_plant_register_small_title">식물과 처음 함께한 날</p>
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

      <button className="my_plant_register_btn" onClick={handleUpdate}>
        수정 완료
      </button>
    </>
  );
};

export default MyPlantEditPage;
