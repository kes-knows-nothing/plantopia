import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import Progress from '@/components/progress/Progress';
import './myPlantDetailPage.scss';
import editIcon from '@/assets/images/icons/my_plant_detail_edit_icon.png';
import sunOn from '@/assets/images/icons/sun_on_icon.png';
import sunOff from '@/assets/images/icons/sun_off_icon.png';
import waterOn from '@/assets/images/icons/water_on_icon.png';
import waterOff from '@/assets/images/icons/water_off_icon.png';
import { monthDifference, secondsToDate } from '@/utils/dateUtil';
import { showAlert } from '@/utils/alarmUtil';
import { PlantType } from '@/@types/dictionary.type';
import { UserPlant } from '@/@types/plant.type';
import {
  deletePlantDataByDocId,
  findPlantDataWithDictData,
} from '@/api/userPlant';

const MyPlantDetailPage = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [plantDetail, setPlantDetail] = useState<UserPlant>();
  const [plantDictDetail, setPlantDictDetail] = useState<PlantType>();

  const navigateDictDetail = () => {
    navigate(`/dict/detail?plantName=${plantDictDetail?.name}`, {
      state: plantDictDetail,
    });
  };

  const navigateEdit = () => {
    navigate(`/myplant/${docId}/edit`, {
      state: {
        imgUrlFromDetail: plantDetail?.imgUrl,
        nicknameFromDetail: plantDetail?.nickname,
        plantNameFromDetail: plantDetail?.plantName,
        purchasedDayFromDetail: plantDetail?.purchasedDay,
        wateredDayFromDetail: plantDetail?.wateredDays.at(-1),
        frequencyFromDetail: plantDetail?.frequency,
      },
    });
  };

  const deletePlant = async () => {
    if (docId) {
      await deletePlantDataByDocId(docId);
    }
    navigate('/myplant');
  };

  useEffect(() => {
    const setPlantData = async (docId: string) => {
      if (docId) {
        const { plantDataByDocId, plantDataFromDict } =
          await findPlantDataWithDictData(docId);
        setPlantDetail(plantDataByDocId as UserPlant);
        setPlantDictDetail(plantDataFromDict as PlantType);
      }
    };
    if (docId) {
      setPlantData(docId);
    }
    setIsLoading(false);
  }, [docId]);

  return (
    <div className="layout">
      <HeaderBefore ex={false} title="내 식물 상세" />
      <main>
        <div className="my_plant_detail_upper_container">
          <span className="detail_img_wrap">
            <img
              className="detail_plant_img"
              src={plantDetail?.imgUrl}
              alt="mainPlantImg"
            />
          </span>
          <p className="detail_plant_name">{plantDictDetail?.scientificName}</p>
          <div className="detail_nickname_box">
            <p
              className={` ${
                plantDetail?.isMain
                  ? 'detail_plant_nickname_main'
                  : 'detail_plant_nickname'
              }`}
            >
              {plantDetail?.nickname}
            </p>
          </div>
          <div className="my_plant_detail_edit_btn" onClick={navigateEdit}>
            <div className="my_plant_detail_edit_btn_inner_contents">
              <img src={editIcon} alt="editIcon" />
              <p>식물 정보 수정하기</p>
            </div>
          </div>
        </div>
        <div className="my_plant_detail_lower_container">
          <div className="my_plant_detail_info_box">
            <div className="my_plant_detail_info_head">
              <p>
                ⏰ {plantDetail?.nickname} 식물과 함께한지{' '}
                <span>
                  {monthDifference(plantDetail?.purchasedDay?.seconds || 0)}
                  개월
                </span>
                이 지났어요
              </p>
            </div>
            <div className="my_plant_detail_info_metadata">
              <div className="watering_info">
                <span>물주기</span>
                <span>{plantDetail?.frequency} Days</span>
              </div>
              <div className="last_watering_info">
                <span>마지막 물준 날</span>
                <span>
                  {secondsToDate(
                    plantDetail?.wateredDays?.at(-1)?.seconds || 0,
                  )}
                </span>
              </div>
              <div className="first_day_info">
                <span>처음 함께한 날</span>
                <span>
                  {secondsToDate(plantDetail?.purchasedDay?.seconds || 0)}
                </span>
              </div>
            </div>
          </div>
          <div className="my_plant_detail_info_box">
            <div className="my_plant_detail_info_head">
              <p>👍 잘 자라는 환경</p>
            </div>
            <div className="my_plant_detail_info_metadata gridset">
              <div>
                <span>햇빛</span>
                <span className="sun_on_off">
                  {(() => {
                    if (plantDictDetail?.lightCode === 'LC01') {
                      return (
                        <>
                          <img src={sunOn} alt="" />
                          <img src={sunOff} alt="" />
                          <img src={sunOff} alt="" />
                        </>
                      );
                    } else if (plantDictDetail?.lightCode === 'LC02') {
                      return (
                        <>
                          <img src={sunOn} alt="" />
                          <img src={sunOn} alt="" />
                          <img src={sunOff} alt="" />
                        </>
                      );
                    } else {
                      return (
                        <>
                          <img src={sunOn} alt="" />
                          <img src={sunOn} alt="" />
                          <img src={sunOn} alt="" />
                        </>
                      );
                    }
                  })()}
                </span>
              </div>
              <div>
                <span>물</span>
                <span className="water_on_off">
                  {(() => {
                    if (plantDictDetail?.waterCode === 'WC01') {
                      return (
                        <>
                          <img src={waterOn} alt="" />
                          <img src={waterOff} alt="" />
                          <img src={waterOff} alt="" />
                        </>
                      );
                    } else if (plantDictDetail?.lightCode === 'WC02') {
                      return (
                        <>
                          <img src={waterOn} alt="" />
                          <img src={waterOn} alt="" />
                          <img src={waterOff} alt="" />
                        </>
                      );
                    } else {
                      return (
                        <>
                          <img src={waterOn} alt="" />
                          <img src={waterOn} alt="" />
                          <img src={waterOn} alt="" />
                        </>
                      );
                    }
                  })()}
                </span>
              </div>
              <div>
                <span>생육 적정 온도</span>
                <span className="optimal_temp">
                  {(() => {
                    if (plantDictDetail?.temperatureCode === 'TC01') {
                      return '10 ~ 15℃';
                    } else if (plantDictDetail?.temperatureCode === 'TC02') {
                      return '16 ~ 20℃';
                    } else if (plantDictDetail?.temperatureCode === 'TC03') {
                      return '21 ~ 25℃';
                    } else {
                      return '26 ~ 30℃';
                    }
                  })()}
                </span>
              </div>
            </div>
          </div>
          {!plantDictDetail?.adviseInfo ? null : (
            <div className="my_plant_detail_info_box">
              <div className="my_plant_detail_info_head">
                <p>📌 관리 Tip</p>
              </div>
              <div className="my_plant_detail_info_metadata management_tip_box">
                <p className="management_tip">{plantDictDetail?.adviseInfo}</p>
              </div>
            </div>
          )}
          <p className="more_info_btn" onClick={navigateDictDetail}>
            식물 도감에서 이 식물 정보 더 알아보기!
          </p>
        </div>

        <button
          className="delete_my_plant"
          onClick={() =>
            showAlert('삭제 확인', '정말로 삭제 하시겠습니까?', deletePlant)
          }
        >
          내 식물에서 삭제하기
        </button>
      </main>
      {isLoading && <Progress />}
    </div>
  );
};

export default MyPlantDetailPage;
