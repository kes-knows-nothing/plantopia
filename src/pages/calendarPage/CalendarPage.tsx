import { useState } from 'react';
import Calendar from 'react-calendar';

import sticker01 from '../../assets/images/icons/calendar_sticker01.png';
import sticker02 from '../../assets/images/icons/calendar_sticker02.png';
import sticker03 from '../../assets/images/icons/calendar_sticker03.png';
import sticker04 from '../../assets/images/icons/calendar_sticker04.png';
import sticker05 from '../../assets/images/icons/calendar_sticker05.png';
import sticker06 from '../../assets/images/icons/calendar_sticker06.png';
import 'react-calendar/dist/Calendar.css';
import './calendar.scss';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const waterValue = [
  {
    date: '23-8-1',
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
    date: '23-8-10',
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
    date: '23-8-16',
    list: [
      { time: '10:00', plant: '쑥쑥이' },
      { time: '10:00', plant: '유나의 스투시' },
      { time: '11:00', plant: '랩몬스테라' },
      { time: '15:00', plant: '뀨뀨까까' },
    ],
  },
  {
    date: '23-8-19',
    list: [
      { time: '09:00', plant: '쑥쑥이' },
      { time: '10:00', plant: '쑥쑥이' },
    ],
  },
  {
    date: '23-8-21',
    list: [
      { time: '19:00', plant: '쑥쑥이' },
      { time: '20:00', plant: '쑥쑥이' },
    ],
  },
  {
    date: '23-8-31',
    list: [
      { time: '10:00', plant: '쑥쑥이' },
      { time: '15:00', plant: '쑥쑥이' },
    ],
  },
];

const stickerArr = [
  sticker01,
  sticker02,
  sticker03,
  sticker04,
  sticker05,
  sticker06,
];

const dateFomater = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = new Date().getFullYear() - 2000;
  return `${year}-${month}-${day}`;
};
const dateWeekFomater = (date: Date) => {
  const week = date.getDay();
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
  return `${dateFomater(date)} ${weekArr[week]}요일`;
};

interface ItileContents {
  date: Date;
}

const CalendarPage = () => {
  const [value, onCalChange] = useState<Value>(new Date());
  const dateList = waterValue.find(
    arr => arr.date === dateFomater(value as Date),
  );
  const formatDay = (locale: string | undefined, date: Date) => {
    return `${date.getDate()}`;
  };

  const tileContent = ({ date }: ItileContents) => {
    for (let i = 0; i < waterValue.length; i++) {
      if (dateFomater(date) === waterValue[i].date)
        return <img src={stickerArr[0 + i]} />;
    }
  };

  return (
    <main className="calendar_page">
      <div className="container">
        <div className="sub_header">
          <strong>물주기 기록</strong>
          <button className="close_btn">
            <span className="hide">닫기</span>
          </button>
        </div>

        <section className="calendar_wrap inner">
          <Calendar
            onChange={onCalChange}
            value={value}
            formatDay={formatDay}
            calendarType="hebrew"
            nextLabel=""
            prevLabel=""
            tileContent={tileContent}
          />
        </section>

        <section className="date_list_wrap inner">
          <strong className="date_title">
            {dateWeekFomater(value as Date)}
          </strong>
          {dateList ? (
            <div className="date_list">
              <div className="list_line"></div>
              <ul>
                {dateList.list.map((v, i) => (
                  <li key={i.toString()}>
                    <em>{v.time}</em>
                    <div className={`list_card color${i % 4}`}>{v.plant}</div>
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
      </div>
    </main>
  );
};
export default CalendarPage;
