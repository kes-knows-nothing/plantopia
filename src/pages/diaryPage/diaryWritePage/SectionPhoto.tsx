import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { RiCloseFill } from 'react-icons/ri';
import 'swiper/css';

const SectionPhoto = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [imgUrls, setImgUrls] = useState([]); 
  const [currentCount, setCurrentCount] = useState(0);

  /* 반응형 설정 */
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth > 768 ? 4 : 2.5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFileSelect = event => {
    const file = event.target.files[0];
    if (file && currentCount < 4) {
      const reader = new FileReader();
      reader.onload = e => {
        const backgroundImage = `url(${e.target.result})`;
        const updatedImgUrls = [...imgUrls, { backgroundImage }];
        setImgUrls(updatedImgUrls);
        setCurrentCount(currentCount + 1);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = null;
  };

  const handleDeleteFile = index => {
    const updatedImgUrls = imgUrls.filter((_, i) => i !== index);
    setImgUrls(updatedImgUrls);
    setCurrentCount(currentCount - 1);
  };

  return (
    <section className="photo_section inner">
      {currentCount < 4 && (
        <div className="upload_button_wrapper">
          <button className="upload_button">
            <label htmlFor="photoInput" className="photo_label">
              <div className="photo_counter">
                <span className="current_count">{currentCount}</span>
                <span>/</span>
                <span className="max_count">4</span>
              </div>
            </label>
            <input
              className="photo_input"
              id="photoInput"
              accept="image/*"
              type="file"
              onChange={handleFileSelect}
            />
          </button>
        </div>
      )}
      <Swiper
        className={`photo_select_swiper ${
          currentCount === 4 ? 'full_photo' : ''
        }`}
        modules={[Navigation]}
        slidesPerView={slidesPerView}
      >
        {imgUrls.map((url, index) => (
          <SwiperSlide key={index} className="slide">
            <div
              className={`photo_slide attached`}
              style={{
                backgroundImage: url.backgroundImage,
              }}
            >
              {index === 0 && url.backgroundImage && (
                <div className="main_photo">대표사진</div>
              )}
            </div>
            {url.backgroundImage && (
              <button
                className="photo_delete_btn"
                onClick={() => handleDeleteFile(index)}
              >
                <RiCloseFill />
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SectionPhoto;
