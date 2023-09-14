import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseApp';
import style from './myPlantEditPage.module.scss';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import Progress from '@/components/progress/Progress';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import { secondsToDate, dateToTimestamp, maxDate } from '@/utils/dateUtil';
import { UserPlant } from '@/@types/plant.type';
import { findPlantDataByDocId, updatePlantData } from '@/api/userPlant';
import { errorNoti } from '@/utils/alarmUtil';

const MyPlantEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = useParams();
  const [saving, setSaving] = useState(false);

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

  const [plantData, setPlantData] = useState<UserPlant>();
  const [isLoading, setIsLoading] = useState(true);
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

  const cleanFileName = (fileName: string) => {
    const cleanedName = fileName.replace(/[^\w\s.-]/gi, '');
    return cleanedName;
  };

  const readFileAsDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target?.result as string);
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
      return;
    }
    event.target.value = '';
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSaving(true);
    if (!plantData?.wateredDays) {
      plantData?.wateredDays.push(dateToTimestamp(wateredDay));
    } else {
      plantData?.wateredDays.pop();
      plantData?.wateredDays.push(dateToTimestamp(wateredDay));
    }
    if (plantData?.wateredDays) {
      const updatedFields = {
        imgUrl: imgUrl,
        nickname: plantNickname,
        purchasedDay: dateToTimestamp(purchasedDay),
        wateredDays: plantData?.wateredDays,
        frequency: frequency,
      };
      if (!docId) return;
      updatePlantData(docId, updatedFields);
    }
    navigate('/myplant');
  };

  useEffect(() => {
    const getPlantDataByDocId = async () => {
      if (!docId) {
        errorNoti('잘못된 식물 id입니다.');
        return;
      } else {
        const plantData = await findPlantDataByDocId(docId);
        setPlantData(plantData as UserPlant);
      }
    };
    getPlantDataByDocId();
    if (plantData) {
      setPlantName(plantData.plantName);
      setPlantNickname(plantData.nickname);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="layout">
      <HeaderBefore ex={true} title="식물 수정" />
      <main>
        <div className={`${style.my_plant_edit_container}`}>
          <div className={`${style.my_plant_edit_img_box}`}>
            <div className={`${style.img_wrapper}`}>
              <span>
                <img
                  className={`${style.main_img}`}
                  src={imgUrl || previewImg}
                  alt="samplePlant1"
                />
              </span>
              <div className={`${style.edit_icon_wrapper}`}>
                <label htmlFor="photoInput" className={`${style.photo_label}`}>
                  <img
                    className={`${style.edit_icon}`}
                    src={myPlantImgEditIcon}
                    alt="editIcon"
                  />
                </label>
                <input
                  className={`${style.photo_input}`}
                  id="photoInput"
                  accept="image/*"
                  type="file"
                  onChange={handleFileSelect}
                />
              </div>
              <div className={`${style.my_plant_input_box}`}>
                <input
                  className={`${style.my_plant_edit_input}`}
                  value={plantName}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className={`${style.my_plant_info_form}`}>
            <div className={`${style.my_plant_name_title}`}>
              식물 별명
              <span>(5글자 이내로 설정해주세요)</span>
            </div>
            <input
              className={`${style.my_plant_name}`}
              maxLength={5}
              value={plantNickname}
              onChange={handlePlantNickname}
            />

            <div className={`${style.watering_frequency}`}>
              물 주는 날<span>(주변 환경에 맞게 조절해주세요)</span>
            </div>
            <div className={`${style.watering_frequency_input_box}`}>
              <input
                className={`${style.watering_frequency_input}`}
                onChange={handleFrequency}
                defaultValue={frequencyFromDetail || frequencyFromList}
              />
              <p className={`${style.watering_frequency_info}`}>일에 한 번</p>
            </div>

            <p className={`${style.my_plant_register_small_title}`}>
              식물과 처음 함께한 날<span>(달력을 클릭하여 설정해주세요)</span>
            </p>
            <div className={`${style.my_plant_register_calender_value}`}>
              <input
                className={`${style.date_selector}`}
                type="date"
                value={purchasedDay}
                onChange={purchasedDayHandler}
              />
            </div>
            <p className={`${style.my_plant_register_small_title}`}>
              마지막 물준 날 <span>(선택 입력)</span>
            </p>
            <div className={`${style.my_plant_register_calender_value}`}>
              <input
                type="date"
                className="date_selector"
                value={wateredDay}
                onChange={wateredDaysHandler}
                max={maxDate()}
              />
            </div>
          </div>
        </div>
        <button
          className={`${style.my_plant_edit_btn}`}
          onClick={handleUpdate}
          disabled={saving}
        >
          {saving ? '수정 중...' : '수정하기'}
        </button>
      </main>
      {isLoading && <Progress />}
    </div>
  );
};

export default MyPlantEditPage;
