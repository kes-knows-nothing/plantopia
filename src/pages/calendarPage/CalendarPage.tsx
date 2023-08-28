import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { db, auth } from '@/firebaseApp';
import { nanoid } from 'nanoid';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ThreeDotsLoading from '@/components/loading/ThreeDots';
import { useAuth } from '@/hooks';
import 'react-calendar/dist/Calendar.css';
import './calendarPage.scss';
import {
  dateFormat,
  dateWeekFormatter,
  hhmmFormat,
  reactCalendarDayFormat,
} from '@/utils/calendarUtil';

import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import { CALENDAR_ICONS } from '@/constants/calendar';
import { UserPlant } from '@/@types/plant.type';
import { format } from 'date-fns';

/**
 * firebase에서 받아온걸로 변경해야함
 * 샘플 데이터 START
 */
const mockWaterValue: WaterRecordType[] = [
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

type ValuePiece = Date | null;

type CalendarType = ValuePiece | [ValuePiece, ValuePiece];
interface TileContentsProps {
  date: Date;
}

interface RecordType {
  time: string;
  plant: string;
}
interface WaterRecordType {
  icon: string;
  date: string;
  list: RecordType[];
}

/** 샘플 데이터 END */

const CalendarPage = () => {
  const user = useAuth();
  const [loading, setLoading] = useState(false);

  // 캘린더 데이터 => waterRecords 로 변경
  const [calendarData, setCalendarData] =
    useState<WaterRecordType[]>(mockWaterValue);
  // 유저가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState<CalendarType>(new Date());

  const dateList = calendarData.find(arr => {
    const date = selectedDate instanceof Date ? dateFormat(selectedDate) : '';
    return arr.date === date;
  });

  /**
   * 물준날짜와 일치하는 달력에 스티커를 반복해서 출력
   * stict모드때문에 2개씩 인덱스가 증가하여 배포후에는 문제 없을 것으로 확인
   * @param param0
   * @returns
   */
  const tileContent = ({ date }: TileContentsProps) => {
    const findItem = calendarData.find(data => data.date === dateFormat(date));
    if (findItem) {
      return <img src={findItem.icon} />;
    }
  };

  /**
   * firebase에서 물준 기록 가져오기
   * collection name : wateringRecord
   * @param userId
   */
  const getWatering = async (userEmail?: string | null) => {
    if (!userEmail) return;

    const waterRef = collection(db, 'plant');
    const q = query(waterRef, where('userEmail', '==', userEmail));

    try {
      const querySnapshot = await getDocs(q);

      const data: { [date: string]: RecordType[] } = {};

      querySnapshot.forEach(doc => {
        const plantData = doc.data() as Omit<UserPlant, 'id'>;
        /* 형식 변환 필요 */

        const plantName = plantData.nickname;

        plantData.wateredDays.forEach(d => {
          const time = format(d.toDate(), 'HH:mm');
          const fullDate = format(d.toDate(), 'yyyy-MM-dd');

          const waterData: RecordType = { time, plant: plantName };

          if (!data[fullDate]) {
            data[fullDate] = [];
          }

          data[fullDate].push(waterData);
        });
      });

      const result: WaterRecordType[] = [];

      for (const [date, info] of Object.entries(data)) {
        // 아이콘 랜덤으로 변경 필요
        result.push({ date, list: info, icon: CALENDAR_ICONS[0] });
      }

      setCalendarData(result);
    } catch (error) {
      throw new Error('데이터를 받아오지 못했어요!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWatering(user?.email);
  }, [user]);

  return (
    <div className="calendar_page">
      <HeaderBefore ex={true} title="물주기 기록" />
      <main className="calendar_container">
        {loading ? (
          <ThreeDotsLoading />
        ) : (
          <>
            <section className="calendar_wrap inner">
              <Calendar
                value={selectedDate}
                formatDay={reactCalendarDayFormat}
                calendarType="hebrew"
                nextLabel=""
                prevLabel=""
                tileContent={tileContent}
                onChange={setSelectedDate}
              />
            </section>

            <section className="date_list_wrap inner">
              <strong className="date_title">
                {selectedDate instanceof Date
                  ? dateWeekFormatter(selectedDate)
                  : ''}
              </strong>
              {dateList ? (
                <div className="date_list">
                  <div className="list_line"></div>
                  <ul>
                    {dateList.list.map((v, i) => (
                      // 유니한 키로 사용할 값이 없어서 라이브러리 `nanoid` 적용하여 해결
                      <li key={nanoid()}>
                        <em>{v.time}</em>
                        <div className={`list_card color${i % 4}`}>
                          {v.plant}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="no_data">
                  <span>물주기 기록이 없네요, 내 식물에게 물을 주세요</span>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default CalendarPage;
