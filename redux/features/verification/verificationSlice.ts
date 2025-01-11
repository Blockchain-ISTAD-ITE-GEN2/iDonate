import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VerificationState {
  code: string[];
  timer: number;
  isLoading: boolean;
  error: string | null;
  
}

const initialState: VerificationState = {
  code: ["", "", "", "", "", ""], // Initial state for the 6-digit code
  timer: 30, // Initial timer value
  isLoading: false, // Loading state for API calls
  error: null, // Error message
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    // Update the code array
    setCode: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      state.code[index] = value;
    },

    // Reset the code array
    resetCode: (state) => {
      state.code = ["", "", "", "", "", ""];
    },

    // Update the timer
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error message
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCode, resetCode, setTimer, setLoading, setError } =
  verificationSlice.actions;

export default verificationSlice.reducer;