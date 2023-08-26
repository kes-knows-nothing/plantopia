import { useRef, useEffect } from 'react';

const GalleryView = ({ diaryData }) => {
  const cardRefs = useRef([]);

  const getMainImage = imgUrls => {
    return `url(${imgUrls[0]})`;
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
          className={`card ${diary.imgUrls.length === 0 ? 'hide' : 'show'} ${
            diary.imgUrls.length > 1 ? 'many' : ''
          }`}
          key={index}
          ref={cardElement => (cardRefs.current[index] = cardElement)}
          style={{ backgroundImage: getMainImage(diary.imgUrls) }}
        ></div>
      ))}
    </div>
  );
};

export default GalleryView;
