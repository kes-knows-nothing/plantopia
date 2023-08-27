import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '@/utils/firebaseApp';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import SectionEditPhoto from './SectionEditPhoto';
import SectionEditBoard from './SectionEditBoard';

import './diaryEditPage.scss';

const DiaryEditPage = () => {
  const { docId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaryData = async () => {
      const docRef = doc(db, 'diary', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
        setChosenPlants(data.tags);
        setImgUrls(data.imgUrls);
      } else {
        console.error('Diary not found');
      }
    };

    fetchDiaryData();
  }, [docId]);

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

    setSaving(true);

    const dataToUpdate = {
      content: content,
      tags: chosenPlants,
      title: title,
      imgUrls: imgUrls,
    };

    const docRef = doc(db, 'diary', docId);
    await updateDoc(docRef, dataToUpdate);

    setSaving(false);
    navigate('/diary');
  };

  return (
    <>
      <header className="sub_header">
        <strong>수정하기</strong>
        <Link to="/diary">
          <button className="close_btn"></button>
        </Link>
      </header>
      <main className="diary_write_wrap">
        <SectionEditPhoto imgUrls={imgUrls} setImgUrls={setImgUrls} />
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
          disabled={saving}
        >
          {saving ? '저장 중...' : '저장'}
        </button>
      </main>
    </>
  );
};

export default DiaryEditPage;
