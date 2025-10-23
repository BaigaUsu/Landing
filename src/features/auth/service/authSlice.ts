import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAccessToken, removeAccessToken } from "@/share/utils/tokenStorage";
import { Customers } from "@/share/types/customersTypes";
import { Me } from "@/share/types/me";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: Me | null;
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
        removeAccessToken();
        },
        setUser: (state, action: PayloadAction<Me>) => {
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