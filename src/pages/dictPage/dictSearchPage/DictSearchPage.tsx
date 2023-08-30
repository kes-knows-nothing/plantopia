import { useState, useRef, useEffect, Children } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from '@/firebaseApp';
import {
  collection,
  getDocs,
  query,
  startAt,
  endAt,
  orderBy,
} from 'firebase/firestore';
import { PlantType } from '@/@types/dictionary.type';
import Progress from '@/components/progress/Progress';
import { mockData } from '@/mock/dictMock';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import SEARCH_ICON from '@/assets/images/icons/dict_search.png';
import './dictSearchPage.scss';

const koreanRe = /[ㄱ-ㅎ|가-힣|]/;

const DictSearchPage = () => {
  const location = useLocation();
  const inputValue = location.state?.inputValue;
  const [plant, setPlant] = useState<PlantType[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef?.current?.value) return;
    getDouments(inputRef?.current?.value);
  };

  const getDouments = async (plantName: string) => {
    setisLoading(true);
    setPlant([]);
    let fieldName = 'name';
    if (!koreanRe.test(plantName)) {
      fieldName = 'scientificName';
      plantName =
        plantName[0] &&
        plantName.replace(plantName[0], plantName[0].toUpperCase());
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
    setisLoading(false);
  };

  const getMockData = async () => {
    mockData.map(item => setPlant(prev => [...prev, item] as PlantType[]));
  };

  useEffect(() => {
    setPlant([]);
    // Mock Data 사용시 getDouments 주석 처리
    getDouments(inputValue);

    // Mock Data 사용시 getMockData 주석 해제
    // getMockData();
  }, [inputValue]);

  return (
    <div className="search_container">
      <HeaderBefore ex={false} title="검색 결과" />
      <main className="inner">
        <section className="search_wrapper">
          <form onSubmit={handleSubmit}>
            <div className="input_wrapper">
              <input
                ref={inputRef}
                defaultValue={inputValue}
                placeholder="식물 이름으로 검색하기"
              />
              <button>
                <img
                  className="search_img"
                  src={SEARCH_ICON}
                  alt="search icon"
                />
              </button>
            </div>
          </form>
        </section>
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
                  <hr />
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
      {isLoading && <Progress />}
    </div>
  );
};

export default DictSearchPage;
