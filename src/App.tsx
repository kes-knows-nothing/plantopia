import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

import DiaryPage from './pages/diaryPage/DiaryPage';
import DiaryWritePage from './pages/diaryWritePage/DiaryWritePage';
import Mypage from './pages/MyPage';
import MyPlantMainPage from './pages/MyPlantPage/MyPlantMainPage';
import MyPlantRegisterPage from '@/pages/MyPlantPage/MyPlantRegister/MyPlantRegisterPage';
import RegisterPage from './pages/RegisterPage';
import DictPage from './pages/dictPage/DictPage';
import DictSearchPage from './pages/dictPage/DictSearchPage';
import DictDetailPage from './pages/dictPage/DictDetailPage';
import CalendarPage from './pages/calendarPage/CalendarPage';
import { setBodyHeight } from './utils/setBodyHeight';

function App() {
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
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myplant" element={<MyPlantMainPage />} />
      <Route path="/myplant/register" element={<MyPlantRegisterPage />} />
      <Route path="/dict" element={<DictPage />} />
      <Route path="/dict/search" element={<DictSearchPage />} />
      <Route path="/dict/detail" element={<DictDetailPage />} />
    </Routes>
  );
}

export default App;
