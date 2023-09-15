import './myPlantRegisterPage.scss';

import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useForm, FieldErrors } from 'react-hook-form';

import { errorNoti, successNoti } from '@/utils/alarmUtil';
import { waterCodeToNumber } from '@/utils/convertDataUtil';
import { dateToTimestamp, maxDate } from '@/utils/dateUtil';

import { MyPlantForm, UserPlant } from '@/@types/plant.type';
import {
  handleFileSelect,
  isUserPlantEmpty,
  registerPlantData,
} from '@/api/userPlant';

const MyPlantRegisterPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { name, image, waterCode } = location.state || {};

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string>();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, setValue } = useForm<MyPlantForm>();

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
    for (const fieldName in errors) {
      if (errors[fieldName]?.message) {
        const message = errors[fieldName]?.message as string;
        errorNoti(message);
        return;
      }
    }
  };

  const onValid = async (data: MyPlantForm) => {
    setSaving(true);
    if (!user?.email) return;
    const isEmpty = await isUserPlantEmpty(user?.email);
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
    console.log('저장됨');
    successNoti('새 식물 등록에 성공하였습니다');
    navigate('/myplant');
  };

  const navigateSearch = () => {
    navigate('/dict/search', {
      state: { inputValue: '' },
    });
  };

  const handleImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imgUrls = await handleFileSelect(file);
    if (!imgUrls) return;
    setPreviewImg(imgUrls?.previewUrl);
    setImgUrl(imgUrls?.url);
    event.target.value = '';
  };

  useEffect(() => {
    if (name) {
      setValue('plantName', name);
    }
    const frequencyValue = waterCodeToNumber(waterCode);
    if (frequencyValue !== undefined) {
      setValue('frequency', frequencyValue);
    }
  }, [name, setValue, waterCode]);

  return (
    <div className="layout">
      <HeaderBefore ex={true} title="식물 등록" />
      <main>
        <form action="" onSubmit={handleSubmit(onValid, onInvalid)}>
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
                    onChange={handleImg}
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
                  required: '식물 이름을 지정해주세요!',
                  maxLength: {
                    value: 5,
                    message: '5글자 이내로 지정해주세요!',
                  },
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

export default MyPlantRegisterPage;
