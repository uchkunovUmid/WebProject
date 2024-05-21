import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { isAxiosError } from "axios";
import instance from "../api/instance.ts";
import {RootState} from "../store/store.ts";


export interface IUser {
    id:number
    username: string;
    password:string;
    token: string;
    role:string
}

interface userState {
    userInfo: IUser | null;
    loading: boolean;
    registerError: null | string | userResponseValidateError;
    loginError: null | string;
}

type userRequest = {
    username: string;
    displayName?: string;
    password: string;
    token?:string
};

type userResponseError = {
    error: { message: string };
};

type userResponseValidateError = { type: string; messages: string[] }[];

export const registerUser = createAsyncThunk<
    IUser,
    userRequest,
    { rejectValue: userResponseError | userResponseValidateError }
>("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post<IUser>(
            "/users/register",
            userData
        );
        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<userResponseError> = err;
            return rejectWithValue(
                error.response?.data || { error: { message: "An error occurred" } }
            );
        }
        throw err;
    }
});

export const loginUser = createAsyncThunk<
    IUser,
    userRequest,
    { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post<IUser>("/users/sessions", userData);

        return response.data;
    } catch (err) {
        if (isAxiosError(err)) {
            const error: AxiosError<userResponseError> = err;
            return rejectWithValue(
                error.response?.data.error.message || "Internet connection error"
            );
        }
        throw err;
    }
});

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { getState, rejectWithValue }) => {
        const token = (getState() as RootState).user.userInfo?.token;

        try {
            const response = await instance.delete("/users/logout", {
                headers: { Authorization: token },
            });

            return response.data;
        } catch (err) {
            if (isAxiosError(err)) {
                const error: AxiosError<userResponseError> = err;

                return rejectWithValue(
                    error.response?.data.error.message || "Internet connection error"
                );
            }

            throw err;
        }
    }
);

const initialState: userState = {
    userInfo: null,
    registerError: null,
    loginError: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = { ...action.payload };
                state.loading = false;
                state.registerError = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                if (Array.isArray(action.payload)) {
                    state.registerError = action.payload;
                } else {
                    state.registerError =
                        action.payload?.error.message ?? "Error occurred";
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loginError = null;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload || null;
            })
            .addCase(logoutUser.fulfilled, () => {
                return initialState;
            });

    },
});

export default userSlice;


