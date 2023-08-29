import { useState, Children } from 'react';
import { recommend } from '@/constants/dictionary';
import Recommend from './Recommend';
import InputForm from './InputForm';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useAuth } from '@/hooks';
import './dictPage.scss';
import Progress from '@/components/progress/Progress';

const DictPage = () => {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="dict_conatiner">
      <Header />
      <main className="dict_wrapper inner">
        <h2 className="search_title">
          <span>{user?.displayName}</span>님, 어떤 식물을 찾고있나요?
        </h2>
        <InputForm nextPath={'/dict/search'} />
        {Children.toArray(
          recommend.map(({ icon, title, target }) => (
            <Recommend
              icon={icon}
              title={title}
              target={target}
              setIsLoading={setIsLoading}
            />
          )),
        )}
      </main>
      <Footer />
      {isLoading && <Progress />}
    </div>
  );
};

export default DictPage;
