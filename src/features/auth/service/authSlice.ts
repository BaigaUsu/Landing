import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTokens, getAccessToken } from "@/share/utils/tokenStorage";
import { Me } from "@/share/types/me";

interface AuthState {
    isAuthenticated: boolean;
    isAuthInitialized: boolean;
    accessToken: string | null;
    refreshToken?: string | null;
    user: Me | null;
}

const initialState: AuthState = {
    isAuthenticated: !!getAccessToken(),
    isAuthInitialized: false,
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
            state.refreshToken = null;
            state.user = null;
            clearTokens();
        },
        setUser: (state, action: PayloadAction<Me>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setAuthInitialized: (state) => {
            state.isAuthInitialized = true;
        },
        // setAccessToken: (state, action: PayloadAction<string>) => {
        //   state.accessToken = action.payload;
        // },
    },
});

export const { logoutAction, setUser, setAuthInitialized } = authSlice.actions;
export default authSlice.reducer;