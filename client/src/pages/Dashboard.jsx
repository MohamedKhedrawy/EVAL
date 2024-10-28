import TestParams from "../components/testParams.jsx";
import Mistakes from "../components/Mistakes.jsx";
import QuestionPost from "../components/QuestionPost.jsx";
import ClearRepeated from "../components/ClearRepeated.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice.js";
import { useEffect } from "react";

 

const Dashboard = () => {

  const {isSuccess, isError, isLoading, message} = 
  useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = localStorage.getItem('userToken')

  useEffect(() => {
    if (isLoading) {
       //add spinner
    }

    if (isError) {
       //add error prompt and remove console.log
       console.log(message);
    }

    if (isSuccess || !token) {
       navigate('/login');
    }
    
    dispatch(reset());

 }, [isLoading, isError, isSuccess, message, dispatch, navigate])

  const handleLogout = () => {
    dispatch(logout());
  }

  return <>
    <h1>Dashboard</h1>

    <TestParams />
    <QuestionPost />
    <Mistakes />
    <ClearRepeated />

    <button onClick={handleLogout}>Logout</button>
  </>
 }

 export default Dashboard;