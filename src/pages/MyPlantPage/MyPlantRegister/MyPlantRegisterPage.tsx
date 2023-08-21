import './myPlantRegisterPage.scss';
import xIcon from '@/assets/images/icons/my_plant_regi_x_icon.png';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';
import inputGlass from '@/assets/images/icons/my_plant_input_glass.png';
import calenderIcon from '@/assets/images/icons/my-plant-calender_icon.png';

const MyPlantRegisterPage = () => {
  return (
    <>
      <div className="plant_register_head">
        <p>식물 등록</p>
        <img src={xIcon} alt="xIcon" />
      </div>
      <div className="my_plant_registeration_container">
        <div className="my_plant_register_img_box">
          <div className="img_wrapper">
            <img className="main_img" src={samplePlant1} alt="samplePlant1" />
            <div className="edit_icon_wrapper">
              <img
                className="edit_icon"
                src={myPlantImgEditIcon}
                alt="editIcon"
              />
            </div>
          </div>
        </div>
        <div className="my_plant_input_box">
          <p className="my_plant_input_title">식물선택</p>
          <div className="my_plant_input_wrapper">
            <input
              className="my_plant_input"
              type="text"
              placeholder="식물 이름으로 검색해보세요."
            />
            <img src={inputGlass} alt="inputGlass" />
          </div>
        </div>
        <div className="my_plant_info_form">
          <p className="my_plant_name_title">식물이름</p>
          <p className="my_plant_name">쑥쑥이</p>
          <p className="watering_frequency">물 주는 날</p>
          <div className="watering_frequency_input_box">
            <p className="watering_frequency_input">7</p>
            <p className="watering_frequency_info">일에 한 번</p>
          </div>
          <p className="my_plant_register_small_title">마지막 물준 날</p>
          <div className="my_plant_register_calender_value">
            <p>2023-08-07</p>
            <img src={calenderIcon} alt="calender" />
          </div>
          <p className="my_plant_register_small_title">식물과 처음 함께한 날</p>
          <div className="my_plant_register_calender_value">
            <p>2023-06-07</p>
            <img src={calenderIcon} alt="calender" />
          </div>
        </div>
      </div>
      <p className="my_plant_register_btn">등록</p>
    </>
  );
};

export default MyPlantRegisterPage;
