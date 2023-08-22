import { useRef } from 'react';

import { RiMore2Fill } from 'react-icons/ri';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './diaryDetailPage.scss';

import img1 from '@/assets/images/diary_sample1.jpg';
import img2 from '@/assets/images/diary_sample2.jpg';
import img3 from '@/assets/images/diary_sample3.jpg';
import img4 from '@/assets/images/diary_sample4.jpg';

const DiaryDetailPage = () => {
  const slideSectionPrevBtn = useRef();
  const slideSectionNextBtn = useRef();

  return (
    <main className="diary_detail_page">
      <div className="diary_detail_container">
        <div className="sub_header">
          <button className="header_btn back">
            <HiOutlineArrowLeft />
          </button>
          <strong>다이어리</strong>
          <button className="header_btn more">
            <RiMore2Fill />
          </button>
        </div>
        <section className="slide_section">
          <Swiper
            className="diary_img_swiper swiper "
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            pagination={{
              clickable: true,
            }}
            onInit={swiper => {
              swiper.params.navigation.prevEl = slideSectionPrevBtn.current;
              swiper.params.navigation.nextEl = slideSectionNextBtn.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            <SwiperSlide>
              <div className="slide_container">
                <img src={img1} className="slide_img" alt="슬라이드 이미지" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide_container">
                <img src={img2} className="slide_img" alt="슬라이드 이미지" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide_container">
                <img src={img3} className="slide_img" alt="슬라이드 이미지" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide_container">
                <img src={img4} className="slide_img" alt="슬라이드 이미지" />
              </div>
            </SwiperSlide>
            <div className="swiper_nav">
              <div
                ref={slideSectionPrevBtn}
                className="swiper_nav_prev nav_btn"
              >
                <div className="prev_btn"></div>
              </div>
              <div
                ref={slideSectionNextBtn}
                className="swiper_nav_next nav_btn"
              >
                <div className="next_btn"></div>
              </div>
            </div>
          </Swiper>
        </section>
        <section className="content_section inner">
          <h5 className="diary_title">새 잎이 자랐다.</h5>
          <div className="plant_list">
            <span>몬식이</span>
            <span>이름이 긴 식물</span>
            <span>플래피노</span>
            <span>또 다른 식물</span>
          </div>
          <div className="text_wrap">
            <p className="diary_text">
              플래피노에 꽃이 피었다. 요즘 날씨가 좋아서 쑥쑥 자라더니 어느새 꽃
              봉우리가 활짝 펴졌다. 향이 좋아서 자꾸 더 들여다보게 된다. 앞으로
              다른 꽃들도 더 많이 활짝 피었으면 좋겠다!플래피노에 꽃이 피었다.
              요즘 날씨가 좋아서 쑥쑥 자라더니 어느새 꽃 봉우리가 활짝 펴졌다.
              향이 좋아서 자꾸 더 들여다보게 된다. 앞으로 다른 꽃들도 더 많이
              활짝 피었으면 좋겠다!
              <br />
              <br />
              플래피노에 꽃이 피었다. 요즘 날씨가 좋아서 쑥쑥 자라더니 어느새 꽃
              봉우리가 활짝 펴졌다. 향이 좋아서 자꾸 더 들여다보게 된다. 앞으로
              다른 꽃들도 더 많이 활짝 피었으면 좋겠다!
            </p>
            <p className="diary_date">2023.08.15.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DiaryDetailPage;
