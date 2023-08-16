import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender.scss';

type ValuePiece = Date | null;

const CalenderPage = () => {
  const [value, onCalChange] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    new Date(),
  );

  return (
    <main className="calendar_page">
      <section className="calendar_wrap">
        <Calendar onChange={onCalChange} value={value} />
      </section>
    </main>
  );
};
export default CalenderPage;
