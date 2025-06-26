import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '@/lib/redux/auth/authSlice';
import { rootApi } from '../RTKQuery/api/rootApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
    //   auth: authReducer,
      [rootApi.reducerPath]: rootApi.reducer, // <-- подключаем RTK Query
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootApi.middleware), // <-- middleware RTK Query
  });
};

// Типы для Redux
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];