import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import baseApi from "../services/baseApi";

const persistConfig = {
  key: "root",
  storage,
};

// use persistReducer to persist states across refreshes
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice.reducer,
    products: productSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

// export type RootState = ReturnType<typeof persistedReducer>;
// export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
