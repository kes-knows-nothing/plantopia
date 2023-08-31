import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryImages } from '@/constants/diary';
import { useAuth } from '@/hooks';
import useDiaryData from '@/hooks/useDiaryData';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Progress from '@/components/progress/Progress';
import { showAlert } from '@/utils/alarmUtil';

import ListView from './ListView';
import GalleryView from './GalleryView';
import './diaryPage.scss';

const DiaryPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const { diaryData, checkPlantExistence, handleDelete } = useDiaryData();
  const [currentTab, setCurrentTab] = useState('list_tab');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    diaryData.length && setIsLoading(false);
  }, [diaryData]);

  const handleTabChange = (tab: string) => {
    if (tab !== currentTab) {
      setCurrentTab(tab);
    }
  };

  const tabData = [
    {
      name: 'list_tab',
      label: 'List',
      onImage: DiaryImages.LISTON,
      offImage: DiaryImages.LISTOFF,
    },
    {
      name: 'gallery_tab',
      label: 'Gallery',
      onImage: DiaryImages.GALLERYON,
      offImage: DiaryImages.GALLERYOFF,
    },
  ];

  const redirectToPage = async () => {
    const plantExists = await checkPlantExistence();
    if (!plantExists) {
      showAlert(
        '등록된 식물이 없습니다.',
        '내 식물을 등록하시겠습니까?',
        () => {
          navigate('/myplant/register');
        },
      );
    } else {
      navigate('/diary/write');
    }
  };

  return (
    <>
      <Header />
      <main className="diary_page">
        <div className="diary_container">
          <h2 className="title inner">
            <span>{user?.displayName ?? '사용자'}</span>님, 식물의 성장 기록을
            남겨보세요.
            <span className="plant_icon"></span>
          </h2>
          <section className="tab_section">
            {tabData.map((tab, index) => (
              <div
                key={index}
                className={`view_tab ${tab.name} ${
                  currentTab === tab.name ? 'on' : ''
                }`}
                onClick={() => handleTabChange(tab.name)}
              >
                <img
                  src={currentTab === tab.name ? tab.onImage : tab.offImage}
                  className="tab_img"
                  alt={`Tab ${tab.label}`}
                ></img>
              </div>
            ))}
          </section>
          <section className="content_section">
            {currentTab === 'list_tab' ? (
              <ListView diaryData={diaryData} handleDelete={handleDelete} />
            ) : (
              <GalleryView diaryData={diaryData} />
            )}
          </section>
          <div className="top_btn"></div>
        </div>
        <button onClick={redirectToPage} className="write_btn_wrap">
          <div className="write_btn"></div>
        </button>
      </main>
      <Footer />
      {isLoading && <Progress />}
    </>
  );
};

export default DiaryPage;
