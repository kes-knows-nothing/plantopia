import { Children, useState } from 'react';
import HeaderBefore from '@/components/headerBefore/HeaderBefore';
import Footer from '@/components/footer/Footer';
import CHROME_IMG from '@/assets/images/pwa_chrome.png';
import IOS_IMG from '@/assets/images/pwa_ios.png';
import ANDROID_IMG from '@/assets/images/pwa_android.png';
import BTN_DOWN from '@/assets/images/icons/button_down.png';
import BTN_UP from '@/assets/images/icons/button_up.png';
import './guidePage.scss';

const NotiPage = () => {
  const [isDroppedChrome, setIsDroppedChrome] = useState(false);
  const [isDroppedIOS, setIsDroppedIOS] = useState(false);
  const [isDroppedAndroid, setIsDroppedAndroid] = useState(false);

  const appGuide = [
    {
      title: 'Chrome',
      image: CHROME_IMG,
      isDropped: isDroppedChrome,
      setIsDropped: setIsDroppedChrome,
    },
    {
      title: 'IOS',
      image: IOS_IMG,
      isDropped: isDroppedIOS,
      setIsDropped: setIsDroppedIOS,
    },
    {
      title: 'Android',
      image: ANDROID_IMG,
      isDropped: isDroppedAndroid,
      setIsDropped: setIsDroppedAndroid,
    },
  ];

  return (
    <div className="noti_container">
      <HeaderBefore title="사용 가이드" />
      <main>
        <h2 className="noti_title">플랜토피아를 앱처럼 사용해 보세요!</h2>
        <section className="list_box inner">
          <span className="list_title">기종별 다운로드 방법</span>
          <ul className="list_contents">
            {Children.toArray(
              appGuide.map(({ title, image, isDropped, setIsDropped }) => (
                <li>
                  <button onClick={() => setIsDropped(prev => !prev)}>
                    {title}
                    <img src={isDropped ? BTN_DOWN : BTN_UP} />
                  </button>
                  {isDropped && (
                    <div className="content_wrapper">
                      <img src={image} />
                    </div>
                  )}
                </li>
              )),
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotiPage;
