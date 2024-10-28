import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from './questionService.js';

const initialState = {
    params: {},
    questions: [],
    wrongQuestions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isMistake: false,
    isSolved: false,
}

export const getQuestions = createAsyncThunk('question/getQuestions', async(_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const params = state.question.params
        return await questionService.getQuestions(params);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(error);
    }
})

export const getWrongQuestions = createAsyncThunk('question/getWrongQuestions', async(course, thunkAPI) => {
    try {
        const wrongQuestions = await questionService.getWrongQuestions(course);
        return wrongQuestions
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(error);
    }
})

export const toggleIsMistake = createAsyncThunk('question/ToggleIsMistake', async(questionId, thunkAPI) => {
    try {
        await questionService.toggleIsMistake(questionId)
        return 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(error);
    }
})

export const postQuestion = createAsyncThunk('question/postQuestions', async(questionData, thunkAPI) => {
    try {
        return await questionService.postQuestion(questionData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(error);
    }
})

export const clearRepeated = createAsyncThunk('question/clearRepeated', async(_, thunkAPI) => {
    try {
        return await questionService.clearRepeated();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message)
        return thunkAPI.rejectWithValue(error);
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
        },
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
        })
        .addCase(getQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getWrongQuestions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getWrongQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.wrongQuestions = action.payload;
        })
        .addCase(getWrongQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(postQuestion.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(postQuestion.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log('question posted');
        })
        .addCase(postQuestion.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            console.log('question rejected');
        })
        .addCase(clearRepeated.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(clearRepeated.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log('Repeated Questions Cleared');
        })
        .addCase(clearRepeated.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            console.log('Clearing Failed');
        })
    }
})

export const {reset, setParams, setQuestions, toggleMistake} = questionSlice.actions;
export default questionSlice.reducer;