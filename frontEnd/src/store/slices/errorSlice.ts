import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorType = "error" | "warning" | "info";

interface ErrorState {
  message: string | null;
  type: ErrorType | null;
  timestamp: number | null;
}

const initialState: ErrorState = {
  message: null,
  type: null,
  timestamp: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{ message: string; type: ErrorType }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.timestamp = Date.now();
    },
    clearError: (state) => {
      state.message = null;
      state.type = null;
      state.timestamp = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;