import { createSlice } from "@reduxjs/toolkit";

const safeParse = (key: string) => {
  const item = localStorage.getItem(key);
  if (item && item !== "undefined") {
    try {
      return JSON.parse(item);
    } catch {
      return null; // in case JSON is malformed
    }
  }
  return null;
};

const initialState = {
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  user: safeParse("user"),
  userProfile: safeParse("userProfile"),
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
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    // Action to set user profile information
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
    },

    // Action to log out the user and clear authentication state
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("cart");
      localStorage.removeItem("orders");
      Object.assign(state, initialState);
    },
  },
});

// Export actions for use in components
export const { setAuthTokens, setUser, setUserProfile, logout } =
  authSlice.actions;

export default authSlice;
