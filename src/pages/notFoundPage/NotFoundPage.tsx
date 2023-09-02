import { useAuth } from '@/hooks';
import { Link } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => {
  useAuth();

  return (
    <div className="not_found_container layout">
      <main className="inner">
        <section className="not_found_wrapper">
          <h2>
            <strong>빈페이지</strong>를 발견하셨습니다!
          </h2>
          <p>슬기로운 식집사 생활을 이어나가시겠어요?🌱</p>
          <Link to="/">메인으로 이동하기</Link>
        </section>
      </main>
    </div>
  );
};

export default NotFoundPage;
