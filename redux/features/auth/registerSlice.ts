import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from 'next-auth/react';

interface RegisterState {
  loading: boolean;
  error: string | null;
  currentStep: number;
  success: boolean;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  currentStep: 1,
  success: false,
};

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetRegister: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setStep, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;

