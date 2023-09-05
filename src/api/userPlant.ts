import { UserPlant } from '@/@types/plant.type';
import { db } from '@/firebaseApp';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import { successNoti, errorNoti } from '@/utils/alarmUtil';

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

interface UpdatedFields {
  imgUrl: string;
  nickname: string;
  purchasedDay: InstanceType<typeof Timestamp>;
  wateredDays: InstanceType<typeof Timestamp>[];
  frequency: number;
}

export const updatePlantData = async (
  docId: string,
  updatedFields: UpdatedFields,
) => {
  const documentRef = doc(db, 'plant', docId);
  try {
    await updateDoc(documentRef, { ...updatedFields });
    successNoti('식물 정보를 수정하였습니다!');
  } catch (error) {
    errorNoti('식물 정보 수정에 실패하였습니다.');
  }
};

export const findPlantDataByDocId = async (docId: string) => {
  try {
    if (!docId) {
      errorNoti('식물 id가 잘못되었습니다.');
      return;
    }
    const docRef = doc(db, 'plant', docId);
    const plantData = (await getDoc(docRef)).data();
    return plantData;
  } catch (error) {
    errorNoti('식물 정보를 가져오는데 실패하였습니다.');
    return;
  }
};
