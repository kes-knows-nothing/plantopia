import { useEffect, useRef, useState } from 'react';
import { db } from '@/firebaseApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@/hooks';

import ARROW_UP from '@/assets/images/icons/diary_arrow_up.png';
import ARROW_DOWN from '@/assets/images/icons/diary_arrow_down.png';
import './sectionBoard.scss';

interface Plant {
  nickname: string;
  userEmail: string;
}

interface SectionBoardProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  chosenPlants: string[];
  setChosenPlants: (plants: string[]) => void;
}

const SectionBoard: React.FC<SectionBoardProps> = ({
  title,
  setTitle,
  content,
  setContent,
  chosenPlants,
  setChosenPlants,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [plantTag, setPlantTag] = useState<Plant[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const user = useAuth();

  useEffect(() => {
    if (!user) return;

    const getPlantsFromFirestore = async () => {
      const plantRef = collection(db, 'plant');
      const q = query(plantRef, where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      const plants: Plant[] = [];
      querySnapshot.forEach(doc => {
        const { nickname, userEmail } = doc.data();
        plants.push({ nickname, userEmail });
      });
      setPlantTag(plants);
    };
    getPlantsFromFirestore();
  }, [user]);

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
  setChosenPlants((prevChosenPlants: string[]) =>
    prevChosenPlants.filter(p => p !== plant),
  );
};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isVisible && !event.target.closest('.plant_select_wrapper')) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

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
                  <span className="cancel"></span>
                </div>
              ))}
            </div>
          )}
          <div className="arrow_icon" onClick={toggleSelect}>
            {isVisible ? (
              <img src={ARROW_UP} alt="Up" />
            ) : (
              <img src={ARROW_DOWN} alt="Down" />
            )}
          </div>
        </div>

        {isVisible && (
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
        value={content}
        onChange={e => setContent(e.target.value)}
        className="content"
      />
    </section>
  );
};

export default SectionBoard;
