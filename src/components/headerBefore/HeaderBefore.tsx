import { useNavigate } from 'react-router-dom';
import './headerBefore.scss';
import BACK_ICON from '@/assets/images/icons/back_icon.png';
import EX_ICON from '@/assets/images/icons/ex_icon.png';

interface HeaderBeforeProps {
  ex: boolean;
  title: string;
}

const HeaderBefore = ({ ex, title }: HeaderBeforeProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <header className="header_container inner">
      <button className={ex ? 'ex_btn' : 'back_btn'} onClick={handleClick}>
        <img src={ex ? EX_ICON : BACK_ICON} />
      </button>
      <h2 className="header_title">{title}</h2>
    </header>
  );
};

export default HeaderBefore;
