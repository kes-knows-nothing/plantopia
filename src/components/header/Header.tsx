import { Link } from 'react-router-dom';
import './header.scss';
import MAIN_LOGO from '@/assets/images/icons/main_logo.png';
import CALENDAR from '@/assets/images/icons/calendar.png';
import { useAuth } from '@/hooks';

interface HeaderProps {
  isMainPage?: boolean;
}

const Header = ({ isMainPage }: HeaderProps) => {
  const user = useAuth();

  return (
    <header className="inner header">
      <Link to="/" className="main_logo">
        <img className="logo_img" src={MAIN_LOGO} alt="main logo" />
        <h1>Plantopia</h1>
      </Link>
      {isMainPage && (
        <div className="btns">
          <Link to="/calendar" className="calendar_btn">
            <img className="calendar" src={CALENDAR} alt="calendar" />
          </Link>
          {user?.photoURL && (
            <Link to="/mypage" className="profile_btn">
              <img className="profile" src={user.photoURL} />
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
