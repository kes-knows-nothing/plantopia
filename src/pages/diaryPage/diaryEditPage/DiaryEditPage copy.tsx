import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import SectionEditPhoto from './SectionEditPhoto';
import SectionEditBoard from './SectionEditBoard';
import useDiaryData from '@/hooks/useDiaryData';

import './diaryEditPage.scss';

const DiaryEditPage = () => {
  const { docId } = useParams();
  if (!docId) {
    return;
  }
  const { diaryData, updateDiaryData, isLoading, setIsLoading } =
    useDiaryData();
  const navigate = useNavigate();

  const diaryToUpdate = diaryData.find(diary => diary.id === docId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!diaryToUpdate) {
      console.error('Diary not found');
      return;
    }

    setTitle(diaryToUpdate.title);
    setContent(diaryToUpdate.content);
    setChosenPlants(diaryToUpdate.tags);
    setImgUrls(diaryToUpdate.imgUrls);
  }, [diaryToUpdate]);

  const handleSaveClick = async () => {
    if (!title || chosenPlants.length === 0 || !content) {
      if (!title) {
        alert('제목을 작성해주세요.');
      } else if (chosenPlants.length === 0) {
        alert('관련 식물을 1가지 이상 선택해주세요.');
      } else if (!content) {
        alert('내용을 작성해주세요.');
      }
      return;
    }

    setIsLoading(true);

    const dataToUpdate = {
      content: content,
      tags: chosenPlants,
      title: title,
      imgUrls: imgUrls,
    };

    await updateDiaryData(docId, dataToUpdate);

    setIsLoading(false);
    navigate('/diary');
  };

  return (
    <>
      <HeaderBefore ex={true} title="수정하기" />
      <main className="diary_write_wrap">
        <SectionEditPhoto
          imgUrls={imgUrls}
          setImgUrls={setImgUrls}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <SectionEditBoard
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          chosenPlants={chosenPlants}
          setChosenPlants={setChosenPlants}
        />
        <button
          className="save_button"
          onClick={handleSaveClick}
          disabled={isLoading}
        >
          {isLoading ? '저장 중...' : '저장'}
        </button>
      </main>
    </>
  );
};

export default DiaryEditPage;
