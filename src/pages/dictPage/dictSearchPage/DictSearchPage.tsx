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
import { PlantType } from '../Recommend';
import './DictSearchPage.scss';
import InputForm from '../InputForm';

const DictSearchPage = () => {
  const location = useLocation();
  const inputValue = location.state?.inputValue;
  const [plant, setPlant] = useState<PlantType[]>([]);
  const [reSearch, setReSearch] = useState<boolean>(false);

  useEffect(() => {
    setPlant([]);
    const getDouments = async (plantName: string) => {
      const dictRef = collection(db, 'dictionary');
      const q = query(
        dictRef,
        orderBy('name'),
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
    getDouments(inputValue);
  }, [reSearch]);

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
          initialInput={inputValue}
          setReSearch={setReSearch}
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
              <a href="https://www.google.co.kr/">
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
