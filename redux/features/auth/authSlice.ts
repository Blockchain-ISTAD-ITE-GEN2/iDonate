import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "@/redux/store";
import axios from 'axios';

interface AuthState {
  token: string | null;
  verifyToken: string | null;
  resendToken: string | null;
  forgetToken: string | null;
  email: string | null;
  userUuid: string | null;
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  verifyToken: null,
  resendToken: null,
  forgetToken: null,
  email: null,
  userUuid: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/google', { token });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to login with Google');
    }
  }
);

export const loginWithFacebook = createAsyncThunk(
  'auth/loginWithFacebook',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/facebook', { token });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to login with Facebook');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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
  },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithFacebook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setToken, setResendToken, setForgotToken, setEmail, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectVerifyToken = (state: RootState) => state.auth.verifyToken;
export const selectResendToken = (state: RootState) => state.auth.resendToken;
export const selectForgetToken = (state: RootState) => state.auth.forgetToken;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUser = (state: RootState) => state.auth.userUuid;
