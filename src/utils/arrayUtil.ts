import { PlantType } from '@/@types/dictionary.type';

const getRandomIndex = (length: number) => {
  return Math.floor(Math.random() * length);
};

const shuffleArray = (array: PlantType[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export { getRandomIndex, shuffleArray };
