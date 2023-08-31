import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { setBodyHeight } from './utils/setBodyHeight';
import Progress from './components/progress/Progress';
import Toast from './components/notification/ToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/custom-toast-styles.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '@/styles/alertStyle.scss';

const MainPage = lazy(() => import('./pages/mainPage/MainPage'));
const LoginPage = lazy(() => import('./pages/loginPage/LoginPage'));
const DiaryPage = lazy(
  () => import('./pages/diaryPage/diaryMainPage/DiaryPage'),
);
const DiaryWritePage = lazy(
  () => import('./pages/diaryPage/diaryWritePage/DiaryWritePage'),
);
const DiaryEditPage = lazy(
  () => import('./pages/diaryPage/diaryEditPage/DiaryEditPage'),
);
const DiaryDetailPage = lazy(
  () => import('./pages/diaryPage/diaryDetailPage/DiaryDetailPage'),
);
const MyPage = lazy(() => import('./pages/myPage/MyPage'));
const MyInfoPage = lazy(() => import('./pages/myPage/MyInfoPage'));
const MyPlantMainPage = lazy(
  () => import('./pages/myPlantPage/myPlantMainPage/MyPlantMainPage'),
);
const MyPlantDetailPage = lazy(
  () => import('./pages/myPlantPage/myPlantDetailPage/MyPlantDetailPage'),
);
const MyPlantRegisterPage = lazy(
  () => import('./pages/myPlantPage/myPlantRegisterPage/MyPlantRegisterPage'),
);
const MyPlantEditPage = lazy(
  () => import('./pages/myPlantPage/myPlantEditPage/MyPlantEditPage'),
);
const DictPage = lazy(() => import('./pages/dictPage/DictPage'));
const DictSearchPage = lazy(
  () => import('./pages/dictPage/dictSearchPage/DictSearchPage'),
);
const DictDetailPage = lazy(
  () => import('./pages/dictPage/dictDetailPage/DictDetailPage'),
);
const CalendarPage = lazy(() => import('./pages/calendarPage/CalendarPage'));
const NotFoundPage = lazy(() => import('./pages/notFoundPage/NotFoundPage'));

const App = () => {
  useEffect(() => {
    setBodyHeight();
  }, []);

  return (
    <>
      <Toast />
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<NotFoundPage />} />

          <Route path="/diary">
            <Route index element={<DiaryPage />} />
            <Route path="write" element={<DiaryWritePage />} />
            <Route path=":docId/edit" element={<DiaryEditPage />} />
            <Route path=":docId" element={<DiaryDetailPage />} />
          </Route>

          <Route path="/mypage">
            <Route index element={<MyPage />} />
            <Route path="info" element={<MyInfoPage />} />
          </Route>

          <Route path="/myplant">
            <Route index element={<MyPlantMainPage />} />
            <Route path=":docId" element={<MyPlantDetailPage />} />
            <Route path=":docId/edit" element={<MyPlantEditPage />} />
            <Route path="register" element={<MyPlantRegisterPage />} />
          </Route>

          <Route path="/dict">
            <Route index element={<DictPage />} />
            <Route path="search" element={<DictSearchPage />} />
            <Route path="detail" element={<DictDetailPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
