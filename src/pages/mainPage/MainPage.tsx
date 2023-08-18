import React from 'react';
import './mainPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import weather from '@/assets/images/weather';
import LOCATION from '@/assets/images/icons/location.png';

const MainPage = () => {
  return (
    <>
      <Header isMainPage />
      <main className="inner">
        <section>
          <div className="weather_wrapper">
            <div className="weather_text_wrapper">
              <div className="location_wrapper">
                <img src={LOCATION} className="location_icon" alt="location" />
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
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
