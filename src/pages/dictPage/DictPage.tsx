import { Children } from 'react';
import { recommend } from '@/constants/dictionary';
import Recommend from './Recommend';
import InputForm from './InputForm';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './DictPage.scss';
import { useAuth } from '@/hooks';

const DictPage = () => {
  const user = useAuth();

  return (
    <div className="dict_conatiner">
      <Header />
      <main className="dict_wrapper">
        <h2 className="search_title">
          <span>{user?.displayName}</span>님, 어떤 식물을 찾고있나요?
        </h2>
        <InputForm nextPath={'/dict/search'} />
        {Children.toArray(
          recommend.map(({ icon, title, target }) => (
            <Recommend icon={icon} title={title} target={target} />
          )),
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DictPage;
