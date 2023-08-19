import './diaryDetailPage.scss';
import { RiMore2Fill } from 'react-icons/ri';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const DiaryDetailPage = () => {
  return (
    <main className="diary_write_page">
      <div className="container">
        <div className="sub_header">
          <button className="header_btn back">
            <HiOutlineArrowLeft />
          </button>
          <strong>다이어리</strong>
          <button className="header_btn more">
            <RiMore2Fill />
          </button>
        </div>
      </div>
    </main>
  );
};

export default DiaryDetailPage;
