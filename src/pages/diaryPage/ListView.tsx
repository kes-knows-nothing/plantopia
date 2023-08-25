import { useState } from 'react';
import { Link } from 'react-router-dom';


const ListView = ({ diaryData, handleDelete }) => {
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
        {diaryData.map((d, index) => (
          <li className="diary_list" key={index}>
            <Link to={`/diary/detail`}>
              <div className="left_box">
                <h5 className="title">{d.title}</h5>
                <p className="content">{d.content}</p>
                <span className="date">
                  {d.postedAt.toDate().toLocaleDateString()}
                </span>
              </div>
              <div
                className={`main_img ${getImageClassName(d.imgUrls)}`}
                style={{
                  backgroundImage: `url('${
                    d.imgUrls && d.imgUrls.length > 0
                      ? d.imgUrls[0]
                      : ''
                  }')`,
                }}
              ></div>
            </Link>
            <button
              className="more"
              onClick={() => toggleModal(index)}
            ></button>
            {openModalIndex === index && (
              <div className="more_modal">
                <div className="btn modify">게시글 수정</div>
                <div className="btn delete" onClick={() => handleDelete(index)}>
                  삭제
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
