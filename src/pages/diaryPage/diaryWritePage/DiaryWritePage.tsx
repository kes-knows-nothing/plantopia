import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';
import { db } from '@/utils/firebaseApp';
import { addDoc, collection } from 'firebase/firestore';

import './diaryWritePage.scss';

const DiaryWritePage = () => {
  const userId = 'test@test.com';

  const [saving, setSaving] = useState(false);

  const handleSaveClick = async () => {
    setSaving(true);
    const timestamp = new Date();
    const title = document.querySelector('.title')?.value;

    const content = document.querySelector('.content')?.value;

    const chosenPlants = SectionBoard.getChosenPlants();

    const dataToSave = {
      userEmail: userId,
      content: content,
      postedAt: timestamp,
      tags: chosenPlants,
      title: title,
    };

    await addDoc(collection(db, 'diary'), dataToSave);

    setSaving(false);
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
        <SectionBoard />
        <button
          className="save_button"
          onClick={handleSaveClick}
          disabled={saving}
        >
          {' '}
          {saving ? '저장 중...' : '저장'}
        </button>
      </main>
    </>
  );
};

export default DiaryWritePage;
