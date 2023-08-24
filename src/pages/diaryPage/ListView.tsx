import { Link } from 'react-router-dom';

const ListView = ({ diaryData }) => {
  const sortedDiaryData = [...diaryData].sort((a, b) => {
    return b.postedAt.toDate() - a.postedAt.toDate();
  });

  const getImageClassName = imgUrls => {
    if (!imgUrls) return '';
    if (imgUrls.length === 0) return 'hide';
    if (imgUrls.length > 1) return 'many';
    return '';
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
        {sortedDiaryData.map((diary, index) => (
          <Link to={`/diary/detail`} key={index}>
            <li className="diary_list inner">
              <div className="left_box">
                <h5 className="title head">{diary.title}</h5>
                <p className="content">{diary.content}</p>
                <span className="date">
                  {diary.postedAt.toDate().toLocaleDateString()}
                </span>
              </div>
              <div className="right_box">
                <button className="more head"></button>
                <div
                  className={`main_img ${getImageClassName(diary.imgUrls)}`}
                  style={{
                    backgroundImage: `url('${
                      diary.imgUrls && diary.imgUrls.length > 0
                        ? diary.imgUrls[0]
                        : ''
                    }')`,
                  }}
                ></div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
