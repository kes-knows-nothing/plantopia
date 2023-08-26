import { useState } from 'react';
import { Link } from 'react-router-dom';

const DiaryItem = ({ diary, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className="diary_list">
      <Link to={`/diary/${diary.id}`}>
        <div className="left_box">
          <h5 className="title">{diary.title}</h5>
          <p className="content">{diary.content}</p>
          <span className="date">
            {diary.postedAt.toDate().toLocaleDateString()}
          </span>
        </div>
        <div
          className={`main_img ${diary.imgUrls.length === 0 ? 'hide' : 'show'} ${
            diary.imgUrls.length > 1 ? 'many' : ''
          }`}
          style={{
            backgroundImage: `url('${
              diary.imgUrls && diary.imgUrls.length > 0
                ? diary.imgUrls[0]
                : ''
            }')`,
          }}
        ></div>
      </Link>
      <button className="more" onClick={toggleModal}></button>
      {isModalOpen && (
        <Modal handleDelete={handleDelete} closeModal={closeModal} />
      )}
    </li>
  );
};

const Modal = ({ handleDelete, closeModal }) => {
  return (
    <div className="more_modal">
      <div className="btn modify">게시글 수정</div>
      <div className="btn delete" onClick={() => {
        handleDelete();
        closeModal();
      }}>
        삭제
      </div>
    </div>
  );
};

const ListView = ({ diaryData, handleDelete }) => {
  return (
    <div className="list_view">
      <ul className="diary_list_wrap">
        {diaryData.map((diary, index) => (
          <DiaryItem
            key={index}
            diary={diary}
            handleDelete={() => handleDelete(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListView;
