import { lazy } from 'react';

const MyPage = lazy(() => import('@/pages/myPage/MyPage'));
const MyInfoPage = lazy(() => import('@/pages/myPage/myInfoPage/MyInfoPage'));
const GuidePage = lazy(() => import('@/pages/myPage/guidePage/GuidePage'));

const myPageRoutes = [
  { path: '/mypage', element: <MyPage /> },
  { path: '/mypage/info', element: <MyInfoPage /> },
  { path: '/mypage/guide', element: <GuidePage /> },
  // { path: '/mypage/question', element: <NotiPage /> },
];

export default myPageRoutes;
