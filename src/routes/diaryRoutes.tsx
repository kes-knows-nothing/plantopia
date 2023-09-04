import { lazy } from 'react';

const DiaryPage = lazy(
  () => import('@/pages/diaryPage/diaryMainPage/DiaryPage'),
);
const DiaryWritePage = lazy(
  () => import('@/pages/diaryPage/diaryWritePage/DiaryWritePage'),
);
const DiaryEditPage = lazy(
  () => import('@/pages/diaryPage/diaryEditPage/DiaryEditPage'),
);
const DiaryDetailPage = lazy(
  () => import('@/pages/diaryPage/diaryDetailPage/DiaryDetailPage'),
);

const diaryRoutes = [
  { path: '/diary', element: <DiaryPage /> },
  { path: '/diary/write', element: <DiaryWritePage /> },
  { path: '/diary/:docId/edit', element: <DiaryEditPage /> },
  {
    path: '/diary/:docId',
    element: <DiaryDetailPage />,
  },
];

export default diaryRoutes;
