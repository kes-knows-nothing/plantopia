import { useEffect, useState } from 'react';
import { db } from '@/firebaseApp.ts';
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '@/hooks';
import { DiaryProps, Plant } from '@/constants/diary';

const useDiaryData = () => {
  const user = useAuth();
  const [diaryData, setDiaryData] = useState<DiaryProps[]>([]);
  const [plantTag, setPlantTag] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /* 다이어리 메인 데이터 불러오기 */
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true);
        const q = query(
          collection(db, 'diary'),
          where('userEmail', '==', user?.email),
        );
        const querySnapshot = await getDocs(q);
        const data: DiaryProps[] = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as DiaryProps);
        });

        const sortedData = data.sort(
          (a, b) =>
            b.postedAt.toDate().getTime() - a.postedAt.toDate().getTime(),
        );
        setDiaryData(sortedData);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  /* 삭제하기 */
  const handleDelete = async (index: number) => {
    try {
      const diaryIdToDelete = diaryData[index].id;

      await deleteDoc(doc(db, 'diary', diaryIdToDelete));

      const updatedDiaryData = diaryData.filter((_, i) => i !== index);
      setDiaryData(updatedDiaryData);
    } catch (error) {
      console.error('일기 삭제 중 오류:', error);
    }
  };

  /* 등록한 식물이 있는지 확인하기 => 없을 경우 등록페이지로 */
  const checkPlantExistence = async () => {
    if (user) {
      const plantQuery = query(
        collection(db, 'plant'),
        where('userEmail', '==', user?.email),
      );
      const plantSnapshot = await getDocs(plantQuery);
      const plantDataExist = !plantSnapshot.empty;
      return plantDataExist;
    }
    return false;
  };

  /* 저장하기 */
  const saveDiaryData = async (dataToSave: Partial<DiaryProps>) => {
    if (user) {
      setIsLoading(true);
      await addDoc(collection(db, 'diary'), dataToSave);
      setIsLoading(false);
    }
  };

  /* 수정하기 */
  const updateDiaryData = async (
    diaryId: string,
    updatedData: Partial<DiaryProps>,
  ) => {
    try {
      const diaryRef = doc(db, 'diary', diaryId);
      setIsLoading(true);
      await updateDoc(diaryRef, updatedData);
      setIsLoading(false);
      setDiaryData(prevData =>
        prevData.map(item =>
          item.id === diaryId ? { ...item, ...updatedData } : item,
        ),
      );
    } catch (error) {
      console.error('일기 업데이트 중 오류:', error);
      setIsLoading(false);
    }
  };

  /* 내 식물 목록 불러오기 */
  useEffect(() => {
    if (!user) return;

    const getPlantsFromFirestore = async () => {
      const plantRef = collection(db, 'plant');
      const q = query(plantRef, where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      const plants: Plant[] = querySnapshot.docs.map(
        doc => doc.data() as Plant,
      );
      setPlantTag(plants);
    };
    getPlantsFromFirestore();
  }, [user]);

  return {
    diaryData,
    handleDelete,
    checkPlantExistence,
    saveDiaryData,
    updateDiaryData,
    plantTag,
    isLoading,
    setIsLoading,
  };
};

export default useDiaryData;
