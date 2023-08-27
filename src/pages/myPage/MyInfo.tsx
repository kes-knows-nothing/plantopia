import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/hooks';
import { auth } from '@/utils/firebaseApp';
import Profile from '@/assets/images/profile.png';
import './myInfo.scss';

const MyInfo = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, user?.email as string, password);
      await updateProfile(auth.currentUser as User, { displayName: nickname });
      alert('회원정보 수정에 성공했습니다.');
      navigate('/mypage');
    } catch {
      alert('회원정보 수정에 실패했습니다.');
    }
  };

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
            <img src={user?.photoURL || Profile} alt="profile" />
            <button className="edit_btn">
              <span className="hide">프로필 사진 수정하기</span>
            </button>
          </div>
        </section>

        <section className="input_section">
          <ul>
            <li>
              <label>이메일</label>
              <input type="text" placeholder={user?.email || ''} readOnly />
            </li>
            <li>
              <label>닉네임</label>
              <input
                onChange={e => setNickname(e.target.value)}
                type="text"
                placeholder={user?.displayName || ''}
              />
            </li>
            <li>
              <label>비밀번호 확인</label>
              <input
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </li>
          </ul>
        </section>
      </main>
      <button className="info_post" onClick={handleClick}>
        저장
      </button>
    </div>
  );
};

export default MyInfo;
