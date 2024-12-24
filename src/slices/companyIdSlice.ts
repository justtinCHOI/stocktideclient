import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@utils/localStorageUtil.tsx"; // localStorage 유틸리티 파일로 변경

const LOCAL_STORAGE_KEY = 'companyId';

// LocalStorage에서 초기 상태를 로드합니다.
const loadInitialState = () => {
    const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
    return savedState !== null ? savedState : 5; // 초기 상태가 없으면 기본값 5를 사용합니다.
};

const companyIdSlice = createSlice({
    name: "companyId",
    initialState: loadInitialState(),
    reducers: {
        changeCompanyId: (state, action) => {
            const newState = action.payload;
            setLocalStorage(LOCAL_STORAGE_KEY, newState, 30); // 30일 동안 유효한 상태로 저장
            return newState;
        },
    },
});

export const { changeCompanyId } = companyIdSlice.actions;
export const companyIdReducer = companyIdSlice.reducer;
export default companyIdSlice.reducer;
