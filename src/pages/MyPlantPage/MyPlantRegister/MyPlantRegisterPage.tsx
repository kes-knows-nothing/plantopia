import './myPlantRegisterPage.scss';
import xIcon from '@/assets/images/icons/my_plant_regi_x_icon.png';
import samplePlant1 from '@/assets/images/icons/sample_plant1.png';
import myPlantImgEditIcon from '@/assets/images/icons/solar_pen-bold.png';

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
            <img
              className="edit_icon"
              src={myPlantImgEditIcon}
              alt="editIcon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPlantRegisterPage;
