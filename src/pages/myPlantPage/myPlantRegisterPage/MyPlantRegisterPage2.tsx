import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { storage } from '@/firebaseApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './myPlantRegisterPage.scss';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import { errorNoti, successNoti } from '@/utils/alarmUtil';
import { waterCodeToNumber } from '@/utils/convertDataUtil';
import { dateToTimestamp, maxDate } from '@/utils/dateUtil';
import { useForm } from 'react-hook-form';
import { MyPlantForm, UserPlant } from '@/@types/plant.type';
import { isUserPlantEmpty, registerPlantData } from '@/api/userPlant';

const MyPlantRegisterPage2 = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name;
  const image = location.state?.image;
  const waterCode = location.state?.waterCode;

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string>();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MyPlantForm>();

  const onValid = async (data: MyPlantForm) => {
    setSaving(true);

    // const fieldNamesToCheck = [
    //   errors.plantName?.message,
    //   errors.nickname?.message,
    //   errors.purchasedDay?.message,
    // ];

    // for (const errorMessage of fieldNamesToCheck) {
    //   if (errorMessage) {
    //     errorNoti(errorMessage);
    //     setSaving(false);
    //     return;
    //   }
    // }

    if (!user?.email) return;
    const isEmpty = await isUserPlantEmpty(user?.email);

    if (errors.plantName?.message) {
      errorNoti(errors.plantName?.message);
      setSaving(false);
      return;
    }
    if (errors.nickname?.message) {
      errorNoti(errors.nickname?.message);
      setSaving(false);
      return;
    }
    if (errors.purchasedDay?.message) {
      errorNoti(errors.purchasedDay?.message);
      setSaving(false);
      return;
    }

    const newPlantData = {
      frequency: data.frequency,
      imgUrl: imgUrl || image,
      isMain: isEmpty ? true : false,
      nickname: data.nickname,
      plantName: data.plantName,
      purchasedDay: dateToTimestamp(data.purchasedDay),
      userEmail: user?.email,
      wateredDays: data.wateredDays ? [dateToTimestamp(data.wateredDays)] : [],
    };
    registerPlantData(newPlantData as UserPlant);
    successNoti('새 식물 등록에 성공하였습니다');
    navigate('/myplant');
  };

  const navigateSearch = () => {
    navigate('/dict/search', {
      state: { inputValue: '' },
    });
  };

  // 이미지 저장 로직
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
      console.error('파일 업로드 에러:', error);
    }
    event.target.value = '';
  };

  // 이미지 저장 로직

  useEffect(() => {
    if (name) {
      setValue('plantName', name);
    }
    if (!waterCodeToNumber(waterCode)) return;
    setValue('frequency', waterCodeToNumber(waterCode));
  }, [name, setValue, waterCode]);

  return (
    <div className="layout">
      <HeaderBefore ex={true} title="식물 등록" />
      <main>
        <form action="" onSubmit={handleSubmit(onValid)}>
          <div className="my_plant_registeration_container">
            <div className="my_plant_register_img_box">
              <div className="img_wrapper">
                <span>
                  <img
                    className="main_img"
                    src={previewImg || image || samplePlant1}
                    alt="samplePlant1"
                  />
                </span>
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
                  placeholder="클릭하여 식물 이름을 검색해보세요."
                  {...register('plantName', {
                    required: '식물 선택은 필수입니다!',
                  })}
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
              <div className="my_plant_name_title required">
                식물별명<p>(5글자 이내로 설정해주세요)</p>
              </div>
              <input
                className="my_plant_name"
                {...register('nickname', {
                  required: '식물 이름을 작성해주세요.',
                  maxLength: { value: 5, message: '5글자 이내로 작성해주세요' },
                })}
              />
              <div className="watering_frequency required">
                물 주는 날<p>(주변 환경에 맞게 조절해주세요)</p>
              </div>
              <div className="watering_frequency_input_box">
                <input
                  type="number"
                  className="watering_frequency_input"
                  {...register('frequency', {
                    required: '물 주기를 설정해주세요!',
                    max: { value: 20, message: '1에서 20사이로 설정해주세요.' },
                    min: { value: 1, message: '1에서 20사이로 설정해주세요.' },
                  })}
                />

                <p className="watering_frequency_info">일에 한 번</p>
              </div>

              <p className="my_plant_register_small_title required">
                식물과 처음 함께한 날{' '}
                <span>(달력을 클릭하여 설정해주세요)</span>
              </p>

              <div className="my_plant_register_calender_value">
                <input
                  className="date_selector"
                  type="date"
                  {...register('purchasedDay', {
                    required: '처음 함께한 날을 설정해주세요!',
                  })}
                  max={maxDate()}
                />
              </div>
              <p className="my_plant_register_small_title">
                마지막 물준 날<span>(선택 입력)</span>
              </p>
              <div className="my_plant_register_calender_value">
                <input
                  type="date"
                  className="date_selector"
                  {...register('wateredDays')}
                  max={maxDate()}
                />
              </div>
            </div>
          </div>
          <button
            className="my_plant_register_btn"
            type="submit"
            disabled={saving}
          >
            {saving ? '등록 중...' : '등록하기'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default MyPlantRegisterPage2;
