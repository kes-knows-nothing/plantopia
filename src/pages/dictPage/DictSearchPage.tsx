import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DictSearchPage.scss';
import InputForm from './InputForm';
import PLANT2_ICON from '@/assets/images/icons/dict_plant2.png';

const searchResult = [
  {
    image: PLANT2_ICON,
    koreanName: '바나나 크로톤',
    englishName: 'Banana Croton',
  },
  {
    image: PLANT2_ICON,
    koreanName: '포도 크로톤',
    englishName: 'Grape Croton',
  },
  {
    image: PLANT2_ICON,
    koreanName: '복숭아 크로톤',
    englishName: 'Peach Croton',
  },
];

const DictSearchPage = () => {
  const location = useLocation();
  const inputValue = location.state?.inputValue;

  return (
    <div className="search_container">
      <header>
        <Link to="/dict">
          <span className="back_button">←</span>
        </Link>
        <span className="search_header">검색 결과(임시 헤더)</span>
      </header>
      <main>
        <InputForm nextPath={'/dict/detail'} initialInput={inputValue} />
        <section className="plant_container">
          {searchResult.map(({ image, koreanName, englishName }) => (
            <Link key={englishName} to="/dict/detail">
              <div className="plant_wrapper">
                <img src={image} alt="plant image" />
                <div className="name_wrapper">
                  <h3 className="korean_name">{koreanName}</h3>
                  <h3 className="english_name">{englishName}</h3>
                </div>
              </div>
            </Link>
          ))}
          <div className="no_search">
            <p>검색 결과가 없습니다.</p>
            <a href="https://www.google.co.kr/">
              내가 찾는 식물이 없다면, 식물 등록 요청하기
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DictSearchPage;
