import { useState, useEffect } from 'react';
import { PlantType } from '@/@types/dictionary.type';
import { db } from '@/firebaseApp';
import { orderDirection, targetQuery } from '@/constants/dictionary';
import { getRandomIndex, shuffleArray } from '@/utils/arrayUtil';
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';

interface UseRecommendProps {
  target: keyof typeof targetQuery;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useRecommend = ({ target, setIsLoading }: UseRecommendProps) => {
  const [plant, setPlant] = useState<PlantType[]>([]);

  useEffect(() => {
    const getDouments = async (target: keyof typeof targetQuery) => {
      const dictRef = collection(db, 'dictionary');
      const q = query(
        dictRef,
        where(targetQuery[target][0], '==', targetQuery[target][1]),
        orderBy(
          Object.values(targetQuery)[getRandomIndex(4)][0],
          orderDirection[getRandomIndex(2)],
        ),
        limit(8),
      );
      const querySnapshot = await getDocs(q);
      const queriedData: PlantType[] = [];
      querySnapshot.forEach(doc => {
        queriedData.push(doc.data() as PlantType);
      });
      setPlant(prev => [...prev, ...shuffleArray(queriedData)]);
      target === 'dark' && setIsLoading(false);
    };
    getDouments(target);
  }, []);

  return { plant };
};

export default useRecommend;
