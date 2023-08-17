import React, { useState } from 'react';
import './DiaryWritePage.scss';
import { TbCameraPlus } from 'react-icons/tb';
import { RiArrowUpSLine, RiArrowDownSLine, RiCloseFill } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import CLOSE from '@/assets/images/icons/close.png';

const PlantSelect = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chosenPlants, setChosenPlants] = useState([]);
  const [isChecked, setIsChecked] = useState({});

  const plantData = [
    { id: 'chk1', value: '식물1' },
    { id: 'chk2', value: '식물2' },
    { id: 'chk3', value: '식물3' },
    { id: 'chk4', value: '식물4' },
    { id: 'chk5', value: '식물5' },
  ];

  function toggleSelect() {
    setIsVisible(prevVisible => !prevVisible);
  }

  function handlePlantSelection(event) {
    const selectedPlant = event.target.value;

    setIsChecked(prevChecked => ({
      ...prevChecked,
      [selectedPlant]: !prevChecked[selectedPlant],
    }));

    if (chosenPlants.includes(selectedPlant)) {
      setChosenPlants(chosenPlants.filter(plant => plant !== selectedPlant));
    } else {
      setChosenPlants([...chosenPlants, selectedPlant]);
    }
  }

  function handleChosenPlantClick(plant) {
    setIsChecked(prevChecked => ({
      ...prevChecked,
      [plant]: false,
    }));

    setChosenPlants(chosenPlants.filter(p => p !== plant));
  }

  return (
    <div className="input_wrapper select">
      <div className="plant_select" onClick={() => toggleSelect()}>
        {chosenPlants.length === 0 ? (
          <div className="choose_text">식물을 선택하세요.</div>
        ) : (
          chosenPlants.map(plant => (
            <div
              key={plant}
              className={`chosen_plant ${isChecked[plant] ? 'checked' : ''}`}
              onClick={() => handleChosenPlantClick(plant)}
            >
              {plant}
              <span>
                <RiCloseFill />
              </span>
            </div>
          ))
        )}
        <div className="arrow_icon">
          {isVisible ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </div>
      </div>

      {isVisible && (
        <ul className="plant_list">
          {plantData.map(plant => (
            <li key={plant.id}>
              <input
                type="checkbox"
                name={plant.id}
                id={plant.id}
                value={plant.value}
                onChange={handlePlantSelection}
                checked={isChecked[plant.value] || false}
              />
              <label htmlFor={plant.id}>{plant.value}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PhotoCounter = () => {
  return (
    <div className="photo-counter">
      <span>0</span>
      <span>/</span>
      <span>4</span>
    </div>
  );
};
const MainPhoto = () => {
  return <div className="main_photo hide">대표사진</div>;
};

const UploadButton = () => {
  return (
    <SwiperSlide className="photo-slide">
      <button className="upload_button">
        <label htmlFor="photoInput" className="photo_label">
          <TbCameraPlus className="camera_icon" />
          <PhotoCounter />
        </label>
        <input
          className="photo_input"
          id="photoInput"
          accept="image/*"
          multiple
          type="file"
        />
      </button>
      <button className="photo_delete_btn">
        <RiCloseFill />
      </button>
      <MainPhoto />
    </SwiperSlide>
  );
};

const DiaryWritePage = () => {
  return (
    <>
      <header className="header">
        <h2>글쓰기</h2>
        <button className="close_button">
          <img src={CLOSE} alt="닫기" />
        </button>
      </header>
      <main className="diary_main">
        <section className="photo_section ">
          <Swiper className="my_swiper" spaceBetween={50} slidesPerView={1}>
            <UploadButton />
            <UploadButton />
            <UploadButton />
            <UploadButton />
          </Swiper>
        </section>
        <section className="board_section">
          <div className="input_wrapper subject_wrapper">
            <input
              type="text"
              placeholder="제목을 작성하세요."
              className="subject"
            />
          </div>
          <PlantSelect />
        </section>
        <button className="button save">저장</button>
      </main>
    </>
  );
};

export default DiaryWritePage;
