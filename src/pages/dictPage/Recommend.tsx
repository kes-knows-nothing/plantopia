import { useState, useEffect, Children } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@/utils/firebaseApp';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  OrderByDirection,
} from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { mockData } from '@/mock/dictMock';
import { targetQuery, targetClassName } from '@/constants/dictionary';
import { RecommendProps, PlantType } from '@/@types/dictionary';
import './recommend.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const orderDirection: OrderByDirection[] = ['asc', 'desc'];

const Recommend = ({ icon, title, target }: RecommendProps) => {
  const [plant, setPlant] = useState<PlantType[]>([]);

  const getDouments = async (target: keyof typeof targetQuery) => {
    const dictRef = collection(db, 'dictionary');
    const q = query(
      dictRef,
      where(targetQuery[target][0], '==', targetQuery[target][1]),
      orderBy(
        Object.values(targetQuery)[getRandomIndex(4)][0],
        orderDirection[getRandomIndex(2)],
      ),
      limit(8),
    );
    const querySnapshot = await getDocs(q);
    const queriedData: PlantType[] = [];
    querySnapshot.forEach(doc => {
      queriedData.push(doc.data() as PlantType);
    });
    setPlant(prev => [...prev, ...shuffleArray(queriedData)]);
  };

  const getMockData = async () => {
    shuffleArray(mockData);
    mockData.map(item => setPlant(prev => [...prev, item] as PlantType[]));
  };

  const getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  const shuffleArray = (array: PlantType[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Mock Data 사용시 getDouments 주석 처리
    getDouments(target);

    // Mock Data 사용시 getMockData 주석 해제
    // getMockData();
  }, []);

  return (
    <div className="recommend_container">
      <div className="title_wrapper">
        <div className={targetClassName[target]}>
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
