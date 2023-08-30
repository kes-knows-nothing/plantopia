import { Children } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { targetClassName, targetQuery } from '@/constants/dictionary';
import { useRecommend } from '@/hooks';
import './recommend.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface RecommendProps {
  icon: string;
  title: string;
  target: keyof typeof targetQuery;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Recommend = ({ icon, title, target, setIsLoading }: RecommendProps) => {
  const { plant } = useRecommend({ target, setIsLoading });

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
                <div className="name_wrapper">
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
                </div>
              </Link>
            </SwiperSlide>
          )),
        )}
      </Swiper>
    </div>
  );
};

export default Recommend;
