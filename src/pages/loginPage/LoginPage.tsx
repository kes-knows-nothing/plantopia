import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../utils/firebaseApp';
import './login.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
      return;
    }

    if (name === 'password') {
      setPassword(value);
      return;
    }
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('이메일을 입력하세요');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력하세요');
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { operationType } = response;
      // 로그인에 성공하면 fireBaseAuth의 currentUser에 정보가 담긴다
      if (operationType === 'signIn') {
        navigate('/'); // 로그인 성공시 메인 페이지 이동
      }
    } catch (error) {
      console.warn(error);
      alert('이메일 또는 비밀번호가 일치하지 않습니다');
    }
  };

  // 구글 OAuth
  const goSignGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      const response = await signInWithPopup(auth, provider); // popup을 이용한 signup
      // 유저 정보의 이메일까지 있으면 통과
      if (response.user.email) {
        navigate('/');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <main className="login_page">
      <div className="login_box inner">
        <h1>
          <span>Plantopia</span>
        </h1>
        <h2>
          <div>
            간편하게 로그인하고
            <br />
            <em>다양한 서비스를 이용하세요.</em>
          </div>
        </h2>
        <form onSubmit={onLogin}>
          <label htmlFor="inpEmail">이메일</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder="이메일을 입력해주세요."
            id="inpEmail"
          />
          <label htmlFor="inpPwd" className="mar_top32">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder="비밀번호를 입력해주세요."
          />
          <button type="submit" className="submit_btn">
            로그인
          </button>
        </form>
        <div className="oauth_box">
          <p>SNS 계정으로 로그인하기</p>
          <ul>
            <li>
              <button className="naver">
                <span className="hide">네이버 아이디로 로그인하기</span>
              </button>
            </li>
            <li>
              <button className="kakao">
                <span className="hide">카카오 아이디로 로그인하기</span>
              </button>
            </li>
            <li>
              <button className="google" onClick={goSignGoogle}>
                <span className="hide">구글 아이디로 로그인하기</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
