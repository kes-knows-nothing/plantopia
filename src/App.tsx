import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import LoginPage from './pages/loginPage/LoginPage';
import DiaryPage from './pages/diaryPage/DiaryPage';
import DiaryWritePage from './pages/diaryPage/diaryWritePage/DiaryWritePage';
import DiaryDetailPage from './pages/diaryPage/diaryDetailPage/DiaryDetailPage';
import MyPage from './pages/myPage/MyPage';
import MyInfo from './pages/myPage/MyInfo';
import MyPlantMainPage from './pages/myPlantPage/MyPlantMainPage';
import MyPlantDetailPage from './pages/myPlantPage/MyPlantDetailPage';
import MyPlantRegisterPage from '@/pages/myPlantPage/myPlantRegister/MyPlantRegisterPage';
import RegisterPage from './pages/RegisterPage';
import DictPage from './pages/dictPage/DictPage';
import DictSearchPage from './pages/dictPage/DictSearchPage';
import DictDetailPage from './pages/dictPage/DictDetailPage';
import CalendarPage from './pages/calendarPage/CalendarPage';
import { setBodyHeight } from './utils/setBodyHeight';
import MyPlantSearchResultPage from './pages/myPlantPage/myPlantSearchResultPage/MyPlantSearchResultPage';

const App = () => {
  useEffect(() => {
    setBodyHeight();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/diary/write" element={<DiaryWritePage />} />
      <Route path="/diary/Detail" element={<DiaryDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/info" element={<MyInfo />} />
      <Route path="/myplant" element={<MyPlantMainPage />} />
      <Route path="/myplant/:docId" element={<MyPlantDetailPage />} />
      <Route path="/myplant/register" element={<MyPlantRegisterPage />} />
      <Route path="/myplant/search" element={<MyPlantSearchResultPage />} />
      <Route path="/dict" element={<DictPage />} />
      <Route path="/dict/search" element={<DictSearchPage />} />
      <Route path="/dict/detail" element={<DictDetailPage />} />
    </Routes>
  );
};

export default App;
