import { Children } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseApp';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Profile from '@/assets/images/profile.png';
import './myPage.scss';

const customerService = [
  { title: '공지사항', url: '' },
  { title: '자주 묻는 질문', url: '' },
  { title: '식물 추가 요청', url: 'https://forms.gle/g4AjkNKqVDP48Xnc7' },
];

const MyPage = () => {
  const user = useAuth();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch {
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <div className="my_page">
      <Header />
      <main className="my_container">
        <section className="my_info_box inner">
          <h2>
            <em>{user?.displayName}</em>님, 플랜토피아와 함께
            <br /> 슬기로운 식집사 생활을 시작하세요!
          </h2>
          <div className="my_profile">
            <img src={user?.photoURL || Profile} alt="profile" />
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
                  <a
                    href={url}
                    target={title === customerService[2].title ? '_blank' : ''}
                    className="move"
                  >
                    {title}
                  </a>
                </li>
              )),
            )}
          </ul>
        </section>
        <button onClick={handleClick} className="logout_btn">
          로그아웃
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default MyPage;
