import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, UserProfileType } from "@/utils/types";

/**
 * Authentication State Interface
 */
interface AuthState {
  access: string | null;
  refresh: string | null;
  user: UserType | null;
  userProfile: UserProfileType | null;
}

/**
 * Token Payload Interface
 */
interface TokenPayload {
  access: string;
  refresh: string;
}

// User and userProfile will be rehydrated by redux-persist
const initialState: AuthState = {
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
    setAuthTokens: (state, action: PayloadAction<TokenPayload>) => {
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
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    // Action to set user profile information
    setUserProfile: (state, action: PayloadAction<UserProfileType>) => {
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
