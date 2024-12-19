import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner.jsx";

const LoginPage = () => {
  const typingTextRef = useRef(null);
  const intervalRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, isLoading, message, isAuthed } = useSelector(
    (state) => state.auth
  );

  const token = localStorage.getItem("userToken");

  const [isSpinner, setIsSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const text = "Enter your email and password";
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
      //add error prompt and remove console.log
      setError(true);
      setErrorMsg(message);
    }

    if (token) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
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
                    <label htmlFor="email" id="email">
                      Email
                    </label>
                    <input
                      className="input login"
                      name="email"
                      type="email"
                      value={email}
                      required
                      onChange={onChange}
                      placeholder="Email"
                    />
                    <label htmlFor="password" className="">
                      Password
                    </label>
                    <input
                      className="input login"
                      name="password"
                      type="password"
                      value={password}
                      required
                      onChange={onChange}
                      placeholder="Password"
                    />
                    {isError || error ? (
                      <p className="error-message">{errorMsg}</p>
                    ) : null}
                     <input type="submit" style={{display:"none"}}></input>
                  </div>
                </form>
                <button onClick={onSubmit} className="button login">
                    Login
                  </button>
                  <p className="redirect login">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="register-here">
                      Register here
                    </Link>
                  </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
