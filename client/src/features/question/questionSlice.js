import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from './questionService.js';

const initialState = {
    params: {},
    questions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isMistake: false,
    isSolved: false,
}

export const getQuestions = createAsyncThunk('question/getQuestions', async(questionParams, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const params = state.question.params
        return await questionService.getQuestions(params);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const postQuestions = createAsyncThunk('question/postQuestions', async(questionData, thunkAPI) => {
    try {
        return await questionService.postQuestion();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state.message = '',
            state.isMistake = false,
            state.isSolved = false
        },

        setParams: (state, action) => {
            state.params = action.payload;
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getQuestions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.questions = action.payload;
            console.log(state.questions);
        })
        .addCase(getQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(postQuestions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(postQuestions.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        })
        .addCase(postQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset, setParams, setQuestions} = questionSlice.actions;
export default questionSlice.reducer;