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

// 이미지파일
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

/* DiaryWritePage - SectionBoard */
import ARROW_UP from '@/assets/images/icons/diary_arrow_up.png';
import ARROW_DOWN from '@/assets/images/icons/diary_arrow_down.png';

export const ArrowImages = {
  ARROW_UP,
  ARROW_DOWN,
};
