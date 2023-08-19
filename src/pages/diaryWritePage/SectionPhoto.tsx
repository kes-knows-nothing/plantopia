import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { TbCameraPlus } from 'react-icons/tb';
import { RiCloseFill } from 'react-icons/ri';
import 'swiper/css';
import 'swiper/css/navigation';

const SectionPhoto = () => {
  const [slidesPerView, setSlidesPerView] = useState(3.5);
  const [slides, setSlides] = useState(
    new Array(4).fill({ backgroundImage: '' }),
  );
  const uploadButtonRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth > 768 ? 4 : 3.5);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFileSelect = useCallback(
    (event, index) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          const backgroundImage = `url(${e.target.result})`;
          const updatedSlides = [...slides];
          updatedSlides[index] = { backgroundImage };
          uploadButtonRefs.current[index].style.backgroundImage =
            backgroundImage;
          setSlides(updatedSlides);
        };
        reader.readAsDataURL(file);
      }
      event.target.value = null;
    },
    [slides],
  );

  const handleDeleteFile = useCallback(
    index => {
      const updatedSlides = [...slides];
      updatedSlides[index] = { backgroundImage: '' };
      setSlides(updatedSlides);
      uploadButtonRefs.current[index].style.backgroundImage = '';
    },
    [slides],
  );

  return (
    <section className="photo_section">
      <Swiper
        className="photo_select_swiper"
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={0}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={`slide ${index === 0 ? 'first_slide' : ''}`}
          >
            <button
              className={`upload_button ${
                slide.backgroundImage ? 'attached' : ''
              }`}
              ref={el => (uploadButtonRefs.current[index] = el)}
            >
              <label htmlFor={`photoInput-${index}`} className="photo_label">
                <div className="photo_text">
                  {!slide.backgroundImage && (
                    <>
                      <TbCameraPlus className="camera_icon" />

                      <div className="photo_counter hide">
                        <span className="current_count">{index}</span>
                        <span>/</span>
                        <span className="max_count">4</span>
                      </div>
                    </>
                  )}
                </div>
              </label>
              <input
                className="photo_input"
                id={`photoInput-${index}`}
                accept="image/*"
                type="file"
                onChange={e => handleFileSelect(e, index)}
              />
              {index === 0 && slide.backgroundImage && (
                <div className="main_photo">대표사진</div>
              )}
            </button>
            {slide.backgroundImage && (
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
