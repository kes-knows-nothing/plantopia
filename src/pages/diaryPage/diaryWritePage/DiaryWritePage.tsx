import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/firebaseApp';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '@/hooks';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';
import './diaryWritePage.scss';

const DiaryWritePage = () => {
  const user = useAuth();
  const userEmail = user?.email;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const showAlert = message => {
    alert(message);
  };

  const handleSaveClick = async () => {
    if (!title || chosenPlants.length === 0 || !content) {
      if (!title) showAlert('제목을 작성해주세요.');
      else if (chosenPlants.length === 0)
        showAlert('관련 식물을 1가지 이상 선택해주세요.');
      else if (!content) showAlert('내용을 작성해주세요.');
      return;
    }

    setSaving(true);
    const timestamp = new Date();

    const dataToSave = {
      userEmail,
      content,
      postedAt: timestamp,
      tags: chosenPlants,
      title,
      imgUrls,
    };

    await addDoc(collection(db, 'diary'), dataToSave);

    setChosenPlants([]);
    setTitle('');
    setContent('');
    setImgUrls([]);
    setSaving(false);

    navigate('/diary');
  };

  return (
    <>
      <HeaderBefore ex={true} title="글쓰기" />
      <main className="diary_main">
        <SectionPhoto
          userEmail={userEmail}
          imgUrls={imgUrls}
          setImgUrls={setImgUrls}
        />
        <SectionBoard
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          chosenPlants={chosenPlants}
          setChosenPlants={setChosenPlants}
        />
      </main>
      <button
        className="save_button"
        onClick={handleSaveClick}
        disabled={saving}
      >
        {saving ? '저장 중...' : '저장'}
      </button>
    </>
  );
};

export default DiaryWritePage;
