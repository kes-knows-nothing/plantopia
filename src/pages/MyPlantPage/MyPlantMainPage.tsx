import './myPlantMainPage.scss';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ellipseImage from './img/Ellipse_200.png';
import plusIcon from '@/assets/images/icons/ph_plus-light.png';
import MyPlantList from '@/pages/MyPlantPage/components/SubPlantList';

const dummyData = [
  {
    name: '이상혁',
    mainPlantName: '쑥쑥이',
    imgUrl: ellipseImage,
  },
];

const MyPlantMainPage = () => {
  return (
    <>
      <Header />
      <p className="my_plant_info_message">
        <span className="username">{dummyData[0].name}</span>님의 식물을 한눈에
        보기!
      </p>
      <div className="main_plant_info_box">
        <div className="main_plant_main_data">
          <p className="main_plant_head">메인 식물</p>
          <img
            className="main_plant_img"
            src={dummyData[0].imgUrl}
            alt="mainPlantImg"
          />
          <p className="main_plant_name">{dummyData[0].mainPlantName}</p>
        </div>
        <p className="plant_plus_btn">
          <img src={plusIcon} alt="plusIcon" className="plant_plus_icon" />
          식물 등록
        </p>
        <MyPlantList />
      </div>

      <Footer />
    </>
  );
};

export default MyPlantMainPage;
