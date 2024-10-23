import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js'
import questionReducer from '../features/question/questionSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        question: questionReducer
    }
});

export default store;