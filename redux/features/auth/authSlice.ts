import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import axios from "axios";

type AuthState = {
  token: string | null;
  verifyToken: string | null;
  resendToken: string | null;
  forgetToken: string | null;
  email: string | null;
  userUuid: string | null;
  user: any | null; // This should represent the user object
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
    "auth/loginWithGoogle",
    async (token: string, { rejectWithValue }) => {
      try {
        const response = await axios.post("/api/auth/google", { token });
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to login with Google");
      }
    },
);

export const loginWithFacebook = createAsyncThunk(
    "auth/loginWithFacebook",
    async (token: string, { rejectWithValue }) => {
      try {
        const response = await axios.post("/api/auth/facebook", { token });
        return response.data;
      } catch (error) {
        return rejectWithValue("Failed to login with Facebook");
      }
    },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload ?? null; // Ensure token is either string or null, no undefined
    },
    setVerifyToken: (state, action: PayloadAction<string | undefined>) => {
      state.verifyToken = action.payload ?? null;
    },
    setResendToken: (state, action: PayloadAction<string | undefined>) => {
      state.resendToken = action.payload ?? null;
    },
    setForgotToken: (state, action: PayloadAction<string | undefined>) => {
      state.forgetToken = action.payload ?? null;
    },
    setEmail: (state, action: PayloadAction<string | undefined>) => {
      state.email = action.payload ?? null;
    },
    setUserUuid: (state, action: PayloadAction<string | undefined>) => {
      state.userUuid = action.payload ?? null;
    },
    setUser: (state, action: PayloadAction<any | undefined>) => {
      state.user = action.payload ?? null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<{ status: number; message?: string } | null>) => {
      state.error = action.payload?.message ?? null;  // Use nullish coalescing to avoid undefined
    },
    clearError: (state) => {
      state.error = null;
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


export const {
  logout,
  setToken,
  setResendToken,
  setForgotToken,
  setEmail,
  setUser,
  setLoading,
  setError,
  clearError
} = authSlice.actions;

export default authSlice.reducer;

// Selectors to access parts of the state
export const selectToken = (state: RootState) => state.auth.token;
export const selectVerifyToken = (state: RootState) => state.auth.verifyToken;
export const selectResendToken = (state: RootState) => state.auth.resendToken;
export const selectForgetToken = (state: RootState) => state.auth.forgetToken;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectUser = (state: RootState) => state.auth.user;  // Now selecting the full user object
export const selectUserUuid = (state: RootState) => state.auth.userUuid;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

