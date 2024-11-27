import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import errorInfoReducer from '../slices/errorInfoSlice';
import { baseApi } from '../api/baseApi';
import { errorMiddleware } from '../middleware/errorMiddleware';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  errorInfo: errorInfoReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false,}).concat(baseApi.middleware, errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;