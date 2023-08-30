import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/hooks';
import useDiaryData from '@/hooks/useDiaryData';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import SectionPhoto from './SectionPhoto';
import SectionBoard from './SectionBoard';
import './diaryWritePage.scss';

const DiaryWritePage = () => {
  const user = useAuth();
  const userEmail = user?.email;
  const { saveDiaryData, plantTag } = useDiaryData();
  const navigate = useNavigate();

  const [state, setState] = useState({
    title: '',
    content: '',
    saving: false,
    isVisible: false,
  });

  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const toggleSelect = () =>
    setState(prevState => ({ ...prevState, isVisible: !prevState.isVisible }));

  const handleChosenPlantClick = (plant: string) =>
    setChosenPlants(prev => prev.filter(p => p !== plant));

  const handlePlantSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPlant = event.target.value;

    setChosenPlants(prev =>
      prev.includes(selectedPlant)
        ? prev.filter(p => p !== selectedPlant)
        : [...prev, selectedPlant],
    );
  };

  const showAlert = (message: string) => alert(message);

  const handleSaveClick = async () => {
    const { title, content } = state;

    if (!title || chosenPlants.length === 0 || !content) {
      showAlert(
        !title
          ? '제목을 작성해주세요.'
          : chosenPlants.length === 0
          ? '관련 식물을 1가지 이상 선택해주세요.'
          : '내용을 작성해주세요.',
      );
      return;
    }

    setState(prev => ({ ...prev, saving: true }));

    const dataToSave = {
      userEmail,
      content,
      postedAt: Timestamp.now(),
      tags: chosenPlants,
      title,
      imgUrls,
    };

    await saveDiaryData(dataToSave);

    setState({ title: '', content: '', saving: false, isVisible: false });
    setChosenPlants([]);

    navigate('/diary');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;

      if (state.isVisible && !targetElement.closest('.plant_select_wrapper')) {
        setState(prev => ({ ...prev, isVisible: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isVisible]);

  return (
    <>
      <HeaderBefore ex={true} title="글쓰기" />
      <main className="diary_main">
        <div className="section_photo">
          <SectionPhoto
            userEmail={userEmail}
            imgUrls={imgUrls}
            setImgUrls={setImgUrls}
          />
        </div>
        <SectionBoard
          state={state}
          setState={setState}
          chosenPlants={chosenPlants}
          toggleSelect={toggleSelect}
          handleChosenPlantClick={handleChosenPlantClick}
          handlePlantSelection={handlePlantSelection}
          plantTag={plantTag}
        />
      </main>
      <button
        className="save_button"
        onClick={handleSaveClick}
        disabled={state.saving}
      >
        {state.saving ? '저장 중...' : '저장'}
      </button>
    </>
  );
};

export default DiaryWritePage;
