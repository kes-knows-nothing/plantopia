import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '@/utils/firebaseApp';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import './Recommend.scss';

interface plantInfo {
  name: string;
  scientificName: string;
  imageUrl: string;
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

// const mockData = [
//   {
//     imageUrl: 'https://nongsaro.go.kr/cms_contents/301/18694_MF_ATTACH_01.jpg',
//     name: '백량금',
//     scientificName: 'Ardisia crenata',
//   },
//   {
//     name: '부겐빌레아',
//     scientificName: 'Bougainvillea glabra',
//     imageUrl:
//       'https://nongsaro.go.kr/cms_contents/301/18613_MF_REPR_ATTACH_01.jpg',
//   },
//   {
//     name: '네마탄투스',
//     scientificName: 'Nematanthus gregarius',
//     imageUrl:
//       'https://nongsaro.go.kr/cms_contents/301/13207_MF_REPR_ATTACH_01.jpg',
//   },
//   {
//     name: '인삼벤자민',
//     scientificName: "Ficus microcarpa 'Ginseng'",
//     imageUrl:
//       'https://nongsaro.go.kr/cms_contents/301/17748_MF_REPR_ATTACH_01.jpg',
//   },
//   {
//     name: '동백',
//     scientificName: 'Camellia japonica',
//     imageUrl: 'https://nongsaro.go.kr/cms_contents/301/14663_MF_ATTACH_05.jpg',
//   },
//   {
//     name: '병솔나무',
//     scientificName: 'Callistemon spp.',
//     imageUrl: 'https://nongsaro.go.kr/cms_contents/301/15835_MF_ATTACH_01.JPG',
//   },
//   {
//     name: '덕구리난',
//     scientificName: 'Beaucarnea recurvata (Nolina tuberculata)',
//     imageUrl: 'https://nongsaro.go.kr/cms_contents/301/13336_MF_ATTACH_05.jpg',
//   },
//   {
//     name: '백화등',
//     scientificName: 'Trachelospermum asiaticum var. majus',
//     imageUrl: 'https://nongsaro.go.kr/cms_contents/301/14916_MF_ATTACH_03.jpg',
//   },
// ];

const Recommend = ({ icon, title, target }: RecommendProps) => {
  const [plant, setPlant] = useState<plantInfo[]>([]);

  useEffect(() => {
    const getDouments = async (target: string) => {
      const dictRef = collection(db, 'dictionary');
      const q = query(
        dictRef,
        where(
          targetQuery[target as keyof typeof targetQuery][0],
          '==',
          targetQuery[target as keyof typeof targetQuery][1],
        ),
        limit(8),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setPlant(prev => {
          const { name, scientificName, imageUrl } = doc.data();
          return [...prev, { name, scientificName, imageUrl }];
        });
      });
    };
    getDouments(target);

    // const getDouments = async () => {
    //   mockData.map(item => setPlant(prev => [...prev, item]));
    // };
    // getDouments();
  }, []);

  console.log(plant);

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
        {plant.map(
          ({ name: koreanName, scientificName: englishName, imageUrl }) => (
            <SwiperSlide key={Math.random()} className="plant_wrapper">
              <Link to="/dict/detail">
                <img
                  className={target === 'beginner' ? 'img_two' : 'img_three'}
                  src={imageUrl}
                  alt="plant image"
                />
                <p
                  className={
                    target === 'beginner'
                      ? 'english_name_two'
                      : 'english_name_three'
                  }
                >
                  {englishName}
                </p>
                <p
                  className={
                    target === 'beginner'
                      ? 'korean_name_two'
                      : 'korean_name_three'
                  }
                >
                  {koreanName}
                </p>
              </Link>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </div>
  );
};

export default Recommend;
