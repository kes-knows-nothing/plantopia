import { Children } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { codeInfo } from '@/constants/dictionary';
import { PlantType } from '@/@types/dictionary';
import './dictDetailPage.scss';
import ADD_ICON from '@/assets/images/icons/dict_post.png';
import PLANT3_ICON from '@/assets/images/icons/dict_plant3.png';
import WATER_ICON from '@/assets/images/icons/dict_water1.png';
import WATERPOT_ICON from '@/assets/images/icons/dict_waterpot.png';
import BUG_ICON from '@/assets/images/icons/dict_bug.png';

const DictDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plantData: PlantType = location.state;

  const plantInfoForm = [
    {
      image: PLANT3_ICON,
      title: '종',
      content: plantData.speciesInfo,
    },
    {
      image: PLANT3_ICON,
      title: '분류',
      content: plantData.classificationInfo,
    },
    {
      image: WATER_ICON,
      title: '습도',
      content: codeInfo[plantData.humidityCode],
    },
    {
      image: WATERPOT_ICON,
      title: '관리 수준',
      content: codeInfo[plantData.recommendCode],
    },
    { image: BUG_ICON, title: '병해충 정보', content: plantData.blightInfo },
  ];

  const plantEnvForm = [
    {
      type: '햇빛',
      value: codeInfo[plantData.lightCode],
    },
    {
      type: '물',
      value: codeInfo[plantData.waterCode],
    },
    {
      type: '생육적정온도',
      value: codeInfo[plantData.temperatureCode],
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate('/myplant/register', {
      state: { plantName: plantData.name, image: plantData.imageUrl },
    });
  };

  return (
    <div>
      <header>
        <Link to="/dict">
          <span className="back_button">←</span>
        </Link>
        <span className="detail_header">식물 상세(임시 헤더)</span>
      </header>
      <main className="detail_container">
        <section className="thumbnail_wrapper">
          <img src={plantData.imageUrl} alt="plant image" />
          <h3 className="english_name">{plantData.scientificName}</h3>
          <h3 className="korean_name">{plantData.name}</h3>
          <button onClick={handleClick}>
            <img src={ADD_ICON} alt="plant add image" />내 식물로 등록
          </button>
        </section>
        <div className="info_container">
          <section className="info_wrapper">
            <h3>🌱 식물정보</h3>
            <hr />
            {Children.toArray(
              plantInfoForm.map(
                ({ image, title, content }) =>
                  content && (
                    <div className="info_type">
                      <h4>
                        <img src={image} alt="plant icon" />
                        {title}
                      </h4>
                      <p>
                        {Array.isArray(content)
                          ? content.map(item => `${item} `)
                          : content}
                      </p>
                    </div>
                  ),
              ),
            )}
          </section>
          <section className="env_wrapper">
            <h3>👍 잘 자라는 환경</h3>
            <hr />
            {Children.toArray(
              plantEnvForm.map(({ type, value }) => (
                <div className="plant_env">
                  <h4>{type}</h4>
                  <p>{value}</p>
                </div>
              )),
            )}
          </section>
          {plantData.adviseInfo && (
            <section className="info_wrapper">
              <h3>📌 관리 Tip</h3>
              <hr />
              <div className="info_type">
                <p>{plantData.adviseInfo}</p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default DictDetailPage;
