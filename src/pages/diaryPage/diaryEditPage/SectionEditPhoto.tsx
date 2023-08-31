import { useState, useEffect } from 'react';
import { storage } from '@/firebaseApp';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import './sectionEditPhoto.scss';

interface EditPhotoProps {
  imgUrls: string[];
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SectionEditPhoto: React.FC<EditPhotoProps> = ({
  imgUrls,
  setImgUrls,
  setIsLoading,
}) => {
  const [previewImgs, setPreviewImgs] = useState<{ backgroundImage: string }[]>(
    [],
  );
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    setPreviewImgs(imgUrls.map(url => ({ backgroundImage: `url(${url})` })));
    setCurrentCount(imgUrls.length);
  }, [imgUrls]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsLoading(true);
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setCurrentCount(currentCount + 1);

      const storagePath = `diary_images/${cleanFileName(file.name)}`;
      const imageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      setImgUrls(prevImgUrls => [...prevImgUrls, url]);
    } catch (error) {
      return;
    }

    if (event.target instanceof HTMLInputElement) {
      event.target.value = '';
    }

    setIsLoading(false);
  };

  const cleanFileName = (fileName: string) => {
    const cleanedName = fileName.replace(/[^\w\s.-]/gi, '');
    return cleanedName;
  };

  const handleDeleteFile = async (index: number) => {
    setIsLoading(true);
    const imageUrlToDelete = imgUrls[index];
    const fileName = getImageFileName(imageUrlToDelete);
    const imageRef = ref(storage, fileName);

    try {
      const updatedPreviewImgs = previewImgs.filter((_, i) => i !== index);
      setPreviewImgs(updatedPreviewImgs);
      setCurrentCount(currentCount - 1);

      await deleteObject(imageRef);

      setImgUrls(prevImgUrls => prevImgUrls.filter((_, i) => i !== index));
    } catch (error) {
      return;
    }
    setIsLoading(false);
  };

  const getImageFileName = (imageUrl: string) => {
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    return decodeURIComponent(fileName);
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
        slidesPerView={2.5}
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

export default SectionEditPhoto;
