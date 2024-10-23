import asyncHandler from "express-async-handler";
import axios from "axios";

const getQuestions = asyncHandler(async(questionParams) => {
    try {
        const questions = await axios.get('http://localhost:5173/questions', questionParams);
        return questions.data;
    } catch (error) {
        console.error(error);
    }
}) 

const getWrongQuestions = asyncHandler(async(course) => {
    try {
        const wrongQuestions = await axios.get('http://localhost:5173/questions', course);
        return wrongQuestions;
    } catch (error) {
        console.error(error);
    }
})

const postQuestion = asyncHandler(async(questionData) => {
    try {
        return await axios.post('http://localhost:5173/questions', userData);
    } catch (error) {
        console.error(error);
    }
})

const questionService = {getQuestions, getWrongQuestions,
    postQuestion
}
export default questionService;