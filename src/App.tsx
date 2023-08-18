import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryPage from './pages/DiaryPage';
import MyPage from './pages/MyPage/MyPage';
import MyPlantPage from './pages/MyPlantPage';
import RegisterPage from './pages/RegisterPage';
import DictPage from './pages/dictPage/DictPage';
import CalendarPage from './pages/calendarPage/CalendarPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myplant" element={<MyPlantPage />} />
      <Route path="/dict" element={<DictPage />} />
    </Routes>
  );
}

export default App;
