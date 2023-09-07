import { lazy } from 'react';

const MyPlantMainPage = lazy(
  () => import('@/pages/myPlantPage/myPlantMainPage/MyPlantMainPage'),
);
const MyPlantDetailPage = lazy(
  () => import('@/pages/myPlantPage/myPlantDetailPage/MyPlantDetailPage'),
);
const MyPlantRegisterPage = lazy(
  () => import('@/pages/myPlantPage/myPlantRegisterPage/MyPlantRegisterPage'),
);
const MyPlantEditPage = lazy(
  () => import('@/pages/myPlantPage/myPlantEditPage/MyPlantEditPage'),
);
const MyPlantRegisterPage2 = lazy(
  () => import('@/pages/myPlantPage/myPlantRegisterPage/MyPlantRegisterPage2'),
);

const myPlantRoutes = [
  { path: '/myplant', element: <MyPlantMainPage /> },
  { path: '/myplant/:docId', element: <MyPlantDetailPage /> },
  { path: '/myplant/:docId/edit', element: <MyPlantEditPage /> },
  { path: '/myplant/register', element: <MyPlantRegisterPage /> },
  { path: '/myplant/register2', element: <MyPlantRegisterPage2 /> },
];

export default myPlantRoutes;
