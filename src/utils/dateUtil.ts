import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import format from 'date-fns/format';
import differenceInMonths from 'date-fns/differenceInMonths';

export const secondsToDate = (seconds = 0) => {
  if (seconds) {
    const date = new Date(seconds * 1000);
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  } else {
    return '물을 주세요!';
  }
};

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
