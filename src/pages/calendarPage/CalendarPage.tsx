import { useEffect, useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import { nanoid } from 'nanoid';
import { format, getDay } from 'date-fns';
import { useAuth } from '@/hooks';
import { CALENDAR_ICONS, DAY_OF_WEEK_KR } from '@/constants/calendar';
import { UserPlant } from '@/@types/plant.type';
import { TileArgs } from 'node_modules/react-calendar/dist/esm/shared/types';
import { errorNoti } from '@/utils/alarmUtil';

import Progress from '@/components/progress/Progress';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';

import './calendarPage.scss';
import { getPlantList } from '@/api/userPlant';

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

  const formatCalendarData = (items: UserPlant[]) => {
    const calendarData: CalendarDataType = {};

    items.forEach(({ nickname, wateredDays }) => {
      wateredDays.forEach(date => {
        const time = format(date.toDate(), 'HH:mm');
        const fullDate = format(date.toDate(), 'yyyy-MM-dd');

        if (!calendarData[fullDate]) {
          const randomIndex = Math.random() * (CALENDAR_ICONS.length - 1);
          const randomIcon = CALENDAR_ICONS[Math.floor(randomIndex)];

          calendarData[fullDate] = {
            icon: randomIcon,
            items: [],
          };
        }

        calendarData[fullDate].items.push({
          time,
          plantName: nickname,
        });
      });
    });

    for (const [date] of Object.entries(calendarData)) {
      calendarData[date].items.sort((a, b) => {
        const { time: prevTime } = a;
        const { time: nextTime } = b;

        return (
          Number(prevTime.split(':').join('')) -
          Number(nextTime.split(':').join(''))
        );
      });
    }

    return calendarData;
  };

  useEffect(() => {
    (async () => {
      if (!user?.email) return;

      try {
        const userPlants = await getPlantList(user?.email);
        const calendarData = formatCalendarData(userPlants);
        setCalendarData(calendarData);
      } catch (error) {
        errorNoti('데이터를 받아오지 못했습니다! 잠시 후 다시 시도해주세요!');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  const visibleContent = selectedDate
    ? calendarData[format(selectedDate, 'yyyy-MM-dd')]
    : null;

  return (
    <div className ="layout">
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
    </div>
  );
};

export default CalendarPage;
