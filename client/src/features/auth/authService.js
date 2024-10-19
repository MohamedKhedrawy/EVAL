import asyncHandler from 'express-async-handler';
import axios from 'axios'

const register = asyncHandler(async(userData) => {
    try {
        await axios.post('http://localhost:5000/api/users/register', userData);
    } catch (error) {
        console.error(error);
    } 
})

const login = asyncHandler(async(userData) => {
    try {
        console.log('im herre')
        const response = await axios.post('http://localhost:5000/api/users/login', userData);
        console.log(response.data.token);
        localStorage.setItem('userToken', response.data.token);
    } catch (error) {
        console.error(error);
    }
})

const logout = () => {
    localStorage.removeItem('userToken')
}

const authService = {
    register, login, logout
}

export default authService
