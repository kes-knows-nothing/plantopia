/* DiaryPage */
import { Timestamp } from 'firebase/firestore';

export interface DiaryProps {
  id: string;
  userEmail: string;
  content: string;
  postedAt: Timestamp;
  tags: string[];
  title: string;
  imgUrls: string[];
}

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

/* 수정페이지 */

/* 메인페이지 - 탭 구분 */
import LISTON from '@/assets/images/icons/diary_list_tab_on.png';
import LISTOFF from '@/assets/images/icons/diary_list_tab_off.png';
import GALLERYON from '@/assets/images/icons/diary_gallery_tab_on.png';
import GALLERYOFF from '@/assets/images/icons/diary_gallery_tab_off.png';

export const DiaryImages = {
  LISTON,
  LISTOFF,
  GALLERYON,
  GALLERYOFF,
};

/* 글쓰기 페이지 - 식물선택 */
import ARROW_UP from '@/assets/images/icons/diary_arrow_up.png';
import ARROW_DOWN from '@/assets/images/icons/diary_arrow_down.png';

export const ArrowImages = {
  ARROW_UP,
  ARROW_DOWN,
};

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
