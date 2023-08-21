import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';

import './diaryWritePage.scss';

const DiaryWritePage = () => {
  return (
    <main className="diary_write_page">
      <div className="container">
        <div className="sub_header">
          <strong>글쓰기</strong>
          <button className="close_btn">
            <span className="hide">닫기</span>
          </button>
        </div>
        <SectionPhoto />
        <SectionBoard />
        <button className="save_button">저장</button>
      </div>
    </main>
  );
};

export default DiaryWritePage;
