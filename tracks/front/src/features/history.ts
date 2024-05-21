import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../api/instance.ts";
import {Listen} from "../container/Tracks/Tracks.tsx";

interface History {
    id: number,
    datetime: string,
    userId: number,
    trackId: number,
    users:{
        id: number,
        username: string,
        password: string,
        token: string
    },
    track: {
        id:number;
        track_name:string;
        duration:number;
        track_number:number;
    }

}

interface Track {
    id: number,
    datetime: string,
    userId: number,
    trackId: number,

}


interface IState {
    getHistory:History[]
    history:Track | null
    error:Error | null;
    isLoading:boolean
}

const initialState: IState = {
    getHistory:[],
    history:  null,
    error: null,
    isLoading: false,
};

export const trackHistory = createAsyncThunk('history/post',async (payload:Listen) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${payload.token}`
        }
    };
    const response = await instance.post<Track>('/track_history', payload, config)
    return response.data
})

export const tracksData = createAsyncThunk('history/get', async (id:number) => {
    const response = await instance.get(`/track_history?userId=${id}`)
    return response.data
})


const historySlica = createSlice(({
    name:'history',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(trackHistory.pending,(state) => {
            state.isLoading = true
        })
            .addCase(trackHistory.fulfilled,(state,action) => {
                state.isLoading = false
                state.history = action.payload
            })
            .addCase(trackHistory.rejected,(state,action) => {
                state.error = action.payload as Error
                state.isLoading = false
            })
            .addCase(tracksData.pending,(state) => {
                state.isLoading = true
            })
            .addCase(tracksData.fulfilled,(state,action) => {
                state.isLoading = false
                state.getHistory = action.payload
            })
            .addCase(tracksData.rejected,(state,action) => {
                state.error = action.payload as Error
                state.isLoading = false
            })

    }
}))

export const historyStore = historySlica.reducer