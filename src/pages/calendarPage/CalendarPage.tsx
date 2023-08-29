import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { db } from '@/firebaseApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@/hooks';

import Progress from '@/components/progress/Progress';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';

import 'react-calendar/dist/Calendar.css';
import './calendarPage.scss';

import { CALENDAR_ICONS, DAY_OF_WEEK_KR } from '@/constants/calendar';
import { UserPlant } from '@/@types/plant.type';
import { TileArgs } from 'node_modules/react-calendar/dist/esm/shared/types';

type ValuePiece = Date | null;

type CalendarValueType = ValuePiece | [ValuePiece, ValuePiece];

interface RecordDataType {
  time: string;
  plant: string;
}
export interface WaterRecordType {
  icon: string;
  date: string;
  list: RecordDataType[];
}

const CalendarPage = () => {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [waterRecords, setWaterRecords] = useState<WaterRecordType[]>([]);
  const [selectedDate, setSelectedDate] = useState<CalendarValueType>(
    new Date(),
  );

  // [date: string]: {icon: string, items: RecordDataType[]};
  const [mockData, setMockData] = useState<{
    [date: string]: any;
  }>({});

  // 해당 날짜의 데이터를 찾는다.
  const dateList = waterRecords.find(arr => {
    const date =
      selectedDate instanceof Date ? format(selectedDate, 'yyyy-MM-dd') : '';
    return arr.date === date;
  });

  const setIconOnTile = ({ date: calendarDates }: TileArgs) => {
    // console.log(calendarDates);

    const dateMatchedItem = waterRecords.find(
      ({ date }) => date === format(calendarDates, 'yyyy-MM-dd'),
    );

    if (dateMatchedItem) {
      return <img src={dateMatchedItem?.icon || CALENDAR_ICONS[0]} />;
    }
  };

  // 함수 분리 필요 (fetch 로직, calendar용 데이터로 변경하는 함수)
  const getWatering = async (userEmail?: string | null) => {
    if (!userEmail) return;

    const waterRef = collection(db, 'plant');
    const q = query(waterRef, where('userEmail', '==', userEmail));

    try {
      const querySnapshot = await getDocs(q);

      const data: { [date: string]: RecordDataType[] } = {};

      querySnapshot.forEach(doc => {
        const plantData = doc.data() as Omit<UserPlant, 'id'>;

        plantData.wateredDays.forEach(d => {
          const time = format(d.toDate(), 'HH:mm');
          const fullDate = format(d.toDate(), 'yyyy-MM-dd');

          const waterData: RecordDataType = { time, plant: plantData.nickname };

          if (!data[fullDate]) {
            data[fullDate] = [];
          }

          data[fullDate].push(waterData);
        });
      });

      const result: WaterRecordType[] = [];

      for (const [date, info] of Object.entries(data)) {
        const randomIndex = Math.random() * (CALENDAR_ICONS.length - 1);
        const randomIcon = CALENDAR_ICONS[Math.floor(randomIndex)];
        result.push({ date, list: info, icon: randomIcon });
      }

      setMockData(data);
      setWaterRecords(result);
    } catch (error) {
      throw new Error('데이터를 받아오지 못했어요!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWatering(user?.email);
  }, [user]);

  const getTitleOfDay = (dateStr: CalendarValueType): string => {
    if (dateStr instanceof Date) {
      const date = new Date(dateStr);

      const [month, days] = format(date, 'M-d').split('-');
      const dayOfWeek = DAY_OF_WEEK_KR[date.getDay()];

      return `${month}월 ${days}일 ${dayOfWeek}요일`;
    }

    return '';
  };

  return (
    <>
      <HeaderBefore ex={true} title="물주기 기록" />
      <main className="calendar_page">
        <section className="calendar_wrap inner">
          <Calendar
            value={selectedDate}
            formatDay={(_, date) => format(date, 'd')}
            calendarType="hebrew"
            nextLabel=""
            prevLabel=""
            tileContent={setIconOnTile}
            onChange={setSelectedDate}
          />
        </section>
        <section className="date_list_wrap inner">
          <strong className="date_title">{getTitleOfDay(selectedDate)}</strong>
          {/* 하단 데이터 영역 */}
          {dateList ? (
            <div className="date_list">
              <div className="list_line"></div>
              <ul>
                {dateList.list.map(({ time, plant }, i) => (
                  <li key={nanoid()}>
                    <em>{time}</em>
                    <div className={`list_card color${i % 4}`}>{plant}</div>
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
      </main>
      {isLoading && <Progress />}
    </>
  );
};

export default CalendarPage;
