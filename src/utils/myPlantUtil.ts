import 'firebase/firestore';
import { toast, Slide } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { Timestamp } from 'firebase/firestore';
import format from 'date-fns/format';

/**
 * 파이어베이스 Timestamp의 seconds값을 활용하여 yyyy-MM-dd string 값으로 변경시켜줍니다.
 * date-fns 라이브러리의 format 메서드 활용
 * @param {number} seconds Timestamp 타입에서 seconds 키
 * @returns {string} yyyy-MM-dd 형식의 스트링 값
 */
export const secondsToDate = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const formattedDate = format(date, 'yyyy-MM-dd');
  return formattedDate;
};

/**
 * input의 date 타입의 값을 파이어베이스 타임스탬프 값으로 변경시켜줍니다.
 * @param {string} dateString yyyy-MM-dd 형식의 string
 * @returns {Timestamp} 파이어베이스 타임스탬프 타입 객체
 */
export const dateToTimestamp = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  return Timestamp.fromDate(date);
};

export const waterCodeToNumber = (waterCode: string) => {
  switch (waterCode) {
    case 'WC03':
      return 14;
    case 'WC02':
      return 11;
    case 'WC01':
      return 7;
  }
};

export const successNoti = (content: string) => {
  toast.success(content, {
    transition: Slide,
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const errorNoti = (content: string) => {
  toast.error(content, {
    transition: Slide,
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const infoNoti = (content: string) => {
  toast.info(content, {
    transition: Slide,
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

/**
 * 이 함수는 확인 메시지 후 확인 취소에 따라 함수를 정의해줄 수 있습니다.
 * title과 msg는 필수 인자이지만 나머지 두 함수는 필수값이 아닙니다.
 * 함수를 정의하지 않을 경우 아무 동작하지 않습니다.
 * import 'react-confirm-alert/src/react-confirm-alert.css'; 사용 컴포넌트에 필수
 * @param {string} title 대화상자의 제목
 * @param {string} msg 대화상자 안내 메시지
 * @param {() => void} onConfirm 확인 버튼 클릭 시 함수를 정의합니다.
 * @param {() => void} onCancel 취소 버튼 클릭 시 함수를 정의합니다.
 */
export const showAlert = (
  title: string,
  msg?: string,
  onConfirm: () => void = () => {},
  onCancel: () => void = () => {},
) => {
  confirmAlert({
    title: title,
    message: msg,
    buttons: [
      {
        label: '취소',
        className: 'cancel',
        onClick: onCancel,
      },
      {
        label: '확인',
        className: 'confirm',
        onClick: onConfirm,
      },
    ],
    closeOnEscape: false, // 창이 뜨고 esc로 나갈 수 있는 지 여부 false는 못나감.
    closeOnClickOutside: false, // 다른 데 눌러도 대화 상자가 안 닫힘.
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: 'overlay-custom-class-name',
  });
};
