import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebaseApp';
import { errorNoti } from '@/utils/alarmUtil';
import './loginPage.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const targets = [
      {
        key: email,
        message: '이메일 형식을 확인해주세요.',
        re: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
      },
      {
        key: password,
        message: '8~20자 사이의 비밀번호를 입력해주세요.',
        re: /^[A-Za-z0-9]{8,20}$/,
      },
    ];

    for (const { key, message, re } of targets) {
      if (!re.test(key)) {
        errorNoti(message);
        return;
      }
    }

    try {
      isChecked || (await setPersistence(auth, browserSessionPersistence));
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch {
      errorNoti('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      isChecked || (await setPersistence(auth, browserSessionPersistence));
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch {
      errorNoti('구글 로그인에 실패했습니다.');
      navigate('/login');
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="inpEmail">이메일</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요."
          />
          <div className="auto_login">
            <input
              id="check"
              type="checkbox"
              onChange={() => setIsChecked(prev => !prev)}
              checked={isChecked}
            />
            <label htmlFor="check">자동 로그인</label>
          </div>
          <button type="submit" className="submit_btn">
            로그인
          </button>
        </form>
        <div className="oauth_box">
          <p>SNS 계정으로 로그인하기</p>
          <button className="google" onClick={handleClick}>
            <span className="hide">구글 아이디로 로그인하기</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
