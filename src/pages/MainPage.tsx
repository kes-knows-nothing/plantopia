import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { fireBaseAuth } from '@/myFirebase';

const MainPage = () => {
  console.log(fireBaseAuth);
  return (
    <div>
      <Header isMainPage />
      <h1>메인 페이지입니다.</h1>
      <Footer />
    </div>
  );
};

export default MainPage;
