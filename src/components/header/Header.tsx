import { Link } from 'react-router-dom';
import './header.scss';
import MAIN_LOGO from '@/assets/images/icons/main_logo.png';
import ALERT from '@/assets/images/icons/alert.png';
import EMPTY_ALERT from '@/assets/images/icons/empty_alert.png';
import CALENDAR from '@/assets/images/icons/calendar.png';

interface HeaderProps {
  isMainPage?: boolean;
}

const Header = ({ isMainPage }: HeaderProps) => {
  return (
    <header className="inner header">
      <Link to="/" className="main_logo">
        <img className="logo_img" src={MAIN_LOGO} alt="main logo" />
        <h1>Plantopia</h1>
      </Link>
      {isMainPage && (
        <div className="btns">
          <Link to="/calendar" className="calendar_btn">
            <img src={CALENDAR} alt="calendar" />
          </Link>
          <button className="noti_btn">
            {/* 조건부 alert처리 src={ALERT} */}
            <img src={EMPTY_ALERT} alt="alert" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
