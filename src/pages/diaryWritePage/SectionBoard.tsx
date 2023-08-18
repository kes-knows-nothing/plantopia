import { useState, useCallback, useEffect, useRef } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine, RiCloseFill } from 'react-icons/ri';

const SectionBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chosenPlants, setChosenPlants] = useState([]);
  const wrapperRef = useRef(null);

  const plantData = [
    { id: 'chk1', value: '식물1' },
    { id: 'chk2', value: '식물2' },
    { id: 'chk3', value: '식물3' },
    { id: 'chk4', value: '식물4' },
    { id: 'chk5', value: '식물5' },
  ];

  const toggleSelect = useCallback(() => {
    setIsVisible(prevVisible => !prevVisible);
  }, []);

  function handlePlantSelection(event) {
    const selectedPlant = event.target.value;

    setChosenPlants(prevChosenPlants => {
      const isSelected = prevChosenPlants.includes(selectedPlant);

      return isSelected
        ? prevChosenPlants.filter(plant => plant !== selectedPlant)
        : [...prevChosenPlants, selectedPlant];
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleChosenPlantClick(plant) {
    setChosenPlants(chosenPlants.filter(p => p !== plant));
  }

  return (
    <section className="board_section">
      <div className="subject_wrapper">
        <input
          type="text"
          placeholder="제목을 작성하세요."
          className="subject"
        />
      </div>

      <div className="plant_select_wrapper" ref={wrapperRef}>
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
                  <span>
                    <RiCloseFill />
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="arrow_icon" onClick={toggleSelect}>
            {isVisible ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </div>
        </div>

        {isVisible && (
          <ul className="plant_list">
            {plantData.map(plant => (
              <li key={plant.id}>
                <input
                  type="checkbox"
                  name={plant.id}
                  id={plant.id}
                  value={plant.value}
                  onChange={handlePlantSelection}
                  checked={chosenPlants.includes(plant.value)}
                />
                <label htmlFor={plant.id}>{plant.value}</label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <textarea placeholder="내용을 작성하세요." className="content" />
    </section>
  );
};

export default SectionBoard;
