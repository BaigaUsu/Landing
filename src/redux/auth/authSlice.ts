import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/appTypes";
import { getAccessToken } from "@/services/auth/token/tokenStorage";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(),
  accessToken: getAccessToken(),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // setAccessToken: (state, action: PayloadAction<string>) => {
    //   state.accessToken = action.payload;
    // },
  },
});

export const { logoutAction, setUser, } = authSlice.actions;
export default authSlice.reducer;