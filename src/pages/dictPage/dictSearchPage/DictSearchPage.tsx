import { useState, useEffect, Children } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '@/utils/firebaseApp';
import {
  collection,
  getDocs,
  query,
  startAt,
  endAt,
  orderBy,
} from 'firebase/firestore';
import { PlantType } from '@/@types/dictionary';
import { mockData } from '@/mock/dictMock';
import InputForm from '../InputForm';
import './DictSearchPage.scss';

const koreanRe = /[ㄱ-ㅎ|가-힣|]/;

const DictSearchPage = () => {
  const location = useLocation();
  const inputValue = location.state?.inputValue;
  const [searchValue, setSearchValue] = useState(inputValue);
  const [plant, setPlant] = useState<PlantType[]>([]);

  const getDouments = async (plantName: string) => {
    let fieldName = 'name';
    if (!koreanRe.test(plantName)) {
      fieldName = 'scientificName';
      plantName = plantName.replace(plantName[0], plantName[0].toUpperCase());
    }
    const dictRef = collection(db, 'dictionary');
    const q = query(
      dictRef,
      orderBy(fieldName),
      startAt(`${plantName}`),
      endAt(`${plantName}\uf8ff`),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setPlant(prev => {
        const data = doc.data();
        return [...prev, data] as PlantType[];
      });
    });
  };

  const getMockData = async () => {
    mockData.map(item => setPlant(prev => [...prev, item] as PlantType[]));
  };

  useEffect(() => {
    setPlant([]);
    // Mock Data 사용시 getDouments 주석 처리
    getDouments(searchValue);

    // Mock Data 사용시 getMockData 주석 해제
    // getMockData();
  }, [searchValue]);

  const updateSearchValue = (input: string | undefined) => {
    setSearchValue(input);
  };

  return (
    <div className="search_container">
      <header>
        <Link to="/dict">
          <span className="back_button">←</span>
        </Link>
        <span className="search_header">검색 결과(임시 헤더)</span>
      </header>
      <main>
        <input />
        <InputForm
          nextPath={'/dict/search'}
          initialInput={searchValue}
          updateInputValue={updateSearchValue}
        />
        <section className="plant_container">
          {plant.length ? (
            Children.toArray(
              plant.map(item => (
                <Link to={`/dict/detail?plantName=${item.name}`} state={item}>
                  <div className="plant_wrapper">
                    <img src={item.imageUrl} alt="plant image" />
                    <div className="name_wrapper">
                      <h3 className="korean_name">{item.name}</h3>
                      <h3 className="english_name">{item.scientificName}</h3>
                    </div>
                  </div>
                </Link>
              )),
            )
          ) : (
            <div className="no_search">
              <p>검색 결과가 없습니다.</p>
              <a href="https://forms.gle/g4AjkNKqVDP48Xnc7" target="_blank">
                내가 찾는 식물이 없다면, 식물 등록 요청하기
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DictSearchPage;
