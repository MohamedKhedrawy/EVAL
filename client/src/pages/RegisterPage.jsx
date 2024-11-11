import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice.js";

const RegisterPage = () => {

   const typingTextRef = useRef(null);
   const intervalRef = useRef(null);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading, message, isAuthed } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
   const text = "Register your account";
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
     }, typingSpeed);
   }, startingDelay);

   return () => {
     clearInterval(intervalRef.current);
     clearTimeout(typingTimeout);
   };
 }, []);

  useEffect(() => {
    if (isLoading) {
      //add spinner
    }

    if (isError) {
      //add error prompt and remove console.log
      console.log(message);
    }

    if (isSuccess) {
      navigate("/login");
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const userData = { name, email, password, confirmPassword };
      dispatch(register(userData));
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <>
      <div className="homepage">
        <h1 className="title login">EVAL</h1>
        <h3 className="welcome" ref={typingTextRef}></h3>
        <div className="feature-section register">
          <div className="parameter login">
            <form className="question-form login" onSubmit={onSubmit}>
               <div className="input-container">
               <label htmlFor="name">Name</label>
               <input
              className="input login"
                name="name"
                type="name"
                value={name}
                placeholder="Name"
                required
                onChange={onChange}
              />
               <label htmlFor="email">Email</label>              
              <input
              className='input'
                name="email"
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={onChange}
              />
               <label htmlFor="password">Password</label>
              <input
              className='input'
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                required
                onChange={onChange}
              />
               <label htmlFor="confirmPassword">Confirm Password</label>
              <input
              className='input'
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                required
                onChange={onChange}
              />  
               </div>
              <button type="submit" className="button register">Register</button>
              <p className="redirect">
                  Already have an account?{" "}
                  <Link to={"/login"} className="register-here">Log in here</Link>
                  </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
