import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import format from 'date-fns/format';

export const dateToTimestamp = (date: string) => {
  const dateObject = new Date(date);
  const timestamp = Timestamp.fromDate(dateObject);
  return timestamp;
};

export const timestampToDate = (timestamp: Timestamp) => {
  const timeToDate = timestamp.toDate();
  return format(timeToDate, 'yyyy-MM-dd');
};

export const formatSeconds = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const formattedDate = format(date, 'yyyy-MM-dd');
  return formattedDate;
};

export const convertStringToTimestamp = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  return Timestamp.fromDate(date);
};
