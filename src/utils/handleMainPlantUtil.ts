import { db } from '@/firebaseApp';
import { getDocs, collection, where, query } from 'firebase/firestore';

export const findMainPlantByEmail = async (userEmail: string) => {
  if (userEmail) {
    const q = query(
      collection(db, 'plant'),
      where('userEmail', '==', userEmail),
      where('isMain', '==', true),
    );
    const mainPlantData = (await getDocs(q)).docs[0]?.data();
    return mainPlantData;
  }
};
