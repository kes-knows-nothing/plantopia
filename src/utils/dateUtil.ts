import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import format from 'date-fns/format';
import differenceInMonths from 'date-fns/differenceInMonths';

/**
 * 파이어베이스 Timestamp의 seconds값을 활용하여 yyyy-MM-dd string 값으로 변경시켜줍니다.
 * date-fns 라이브러리의 format 메서드 활용
 * @param {number} seconds Timestamp 타입에서 seconds 키
 * @returns {string} yyyy-MM-dd 형식의 스트링 값
 */
export const secondsToDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const formattedDate = format(date, 'yyyy-MM-dd');
  return formattedDate;
};

/**
 * input의 date 타입의 값을 파이어베이스 타임스탬프 값으로 변경시켜줍니다.
 * @param {string} dateString yyyy-MM-dd 형식의 string
 * @returns {Timestamp} 파이어베이스 타임스탬프 타입 객체
 */
export const dateToTimestamp = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  return Timestamp.fromDate(date);
};

export const monthDifference = (seconds: number) => {
  const monthsDifference = differenceInMonths(
    new Date(),
    new Date(seconds * 1000),
  );
  return monthsDifference;
};

export const maxDate = () => {
  const today = new Date();
  const maxDate = format(today, 'yyyy-MM-dd');
  return maxDate;
};
