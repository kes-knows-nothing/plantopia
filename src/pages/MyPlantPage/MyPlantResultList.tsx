import './myPlantResultList.scss';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '@/utils/firebaseApp';
import { PlantType } from '../dictPage/Recommend';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
interface MyPlantResultListProps {
  searchValue: string;
}

const MyPlantResultList: React.FC<MyPlantResultListProps> = ({
  searchValue,
}) => {
  const [searchResult, setSearchResult] = useState<PlantType[]>([]);
  const navigate = useNavigate();
  console.log(searchValue);
  const getSearchResult = async () => {
    const q = query(
      collection(db, 'dictionary'),
      where('name', '>=', searchValue),
    );
    const querySnapshot = await getDocs(q);
    const plantData: Array<PlantType> = [];
    querySnapshot.forEach(doc => {
      plantData.push(doc.data());
    });
    setSearchResult(plantData);
  };

  const handleSelect = (plantName: string) => {
    const path = '/dict/detail';
    const query = `?plantName=${encodeURIComponent(plantName)}`;
    const fullPath = `${path}${query}`;
    navigate(fullPath);
  };

  useEffect(() => {
    getSearchResult();
  }, [searchValue]);
  console.log(searchResult);
  return (
    <div className="resultListContainer">
      {searchResult.map(plant => (
        <div key={nanoid()} className="resultListBox">
          <div className="plantImgBox">
            <img src={plant.imageUrl} alt="" className="plantImg" />
          </div>
          <div className="plantMetaData">
            <p>{plant.name}</p>
            <p>{plant.scientificName}</p>
          </div>
          <button
            className="selectPlantResult"
            onClick={() => handleSelect(plant.name)}
          >
            선택
          </button>
        </div>
      ))}
    </div>
  );
};
export default MyPlantResultList;
