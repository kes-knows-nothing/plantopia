import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import { Timestamp } from 'firebase/firestore';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './diaryDetailPage.scss';
import { db } from '@/firebaseApp';
import {
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

interface DiaryData {
  imgUrls?: string[];
  title: string;
  tags: string[];
  content: string;
  postedAt: Timestamp;
}

const DiaryDetailPage = () => {
  const { docId } = useParams();
  if (!docId) {
    return;
  }
  const slideSectionPrevBtn = useRef<HTMLDivElement>(null);
  const slideSectionNextBtn = useRef<HTMLDivElement>(null);

  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);

  useEffect(() => {
    const fetchDiaryData = async () => {
      const docRef = doc(db, 'diary', docId);
      const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
      if (docSnap.exists()) {
        setDiaryData(docSnap.data() as DiaryData);
      } else {
        console.log('Document does not exist');
      }
    };

    fetchDiaryData();
  }, [docId]);

  return (
    <>
      <HeaderBefore ex={false} title="다이어리" />
      <main className="diary_detail_page">
        <div className="diary_detail_container">
          {diaryData && diaryData.imgUrls && diaryData.imgUrls.length > 0 && (
            <section className="slide_section">
              <Swiper
                className="diary_img_swiper swiper "
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                onInit={swiper => {
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
              >
                {diaryData.imgUrls.map((imgUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="slide_container">
                      <img
                        src={imgUrl}
                        className="slide_img"
                        alt="슬라이드 이미지"
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper_nav">
                  <div
                    ref={slideSectionPrevBtn}
                    className="swiper_nav_prev nav_btn"
                  >
                    <div className="prev_btn"></div>
                  </div>
                  <div
                    ref={slideSectionNextBtn}
                    className="swiper_nav_next nav_btn"
                  >
                    <div className="next_btn"></div>
                  </div>
                </div>
              </Swiper>
            </section>
          )}

          <section className="content_section inner">
            <h5 className="diary_title">{diaryData?.title}</h5>
            <div className="plant_list">
              {diaryData?.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
            <div className="text_wrap">
              <p className="diary_text">{diaryData?.content}</p>
              <p className="diary_date">
                {diaryData?.postedAt?.toDate().toLocaleDateString()}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DiaryDetailPage;
