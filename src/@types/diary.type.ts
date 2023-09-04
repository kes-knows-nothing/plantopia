import { Timestamp } from 'firebase/firestore';

/* 다이어리 공통 */
export interface DiaryProps {
  id: string;
  userEmail: string;
  content: string;
  postedAt: Timestamp;
  tags: string[];
  title: string;
  imgUrls: string[];
}

/* 다이어리 메인 페이지 */
export interface ListViewProps {
  diaryData: DiaryProps[];
  handleDelete: (diaryId: string) => void;
}

/* 상세페이지 */
export interface DiaryDetailProps {
  diaryData: DiaryProps[];
  handleDelete: (diaryId: string) => void;
}

/* 글쓰기페이지 - 글작성 */
export interface SectionBoardProps {
  state: {
    title: string;
    content: string;
    saving: boolean;
    isVisible: boolean;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      saving: boolean;
      isVisible: boolean;
    }>
  >;
  chosenPlants: string[];
  toggleSelect(): void;
  handleChosenPlantClick(plant: string): void;
  handlePlantSelection(event: React.ChangeEvent<HTMLInputElement>): void;
  plantTag: Plant[];
}

export interface Plant {
  nickname: string;
  userEmail: string;
}

/* 글 수정 페이지 - Board */
export interface SectionEditBoardProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  chosenPlants: string[];
  handleChosenPlantClick: (plant: string) => void;
  handlePlantSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isVisible: boolean;
  toggleSelect: () => void;
  plantTag: Plant[];
}
