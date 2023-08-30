import { ArrowImages, SectionBoardProps } from '@/constants/diary';
import './sectionBoard.scss';

const SectionBoard = ({
  state,
  setState,
  chosenPlants,
  toggleSelect,
  handleChosenPlantClick,
  handlePlantSelection,
  plantTag,
}: SectionBoardProps) => {
  return (
    <section className="board">
      <div className="title_wrapper">
        <input
          type="text"
          placeholder="제목을 작성하세요."
          className="title"
          value={state.title}
          onChange={e => setState(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="plant_select_wrapper">
        <div className="plant_select">
          {chosenPlants.length === 0 && (
            <div
              className={`choose_text ${
                chosenPlants.length === 0 ? '' : 'hide'
              }`}
              onClick={toggleSelect}
            >
              식물을 선택하세요.
            </div>
          )}

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
                state.isVisible ? ArrowImages.ARROW_UP : ArrowImages.ARROW_DOWN
              }
              alt={state.isVisible ? 'Up' : 'Down'}
            />
          </div>
        </div>

        {state.isVisible && (
          <ul className="plant_list">
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
        )}
      </div>

      <textarea
        placeholder="내용을 작성하세요."
        value={state.content}
        onChange={e => setState(prev => ({ ...prev, content: e.target.value }))}
        className="content"
      />
    </section>
  );
};

export default SectionBoard;
