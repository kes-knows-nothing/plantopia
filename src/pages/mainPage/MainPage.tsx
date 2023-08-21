import './mainPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import weather from '@/assets/images/weather';
import plants from '@/assets/images/plants';
import LOCATION from '@/assets/images/icons/location.png';
import WATERING from '@/assets/images/icons/watering.png';

const MainPage = () => {
  return (
    <>
      <Header isMainPage />
      <main className="container">
        <section>
          <div className="inner">
            <div className="weather_wrapper">
              <div className="weather_text_wrapper">
                <div className="location_wrapper">
                  <img
                    src={LOCATION}
                    className="location_icon"
                    alt="location"
                  />
                  <span className="location_text">서울, 후암동</span>
                </div>
                <div className="weather_text_box temperature_lg">
                  비 조금 36°
                  <span className="temperature_sm">36°</span>
                  <span className="temperature_sm">27°</span>
                </div>
                <div className="weather_text_box">
                  오늘은 창밖으로 빗소리가 들리겠어요
                </div>
              </div>
              <img src={weather.RAIN} className="weather_icon" alt="weather" />
            </div>
            <div className="main_plant">
              <div className="inner_circle">
                <img src={plants.MAIN_PLANT} alt="plant" />
              </div>
              <button className="watering_btn">
                <img src={WATERING} alt="watering" />
                <div className="watering_label">물주기</div>
              </button>
            </div>
            {/* main_plant_info */}
            <div className="main_plant_info">
              <div className="plant_name_label">아글라오네마</div>
              <h2 className="plant_nickname">쑥쑥이</h2>
              <div className="plant_info_wrapper">
                <div className="plant_info">
                  <span className="info_title">물주기</span>
                  <div className="info_content label_content">
                    <span>D-5</span>
                  </div>
                </div>
                <div className="plant_info">
                  <span className="info_title">마지막 물준 날</span>
                  <span className="info_content">2023-08-02</span>
                </div>
                <div className="plant_info">
                  <span className="info_title">처음 함께한 날</span>
                  <span className="info_content">2023-06-13</span>
                </div>
              </div>
            </div>
          </div>
          {/* swiper로 처리 */}
          {/* plants_list */}
          <div className="slide_wrapper">
            <Swiper slidesPerView={4} className="swiper">
              <SwiperSlide>
                <button className="slide">
                  <div className="avatar">
                    <img src={plants.SUB_PLANT_1} alt="plant" />
                  </div>
                  <span className="name">이상해풀</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="slide">
                  <div className="avatar">
                    <img src={plants.SUB_PLANT_1} alt="plant" />
                  </div>
                  <span className="name">이상해풀</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="slide">
                  <div className="avatar">
                    <img src={plants.SUB_PLANT_1} alt="plant" />
                  </div>
                  <span className="name">이상해풀</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="slide">
                  <div className="avatar">
                    <img src={plants.SUB_PLANT_1} alt="plant" />
                  </div>
                  <span className="name">이상해풀</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="slide">
                  <div className="avatar">
                    <img src={plants.SUB_PLANT_1} alt="plant" />
                  </div>
                  <span className="name">이상해풀</span>
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
