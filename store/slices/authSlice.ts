import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";

export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (result?.error) {
        return rejectWithValue(result.error);
      }
      return result;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  },
);

export const loginWithSocialProvider = createAsyncThunk(
  "auth/loginWithSocialProvider",
  async (provider: "google" | "facebook", { rejectWithValue }) => {
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        return rejectWithValue(result.error);
      }
      return result;
    } catch (error) {
      return rejectWithValue(`Failed to login with ${provider}`);
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut({ redirect: false });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithCredentials.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithSocialProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithSocialProvider.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginWithSocialProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
