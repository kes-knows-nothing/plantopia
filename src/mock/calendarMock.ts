import { CALENDAR_ICONS } from '@/constants/calendar';
import { WaterRecordType } from '@/pages/calendarPage/CalendarPage';

export const mockWaterValue: WaterRecordType[] = [
  {
    date: '2023-08-01',
    icon: CALENDAR_ICONS[0],
    list: [
      { time: '09:00', plant: '쑥쑥이' },
      { time: '10:00', plant: '유나의 스투시' },
      { time: '11:00', plant: '랩몬스테라' },
      { time: '12:00', plant: '식물 이름이 나오는 영역 입니다 입니다' },
      { time: '13:00', plant: '식물 이름이 나오는 영역 입니다 입니다2' },
      { time: '15:00', plant: '뀨뀨까까' },
    ],
  },
  {
    date: '2023-08-10',
    icon: CALENDAR_ICONS[1],
    list: [
      { time: '10:00', plant: '유나의 스투시' },
      { time: '11:00', plant: '랩몬스테라' },
      { time: '12:00', plant: '식물 이름이 나오는 영역 입니다 입니다' },
      { time: '13:00', plant: '식물 이름이 나오는 영역 입니다 입니다2' },
      { time: '15:00', plant: '뀨뀨까까' },
      { time: '15:00', plant: '뀨뀨까까' },
      { time: '15:00', plant: '뀨뀨까까' },
      { time: '15:00', plant: '뀨뀨까까' },
    ],
  },
  {
    date: '2023-08-16',
    icon: CALENDAR_ICONS[2],
    list: [
      { time: '10:00', plant: '쑥쑥이' },
      { time: '10:00', plant: '유나의 스투시' },
      { time: '11:00', plant: '랩몬스테라' },
      { time: '15:00', plant: '뀨뀨까까' },
    ],
  },
  {
    date: '2023-08-19',
    icon: CALENDAR_ICONS[3],
    list: [
      { time: '09:00', plant: '쑥쑥이' },
      { time: '10:00', plant: '쑥쑥이' },
    ],
  },
  {
    date: '2023-08-21',
    icon: CALENDAR_ICONS[4],
    list: [
      { time: '19:00', plant: '쑥쑥이' },
      { time: '20:00', plant: '쑥쑥이' },
    ],
  },
  {
    date: '2023-08-30',
    icon: CALENDAR_ICONS[5],
    list: [
      { time: '10:00', plant: '쑥쑥이' },
      { time: '15:00', plant: '쑥쑥이' },
    ],
  },
  {
    date: '2023-08-31',
    icon: CALENDAR_ICONS[6],
    list: [
      { time: '10:00', plant: '쑥쑥이' },
      { time: '15:00', plant: '쑥쑥이' },
    ],
  },
];
