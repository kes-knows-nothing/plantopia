import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/loginPage/LoginPage';
import DiaryPage from './pages/diaryPage/DiaryPage';
import DiaryWritePage from './pages/diaryWritePage/DiaryWritePage';
import MyPage from './pages/myPage/MyPage';
import MyPlantPage from './pages/MyPlantPage';
import RegisterPage from './pages/RegisterPage';
import CalendarPage from './pages/calendarPage/CalendarPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/diary/write" element={<DiaryWritePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myplant" element={<MyPlantPage />} />
    </Routes>
  );
}

export default App;
