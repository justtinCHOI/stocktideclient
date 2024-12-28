import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCash, deleteCash, getCashList, updateCash } from '@api/accountApi.js';
import { getLocalStorage, setLocalStorage } from '@utils/localStorageUtil.tsx';
import { Cash } from '@typings/entity'; // localStorage 유틸리티 파일로 변경

const LOCAL_STORAGE_KEY = 'cashState';

const initState: CashSliceState = {
    cashList: [],
    cashId: 0
};

export interface CashSliceState {
    cashList: Cash[];
    cashId: number;
}

// LocalStorage에서 초기 상태를 로드
const loadInitialState = () => {
    const savedState = getLocalStorage(LOCAL_STORAGE_KEY);
    return savedState !== null ? savedState : initState;
};

export const createCashAsync = createAsyncThunk('createCashAsync', async (memberId: number) => {
    return await createCash(memberId);
});

export const getCashListAsync = createAsyncThunk('getCashListAsync', async (memberId: number) => {
    return await getCashList(memberId);
});

export const deleteCashAsync = createAsyncThunk('deleteCashAsync', async (cashId: number) => {
    return await deleteCash(cashId);
});

interface UpdateCashParam {
    cashId: number;
    money: number;
    dollar: number;
}

export const updateCashAsync = createAsyncThunk('updateCashAsync', async ({ cashId, money, dollar }: UpdateCashParam) => {
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
                state.cashList = state.cashList.filter((cash: Cash) => cash.cashId !== cashId);
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
                const index = state.cashList.findIndex((cash: Cash) => cash.cashId === updatedCash.cashId);
                if (index !== -1) {
                    state.cashList[index] = updatedCash;
                }
                setLocalStorage(LOCAL_STORAGE_KEY, state, 30);
            });
    }
});

export const { setCashList, setCashId } = cashSlice.actions;
export const cashReducer = cashSlice.reducer;
