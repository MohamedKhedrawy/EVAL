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
        return thunkAPI.rejectWithValue(message);
    }
})

export const getWrongQuestions = createAsyncThunk('question/getWrongQuestions', async(_, thunkAPI) => {
    try {
        return await questionService.getWrongQuestions();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const toggleIsMistake = createAsyncThunk('question/ToggleIsMistake', async(questionId, thunkAPI) => {
    try {
        await questionService.toggleIsMistake(questionId)
        return 
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
        },
        // toggleMistake: (state, action) => {
        //     const index = action.payload;
        //     state.questions.forEach((question, questionIndex) => {
        //         if (index === questionIndex) {
        //             question.isMistake = true;
        //             console.log(question.isMistake)
        //         }
        //     })
        // }
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

export const {reset, setParams, setQuestions, toggleMistake} = questionSlice.actions;
export default questionSlice.reducer;