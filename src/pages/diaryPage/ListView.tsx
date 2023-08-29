import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DiaryProps } from '@/constants/diary';
import NoContent from './NoContent.tsx';
import './listView.scss';

interface ListViewProps {
  diaryData: DiaryProps[];
  handleDelete: (index: number) => void;
}

const ListView: React.FC<ListViewProps> = ({ diaryData, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiary, setSelectedDiary] = useState<DiaryProps | null>(null);

  const toggleModal = (diary: DiaryProps) => {
    setSelectedDiary(diary);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setSelectedDiary(null);
    setIsModalOpen(false);
  };

  const navigateToEdit = (diary: DiaryProps) => {
    navigate(`/diary/${diary.id}/edit`);
    closeModal();
  };

  const navigate = useNavigate();

  return (
    <div className="list_view">
      {diaryData.length === 0 ? (
        <NoContent />
      ) : (
        <ul className="diary_list_wrap">
          {diaryData.map((diary, index) => (
            <li className="diary_list" key={index}>
              <Link to={`/diary/${diary.id}`}>
                <div className="left_box">
                  <h5 className="title">{diary.title}</h5>
                  <p className="content">{diary.content}</p>
                  <span className="date">
                    {diary.postedAt.toDate().toLocaleDateString()}
                  </span>
                </div>
                <div
                  className={`main_img ${
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
              <button
                className="more"
                onClick={() => toggleModal(diary)}
              ></button>
              {isModalOpen && selectedDiary === diary && (
                <div className="more_modal">
                  <div
                    className="btn modify"
                    onClick={() => navigateToEdit(diary)}
                  >
                    게시글 수정
                  </div>
                  <div
                    className="btn delete"
                    onClick={() => {
                      handleDelete(index);
                      closeModal();
                    }}
                  >
                    삭제
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListView;
