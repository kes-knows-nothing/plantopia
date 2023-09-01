import { UserPlant } from '@/@types/plant.type';
import { db } from '@/firebaseApp';
import {
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

export const updatePlantInfo = (plant: UserPlant) => {
  const { id, ...newData } = plant;
  const plantRef = doc(db, 'plant', id);

  return updateDoc(plantRef, newData);
};
