import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
    TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
    reducer:{}
})


export default store;