import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/firebaseApp';
import { addDoc, collection } from 'firebase/firestore';
import { ArrowImages } from '@/constants/diary';
import { useAuth } from '@/hooks';
import useDiaryData from '@/hooks/useDiaryData';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';

import './diaryWritePage.scss';
import SectionPhoto from './SectionPhoto';

const DiaryWritePage = () => {
  const user = useAuth();
  const userEmail = user?.email;

  const initialState = {
    title: '',
    content: '',
    saving: false,
    isVisible: false,
  };

  const [state, setState] = useState(initialState);
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const navigate = useNavigate();
  const { plantTag } = useDiaryData();

  const showAlert = (message: string) => {
    alert(message);
  };

  const toggleSelect = () => {
    setState(prevState => ({ ...prevState, isVisible: !prevState.isVisible }));
  };

  const handleChosenPlantClick = (plant: string) => {
    setChosenPlants(prevChosenPlants =>
      prevChosenPlants.filter(p => p !== plant),
    );
  };

  const handleSaveClick = async () => {
    const { title, content } = state;
    if (!title || chosenPlants.length === 0 || !content) {
      if (!title) showAlert('제목을 작성해주세요.');
      else if (chosenPlants.length === 0)
        showAlert('관련 식물을 1가지 이상 선택해주세요.');
      else if (!content) showAlert('내용을 작성해주세요.');
      return;
    }

    setState(prevState => ({ ...prevState, saving: true }));
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

    setState(initialState);
    setChosenPlants([]);

    navigate('/diary');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;

      if (state.isVisible && !targetElement.closest('.plant_select_wrapper')) {
        setState(prevState => ({ ...prevState, isVisible: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.isVisible]);

  const handlePlantSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPlant = event.target.value;

    setChosenPlants(prevChosenPlants => {
      const isSelected = prevChosenPlants.includes(selectedPlant);

      return isSelected
        ? prevChosenPlants.filter(plant => plant !== selectedPlant)
        : [...prevChosenPlants, selectedPlant];
    });
  };

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
        <section className="board">
          <div className="title_wrapper">
            <input
              type="text"
              placeholder="제목을 작성하세요."
              className="title"
              value={state.title}
              onChange={e =>
                setState(prevState => ({ ...prevState, title: e.target.value }))
              }
            />
          </div>

          <div className="plant_select_wrapper">
            <div className="plant_select">
              {chosenPlants.length === 0 ? (
                <div className="choose_text" onClick={toggleSelect}>
                  식물을 선택하세요.
                </div>
              ) : (
                <div className="chosen_wrap">
                  {chosenPlants.map(plant => (
                    <div
                      key={plant}
                      className="chosen_plant"
                      onClick={() => handleChosenPlantClick(plant)}
                    >
                      {plant}
                      <span className="cancel"></span>
                    </div>
                  ))}
                </div>
              )}
              <div className="arrow_icon" onClick={toggleSelect}>
                {state.isVisible ? (
                  <img src={ArrowImages.ARROW_UP} alt="Up" />
                ) : (
                  <img src={ArrowImages.ARROW_DOWN} alt="Down" />
                )}
              </div>
            </div>

            {state.isVisible && (
              <ul className="plant_list">
                {plantTag.map(plant => (
                  <li key={plant.nickname}>
                    <input
                      type="checkbox"
                      name={plant.nickname}
                      id={plant.nickname}
                      value={plant.nickname}
                      onChange={handlePlantSelection}
                      checked={chosenPlants.includes(plant.nickname)}
                    />
                    <label htmlFor={plant.nickname}>{plant.nickname}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <textarea
            placeholder="내용을 작성하세요."
            value={state.content}
            onChange={e =>
              setState(prevState => ({ ...prevState, content: e.target.value }))
            }
            className="content"
          />
        </section>
        <button
          className="save_button"
          onClick={handleSaveClick}
          disabled={state.saving}
        >
          {state.saving ? '저장 중...' : '저장'}
        </button>
      </main>
    </>
  );
};

export default DiaryWritePage;
