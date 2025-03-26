import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, AuthType } from "../../utils/types";

const initialState: AuthType = { access: null, refresh: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: AuthType,
      action: PayloadAction<{ access: string; refresh: string }>,
    ) {
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
      if (state.access) {
        localStorage.setItem("access", state.access);
      }
      if (state.refresh) {
        localStorage.setItem("refresh", state.refresh);
      }
    },
    setUser(state: AuthType, action: PayloadAction<UserType>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout(state: AuthType) {
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

export const { setAuthTokens, setUser, logout } = authSlice.actions;

export default authSlice;