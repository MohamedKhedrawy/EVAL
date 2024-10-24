import asyncHandler from "express-async-handler";
import axios from "axios";

const getQuestions = asyncHandler(async(params) => {
    try {
        const token = localStorage.getItem('userToken');
        const {course, difficulty, noOfQ} = params;
        const questions = await axios.get('http://localhost:5000/api/questions', {
            params: {course, difficulty, noOfQ},
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return questions.data;
    } catch (error) {
        console.error(error);
    }
}) 

const getWrongQuestions = asyncHandler(async(course) => {
    try {
        const wrongQuestions = await axios.get('http://localhost:5000/api/questions/wrong', course);
        return wrongQuestions;
    } catch (error) {
        console.error(error);
    }
})

const postQuestion = asyncHandler(async(questionData) => {
    try {
        const token = localStorage.getItem('userToken')
        return await axios.post('http://localhost:5000/api/questions', questionData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(error);
    }
})

const questionService = {getQuestions, getWrongQuestions,
    postQuestion
}
export default questionService;