import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginPost } from "@api/memberApi.js";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@utils/localStorageUtil.tsx";
import { LoginParam } from '@typings/member';

const initState = {
    email: '',
};

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param: LoginParam) => {
    return loginPost(param);
});

const loadMemberLocalStorage = () => {
    const memberInfo = getLocalStorage("member");
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }
    return memberInfo;
};

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberLocalStorage() || initState,
    reducers: {
        login: (state, action) => {
            if (!action.payload) return state;
            console.log('Login reducer payload:', action.payload.email);
            setLocalStorage("member", action.payload, 1);
            return {
                ...state,
                ...action.payload.email,
            };
        },
        logout: () => {
            removeLocalStorage("member");
            return { ...initState };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, ( action) => {
            console.log("fulfilled");
            const payload = action.payload;
            if (!payload.error) {
                setLocalStorage("member", payload, 1);
            }
            return payload;
        })
            .addCase(loginPostAsync.pending, () => {
                console.log("pending");
            })
            .addCase(loginPostAsync.rejected, () => {
                console.log("rejected");
            });
    }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
