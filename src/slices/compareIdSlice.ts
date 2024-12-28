import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from '@utils/localStorageUtil.tsx';

const LOCAL_STORAGE_KEY = 'compareId';

// LocalStorage에서 초기 상태를 로드합니다.
const loadInitialState = () => {
  const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
  return savedState !== null ? savedState : 6; // 초기 상태가 없으면 기본값 6를 사용합니다.
};

const compareChartSlice = createSlice({
  name: "compareId",
  initialState: loadInitialState(),
  reducers: {
    changeCompareId: (state, action) => {
      if (!action.payload) return state;
      setLocalStorage(LOCAL_STORAGE_KEY, action.payload, 30); // 30일 동안 유효한 상태로 저장
      return {
        ...state,
        ...action.payload.email,
      };
    },
  },
});

export const { changeCompareId } = compareChartSlice.actions;
export const compareChartReducer = compareChartSlice.reducer;
