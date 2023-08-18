import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './diary.scss';

import authorImg1 from '@/assets/images/author1.jpg';
import authorImg2 from '@/assets/images/author2.jpg';
import authorImg3 from '@/assets/images/author3.png';
import authorImg4 from '@/assets/images/author4.png';
import authorImg5 from '@/assets/images/author5.webp';
import authorImg6 from '@/assets/images/author6.jpg';
import authorImg7 from '@/assets/images/author7.jpg';
import authorImg8 from '@/assets/images/author8.webp';
import authorImg9 from '@/assets/images/author9.jpg';
import authorImg10 from '@/assets/images/author10.webp';

const DiaryPage = () => {

  return (
    <section
      className="author_section con_wrap"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <h2>이 달의 작가</h2>

      <Swiper
        className="todaySwiper"
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={0}
        onInit={swiper => {
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg4} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                새는 알에서 나오기 위해 투쟁한다. <br />
                알은 새의 세계이다. <br />
                누구든지 태어나려고 하는 자는 <br />
                하나의 세계를 파괴하여야 한다. <br />
                새는 신을 향해 날아간다. <br />그 신의 이름은 아브락사스이다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg10} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                당신을 잃은 뒤, 우리들의 시간은 <br />
                저녁이 되었습니다. 우리들의 <br />
                집과 거리가 저녁이 되었습니다. <br />
                더이상 어두워지지도, 다시 밝아지지도 않는 저녁 속에서 주이들은
                밥을 먹고 <br />
                걸음을 걷고 잠을 잡니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg1} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                다시 올라올 수 있는 힘을 얻으려면
                <br />
                바닥을 디뎌야 하는 거야.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg2} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                인생과 그 자신이
                <br />
                일치하는 자가 얼마나 될까
                <br />삶 따로, 사람 따로, 운명 따로.
                <br /> 대부분은 그렇게 산다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg3} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                나의 미래는 오래전에 <br />
                개봉한 맥주였다. <br />
                향과 알코올과 탄산이 다 날아간 <br />
                미적지근한 그 병에 뚜껑만 다시 닫아 <br />
                놓고서 남에게나 나에게나 <br />
                새것이라고 우겨대는 것 같았다.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg5} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                삶의 의미를 찾아 헤매고 있다면 <br />
                그것은 삶이 아니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg6} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                앞으로 앞으로 나가게 하지 말고, <br />
                멈춰 서서 생각하게 할 것. <br />
                그것뿐이야.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg7} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                어느날 아침 그레고르 잠자가 뒤숭숭한 꿈에서 깨어났을 때 자신이
                지난 밤 <br />
                사이에 한 마리의 커다란 벌레로 <br />
                변한 것을 발견했다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg8} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                별 하나에 추억과, <br />별 하나에 사랑과,
                <br /> 별 하나에 쓸쓸함과, <br />별 하나에 동경과, <br />별
                하나에 시와, <br />별 하나에 어머니, <br />
                어머니
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img_box">
            <img src={authorImg9} alt="작가 이미지" />
            <div className="img_hover">
              <p>
                지금 저에게는 행복도 불행도 없습니다. 모든 것은 지나간다는 것.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default DiaryPage;
