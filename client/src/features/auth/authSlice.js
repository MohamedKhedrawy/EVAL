import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: true ,
    message: '',
    isAuthed: false,
    userName: ''
}

export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async() => {
    return await authService.logout();
})

export const getMyInfo = createAsyncThunk('auth/getinfo', async(_, thunkAPI) => {
    try {
        const user = await authService.getMyInfo();
        return user;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            // state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            // state.isAuthed = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })  
        .addCase(logout.fulfilled, (state, action) => {
            state.isSuccess = true;
            // state.isAuthed = false;
            console.log('Logged out successfully')
        })
        .addCase(getMyInfo.fulfilled, (state, action) => {
            state.userName = action.payload.name
        })
        .addCase(getMyInfo.rejected, (state, action) => {
            state.message = action.payload
        })
        .addCase(getMyInfo.pending, (state, action) => {
            state.isLoading = true;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;