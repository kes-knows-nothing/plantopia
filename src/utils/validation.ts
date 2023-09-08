import { errorNoti
 } from './alarmUtil';
export const handleFieldError = (fieldName: string) => {
  if (errors[fieldName]?.message) {
    errorNoti(errors[fieldName]?.message);
    setSaving(false);
    return true; // 에러가 있음을 반환
  }
  return false; // 에러가 없음을 반환
};
