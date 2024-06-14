import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { enqueueSnackbar } from 'notistack';
import axios from "axios";

interface iApiResponse {
    loading: boolean,
    data: any,
    error: any
}

interface iLoginData {
    email: string,
    password: string
}

interface iRegisterData {
    role: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

interface StateType {
    RegisterData: iApiResponse;
    loginData: iApiResponse;
    userData: iApiResponse;
    userSearch: iApiResponse;
}

const initialState: StateType = {
    RegisterData: {
        loading: false,
        data: {},
        error: null,
    },
    loginData: {
        loading: false,
        data: {},
        error: null,
    },
    userData: {
        loading: false,
        data: {},
        error: null,
    },
    userSearch: {
        loading: false,
        data: {},
        error: null,
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        RegisterLoading: (state) => {
            state.RegisterData.loading = true;
        },
        RegisterSuccess: (state, action) => {
            state.RegisterData.loading = false;
            state.RegisterData.data = action.payload;
        },
        RegisterFailed: (state, action) => {
            state.RegisterData.loading = false;
            state.RegisterData.error = action.payload;
        },
        loginLoading: (state) => {
            state.loginData.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loginData.loading = false;
            state.loginData.data = action.payload;
        },
        loginFailed: (state, action) => {
            state.loginData.loading = false;
            state.loginData.error = action.payload;
        },
        userLoading: (state) => {
            state.userData.loading = true;
        },
        userSuccess: (state, action: PayloadAction<any>) => {
            state.userData.loading = false;
            state.userData.data = action.payload;
        },
        userFailed: (state, action: PayloadAction<any>) => {
            state.userData.loading = false;
            state.userData.error = action.payload;
        },
        usersearchLoading: (state) => {
            state.userSearch.loading = true;
        },
        usersearchSuccess: (state, action: PayloadAction<any>) => {
            state.userSearch.loading = false;
            state.userSearch.data = action.payload;
        },
        usersearchFailed: (state, action: PayloadAction<any>) => {
            state.userSearch.loading = false;
            state.userSearch.error = action.payload;
        },
    }
});

export const { RegisterLoading, RegisterSuccess, RegisterFailed, loginLoading, loginSuccess, loginFailed, userLoading, userSuccess, userFailed, usersearchLoading, usersearchSuccess, usersearchFailed } = authSlice.actions;

export const Register = (data: iRegisterData) => async (dispatch: AppDispatch) => {
    dispatch(RegisterLoading());
    try {
        const token = window.localStorage.getItem('token');
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(RegisterSuccess(response.data));
        enqueueSnackbar("Successfully Login", { variant: 'success' });
    }
    catch (error: any) {
        const errorMessage = error.response?.data.result;
        dispatch(loginFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}

export const login = (data: iLoginData) => async (dispatch: AppDispatch) => {
    dispatch(loginLoading());
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,data);
        dispatch(loginSuccess(response.data));

        const token = response.data.token;

        window.localStorage.setItem('token', token);

        await dispatch(getUserData(token));

        enqueueSnackbar("Successfully Login", { variant: 'success' });

    } catch (error: any) {
        const errorMessage = error.response?.data.result;
        dispatch(loginFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
};

export const getUserData = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(userLoading());
    try {
        const profileResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(userSuccess(profileResponse.data));
    } catch (error: any) {
        dispatch(userFailed(error.message));
        enqueueSnackbar("Failed to fetch user data", { variant: 'error' });
    }
};

export const getuserAllData = (roles: string, first_name: string) => async (dispatch: AppDispatch) => {

    dispatch(usersearchLoading());

    try {
        let query = ``;

        if (roles) {
            query += `?roles=${roles}`;
        }

        if (first_name) {
            query += `&first_name=${first_name}`;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get/search${query}`);
        dispatch(usersearchSuccess(response?.data?.users));
    }
    catch (error: any) {
        const errorMessage = error.response?.data?.result || "Something went wrong";
        dispatch(usersearchFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}


export const UpdateUserData = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get/edit/${data?._id}`, data, {
            headers: { platform: "web", "app-user": "admin" },
        });

        enqueueSnackbar(response.data?.users, { variant: "success" });

        return response;

    } catch (error: any) {
        const errorMessage = error.response?.data?.result || "Something went wrong";
        dispatch(usersearchFailed(errorMessage));
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
};


export const DeleteUserData = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get/delete/${data}`)
        enqueueSnackbar(response.data?.result, { variant: "success" });
        return response;
    } catch (error: any) {
        const errorMessage = error.response?.data?.result;
        console.log(errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
};


export default authSlice.reducer;




