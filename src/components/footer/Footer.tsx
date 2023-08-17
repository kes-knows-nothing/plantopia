import { Link } from 'react-router-dom';
import './footer.scss';

import DICT_OFF from '@/assets/images/icons/dict_off.png';
import DIARY_OFF from '@/assets/images/icons/diary_off.png';
import MYPLANT_OFF from '@/assets/images/icons/myplant_off.png';
import MYPAGE_OFF from '@/assets/images/icons/mypage_off.png';
import HOME from '@/assets/images/icons/home.png';

const Footer = () => {
  return (
    <footer className="footer inner">
      <Link className="btn" to="/dict">
        <img src={DICT_OFF} alt="plant dictionary" />
        식물도감
      </Link>
      <Link className="btn" to="/diary">
        <img src={DIARY_OFF} alt="diary" />
        다이어리
      </Link>
      <Link className="home_btn" to="/">
        <img src={HOME} className="main_logo" alt="home" />
      </Link>
      <Link className="btn" to="/myplant">
        <img src={MYPLANT_OFF} alt="myplant" />
        내식물
      </Link>
      <Link className="btn" to="/mypage">
        <img src={MYPAGE_OFF} alt="my" />
        MY
      </Link>
    </footer>
  );
};

export default Footer;
