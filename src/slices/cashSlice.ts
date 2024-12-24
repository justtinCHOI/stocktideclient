import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createCash, deleteCash, getCashList, updateCash} from "@api/accountApi.js";
import {getLocalStorage, setLocalStorage} from "@utils/localStorageUtil.tsx"; // localStorage 유틸리티 파일로 변경

const LOCAL_STORAGE_KEY = 'cashState';

const initState = {
    cashList: [],
    cashId: ''
};

// LocalStorage에서 초기 상태를 로드합니다.
const loadInitialState = () => {
    const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
    return savedState !== null ? savedState : initState;
};

export const createCashAsync = createAsyncThunk('createCashAsync', async (memberId) => {
    const response = await createCash(memberId);
    return response;
});

export const getCashListAsync = createAsyncThunk('getCashListAsync', async (memberId) => {
    const response = await getCashList(memberId);
    return response;
});

export const deleteCashAsync = createAsyncThunk('deleteCashAsync', async (cashId) => {
    const response = await deleteCash(cashId);
    return response;
});

export const updateCashAsync = createAsyncThunk('updateCashAsync', async ({ cashId, money, dollar }) => {
    return await updateCash(cashId, money, dollar);
});

const cashSlice = createSlice({
    name: 'cash',
    initialState: loadInitialState(),
    reducers: {
        setCashList: (state, action) => {
            state.cashList = action.payload;
            if (action.payload.length > 0) {
                state.cashId = action.payload[0].cashId;
            }
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
        setCashId: (state, action) => {
            state.cashId = action.payload;
            setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCashAsync.fulfilled, (state, action) => {
                state.cashList.push(action.payload);
                if (state.cashList.length === 1) {
                    state.cashId = action.payload.cashId;
                }
                setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
            })
            .addCase(getCashListAsync.fulfilled, (state, action) => {
                state.cashList = action.payload;
                if (action.payload.length > 0) {
                    state.cashId = action.payload[0].cashId;
                }
                setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
            })
            .addCase(deleteCashAsync.fulfilled, (state, action) => {
                const cashId = action.payload;
                state.cashList = state.cashList.filter(cash => cash.cashId !== cashId);
                if (state.cashList.length === 0) {
                    state.cashId = '';
                } else if (cashId === state.cashId) {
                    state.cashId = state.cashList[0].cashId;
                }
                setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
            })
            .addCase(updateCashAsync.fulfilled, (state, action) => {
                const updatedCash = action.payload;
                console.log("updateCashAsync updatedCash : ", updatedCash)
                const index = state.cashList.findIndex(cash => cash.cashId === updatedCash.cashId);
                if (index !== -1) {
                    state.cashList[index] = updatedCash;
                }
                setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
            });
    }
});

export const { setCashList, setCashId } = cashSlice.actions;

export default cashSlice.reducer;
