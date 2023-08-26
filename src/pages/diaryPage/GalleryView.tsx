import { Link } from 'react-router-dom';
import { useRef } from 'react';

const GalleryView = ({ diaryData }) => {
  const cardRefs = useRef([]);

  const getMainImage = imgUrls => {
    return `url(${imgUrls[0]})`;
  };

  return (
    <div className="gallery_view">
      {diaryData.map((diary, index) => (
        <Link
          to={`/diary/${diary.id}`}
          key={index}
          style={{ backgroundImage: getMainImage(diary.imgUrls) }}
          className={`card ${diary.imgUrls.length === 0 ? 'hide' : 'show'} ${
            diary.imgUrls.length > 1 ? 'many' : ''
          }`}
        >
          <div
            ref={cardElement => (cardRefs.current[index] = cardElement)}
          ></div>
        </Link>
      ))}
    </div>
  );
};

export default GalleryView;
