import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { register, reset } from "../features/auth/authSlice.js";

 

 const RegisterPage = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

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
         navigate('/login');
      }

      dispatch(reset());
      
   }, [isLoading, isError, isSuccess, message, navigate, dispatch])

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
   })

   const {name, email, password, confirmPassword} = formData;

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value
      }))
   }

   const onSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         const userData = {name, email, password, confirmPassword};
         dispatch(register(userData));
      } else {
         console.log('Passwords do not match');
      }
   }

   return <div className="form-container">
      <form className="auth-form" onSubmit={onSubmit}>
         <input name="name" type="name" value={name} placeholder="Name" required onChange={onChange} />
         <input name="email" type="email" value={email} placeholder="Email" required onChange={onChange} />
         <input name="password" type="password" value={password} placeholder="Password" required onChange={onChange} />
         <input name="confirmPassword" type="password" value={confirmPassword} placeholder="Confirm Password" required onChange={onChange} />
         <button type="submit">Register</button>
         <Link to={'/login'}>Already have an account?</Link>
      </form>
  </div>
 }

 export default RegisterPage;