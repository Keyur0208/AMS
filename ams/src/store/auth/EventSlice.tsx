import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { enqueueSnackbar } from 'notistack';

interface iApiResponse {
    loading: boolean,
    data: any,
    error: any
}

interface iEventCreated {
    event_date: string | null,
    event_name: String,
    event_des: String
}

interface StateType {
    EventData: iApiResponse;
    ShowEvent: iApiResponse;
}

const initialState: StateType = {
    EventData: {
        loading: false,
        data: {},
        error: null,
    },
    ShowEvent: {
        loading: false,
        data: {},
        error: null,
    }
}

const eventSlice = createSlice({

    name: 'event',
    initialState,
    reducers: {
        EventLoading: (state) => {
            state.EventData.loading = true;
        },
        EventSuccess: (state, action) => {
            state.EventData.loading = false;
            state.EventData.data = action.payload;
        },
        EventFailed: (state, action) => {
            state.EventData.loading = false;
            state.EventData.error = action.payload;
        },
        ShowEventLoading: (state) => {
            state.ShowEvent.loading = true;
        },
        ShowEventSuccess: (state, action) => {
            state.ShowEvent.loading = false;
            state.ShowEvent.data = action.payload;
        },
        ShowEventdFalied: (state, action) => {
            state.ShowEvent.loading = false;
            state.ShowEvent.error = action.payload;
        }
    }
})

export const { EventLoading, EventSuccess, EventFailed, ShowEventLoading, ShowEventSuccess, ShowEventdFalied } = eventSlice.actions;

export const CreateEvent = (data: iEventCreated) => async (dispatch: AppDispatch) => {

    dispatch(EventLoading());

    try {
        const token = window.localStorage.getItem('token');

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/events/create`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(EventSuccess(response.data));
        enqueueSnackbar("Successfully Event Created", { variant: 'success' });
    }
    catch (error: any) {
        const errorMessage = error.response?.data?.result;
        console.log(errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }

}

export const DisplayEvent = () => async (dispatch: AppDispatch) => {

    dispatch(ShowEventLoading());

    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/getAll`);
        dispatch(ShowEventSuccess(response.data?.event));

    }
    catch (error: any) {
        const errorMessage = error.response?.data?.result;
        console.log(errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }

}

export const EditEvent = (data:any) =>async() =>{
    try {
        const token = window.localStorage.getItem('token');
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/events/edit/${data}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        enqueueSnackbar(response.data?.result, { variant: "success" });
        return response;
    }
    catch (error: any) {
        const errorMessage = error.response?.data?.result;
        console.log(errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}

export const DeleteEvent = (data: any) => async () => {

    try {
        const token = window.localStorage.getItem('token');
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/events/delete/${data}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        enqueueSnackbar(response.data?.result, { variant: "success" });
        return response;
    }
    catch (error: any) {
        const errorMessage = error.response?.data?.result;
        console.log(errorMessage);
        enqueueSnackbar(errorMessage, { variant: 'error' });
    }
}

export const DownloadPdf = (data: any) => async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${data}/pdf`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));


        const link = document.createElement('a');

        link.href = url;

        link.setAttribute('download', `event_${data}.pdf`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error downloading the PDF', error);
    }
};


export default eventSlice.reducer;

