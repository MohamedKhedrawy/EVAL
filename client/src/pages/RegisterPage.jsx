import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner.jsx";

const RegisterPage = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSpinner, setIsSpinner] = useState(false);

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
      setIsSpinner(true);
    } else {
      setIsSpinner(false);
    }

    if (isError) {
      setError(true);
      setErrorMsg(message);
      console.log(message);
      console.log("errorMsg");
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
    setError(false);
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all fields");
      setError(true);
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      setError(true);
      return;
    }
    if (password.length > 20) {
      setErrorMsg("Password must be less than 20 characters");
      setError(true);
      return;
    }
    if (name.length > 20) {
      setErrorMsg("Name must be less than 20 characters");
      setError(true);
      return;
    }
    if (name.length < 2) {
      setErrorMsg("Name must be more than 2+ characters");
      setError(true);
      return;
    }
    if (email.length > 50) {
      setErrorMsg("Email must be less than 50 characters");
      setError(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match");
      setError(true);
      return;
    }
    if (!error) {
      const userData = { name, email, password, confirmPassword };
      dispatch(register(userData));
    }
  };

  return (
    <>
      {isSpinner ? (
        <Spinner />
      ) : (
        <div className="homepage">
          <h1 className="title login">EVAL</h1>
          <div className="main-register">
            <h3 className="welcome login"><span ref={typingTextRef}></span></h3>
            <div className="feature-section register">
              <div className="register-box">
                <form className="question-form-login" onSubmit={onSubmit}>
                  <div className="input-container">
                    <label htmlFor="name">Name</label>
                    <input
                      className="input"
                      name="name"
                      type="name"
                      value={name}
                      placeholder="Name"
                      required
                      onChange={onChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      className="input"
                      name="email"
                      type="email"
                      value={email}
                      placeholder="Email"
                      required
                      onChange={onChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      className="input"
                      name="password"
                      type="password"
                      value={password}
                      placeholder="Password"
                      required
                      onChange={onChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      className="input"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      required
                      onChange={onChange}
                    />
                    <input type="submit" style={{display:"none"}}></input>
                    {isError || error ? (
                      <p className="error-message">{errorMsg}</p>
                    ) : null}
                  </div>
                  <button type="submit" className="button registerPage" onClick={onSubmit}>
                    Register
                  </button>
                  <p className="redirect">
                    Already have an account?{" "}
                    <Link to={"/login"} className="register-here">
                      Log in here
                    </Link>
                  </p>
                </form>


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
