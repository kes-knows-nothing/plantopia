import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const MainPage = () => {
  return (
    <div>
      <Header isMainPage />
      <h1>메인 페이지입니다.</h1>
      <Footer />
    </div>
  );
};

export default MainPage;
