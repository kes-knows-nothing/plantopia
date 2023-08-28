import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListView from './ListView.tsx';
import GalleryView from './GalleryView.tsx';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { BsList, BsFillGridFill } from 'react-icons/bs';
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

const Tab = ({ icon, tabName, currentTab, handleTabChange }) => (
  <div
    className={`view_tab ${tabName} ${currentTab === tabName ? 'on' : ''}`}
    onClick={() => handleTabChange(tabName)}
  >
    {icon}
  </div>
);

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

  const tabs = [
    { icon: <BsList />, tabName: 'list_tab' },
    { icon: <BsFillGridFill />, tabName: 'gallery_tab' },
  ];

  return (
    <main className="diary_page">
      <div className="diary_container">
        <Header />
        <h2 className="title inner">
          <span>{user?.displayName ?? '사용자'}</span>님, 식물의 성장 기록을
          남겨보세요
          <span className="plant_icon"></span>
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
          {currentTab === 'list_tab' ? (
            <ListView diaryData={diaryData} handleDelete={handleDelete} />
          ) : (
            <GalleryView diaryData={diaryData} />
          )}
        </section>
        <div className="top_btn"></div>
        <Footer />
      </div>
      <div className="write_btn_wrap">
        <Link to="/diary/write" className="write_btn"></Link>
      </div>
    </main>
  );
};

export default DiaryPage;
