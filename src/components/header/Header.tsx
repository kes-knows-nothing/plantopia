import { Link } from 'react-router-dom';
import './header.scss';
import MAIN_LOGO from '@/assets/images/icons/main_logo.png';
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
        </div>
      )}
    </header>
  );
};

export default Header;
