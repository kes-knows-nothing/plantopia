import { ArrowImages } from '@/constants/diary';
import { SectionEditBoardProps } from '@/@types/diary.type';

import './sectionEditBoard.scss';

const SectionEditBoard = ({
  title,
  setTitle,
  content,
  setContent,
  chosenPlants,
  handleChosenPlantClick,
  handlePlantSelection,
  isVisible,
  toggleSelect,
  plantTag,
}: SectionEditBoardProps) => {
  return (
    <section className="board_section">
      <div className="title_wrapper">
        <input
          type="text"
          placeholder="제목을 작성하세요."
          className="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
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
            {isVisible ? (
              <img src={ArrowImages.ARROW_UP} alt="Up" />
            ) : (
              <img src={ArrowImages.ARROW_DOWN} alt="Down" />
            )}
          </div>
        </div>
        {isVisible && (
          <>
            <div className="plant_list">
              <ul>
                {(plantTag || []).map(plant => (
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
              <button className="choose_complete" onClick={toggleSelect}>
                선택 완료
              </button>
            </div>
          </>
        )}
      </div>

      <textarea
        placeholder="내용을 작성하세요."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="content"
      />
    </section>
  );
};

export default SectionEditBoard;
