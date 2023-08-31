import { useEffect, useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import { nanoid } from 'nanoid';
import { format, getDay } from 'date-fns';
import { useAuth } from '@/hooks';
import { db } from '@/firebaseApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { CALENDAR_ICONS, DAY_OF_WEEK_KR } from '@/constants/calendar';
import { UserPlant } from '@/@types/plant.type';
import { TileArgs } from 'node_modules/react-calendar/dist/esm/shared/types';
import { errorNoti } from '@/utils/myPlantUtil';

import Progress from '@/components/progress/Progress';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';

import './calendarPage.scss';

type ValuePiece = Date | null;
interface RecordDataType {
  time: string;
  plantName: string;
}

interface CalendarDataType {
  [date: string]: {
    icon: string;
    items: Array<RecordDataType>;
  };
}

interface ContentSectionProps {
  contents?: RecordDataType[];
  selectedDate: ValuePiece;
}

const ContentSection = ({ contents, selectedDate }: ContentSectionProps) => {
  const formatContentTitle = useCallback((date: ValuePiece): string => {
    if (!(date instanceof Date)) return '';

    const [month, days] = format(date, 'M-d').split('-');
    const day = DAY_OF_WEEK_KR[getDay(date)];

    return `${month}월 ${days}일 ${day}요일`;
  }, []);

  return (
    <section className="date_list_wrap inner">
      <strong className="date_title">{formatContentTitle(selectedDate)}</strong>
      {contents ? (
        <div className="date_list">
          <div className="list_line"></div>
          <ul>
            {contents.map(({ time, plantName }, i) => (
              <li key={nanoid()}>
                <em>{time}</em>
                <div className={`list_card color${i % 4}`}>{plantName}</div>
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
  );
};

const CalendarPage = () => {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<ValuePiece>(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDataType>({});

  const setIconOnTile = ({ date }: TileArgs) => {
    const dateMatchedItem = calendarData[format(date, 'yyyy-MM-dd')];

    if (dateMatchedItem) return <img src={dateMatchedItem.icon} />;
  };

  const getUserPlant = async (userEmail?: string | null) => {
    if (!userEmail) return;

    const waterRef = collection(db, 'plant');
    const q = query(waterRef, where('userEmail', '==', userEmail));

    try {
      const querySnapshot = await getDocs(q);
      const newData: CalendarDataType = {};

      querySnapshot.forEach(doc => {
        const calendarData = doc.data() as Omit<UserPlant, 'id'>;

        calendarData.wateredDays.forEach(date => {
          const time = format(date.toDate(), 'HH:mm');
          const fullDate = format(date.toDate(), 'yyyy-MM-dd');

          if (!newData[fullDate]) {
            const randomIndex = Math.random() * (CALENDAR_ICONS.length - 1);
            const randomIcon = CALENDAR_ICONS[Math.floor(randomIndex)];

            newData[fullDate] = {
              icon: randomIcon,
              items: [],
            };
          }

          newData[fullDate].items.push({
            time,
            plantName: calendarData.nickname,
          });
        });
      });

      setCalendarData(newData);
    } catch (error) {
      errorNoti('데이터를 받아오지 못했습니다! 잠시 후 다시 시도해주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserPlant(user?.email);
  }, [user]);

  const visibleContent = selectedDate
    ? calendarData[format(selectedDate, 'yyyy-MM-dd')]
    : null;

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
            onChange={clickedDate => {
              if (clickedDate instanceof Date) setSelectedDate(clickedDate);
            }}
          />
        </section>
        <ContentSection
          contents={visibleContent?.items}
          selectedDate={selectedDate}
        />
      </main>
      {isLoading && <Progress />}
    </>
  );
};

export default CalendarPage;
