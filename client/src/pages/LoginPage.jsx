import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login, reset} from '../features/auth/authSlice.js';

 

 const LoginPage = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {isError, isSuccess, isLoading, message, isAuthed} =
   useSelector((state) => state.auth)

   useEffect(() => {
      if (isLoading) {
         //add spinner
      }

      if (isError) {
         //add error prompt and remove console.log
         console.log(message);
      }

      if (isSuccess) {
         navigate('/dashboard');
      }
      
      dispatch(reset());

   }, [isLoading, isError, isSuccess, message, dispatch, navigate])

   const [formData, setFormData] = useState({
      email: '',
      password: ''
   })

   const {email, password} = formData;

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const onSubmit = (e) => {
      e.preventDefault();
      const userData = {email, password};
      dispatch(login(userData));
   }

      return <div className="form-container">
         <div className="login-box">
            <div className="login-header">
               <h2>Login</h2>
            </div>
            <form className="auth-form" onSubmit={onSubmit}>
               <div className="input-box">
                  <input className="email" name="email" type="email" value={email}  required onChange={onChange} />
                  <label htmlFor="user" className="label">Email</label>
               </div>
               <div className="input-box">
                  <input className="password" name="password" type="password" value={password}  required onChange={onChange} />
                  <label htmlFor="pass" className="label">Password</label>
               </div>
               <div className="input-box">
                  <button type="submit" className="input-submit">Login</button>
               </div>
               <div className="register">
                  <p>Don't have an account? <Link to={'/register'} className="register-here">Register here</Link></p>
               </div>
            </form>
         </div>
         </div>
 }

 export default LoginPage;