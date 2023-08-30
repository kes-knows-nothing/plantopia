import { useEffect, useState } from 'react';
import { db } from '@/firebaseApp.ts';
import { getDocs, query, where, collection, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks';
import { DiaryProps, Plant } from '@/constants/diary';

const useDiaryData = () => {
  const user = useAuth();
  const [diaryData, setDiaryData] = useState<DiaryProps[]>([]);
  const [plantTag, setPlantTag] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'diary'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        const data: DiaryProps[] = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() } as DiaryProps);
        });

        const sortedData = data.sort((a, b) => b.postedAt.toDate().getTime() - a.postedAt.toDate().getTime());
        setDiaryData(sortedData);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (index: number) => {
    const confirmed = window.confirm('글을 삭제하시겠습니까?');

    if (confirmed) {
      try {
        const diaryIdToDelete = diaryData[index].id;

        await deleteDoc(doc(db, 'diary', diaryIdToDelete));

        const updatedDiaryData = diaryData.filter((_, i) => i !== index);
        setDiaryData(updatedDiaryData);
      } catch (error) {
        console.error('일기 삭제 중 오류:', error);
      }
    }
  };

  const checkPlantExistence = async () => {
    if (user) {
      const plantQuery = query(collection(db, 'plant'), where('userEmail', '==', user?.email));
      const plantSnapshot = await getDocs(plantQuery);
      const plantDataExist = !plantSnapshot.empty;
      return plantDataExist;
    }
    return false;
  };

  const saveDiaryData = async (dataToSave: any) => {
    if (user) {
      await addDoc(collection(db, 'diary'), dataToSave);
    }
  };

  useEffect(() => {
    if (!user) return;

    const getPlantsFromFirestore = async () => {
      const plantRef = collection(db, 'plant');
      const q = query(plantRef, where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      const plants: Plant[] = querySnapshot.docs.map(doc => doc.data() as Plant);
      setPlantTag(plants);
    };
    getPlantsFromFirestore();
  }, [user]);

  return {
    diaryData,
    handleDelete,
    checkPlantExistence,
    saveDiaryData,
    plantTag,
  };
};

export default useDiaryData;
