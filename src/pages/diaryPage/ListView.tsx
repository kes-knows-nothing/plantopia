import { Link } from 'react-router-dom';
import { useState } from 'react';
import MoreModal from './MoreModal';

const ListView = ({ diaryData }) => {
  const getImageClassName = imgUrls => {
    if (!imgUrls) return '';
    if (imgUrls.length === 0) return 'hide';
    if (imgUrls.length > 1) return 'many';
    return '';
  };

  const [openModalIndex, setOpenModalIndex] = useState(null);

  const toggleModal = index => {
    setOpenModalIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="list_view">
      <ul className="diary_list_wrap">
        {diaryData.map((diary, index) => (
          <li className="diary_list" key={index}>
            <Link to={`/diary/detail`}>
              <div className="left_box">
                <h5 className="title">{diary.title}</h5>
                <p className="content">{diary.content}</p>
                <span className="date">
                  {diary.postedAt.toDate().toLocaleDateString()}
                </span>
              </div>
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
            </Link>
            <button
              className="more"
              onClick={() => toggleModal(index)}
            ></button>
            {openModalIndex === index && <MoreModal />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
