import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListView from './ListView.tsx';
import GalleryView from './GalleryView.tsx';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { TabImages } from '@/constants/diary';
import './diaryPage.scss';
import { db } from '@/firebaseApp.ts';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '@/hooks';

interface DiaryProps {
  userEmail: string;
  content: string;
  postedAt: Timestamp;
  tags: string[];
  title: string;
  imgUrls: string[];
}

const DiaryPage = () => {
  const user = useAuth();
  const [currentTab, setCurrentTab] = useState('list_tab');
  const [diaryData, setDiaryData] = useState<DiaryProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(
          collection(db, 'diary'),
          where('userEmail', '==', user?.email),
        );
        const querySnapshot = await getDocs(q);
        const data: DiaryProps[] = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });

        const sortedData = data.sort(
          (a, b) => b.postedAt.toDate() - a.postedAt.toDate(),
        );
        setDiaryData(sortedData);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (index: number) => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');

    if (confirmed) {
      try {
        const diaryIdToDelete = diaryData[index].id;

        await deleteDoc(doc(db, 'diary', diaryIdToDelete));

        const updatedDiaryData = diaryData.filter((_, i) => i !== index);
        setDiaryData(updatedDiaryData);
      } catch (error) {
        console.error('일기 삭제 중 오류:', error);
      }
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab !== currentTab) {
      setCurrentTab(tab);
    }
  };

  const tabData = [
    {
      name: 'list_tab',
      label: 'List',
      onImage: TabImages.LISTON,
      offImage: TabImages.LISTOFF,
    },
    {
      name: 'gallery_tab',
      label: 'Gallery',
      onImage: TabImages.GALLERYON,
      offImage: TabImages.GALLERYOFF,
    },
  ];

  return (
    <>
      <Header />
      <main className="diary_page">
        <div className="diary_container">
          <h2 className="title inner">
            <span>{user?.displayName ?? '사용자'}</span>님, 식물의 성장 기록을
            남겨보세요
            <span className="plant_icon"></span>
          </h2>
          <section className="view_section">
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
        <div className="write_btn_wrap">
          <Link to="/diary/write" className="write_btn"></Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DiaryPage;
