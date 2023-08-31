import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { DiaryProps } from '@/@types/diary.type';
import NoContent from './NoContent.tsx';
import './galleryView.scss';

interface GalleryViewProps {
  diaryData: DiaryProps[];
}

const GalleryView: React.FC<GalleryViewProps> = ({ diaryData }) => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const getMainImage = (imgUrls: string[]) => {
    return `url(${imgUrls[0]})`;
  };

  return (
    <>
      {diaryData.length === 0 ||
      diaryData.every(diary => diary.imgUrls.length === 0) ? (
        <NoContent />
      ) : (
        <div className="gallery_view">
          {diaryData.map((diary, index) => (
            <Link
              to={`/diary/${diary.id}`}
              key={index}
              style={{ backgroundImage: getMainImage(diary.imgUrls) }}
              className={`card ${
                diary.imgUrls.length === 0 ? 'hide' : 'show'
              } ${diary.imgUrls.length > 1 ? 'many' : ''}`}
            >
              <div
                ref={cardElement => (cardRefs.current[index] = cardElement!)}
              ></div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default GalleryView;
