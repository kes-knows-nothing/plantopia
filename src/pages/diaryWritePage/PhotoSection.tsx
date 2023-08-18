import React, { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { TbCameraPlus } from 'react-icons/tb';
import { RiCloseFill } from 'react-icons/ri';
import 'swiper/css';
import 'swiper/css/navigation';
import './photoSection.scss';

const PhotoSection = () => {
  const [slidesPerView, setSlidesPerView] = useState(window.innerWidth > 768 ? 4 : 3.5);
  const [slides, setSlides] = useState([]);
  const [isFileAttached, setIsFileAttached] = useState(false);
  const uploadButtonRef = useRef(null);

  const handleFileSelect = useCallback(event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const backgroundImage = `url(${e.target.result})`;
        const updatedSlides = [{ backgroundImage }];
        setSlides(updatedSlides);
        uploadButtonRef.current.style.backgroundImage = backgroundImage;
        setIsFileAttached(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDeleteFile = useCallback(() => {
    setSlides([]);
    uploadButtonRef.current.style.backgroundImage = '';
    setIsFileAttached(false);
  }, []);

  return (
    <section className="photo_section">
      <Swiper
        className="photo_select_swiper"
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={0}
      >
        <SwiperSlide className="slide">
          <button className="upload_button" ref={uploadButtonRef}>
            <label htmlFor="photoInput" className="photo_label">
              <div className="photo_text">
                {!isFileAttached && (
                  <>
                    <TbCameraPlus className="camera_icon" />
                    <div className="photo_counter">
                      <span className="current_count">0</span>
                      <span>/</span>
                      <span className="max_count">4</span>
                    </div>
                  </>
                )}
              </div>
            </label>
            <input
              className="photo_input"
              id="photoInput"
              accept="image/*"
              type="file"
              onChange={handleFileSelect}
            />
            {isFileAttached && <div className="main_photo">대표사진</div>}
          </button>
          {isFileAttached && (
            <button className="photo_delete_btn" onClick={handleDeleteFile}>
              <RiCloseFill />
            </button>
          )}
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default PhotoSection;
