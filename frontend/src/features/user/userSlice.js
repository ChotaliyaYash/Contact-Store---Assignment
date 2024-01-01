import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
    loginCall,
    signupcall,
    logoutcall,
} from './userApi'

export const loginAsyncThunk = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await loginCall(data);
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const signupAsyncThunk = createAsyncThunk(
    'user/register',
    async (data, { rejectWithValue }) => {
        try {
            const res = await signupcall(data);
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const logOutUserAsyncThunk = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const res = await logoutcall();
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return error;
        }
    }
)

const initialState = {
    error: null,
    loading: false,
    currentUser: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserFromStorage: (state) => {
            localStorage.getItem('user') && (state.currentUser = JSON.parse(localStorage.getItem('user')));
        },
        loginUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.currentUser = action.payload.user;
        },
        signupUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.currentUser = action.payload.user;
        },
        logoutUser: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('contact');
            state.currentUser = null;
        }
    },

    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsyncThunk.fulfilled, (state, action) => {
                // local storage
                localStorage.setItem('user', JSON.stringify(action.payload.user));

                state.loading = false;
                state.currentUser = action.payload.user;
                state.error = null;
            })
            .addCase(loginAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.response.data.message;
            })

            // signup
            .addCase(signupAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupAsyncThunk.fulfilled, (state, action) => {
                // local storage
                localStorage.setItem('user', JSON.stringify(action.payload.user));

                state.loading = false;
                state.currentUser = action.payload.user;
                state.error = null;
            })
            .addCase(signupAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.response.data.message;
            })

            // sign out
            .addCase(logOutUserAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logOutUserAsyncThunk.fulfilled, (state) => {
                localStorage.removeItem('user');
                localStorage.removeItem('contact');

                state.loading = false;
                state.currentUser = null;
                state.error = null;
            })
            .addCase(logOutUserAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.response.data.message;
            })
    },
})

export const { getUserFromStorage, loginUser, signupUser, logoutUser } = userSlice.actions

export default userSlice.reducer