import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import registerSlice from "@/redux/features/auth/registerSlice";
import errorMiddleware from "@/redux/middleware/errorMiddleware";

const makeStore = configureStore({
  reducer: {
    auth: authReducer,
    register: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware), // Attach middleware
});

// Infer the type of RootState and AppDispatch
export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;

export default makeStore;
