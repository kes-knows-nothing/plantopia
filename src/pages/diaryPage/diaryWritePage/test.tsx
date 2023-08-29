import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import SectionPhoto from './SectionPhoto';
import { ArrowImages } from '@/constants/diary';
import useDiaryData from '@/hooks/useDiaryData';
import { useAuth } from '@/hooks';

import './diaryWritePage.scss';

const DiaryWritePage = () => {
  const { saveDiaryData, plantTag } = useDiaryData();
  const navigate = useNavigate();
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

  const toggleSelect = () => {
    setState(prevState => ({ ...prevState, isVisible: !prevState.isVisible }));
  };

  const handleChosenPlantClick = (plant: string) => {
    setChosenPlants(prevChosenPlants =>
      prevChosenPlants.filter(p => p !== plant),
    );
  };

  const handlePlantSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPlant = event.target.value;

    setChosenPlants(prevChosenPlants => {
      const isSelected = prevChosenPlants.includes(selectedPlant);

      return isSelected
        ? prevChosenPlants.filter(plant => plant !== selectedPlant)
        : [...prevChosenPlants, selectedPlant];
    });
  };

  const showAlert = (message: string) => {
    alert(message);
  };

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

    await saveDiaryData(dataToSave);

    setState(initialState);
    setChosenPlants([]);

    navigate('/diary');
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
              <div
                className={`choose_text ${
                  chosenPlants.length === 0 ? '' : 'hide'
                }`}
                onClick={toggleSelect}
              >
                식물을 선택하세요.
              </div>
              {chosenPlants.length > 0 && (
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
                <img
                  src={
                    state.isVisible
                      ? ArrowImages.ARROW_UP
                      : ArrowImages.ARROW_DOWN
                  }
                  alt={state.isVisible ? 'Up' : 'Down'}
                />
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
