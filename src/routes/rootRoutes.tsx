import { lazy } from 'react';

const MainPage = lazy(() => import('@/pages/mainPage/MainPage'));
const LoginPage = lazy(() => import('@/pages/loginPage/LoginPage'));
const CalendarPage = lazy(() => import('@/pages/calendarPage/CalendarPage'));
const NotFoundPage = lazy(() => import('@/pages/notFoundPage/NotFoundPage'));

const rootRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/calendar', element: <CalendarPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/*', element: <NotFoundPage /> },
];

export default rootRoutes;
