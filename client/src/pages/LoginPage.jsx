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
      const formData = new FormData(e.target)
      e.preventDefault();
      const userData = {email, password};
      dispatch(login(userData));
   }

    return <div className="form-container">
      <form className="auth-form" onSubmit={onSubmit}>
         <input name="email" type="email" value={email} placeholder="Email" required onChange={onChange} />
         <input name="password" type="password" value={password} placeholder="Password" required onChange={onChange} />
         <button type="submit">Submit</button>
         <Link to={'/register'}>Don't have an account yet?</Link>
      </form>
    </div>
 }

 export default LoginPage;