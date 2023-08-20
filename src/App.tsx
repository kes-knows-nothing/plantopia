import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/loginPage/LoginPage';
import DiaryPage from './pages/DiaryPage';
import MyPage from './pages/myPage/MyPage';
import MyPlantPage from './pages/MyPlantPage/MyPlantMainPage';
import MyPlantDetailPage from './pages/MyPlantPage/MyPlantDetailPage';
import RegisterPage from './pages/RegisterPage';
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
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myplant" element={<MyPlantPage />} />
      <Route path="/myplant/detail" element={<MyPlantDetailPage />} />
    </Routes>
  );
}

export default App;
