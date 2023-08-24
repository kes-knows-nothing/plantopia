import loading from '@/assets/images/loading.gif';
import './loading.scss';

const ThreeDotsLoading = () => {
  return (
    <div className="loading_container">
      <img src={loading} />
    </div>
  );
};

export default ThreeDotsLoading;
