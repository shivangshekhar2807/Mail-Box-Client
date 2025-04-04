import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token") || "";
const initialEmail = localStorage.getItem("email") || "";
const isUserLoggedIn = !!initialToken;

const AuthSlice = createSlice({
    name: "Auth",
    initialState: {token:initialToken,email:initialEmail,isLoggin:isUserLoggedIn},
    reducers: {
        logginHandler(state,action) {
            state.token = action.payload.token;
            
             state.email = action.payload.email;
            state.isLoggin = true;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("email", action.payload.email);
                
        },
        logoutHandler(state) {
            state.token = '';
            state.email = '';
            state.isLoggin = false;
             localStorage.removeItem("token");
            localStorage.removeItem("email");
        },
        isLogginHandler() {
            
        }
    }
})

export const AuthSliceAction = AuthSlice.actions;

export default AuthSlice;