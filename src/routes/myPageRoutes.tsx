import { lazy } from 'react';

const MyPage = lazy(() => import('@/pages/myPage/MyPage'));
const MyInfoPage = lazy(() => import('@/pages/myPage/MyInfoPage'));

const myPageRoutes = [
  { path: '/mypage', element: <MyPage /> },
  { path: '/mypage/info', element: <MyInfoPage /> },
];

export default myPageRoutes;
