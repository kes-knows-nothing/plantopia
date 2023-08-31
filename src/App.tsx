import { useEffect, Suspense } from 'react';
import { setBodyHeight } from './utils/setBodyHeight';
import Progress from './components/progress/Progress';
import Toast from './components/notification/ToastContainer';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/customToastStyles.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '@/styles/alertStyle.scss';

const App = () => {
  useEffect(() => {
    setBodyHeight();
  }, []);

  return (
    <>
      <Toast />
      <Suspense fallback={<Progress />}>
        <AppRoutes />
      </Suspense>
    </>
  );
};

export default App;
