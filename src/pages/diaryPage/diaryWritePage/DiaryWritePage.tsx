import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';
import { db } from '@/utils/firebaseApp';
import { addDoc, collection } from 'firebase/firestore';

import './diaryWritePage.scss';

const DiaryWritePage = () => {
  const userId = 'test@test.com';
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    setSaving(true);
    const timestamp = new Date();
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const dataToSave = {
      userEmail: userId,
      content: content,
      postedAt: timestamp,
      tags: chosenPlants,
      title: title,
    };

    await addDoc(collection(db, 'diary'), dataToSave);
    
    setChosenPlants([]);
    titleRef.current.value = ''; 
    contentRef.current.value = ''; 
    setSaving(false);
    
    navigate('/diary')
  };

  return (
    <>
      <header className="sub_header">
        <strong>글쓰기</strong>
        <Link to="/diary">
          <button className="close_btn"></button>
        </Link>
      </header>
      <main className="diary_write_wrap">
        <SectionPhoto userId={userId} />
        <SectionBoard
          titleRef={titleRef}
          contentRef={contentRef}
          chosenPlants={chosenPlants}
          setChosenPlants={setChosenPlants}
        />
        <button
          className="save_button"
          onClick={handleSaveClick}
          disabled={saving}
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </main>
    </>
  );
};

export default DiaryWritePage;
