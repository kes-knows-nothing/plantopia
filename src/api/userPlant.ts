import { db, storage } from '@/firebaseApp';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  Timestamp,
  getDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { successNoti, errorNoti } from '@/utils/alarmUtil';
import { UserPlant } from '@/@types/plant.type';

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

export const deletePlantDataByDocId = async (docId: string) => {
  if (!docId) return;

  const docRef = doc(db, 'plant', docId);
  const plantData = await findPlantDataByDocId(docId);

  const q = query(
    collection(db, 'plant'),
    where('userEmail', '==', plantData?.userEmail),
  );
  const userPlants = await getDocs(q);

  if (userPlants.size === 1) {
    await deleteDoc(docRef);
    successNoti('식물을 삭제하였습니다.');
    return;
  }

  if (plantData?.isMain == true) {
    try {
      await deleteDoc(docRef);
      const firstPlantDataId = userPlants.docs[0].id;
      const documentRef = doc(db, 'plant', firstPlantDataId);
      const updatedFields = {
        isMain: true,
      };
      await updateDoc(documentRef, updatedFields);
      successNoti('식물을 삭제하였습니다.');
      return;
    } catch {
      errorNoti('식물 삭제에 실패 하였습니다.');
      return;
    }
  } else if (plantData?.isMain == false) {
    try {
      await deleteDoc(docRef);
      successNoti('내 식물이 삭제 되었습니다.');
      return;
    } catch (error) {
      errorNoti('식물 삭제에 실패 하였습니다.');
      return;
    }
  }
};

export const findPlantDataWithDictData = async (docId: string) => {
  const documentByDocId = doc(db, 'plant', docId);
  const plantDataByDocId = (await getDoc(documentByDocId)).data();
  const q = query(
    collection(db, 'dictionary'),
    where('name', '==', plantDataByDocId?.plantName),
  );
  const queryPlantData = await getDocs(q);
  const plantDataFromDict = queryPlantData.docs.map(doc => ({
    ...doc.data(),
  }))[0];
  return { plantDataByDocId, plantDataFromDict };
};

export const isUserPlantEmpty = async (userEmail: string): Promise<boolean> => {
  const q = query(collection(db, 'plant'), where('userEmail', '==', userEmail));
  const querySnapshot = await getDocs(q);
  const isEmpty = querySnapshot.empty;
  return isEmpty;
};

export const registerPlantData = async (newPlantData: UserPlant) => {
  await addDoc(collection(db, 'plant'), newPlantData);
  return;
};

export const cleanFileName = (fileName: string) => {
  const cleanedName = fileName.replace(/[^\w\s.-]/gi, '');
  return cleanedName;
};

export const readFileAsDataURL = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const handleFileSelect = async (file: File) => {
  try {
    const previewUrl = await readFileAsDataURL(file);
    const storagePath = `myplant_imgs/${cleanFileName(file.name)}`;
    const imageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { previewUrl, url };
  } catch (error) {
    console.error('파일 업로드 에러:', error);
  }
};
