import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuthState = {
  user: null | object;
  token: null | string;
  isLoading: boolean;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = {
        ...state.user,
        ...user,
      };
      state.token = token || state.token;
      state.isLoading = false;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Manually control loading state
    },
  },
});

export const { setUser, logOut, setLoading } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
