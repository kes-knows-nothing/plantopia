export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

/* 서울시청 위치의 기본 값 */
const defaultCoords: Coordinates = {
  latitude: 37.5667,
  longitude: 126.978,
};

export const getGeolocation: () => Promise<Coordinates> = () =>
  new Promise(resolve => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          resolve({ latitude, longitude });
        },
        () => {
          /* 유저가 위치 정보 수집을 거부하는 등의 이유로 에러가 발생한 경우 */
          resolve(defaultCoords);
        },
      );
    } else {
      /* 위치 정보 서비스를 지원하지 않는 환경인 경우 */
      resolve(defaultCoords);
    }
  });
