import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/features/auth/authSlice";
import { idonateApi } from "@/redux/api";

// create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [idonateApi.reducerPath]: idonateApi.reducer,
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(idonateApi.middleware), // Add RTK Query middleware
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
