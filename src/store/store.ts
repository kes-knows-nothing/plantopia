/**
 * production 레벨에서 Redux devTools를 숨기려면 배포 시
 * 환경 변수의 NODE_ENV의 값을 "production" 으로 꼭 등록해주어야 함.
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {},
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;

export default store;
