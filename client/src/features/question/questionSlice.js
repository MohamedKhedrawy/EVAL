import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authSlice } from "../auth/authSlice";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isMistake: false,
    isSolved: false,
}

const getQuestions = createAsyncThunk('question/getQuestions', async() => {
    try {
        return await questionService.getQuestions();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const postQuestions = createAsyncThunk('question/getQuestions', async() => {
    try {
        return await questionService.postQuestions();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state.message = '',
            state.isMistake = false,
            state.isSolved = false,
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getQuestions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getQuestions.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(getQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(postQuestions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(postQuestions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(postQuestions.pending, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(postQuestions.pending, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer();