import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryPage from './pages/DiaryPage';
import MyPage from './pages/MyPage/MyPage';
import MyPlantPage from './pages/MyPlantPage';
import RegisterPage from './pages/RegisterPage';
import CalenderPage from './pages/CalenderPage/CalenderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/calendar" element={<CalenderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/myplant" element={<MyPlantPage />} />
    </Routes>
  );
}

export default App;
