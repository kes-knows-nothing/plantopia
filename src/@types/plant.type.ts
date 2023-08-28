import { Timestamp } from 'firebase/firestore';

export interface UserPlant {
  id: string;
  frequency: number;
  imgUrl: string;
  isMain: boolean;
  nickname: string;
  plantName: string;
  purchasedDay: InstanceType<typeof Timestamp>;
  userEmail: string;
  wateredDays: InstanceType<typeof Timestamp>[];
}
