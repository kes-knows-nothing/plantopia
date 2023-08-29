import POT from '@/assets/images/icons/diary_pot.png';
import './noContent.scss';

const NoContent = () => {
  return (
    <div className="no_content">
      <div>
        <img src={POT} alt="화분 이미지" />
        <p>+ 버튼을 클릭하여 다이어리를 작성해보세요.</p>
      </div>
    </div>
  );
};

export default NoContent;
