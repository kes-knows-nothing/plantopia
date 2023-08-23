import { useState, useEffect, Children } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@/utils/firebaseApp';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { mockData } from '@/mock/dictMock';
import './Recommend.scss';

interface plantType {
  name: string;
  scientificName: string;
  imageUrl: string;
  adviseInfo: string;
  blightInfo: string[];
  growCode: string;
  humidityCode: string;
  lightCode: string;
  recommendCode: string;
  temperatureCode: string;
  waterCode: string;
  speciesInfo: string;
  classificationInfo: string[];
}

interface RecommendProps {
  icon: string;
  title: string;
  target: string;
}

const targetClassName = {
  beginner: 'img_wrapper_white',
  growWell: 'img_wrapper_navy',
  lessWater: 'img_wrapper_blue',
  dark: 'img_wrapper_gray',
};

const targetQuery = {
  beginner: ['recommendCode', 'RC01'],
  growWell: ['growCode', 'GC01'],
  lessWater: ['waterCode', 'WC01'],
  dark: ['lightCode', 'LC01'],
};

const Recommend = ({ icon, title, target }: RecommendProps) => {
  const [plant, setPlant] = useState<plantType[]>([]);

  useEffect(() => {
    // Mock Data 사용시 아래 주석 처리
    const getDouments = async (target: keyof typeof targetQuery) => {
      const dictRef = collection(db, 'dictionary');
      const q = query(
        dictRef,
        where(targetQuery[target][0], '==', targetQuery[target][1]),
        limit(8),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setPlant(prev => {
          const data = doc.data();
          return [...prev, data] as plantType[];
        });
      });
    };
    getDouments(target as keyof typeof targetQuery);

    // Mock Data 사용시 아래 주석 해제
    // const getDouments = async () => {
    //   mockData.map(item => setPlant(prev => [...prev, item]));
    // };
    // getDouments();
  }, []);

  return (
    <div className="recommend_container">
      <div className="title_wrapper">
        <div
          className={targetClassName[target as keyof typeof targetClassName]}
        >
          <img className="plant_icon" src={icon} alt="search icon" />
        </div>
        <span>{title}</span>
      </div>
      <Swiper
        slidesPerView={target === 'beginner' ? 2 : 3}
        spaceBetween={target === 'beginner' ? 14 : 13}
        navigation={true}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="plants_container"
      >
        {Children.toArray(
          plant?.map(item => (
            <SwiperSlide className="plant_wrapper">
              <Link to={`/dict/detail?plantName=${item.name}`} state={item}>
                <img
                  className={target === 'beginner' ? 'img_two' : 'img_three'}
                  src={item.imageUrl}
                  alt="plant image"
                />
                <p
                  className={
                    target === 'beginner'
                      ? 'english_name_two'
                      : 'english_name_three'
                  }
                >
                  {item.scientificName}
                </p>
                <p
                  className={
                    target === 'beginner'
                      ? 'korean_name_two'
                      : 'korean_name_three'
                  }
                >
                  {item.name}
                </p>
              </Link>
            </SwiperSlide>
          )),
        )}
      </Swiper>
    </div>
  );
};

export default Recommend;
