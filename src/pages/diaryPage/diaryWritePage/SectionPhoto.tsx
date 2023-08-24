import React, { useState } from 'react';
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

const SectionPhoto: React.FC<{
  userId: string;
  imgUrls: string[];
  setImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ userId, imgUrls, setImgUrls }) => {
  const [previewImgs, setPreviewImgs] = useState<{ backgroundImage: string }[]>(
    [],
  );
  const [currentCount, setCurrentCount] = useState(0);

  // 파일 선택 처리
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // 미리보기 이미지 URL 생성
      const previewUrl = await readFileAsDataURL(file);
      setPreviewImgs([
        ...previewImgs,
        { backgroundImage: `url(${previewUrl})` },
      ]);
      setCurrentCount(currentCount + 1);

      // 파일을 스토리지에 업로드
      const storagePath = `diary_images/${userId}/${file.name}`;
      const imageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // Add the URL to imgUrls state
      setImgUrls(prevImgUrls => [...prevImgUrls, url]);
    } catch (error) {
      console.error('파일 업로드 에러:', error);
    }

    event.target.value = null;
  };

  // 이미지 삭제 처리
  const handleDeleteFile = async (index: number) => {
    const imageUrlToDelete = imgUrls[index];
    const fileName = getImageFileName(imageUrlToDelete);
    const imageRef = ref(storage, fileName);

    try {
      // 미리보기 이미지 삭제
      const updatedPreviewImgs = previewImgs.filter((_, i) => i !== index);
      setPreviewImgs(updatedPreviewImgs);
      setCurrentCount(currentCount - 1);

      // 스토리지에서 이미지 삭제
      await deleteObject(imageRef);

      // Remove the URL from imgUrls state
      setImgUrls(prevImgUrls => prevImgUrls.filter((_, i) => i !== index));
    } catch (error) {
      console.error('파일 삭제 에러:', error);
    }
  };

  // URL에서 이미지 파일명 추출
  const getImageFileName = (imageUrl: string) => {
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0];
    return decodeURIComponent(fileName);
  };

  // 첨부 파일을 URL로 불러오기
  const readFileAsDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result as string);
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

export default SectionPhoto;
