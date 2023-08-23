export type ValuePiece = Date | null;
export type CalendarType = ValuePiece | [ValuePiece, ValuePiece];
export interface TileContentsProps {
  date: Date;
}
