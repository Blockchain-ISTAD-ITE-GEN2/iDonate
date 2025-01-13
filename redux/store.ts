import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/features/auth/authSlice";
import { idonateApi } from "@/redux/api";
import errorMiddleware from "@/redux/middleware/errorMiddleware";

// Create Store
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [idonateApi.reducerPath]: idonateApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware), // Attach middleware
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


