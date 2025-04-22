import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  refresh: null,
  user: null,
  userProfile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
    },

    logout: (state) => {
      // state.user = initialState.user;
      // state.refresh = initialState.refresh;
      // state.access = initialState.access;
      Object.assign(state, initialState);
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});

export const { setAuthTokens, setUser, setUserProfile, logout } =
  authSlice.actions;

export default authSlice;
