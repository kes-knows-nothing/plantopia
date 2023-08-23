import { useState, useEffect } from 'react';
import { storage } from '@/utils/firebaseApp';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';


const SectionPhoto: React.FC<{ userId: string }> = ({ userId }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [imgUrls, setImgUrls] = useState<{ backgroundImage: string }[]>([]);
  const [previewImgs, setPreviewImgs] = useState<{ backgroundImage: string }[]>(
    [],
  );
  const [currentCount, setCurrentCount] = useState(0);

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

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files[0];
    if (!file) return;
  
    try {
      const previewUrl = await readFileAsDataURL(file);
      setPreviewImgs([
        ...previewImgs,
        { backgroundImage: `url(${previewUrl})` },
      ]);
      setCurrentCount(currentCount + 1);
  
      const storagePath = `diary_images/${userId}/${file.name}`;
      const imageRef = ref(storage, storagePath); 
  
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImgUrls([...imgUrls, { backgroundImage: `url(${url})` }]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  
    event.target.value = null;
  };

  const handleDeleteFile = async (index: number) => {
    const imageUrlToDelete = imgUrls[index].backgroundImage;
    const fileName = getImageFileName(imageUrlToDelete);

    const imageRef = ref(storage, fileName);

    try {
      const updatedPreviewImgs = previewImgs.filter((_, i) => i !== index);
      setPreviewImgs(updatedPreviewImgs);
      setCurrentCount(currentCount - 1);

      await deleteObject(imageRef);

      const updatedImgUrls = imgUrls.filter((_, i) => i !== index);
      setImgUrls(updatedImgUrls);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const getImageFileName = (imageUrl: string) => {
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    return decodeURIComponent(fileName);
  };

  const readFileAsDataURL = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
        {previewImgs.map((url, index) => (
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
              ></button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SectionPhoto;
