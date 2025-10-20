import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAccessToken } from "@/share/utils/tokenStorage";
import { Customers } from "@/share/types/customersTypes";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    user: Customers | null;
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
        setUser: (state, action: PayloadAction<Customers>) => {
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