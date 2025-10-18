import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import baseApi from "../services/baseApi";

// Root persist configuration
const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [baseApi.reducerPath], // Exclude API cache from persisting (prevents stale data)
};


const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["access", "refresh"], // Exclude JWT tokens from persisting
};


const productsPersistConfig = {
  key: "products",
  storage,
};


const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  products: persistReducer(productsPersistConfig, productSlice.reducer),
  [baseApi.reducerPath]: baseApi.reducer,
});


const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these actions for serializability check
      },
    }).concat(baseApi.middleware),
});


export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
