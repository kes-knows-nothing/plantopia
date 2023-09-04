import { Link, useLocation } from 'react-router-dom';
import './footer.scss';

import DICT_ON from '@/assets/images/icons/dict_on.png';
import DICT_OFF from '@/assets/images/icons/dict_off.png';
import DIARY_ON from '@/assets/images/icons/diary_on.png';
import DIARY_OFF from '@/assets/images/icons/diary_off.png';
import MYPLANT_ON from '@/assets/images/icons/myplant_on.png';
import MYPLANT_OFF from '@/assets/images/icons/myplant_off.png';
import MYPAGE_ON from '@/assets/images/icons/mypage_on.png';
import MYPAGE_OFF from '@/assets/images/icons/mypage_off.png';
import HOME from '@/assets/images/icons/home.png';

const Footer = () => {
  const location = useLocation();

  const dictActive = location.pathname.includes('/dict');
  const diaryActive = location.pathname.includes('/diary');
  const myPlantActive = location.pathname.includes('/myplant');
  const myPageActive = location.pathname.includes('/mypage');

  return (
    <footer className="inner footer">
      <nav>
        <Link className={`btn ${dictActive ? 'active' : ''}`} to="/dict">
          <img src={dictActive ? DICT_ON : DICT_OFF} alt="plant dictionary" />
          식물도감
        </Link>
        <Link className={`btn ${diaryActive ? 'active' : ''}`} to="/diary">
          <img src={diaryActive ? DIARY_ON : DIARY_OFF} alt="diary" />
          다이어리
        </Link>
        <Link className="home_btn" to="/">
          <img src={HOME} className="main_logo" alt="home" />
        </Link>
        <Link className={`btn ${myPlantActive ? 'active' : ''}`} to="/myplant">
          <img src={myPlantActive ? MYPLANT_ON : MYPLANT_OFF} alt="myplant" />
          내식물
        </Link>
        <Link className={`btn ${myPageActive ? 'active' : ''}`} to="/mypage">
          <img src={myPageActive ? MYPAGE_ON : MYPAGE_OFF} alt="my" />
          MY
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
