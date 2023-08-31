import { lazy } from 'react';

const DictPage = lazy(() => import('@/pages/dictPage/DictPage'));
const DictSearchPage = lazy(
  () => import('@/pages/dictPage/dictSearchPage/DictSearchPage'),
);
const DictDetailPage = lazy(
  () => import('@/pages/dictPage/dictDetailPage/DictDetailPage'),
);

const dictRoutes = [
  { path: '/dict', element: <DictPage /> },
  { path: '/dict/search', element: <DictSearchPage /> },
  { path: '/dict/detail', element: <DictDetailPage /> },
];

export default dictRoutes;
