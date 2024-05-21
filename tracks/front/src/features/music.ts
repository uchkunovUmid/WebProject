    import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../api/instance.ts";
    import {ProductData} from "../container/newArtist/SubmitTrack.tsx";

export interface IArtists {
    id:number;
    artist_name:string;
    artist_image:string;
    description:string
    published:boolean
}

export interface IAlbum {
    id:number;
    album_name:string;
    year:number;
    album_image:string;
    artistId:number;
    published:boolean
    artist: {
        id:number;
        artist_name:string;
        artist_image:string;
        description:string;
    }

}
export interface IGetAlbum {
    id:number;
    album_name:string;
    year:number;
    album_image:string;
    artistId:number;
    published:boolean
}

export interface ITrack {
    id:number;
    track_name:string;
    duration:number;
    track_number:number;
    albumId:number;
    published:boolean
    album: {
        id:number;
        album_name:string;
        year:number;
        album_image:string;
        artistId:number;
    }

}
 interface IGetTrack {
     id:number;
     track_name:string;
     duration:number;
     track_number:number;
     albumId:number;
     published:boolean
 }


interface IState {
    artists:IArtists[];
    album:IAlbum[];
    getAlbum:IGetAlbum[],
    getTrack:IGetTrack[],
    tracks:ITrack[];
    error:Error | null;
    isLoading:boolean
}

const initialState:IState = {
    artists:[],
    getAlbum:[],
    album:[],
    tracks:[],
    getTrack:[],
    error:null,
    isLoading:false

}

export const getArtists = createAsyncThunk('music/artist', async () => {
    const response = await instance.get('/artists')
    return response.data
})

    export const getAlbums = createAsyncThunk('music/albums', async () => {
        const response = await instance.get('/albums')
        console.log(response.data)
        return response.data
    })

    export const createArtist = createAsyncThunk('post/artist', async (payload: FormData) => {
        return await instance
            .post("/artists", payload )
            .then((res) => res.data);

    })
    export const createAlbum = createAsyncThunk('post/artist', async (payload: FormData) => {
        return await instance
            .post("/albums", payload )
            .then((res) => res.data);

    })

    export const publishArtist = createAsyncThunk('put/artist', async (id:number) => {
        const response = await instance.put(`/artists/${id}`);
        console.log(response.data)
        return response.data
    })

        export const publishAlbum = createAsyncThunk('put/album', async (id:number) => {
        const response = await instance.put(`/albums/${id}`);
        return response.data
    })

    export const publishTrack = createAsyncThunk('put/track', async (id:number) => {
        const response = await instance.put(`/tracks/${id}`);
        return response.data
    })




    export const createTracks = createAsyncThunk('post/track', async (payload: ProductData) => {
        return await instance
            .post("/tracks", payload )
            .then((res) => res.data);

    })

export const getAlbumByArtist = createAsyncThunk('music/album', async (id:number) => {
    const response = await instance.get(`/albums/?artistId=${id}`);
    return response.data
})

export const getTracksByAlbum = createAsyncThunk('music/track', async (id:number) => {
    const response = await instance.get(`/tracks/?albumId=${id}`);
    return response.data
})

    export const getTracks = createAsyncThunk('get/track', async () => {
        const response = await instance.get(`/tracks`);
        return response.data
    })


    export const deleteTracks = createAsyncThunk('delete/track', async (id:number,thunkAPI) => {
        const { dispatch } = thunkAPI
        const responce =  await instance.delete(`/tracks/${id}`);
        dispatch(getAlbums())
        return responce.data

    })

    export const deleteArtist = createAsyncThunk('delete/artist', async (id:number,thunkAPI) => {
        const { dispatch } = thunkAPI
        const responce =  await instance.delete(`/artists/${id}`);
        dispatch(getAlbums())
        return responce.data

    })

    export const deleteAlbum = createAsyncThunk('delete/album', async (id:number,thunkAPI) => {
        const { dispatch } = thunkAPI
        const responce =  await instance.delete(`/albums/${id}`);
         dispatch(getAlbums())
        return responce.data

    })



const musicSlice = createSlice({
    name:'music',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(getArtists.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getArtists.fulfilled,(state, action) => {
                state.isLoading = false
                state.artists = action.payload
            })
            .addCase(getArtists.rejected,(state, action) => {
                state.isLoading = false
                state.error = action.error as Error
            })
            .addCase(getAlbumByArtist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAlbumByArtist.fulfilled,(state, action) => {
                state.isLoading = false
                state.album = action.payload
            })
            .addCase(getAlbumByArtist.rejected,(state, action) => {
                state.isLoading = false
                state.error = action.error as Error
            })
            .addCase(getAlbums.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAlbums.fulfilled,(state, action) => {
                state.isLoading = false
                state.getAlbum = action.payload
            })
            .addCase(getAlbums.rejected,(state, action) => {
                state.isLoading = false
                state.error = action.error as Error
            })
            .addCase(getTracksByAlbum.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTracksByAlbum.fulfilled,(state, action) => {
                state.isLoading = false
                state.tracks = action.payload
            })
            .addCase(getTracksByAlbum.rejected,(state, action) => {
                state.isLoading = false
                state.error = action.error as Error
            })
            .addCase(getTracks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTracks.fulfilled,(state, action) => {
                state.isLoading = false
                state.getTrack = action.payload
            })
            .addCase(getTracks.rejected,(state, action) => {
                state.isLoading = false
                state.error = action.error as Error
            })


    }
})

export const musicStore = musicSlice.reducer