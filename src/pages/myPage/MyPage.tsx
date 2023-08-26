import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

import profile from '@/assets/images/profile.png';
import './my.scss';

const MyPage = () => {
  return (
    <div className="my_page">
      <Header />
      <main className="my_container">
        <section className="my_info_box inner">
          <h2>
            <em>박유나</em>님, 플랜토피아와 함께
            <br /> 슬기로운 식집사 생활을 시작하세요!{' '}
          </h2>

          <div className="my_profile">
            <img src={profile} alt="profile" />
            <div className="my_info">
              <strong>감자언니</strong>
              <span>Lv. 0</span>
            </div>
          </div>

          <ul className="my_service_list">
            <li className="info">내정보</li>
            <li className="badge">
              활동배지<em>5</em>
            </li>
            <li className="plant">내식물</li>
          </ul>
        </section>

        <section className="list_box">
          <span className="list_title">설정</span>
          <ul className="list_contents">
            <li>
              <p>푸시 알림 동의 여부</p>
              <label className="switch">
                <input type="checkbox" className="switch_chk" checked />
                <span className="slider round"></span>
              </label>
            </li>
          </ul>
        </section>

        <section className="list_box">
          <span className="list_title">고객센터</span>
          <ul className="list_contents">
            <li>
              <p className="move">공지사항</p>
            </li>
            <li>
              <p className="move">자주 묻는 질문</p>
            </li>
          </ul>
        </section>

        <div className="inner">
          <button className="logout_btn">로그아웃</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyPage;
