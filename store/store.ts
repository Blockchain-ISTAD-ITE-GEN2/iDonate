import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import signUpReducer from './slices/registerSlice'

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

