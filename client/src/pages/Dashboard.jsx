import TestParams from "../components/testParams.jsx";
import Mistakes from "../components/Mistakes.jsx";
import QuestionPost from "../components/QuestionPost.jsx";
import ClearRepeated from "../components/ClearRepeated.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyInfo, logout, reset } from "../features/auth/authSlice.js";
import { useEffect, useState, useRef } from "react";

 

const Dashboard = () => {

  const {isSuccess, isError, isLoading, message, userName} = 
  useSelector((state) => state.auth)

  const typingTextRef = useRef(null);
  const intervalRef = useRef(null);
  const nameRef = useRef(userName)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const token = localStorage.getItem('userToken')

  useEffect(() => {
    dispatch(getMyInfo())
  }, [dispatch])

  useEffect(() => {
    nameRef.current = userName;
  }, [userName]);

  useEffect(() => {
    const text = `Welcome ${nameRef.current}, What do you want to do today?`;
    const typingSpeed = 50;
    const startingDelay = 500;
    let index = 0;

    const typingTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        typingTextRef.current.style.fontFamily = '"Press Start 2P", system-ui';
        if (index < text.length) {
          typingTextRef.current.innerHTML = text.slice(0, index + 1);
          index++;
        } else {
          typingTextRef.current.innerHTML = text;
          clearInterval(intervalRef.current);
        }
      }, typingSpeed) 
    }, startingDelay)

    return () => {clearInterval(intervalRef.current);
      clearTimeout(typingTimeout)
    }
  }, [userName]);

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

  return <main className="homepage">
    <h1 className="title">EVAL</h1>
    <h3 className="welcome" ref={typingTextRef}></h3>
    <div className="dashboard">
      
      <div className="panel">
        <h3>Choose Test Parameters</h3>
        <p>Select a course and difficulty level, then set the number of questions.</p>
        <button className="btn">Start Test</button>
      </div>
      <div className="panel">
        <h3>Post New Question</h3>
        <p>Add a new question to the database, including answer choices.</p>
        <button className="btn">Add Question</button>
      </div>
      <div className="panel">
        <h3>Clear Repeated Questions</h3>
        <p>Remove duplicate questions from the test pool.</p>
        <button className="btn">Clear Questions</button>
      </div>
      <div className="panel">
        <h3>See Your Mistakes</h3>
        <p>View mistakes and track your progress over time.</p>
        <button className="btn">View Mistakes</button>
      </div>
        
      {/* <TestParams />
      <QuestionPost />
      <ClearRepeated />
      <Mistakes /> */}

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  </main>
 }

 export default Dashboard;