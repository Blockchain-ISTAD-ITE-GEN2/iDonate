import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

const initialState = {
    token: null as string | null,
    verifyToken: null as string | null,
    resendToken: null as string | null,
    forgetToken: null as string | null,
    email: null as string | null,
    userUuid: null as string | null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setVerifyToken: (state, action: PayloadAction<string>) => {
            state.verifyToken = action.payload;
        },
        setResendToken: (state, action: PayloadAction<string>) => {
            state.resendToken = action.payload;
        },
        setForgotToken: (state, action: PayloadAction<string>) => {
            state.forgetToken = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.userUuid = action.payload;
        }
    },
});

export const { setToken, setVerifyToken, setResendToken, setForgotToken, setEmail, setUser } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;
export const selectVerifyToken = (state: RootState) => state.auth.verifyToken;
export const selectResendToken = (state: RootState) => state.auth.resendToken;
export const selectForgetToken = (state: RootState) => state.auth.forgetToken;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUser = (state: RootState) => state.auth.userUuid;