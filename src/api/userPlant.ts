import { UserPlant } from '@/@types/plant.type';
import { db } from '@/firebaseApp';
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const getPlantList = async (userEmail: string): Promise<UserPlant[]> => {
  const plantsRef = collection(db, 'plant');
  const q = query(plantsRef, where('userEmail', '==', userEmail));

  const querySnapshot = await getDocs(q);
  const plantList: UserPlant[] = querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...(doc.data() as Omit<UserPlant, 'id'>),
    };
  });

  return plantList;
};

// id만 받는게 아니라 플랜트에 대한 정보
export const fetchWateringPlant = (plant: UserPlant) => {
  const plantRef = doc(db, 'plant', plant.id);

  return updateDoc(plantRef, {
    wateredDays: [...plant.wateredDays, Timestamp.fromDate(new Date())],
  });
};
