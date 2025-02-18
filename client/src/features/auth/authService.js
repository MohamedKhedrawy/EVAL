import asyncHandler from 'express-async-handler';
import axios from 'axios'
import "dotenv/config";

const register = asyncHandler(async(userData) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, userData);
    } catch (error) {
        throw error.response?.data?.message || 'Register Failed'
    } 
})

const login = asyncHandler(async(userData) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, userData);
        const token = localStorage.getItem('userToken');
        if (token) {
            localStorage.removeItem('userToken')
        }
        localStorage.setItem('userToken', response.data.token);
    } catch (error) {
        throw error.response?.data?.message || 'Login Failed'
    }
})

const logout = () => {
    localStorage.removeItem('userToken')
}

const getMyInfo = asyncHandler(async() => {
    try {
        const token = localStorage.getItem('userToken')
        const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/myinfo`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return user.data
    } catch (error) {
        throw error.response?.data?.message || 'fetching info failed';
    }
})

const authService = {
    register, login, logout, getMyInfo
}

export default authService
