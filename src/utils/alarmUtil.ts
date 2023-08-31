import 'firebase/firestore';
import { toast, Slide } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

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
    onClickOutside: () => {},
    onKeypressEscape: () => {},
    overlayClassName: 'overlay-custom-class-name',
  });
};
