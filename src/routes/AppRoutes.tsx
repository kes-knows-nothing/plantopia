import { Route, Routes } from 'react-router-dom';
import rootRoutes from './rootRoutes';
import diaryRoutes from './diaryRoutes';
import dictRoutes from './dictRoutes';
import myPageRoutes from './myPageRoutes';
import myPlantRoutes from './myPlantRoutes';

const routes = [
  rootRoutes,
  diaryRoutes,
  dictRoutes,
  myPageRoutes,
  myPlantRoutes,
];

const AppRoutes = () => (
  <Routes>
    {routes.map(route =>
      route.map(({ path, element }) => <Route path={path} element={element} />),
    )}
  </Routes>
);

export default AppRoutes;
