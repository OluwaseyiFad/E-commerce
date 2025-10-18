import { createSlice } from "@reduxjs/toolkit";


// User and userProfile will be rehydrated by redux-persist
const initialState = {
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  user: null,
  userProfile: null,
};

// Redux slice for authentication state management
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set authentication tokens
    setAuthTokens: (state, action) => {
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
      if (state.access) {
        localStorage.setItem("access", state.access);
      }
      if (state.refresh) {
        localStorage.setItem("refresh", state.refresh);
      }
    },
    // Action to set user information
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to set user profile information
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    // Action to reset authentication state
    resetAuth: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      state.access = null;
      state.refresh = null;
      state.user = null;
      state.userProfile = null;
    },

    // Action to log out the user and clear authentication state
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.user = null;
      state.userProfile = null;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});

export const { setAuthTokens, setUser, setUserProfile, logout, resetAuth } =
  authSlice.actions;

export default authSlice;
