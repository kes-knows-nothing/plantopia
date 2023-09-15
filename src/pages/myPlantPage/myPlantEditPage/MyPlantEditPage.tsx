import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import style from './myPlantEditPage.module.scss';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import Progress from '@/components/progress/Progress';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import { secondsToDate, dateToTimestamp, maxDate } from '@/utils/dateUtil';
import { UserPlantForm } from '@/@types/plant.type';
import { updatePlantData } from '@/api/userPlant';
import { errorNoti } from '@/utils/alarmUtil';
import { useForm, FieldErrors } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { handleFileSelect } from '@/api/userPlant';

const MyPlantEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = useParams();
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm<UserPlantForm>();

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

  const [isLoading, setIsLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState<string>(
    imgUrlFromDetail || imgUrlFromList,
  );
  const [previewImg, setPreviewImg] = useState<string>();

  const handleImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imgUrls = await handleFileSelect(file);
    if (!imgUrls) return;
    setPreviewImg(imgUrls?.previewUrl);
    setImgUrl(imgUrls?.url);
    event.target.value = '';
  };

  const onInvalid = (errors: FieldErrors) => {
    for (const fieldName in errors) {
      if (errors[fieldName]?.message) {
        const message = errors[fieldName]?.message as string;
        errorNoti(message);
        return;
      }
    }
  };

  const onValid = async (data: UserPlantForm) => {
    setSaving(true);
    console.log(data);
    let modifiedWateredDays: InstanceType<typeof Timestamp>[] = [];

    if (data.wateredDays) {
      if (wateredDayFromDetail || wateredDayFromList) {
        modifiedWateredDays = wateredDayFromDetail
          ? [...wateredDayFromDetail]
          : [...wateredDayFromList];
        if (modifiedWateredDays.length > 0) {
          modifiedWateredDays[modifiedWateredDays.length - 1] = dateToTimestamp(
            data.wateredDays,
          );
        } else if (modifiedWateredDays.length == 0) {
          modifiedWateredDays.push(dateToTimestamp(data.wateredDays));
        }
      }
    } else {
      modifiedWateredDays = wateredDayFromDetail
        ? [...wateredDayFromDetail]
        : [...wateredDayFromList];
    }
    const updatedFields = {
      imgUrl: imgUrl,
      nickname: data.nickname,
      purchasedDay: dateToTimestamp(data.purchasedDay),
      wateredDays: modifiedWateredDays,
      frequency: data.frequency,
    };
    if (!docId) return;
    updatePlantData(docId, updatedFields);
    navigate('/myplant');
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="layout">
      <HeaderBefore ex={true} title="식물 수정" />
      <main>
        <form action="" onSubmit={handleSubmit(onValid, onInvalid)}>
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
                  <label
                    htmlFor="photoInput"
                    className={`${style.photo_label}`}
                  >
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
                    onChange={handleImg}
                  />
                </div>
                <div className={`${style.my_plant_input_box}`}>
                  <input
                    className={`${style.my_plant_edit_input}`}
                    defaultValue={plantNameFromDetail || plantNameFromList}
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
                {...register('nickname', {
                  required: '식물 이름을 지정해주세요!',
                  maxLength: {
                    value: 5,
                    message: '5글자 이내로 지정해주세요!',
                  },
                })}
                defaultValue={nicknameFromDetail || nicknameFromList}
              />

              <div className={`${style.watering_frequency}`}>
                물 주는 날<span>(주변 환경에 맞게 조절해주세요)</span>
              </div>
              <div className={`${style.watering_frequency_input_box}`}>
                <input
                  className={`${style.watering_frequency_input}`}
                  type="number"
                  defaultValue={frequencyFromDetail || frequencyFromList}
                  {...register('frequency', {
                    required: '물 주기를 설정해주세요!',
                    max: { value: 20, message: '1에서 20사이로 설정해주세요.' },
                    min: { value: 1, message: '1에서 20사이로 설정해주세요.' },
                  })}
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
                  {...register('purchasedDay', {
                    required: '처음 함께한 날을 설정해주세요!',
                  })}
                  max={maxDate()}
                  defaultValue={secondsToDate(
                    purchasedDayFromDetail?.seconds ||
                      purchasedDayFromList?.seconds,
                  )}
                />
              </div>
              <p className={`${style.my_plant_register_small_title}`}>
                마지막 물준 날 <span>(선택 입력)</span>
              </p>
              <div className={`${style.my_plant_register_calender_value}`}>
                <input
                  type="date"
                  className="date_selector"
                  {...register('wateredDays')}
                  max={maxDate()}
                  defaultValue={secondsToDate(
                    wateredDayFromDetail.at(-1)?.seconds ||
                      wateredDayFromList.at(-1)?.seconds,
                  )}
                />
              </div>
            </div>
          </div>
          <button className={`${style.my_plant_edit_btn}`} disabled={saving}>
            {saving ? '수정 중...' : '수정하기'}
          </button>
        </form>
      </main>
      {isLoading && <Progress />}
    </div>
  );
};

export default MyPlantEditPage;
