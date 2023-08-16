import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

const CalenderPage = () => {
  const [value, onCalChange] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    new Date(),
  );

  return (
    <div>
      <Calendar onChange={onCalChange} value={value} />
    </div>
  );
};
export default CalenderPage;
