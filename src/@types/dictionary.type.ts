import { codeInfo } from '@/constants/dictionary';

interface PlantType {
  name: string;
  scientificName: string;
  imageUrl: string;
  adviseInfo: string;
  blightInfo: string[];
  growCode: string;
  humidityCode: keyof typeof codeInfo;
  lightCode: keyof typeof codeInfo;
  recommendCode: keyof typeof codeInfo;
  temperatureCode: keyof typeof codeInfo;
  waterCode: keyof typeof codeInfo;
  speciesInfo: string;
  classificationInfo: string[];
}

export type { PlantType };
