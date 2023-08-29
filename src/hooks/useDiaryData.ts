import { useEffect, useState } from 'react';
import { db } from '@/firebaseApp.ts';
import { DiaryProps } from '@/constants/diary';
import {
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useAuth } from '@/hooks';

// 데이터 불러오기
const useDiaryData = () => {
  const user = useAuth();
  const [diaryData, setDiaryData] = useState<DiaryProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
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
      }
    };

    fetchData();
  }, [user]);

  // 데이터 삭제
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

  // 식물등록여부 확인
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

  return { diaryData, handleDelete, checkPlantExistence };
};

export default useDiaryData;
