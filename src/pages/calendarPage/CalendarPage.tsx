import { useRef, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { nanoid } from 'nanoid';
import { CalendarType, TileContentsProps } from './type/type';
import {
  dateFormat,
  dateFormatter,
  dateFullFormat,
  dateWeekFormatter,
  hhmmFormat,
  reactCalendarDayFormat,
} from '@/utils/calendarUtil';

import sticker01 from '@/assets/images/icons/calendar_sticker01.png';
import sticker02 from '@/assets/images/icons/calendar_sticker02.png';
import sticker03 from '@/assets/images/icons/calendar_sticker03.png';
import sticker04 from '@/assets/images/icons/calendar_sticker04.png';
import sticker05 from '@/assets/images/icons/calendar_sticker05.png';
import sticker06 from '@/assets/images/icons/calendar_sticker06.png';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/utils/firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import 'react-calendar/dist/Calendar.css';
import './calendar.scss';
import { useNavigate } from 'react-router-dom';
import ThreeDotsLoading from '@/components/loading/ThreeDots';

/**
 * firebase에서 받아온걸로 변경해야함
 * 샘플 데이터 START
 */
// const waterValue = [
//   {
//     date: '2023-08-01',
//     list: [
//       { time: '09:00', plant: '쑥쑥이' },
//       { time: '10:00', plant: '유나의 스투시' },
//       { time: '11:00', plant: '랩몬스테라' },
//       { time: '12:00', plant: '식물 이름이 나오는 영역 입니다 입니다' },
//       { time: '13:00', plant: '식물 이름이 나오는 영역 입니다 입니다2' },
//       { time: '15:00', plant: '뀨뀨까까' },
//     ],
//   },
//   {
//     date: '2023-08-10',
//     list: [
//       { time: '10:00', plant: '유나의 스투시' },
//       { time: '11:00', plant: '랩몬스테라' },
//       { time: '12:00', plant: '식물 이름이 나오는 영역 입니다 입니다' },
//       { time: '13:00', plant: '식물 이름이 나오는 영역 입니다 입니다2' },
//       { time: '15:00', plant: '뀨뀨까까' },
//       { time: '15:00', plant: '뀨뀨까까' },
//       { time: '15:00', plant: '뀨뀨까까' },
//       { time: '15:00', plant: '뀨뀨까까' },
//     ],
//   },
//   {
//     date: '2023-08-16',
//     list: [
//       { time: '10:00', plant: '쑥쑥이' },
//       { time: '10:00', plant: '유나의 스투시' },
//       { time: '11:00', plant: '랩몬스테라' },
//       { time: '15:00', plant: '뀨뀨까까' },
//     ],
//   },
//   {
//     date: '2023-08-19',
//     list: [
//       { time: '09:00', plant: '쑥쑥이' },
//       { time: '10:00', plant: '쑥쑥이' },
//     ],
//   },
//   {
//     date: '2023-08-21',
//     list: [
//       { time: '19:00', plant: '쑥쑥이' },
//       { time: '20:00', plant: '쑥쑥이' },
//     ],
//   },
//   {
//     date: '2023-08-30',
//     list: [
//       { time: '10:00', plant: '쑥쑥이' },
//       { time: '15:00', plant: '쑥쑥이' },
//     ],
//   },
//   {
//     date: '2023-08-31',
//     list: [
//       { time: '10:00', plant: '쑥쑥이' },
//       { time: '15:00', plant: '쑥쑥이' },
//     ],
//   },
// ];

interface RecordType {
  time: string;
  plant: string;
}
interface WaterRecordType {
  date: string;
  icon: string;
  list: RecordType[];
}

const stickerArr = [
  sticker01,
  sticker02,
  sticker03,
  sticker04,
  sticker05,
  sticker06,
];
/** 샘플 데이터 END */

const CalendarPage = () => {
  const navigator = useNavigate();
  const iconIdxRef = useRef(0);
  const [loading, setLoading] = useState(false);
  const [waterValue, setWaterValue] = useState<WaterRecordType[]>([]);
  const [selectDate, setSelectDate] = useState<CalendarType>(new Date());
  const dateList = waterValue.find(arr => {
    const date = selectDate instanceof Date ? dateFormat(selectDate) : '';
    return arr.date === date;
  });

  /**
   * 물준날짜와 일치하는 달력에 스티커를 반복해서 출력
   * stict모드때문에 2개씩 인덱스가 증가하여 배포후에는 문제 없을 것으로 확인
   * @param param0
   * @returns
   */
  const tileContent = ({ date }: TileContentsProps) => {
    const findItem = waterValue.find(data => data.date === dateFormat(date));
    if (findItem) {
      return <img src={findItem.icon} />;
    }
  };

  /**
   * firebase에서 물준 기록 가져오기
   * collection name : wateringRecord
   * @param userId
   */
  const getWatering = async (userId: string) => {
    const waterRef = collection(db, 'wateringRecord');
    const q = query(waterRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const data: WaterRecordType[] = [];
    querySnapshot.forEach(doc => {
      const { wateringTime, plantName } = doc.data();
      const strDate = dateFormat(wateringTime.toDate());
      const hhmm = hhmmFormat(wateringTime.toDate());
      const isDate = data.find(d => d.date === strDate);
      if (isDate) {
        // 물준 기록이 있으면 기존 배열에 추가
        isDate.list.push({ time: hhmm, plant: plantName });
      } else {
        // 처음 준 날짜면 새로 추가
        data.push({
          date: strDate,
          icon: stickerArr[iconIdxRef.current++ % stickerArr.length],
          list: [{ time: hhmm, plant: plantName }],
        });
      }
    });
    setWaterValue(data);
    setLoading(true);
  };

  useEffect(() => {
    // 관련 정보 https://firebase.google.com/docs/auth/web/manage-users?hl=ko
    /* firebase 로그인 및 유저정보 체크 */
    console.log('이건 한번만 탄다');
    onAuthStateChanged(auth, user => {
      if (user && user.email) {
        getWatering(user.email);
      } else {
        alert('로그인이 필요한 서비스입니다');
        navigator('/login');
      }
    });
  }, []);

  return (
    <div className="calendar_page">
      <header className="sub_header">
        <strong>물주기 기록</strong>
        <button className="close_btn">
          <span className="hide">닫기</span>
        </button>
      </header>
      <main className="calendar_container">
        {loading ? (
          <>
            <section className="calendar_wrap inner">
              <Calendar
                onChange={setSelectDate}
                value={selectDate}
                formatDay={reactCalendarDayFormat}
                calendarType="hebrew"
                nextLabel=""
                prevLabel=""
                tileContent={tileContent}
              />
            </section>

            <section className="date_list_wrap inner">
              <strong className="date_title">
                {selectDate instanceof Date
                  ? dateWeekFormatter(selectDate)
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
        ) : (
          <ThreeDotsLoading />
        )}
      </main>
    </div>
  );
};

export default CalendarPage;
