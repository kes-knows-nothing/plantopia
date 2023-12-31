import { useState, useEffect, Children } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseApp';
import { customerService } from '@/constants/myPage';
import { errorNoti } from '@/utils/alarmUtil';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Progress from '@/components/progress/Progress';
import PROFILE from '@/assets/images/icons/default_profile.png';
import './myPage.scss';

const MyPage = () => {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user && setIsLoading(false);
  }, [user]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch {
      errorNoti('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className="my_page layout">
      <Header />
      <main className="my_container">
        <section className="my_info_box inner">
          <h2>
            <em>{user?.displayName}</em>님, 플랜토피아와 함께
            <br /> 슬기로운 식집사 생활을 시작하세요!
          </h2>
          <div className="my_profile">
            <img src={user?.photoURL || PROFILE} alt="profile" />
            <div className="my_info">
              <strong>{user?.displayName}</strong>
              <p>{user?.email}</p>
            </div>
            <Link to="/mypage/info" className="edit_info">
              내 정보 수정하기
            </Link>
          </div>
        </section>
        <section className="list_box">
          <span className="list_title">고객센터</span>
          <ul className="list_contents">
            {Children.toArray(
              customerService.map(({ title, url }) => (
                <li>
                  {title === customerService[2].title ? (
                    <a href={url} target="_blank" className="move">
                      {title}
                    </a>
                  ) : (
                    <Link to={url} className="move">
                      {title}
                    </Link>
                  )}
                </li>
              )),
            )}
          </ul>
          <div className="logout_wrapper">
            <button onClick={handleClick} className="logout_btn">
              로그아웃
            </button>
          </div>
        </section>
      </main>
      <Footer />
      {isLoading && <Progress />}
    </div>
  );
};

export default MyPage;
