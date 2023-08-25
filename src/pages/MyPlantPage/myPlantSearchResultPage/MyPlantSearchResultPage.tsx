import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './myPlantSearchResultPage.scss';
import previousPageIcon from '@/assets/images/icons/my_plant_detail_back_to_previous_page_icon.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import MyPlantResultList from '../MyPlantResultList';
const MyPlantSearchResultPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const searchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="my_plant_search_header">
        <Link to={'/myplant/register'}>
          <img src={previousPageIcon} alt="goToPreviousPage" />
        </Link>

        <p>검색 결과</p>
      </div>
      <div className="my_plant_search_input_wrapper">
        <input
          ref={inputRef}
          className="my_plant_search_input"
          type="text"
          placeholder="식물 이름으로 검색해보세요."
          value={searchValue}
          onChange={searchValueHandler}
        />
        <img src={inputGlass} alt="inputGlass" />
      </div>

      <MyPlantResultList searchValue={searchValue} />
    </>
  );
};

export default MyPlantSearchResultPage;
