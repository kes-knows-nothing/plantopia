import { useState, useEffect, useRef } from 'react';
import { db } from '@/utils/firebaseApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';

import ARROW_UP from '@/assets/images/icons/diary_arrow_up.png'
import ARROW_DOWN from '@/assets/images/icons/diary_arrow_down.png'

interface Plant {
  nickname: string;
  userEmail: string;
}

const SectionBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chosenPlants, setChosenPlants] = useState<string[]>([]);
  const [plantTag, setPlantTag] = useState<Plant[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getPlantsFromFirestore = async () => {
      const plantRef = collection(db, 'plant');
      const q = query(plantRef, where('userEmail', '==', 'test@test.com'));
      const querySnapshot = await getDocs(q);
      const plants: Plant[] = [];
      querySnapshot.forEach(doc => {
        const { nickname, userEmail } = doc.data();
        plants.push({ nickname, userEmail });
      });
      setPlantTag(plants);
    };
    getPlantsFromFirestore();
  }, []);

  const toggleSelect = () => {
    setIsVisible(prevVisible => !prevVisible);
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

  const handleChosenPlantClick = (plant: string) => {
    setChosenPlants(prevChosenPlants =>
      prevChosenPlants.filter(p => p !== plant),
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="board_section">
      <div className="title_wrapper">
        <input type="text" placeholder="제목을 작성하세요." className="title" />
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
                  <span className="cancel">
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="arrow_icon" onClick={toggleSelect}>
            {isVisible ? <img src={ARROW_UP} alt="Up" /> : <img src={ARROW_DOWN} alt="Down" />}
          </div>
        </div>

        {isVisible && (
          <ul className="plant_list">
            {plantTag.map(plant => (
              <li key={nanoid()}>
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

      <textarea placeholder="내용을 작성하세요." />
    </section>
  );
};

export default SectionBoard;
