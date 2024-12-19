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
            }
        });
        return questions.data;
    } catch (error) {
        throw error.response?.data?.message || 'Question Fetching Failed';
    }
}) 

const getWrongQuestions = asyncHandler(async(course) => {
    try {
        const token = localStorage.getItem('userToken')
        const wrongQuestions = await axios.get('http://localhost:5000/api/questions', {
            params: {course},
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        return wrongQuestions.data; 
    } catch (error) {
        throw error.response?.data?.message || 'Mistakes Fetching Failed'
    }
})

const toggleIsMistake = asyncHandler(async(questionId) => {
    try {
        const token = localStorage.getItem('userToken');
        await axios.put('http://localhost:5000/api/questions', {questionId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return
    } catch (error) {
        throw error.response?.data?.message || 'Mistake Register failed'
    }
})

const postQuestion = asyncHandler(async(questionData) => {
    try {
        const token = localStorage.getItem('userToken')
        const response = await axios.post('http://localhost:5000/api/questions', questionData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Question Posting Failed'
    }
})

const clearRepeated = asyncHandler(async() => {
    try {
        const token = localStorage.getItem('userToken')
        console.log(token)
        const response = await axios.post('http://localhost:5000/api/questions/clear', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error.response?.data?.message || 'Repeated Questions Clearing Failed';
    }
})

const questionService = {getQuestions, getWrongQuestions,
    postQuestion, toggleIsMistake, clearRepeated
}
export default questionService;