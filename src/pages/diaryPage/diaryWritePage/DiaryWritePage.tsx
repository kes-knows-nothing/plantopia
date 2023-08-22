import {Link} from 'react-router-dom'
import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';

import './diaryWritePage.scss';

const DiaryWritePage = () => {
  return (
    <>
      <header className="sub_header">
        <strong>글쓰기</strong>
        <Link to="/diary">
          <button className="close_btn"></button>
        </Link>
      </header>
      <main className="diary_write_wrap">
        <SectionPhoto />
        <SectionBoard />
        <button className="save_button">저장</button>
      </main>
    </>
  );
};

export default DiaryWritePage;
