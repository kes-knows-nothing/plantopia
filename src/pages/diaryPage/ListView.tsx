import diaryData from './diaryData.tsx';

import { RiMore2Fill } from 'react-icons/ri';

const ListView = () => {
  const getMainImage = diary => {
    if (diary.imgUrl.length > 0) {
      return `url(${diary.imgUrl[0]})`;
    } else {
      return 'none';
    }
  };

  return (
    <div className="list_view">
      <div className="date_wrap inner">
        <button className="prev_btn date_btn" type="button"></button>
        <button className="date_picker">
          <span>2023년 </span>
          <span>8월</span>
        </button>
        <button className="next_btn date_btn" type="button"></button>
      </div>
      <ul className="diary_list_wrap inner">
        {diaryData.map((diary, index) => (
          <li className="diary_list inner" key={index}>
            <div className="left_box">
              <h5 className="content_title head">{diary.title}</h5>
              <p className="content_content">{diary.content}</p>
              <span className="content_date">{diary.postedAt}</span>
            </div>
            <div className="right_box">
              <button className="more head">
                <RiMore2Fill />
              </button>
              <div
                className={`main_img ${
                  diary.imgUrl.length === 0 ? 'hide' : ''
                } ${diary.imgUrl.length > 1 ? 'many' : ''}`}
                style={{ backgroundImage: getMainImage(diary) }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
