import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import LoginPage from './pages/loginPage/LoginPage';
import DiaryPage from './pages/diaryPage/diaryMainPage/DiaryPage';
import DiaryWritePage from './pages/diaryPage/diaryWritePage/DiaryWritePage';
import DiaryEditPage from './pages/diaryPage/diaryEditPage/DiaryEditPage';
import DiaryDetailPage from './pages/diaryPage/diaryDetailPage/DiaryDetailPage';
import MyPage from './pages/myPage/MyPage';
import MyInfo from './pages/myPage/MyInfo';
import MyPlantMainPage from './pages/myPlantPage/myPlantMainPage/MyPlantMainPage';
import MyPlantDetailPage from './pages/myPlantPage/myPlantDetailPage/MyPlantDetailPage';
import MyPlantRegisterPage from './pages/myPlantPage/myPlantRegisterPage/MyPlantRegisterPage';
import MyPlantEditPage from './pages/myPlantPage/myPlantEditPage/MyPlantEditPage';
import DictPage from './pages/dictPage/DictPage';
import DictSearchPage from './pages/dictPage/dictSearchPage/DictSearchPage';
import DictDetailPage from './pages/dictPage/dictDetailPage/DictDetailPage';
import CalendarPage from './pages/calendarPage/CalendarPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import Toast from './components/notification/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/custom-toast-styles.scss';

import Toast from './components/notification/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/custom-toast-styles.scss';

import { setBodyHeight } from './utils/setBodyHeight';

const App = () => {
  useEffect(() => {
    setBodyHeight();
  }, []);

  return (
    <>
      <Toast />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/diary/write" element={<DiaryWritePage />} />
        <Route path="/diary/:docId/edit" element={<DiaryEditPage />} />
        <Route path="/diary/:docId" element={<DiaryDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/info" element={<MyInfo />} />
        <Route path="/myplant" element={<MyPlantMainPage />} />
        <Route path="/myplant/:docId" element={<MyPlantDetailPage />} />
        <Route path="/myplant/:docId/edit" element={<MyPlantEditPage />} />
        <Route path="/myplant/register" element={<MyPlantRegisterPage />} />
        <Route path="/dict" element={<DictPage />} />
        <Route path="/dict/search" element={<DictSearchPage />} />
        <Route path="/dict/detail" element={<DictDetailPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
