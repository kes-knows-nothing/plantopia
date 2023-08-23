import profile from '@/assets/images/profile.png';
import './my.scss';

const MyInfo = () => {
  return (
    <div className="my_info_page">
      <header className="sub_header">
        <button className="back_btn">
          <span className="hide">뒤로가기</span>
        </button>
        <strong>내 정보</strong>
      </header>
      <main className="my_info_container inner">
        <section className="profile_section">
          <div className="profile">
            <img src={profile} alt="profile" />
            <button className="edit_btn">
              <span className="hide">프로필 사진 수정하기</span>
            </button>
          </div>
        </section>

        <section className="input_section">
          <ul>
            <li>
              <label>이메일</label>
              <input
                type="text"
                className="calc_width"
                placeholder="test@test.com"
              />
              <button>인증 받기</button>
            </li>
            <li>
              <label>닉네임</label>
              <input type="text" placeholder="감자언니" />
            </li>
            <li>
              <label>비밀번호</label>
              <input type="password" placeholder="test1234" />
            </li>
            <li>
              <label>비밀번호 확인</label>
              <input type="password" placeholder="test1234" />
            </li>
            <li>
              <label>생년월일</label>
              <input type="date" placeholder="test1234" />
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MyInfo;
