import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/Authslice";
import emailReducer from "./auth/Emailslice";
import eventReducer from "./auth/EventSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        emailCheck:emailReducer,
        event:eventReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;