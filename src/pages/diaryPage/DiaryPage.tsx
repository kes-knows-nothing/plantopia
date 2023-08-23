import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListView from './ListView.tsx';
import GalleryView from './GalleryView.tsx';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { BsList, BsFillGridFill } from 'react-icons/bs';
import { PiPlant } from 'react-icons/pi';

import './diaryPage.scss';

const Tab = ({ icon, tabName, currentTab, handleTabChange }) => (
  <div
    className={`view_tab ${tabName} ${currentTab === tabName ? `on` : ''}`}
    onClick={() => handleTabChange(tabName)}
  >
    {icon}
  </div>
);

const DiaryPage = () => {
  const [currentTab, setCurrentTab] = useState('list_tab');

  const handleTabChange = tab => {
    if (tab !== currentTab) {
      setCurrentTab(tab);
    }
  };

  const tabs = [
    { icon: <BsList />, tabName: 'list_tab' },
    { icon: <BsFillGridFill />, tabName: 'gallery_tab' },
  ];

  return (
    <main className="diary_page">
      <div className="diary_container">
        <Header />
        <h2 className="title inner">
          <span>{'Joy'}</span>님, 식물의 성장 기록을 남겨보세요
          <span className="plant_icon">
            <PiPlant />
          </span>
        </h2>
        <section className="view_section">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              tabName={tab.tabName}
              currentTab={currentTab}
              handleTabChange={handleTabChange}
            />
          ))}
        </section>
        <section className="content_section">
          {currentTab === 'list_tab' ? <ListView /> : <GalleryView />}
        </section>
        <Link to="/diary/write" className="write_btn"></Link>
        <div className="top_btn"></div>
        <Footer />
      </div>
    </main>
  );
};

export default DiaryPage;
