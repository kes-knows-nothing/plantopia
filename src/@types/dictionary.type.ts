import { codeInfo } from '@/constants/dictionary';
import { targetQuery } from '@/constants/dictionary';

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

interface RecommendProps {
  icon: string;
  title: string;
  target: keyof typeof targetQuery;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { PlantType, RecommendProps };
