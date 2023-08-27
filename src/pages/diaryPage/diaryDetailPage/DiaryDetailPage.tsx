import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//주석
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './diaryDetailPage.scss';
import { db } from '@/utils/firebaseApp';
import { doc, getDoc } from 'firebase/firestore';

const DiaryDetailPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const slideSectionPrevBtn = useRef();
  const slideSectionNextBtn = useRef();

  const [diaryData, setDiaryData] = useState(null);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchDiaryData = async () => {
      const docRef = doc(db, 'diary', docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDiaryData(docSnap.data());
      } else {
        console.log('Document does not exist');
      }
    };

    fetchDiaryData();
  }, [docId]);

  return (
    <main className="diary_detail_page">
      <div className="diary_detail_container">
        <div className="sub_header">
          <button className="header_btn back" onClick={goBack}>
            <HiOutlineArrowLeft />
          </button>
          <strong>다이어리</strong>
          <button className="header_btn more"></button>
        </div>
        <section className="slide_section">
          {diaryData && (
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
                swiper.params.navigation.prevEl = slideSectionPrevBtn.current;
                swiper.params.navigation.nextEl = slideSectionNextBtn.current;
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
          )}
        </section>
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
  );
};

export default DiaryDetailPage;
