import './myPlantResultList.scss';
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
  useEffect(() => {
    const getSearchResult = async () => {
      const q = query(
        collection(db, 'dictionary'),
        where('name', '==', searchValue),
      );
      const querySnapshot = await getDocs(q);
      const plantData: Array<PlantType> = [];
      querySnapshot.forEach(doc => {
        plantData.push(doc.data());
      });
      setSearchResult(plantData);
    };
    getSearchResult();
  }, [searchValue]);

  return (
    <div className="resultListContainer">
      {searchResult.map(plant => (
        <div className="resultListBox">
          <img src={plant.imageUrl} alt="" className="plantImg" />
          <div className="plantMetaData">
            <p>{plant.name}</p>
            <p>{plant.scientificName}</p>
          </div>
          <button className="selectPlantResult">선택</button>
        </div>
      ))}
    </div>
  );
};
export default MyPlantResultList;
