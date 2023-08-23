import { useRef, useEffect } from 'react';
import diaryData from './diaryData.tsx';
import { Link } from 'react-router-dom';

const GalleryView = () => {
  const cardRefs = useRef([]);

  const getMainImage = diary => {
    if (diary.imgUrl.length > 0) {
      return `url(${diary.imgUrl[0]})`;
    } else {
      return 'none';
    }
  };

  useEffect(() => {
    cardRefs.current.forEach(cardRef => {
      const width = cardRef.offsetWidth;
      cardRef.style.height = `${width}px`;
    });
  }, []);

  return (
    <div className="gallery_view">
      {diaryData.map((diary, index) => (
        <div
          className={`card ${diary.imgUrl.length === 0 ? 'hide' : ''} ${
            diary.imgUrl.length > 1 ? 'many' : ''
          }`}
          key={index}
          ref={cardElement => (cardRefs.current[index] = cardElement)}
          style={{ backgroundImage: getMainImage(diary) }}
        ></div>
      ))}
    </div>
  );
};

export default GalleryView;
