import TestParams from "../components/TestParams.jsx";
import Mistakes from "../components/Mistakes.jsx";
import QuestionPost from "../components/QuestionPost.jsx";
import ClearRepeated from "../components/ClearRepeated.jsx";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { getMyInfo, logout, reset } from "../features/auth/authSlice.js";
import { useEffect, useState, useRef } from "react";
import { postQuestion, setParams } from "../features/question/questionSlice";

const Dashboard = () => {
  //States
  const { isSuccess, isError, isLoading, message, userName } = useSelector(
    (state) => state.auth
  );
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isThereCorrectAnswer, setIsThereCorrectAnswer] = useState(false);
  const [isJson, setIsJson] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonFile, setJsonFile] = useState("");

  //Refs
  const typingTextRef = useRef(null);
  const intervalRef = useRef(null);
  const nameRef = useRef(userName);
  //section refs
  const dashboardRef = useRef(null);
  const testParamsRef = useRef(null);
  const questionPostRef = useRef(null);
  const clearRepeatedRef = useRef(null);
  const mistakesRef = useRef(null);
  const [activeSection, setActiveSection] = useState(dashboardRef);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  //get userName
  useEffect(() => {
    dispatch(getMyInfo());
    dispatch(setParams({}));
  }, [dispatch]);

  //attach userName to ref
  useEffect(() => {
    nameRef.current = userName;
  }, [userName]);

  //typing welcome message with setInterval setTimeout and refs
  useEffect(() => {
    let text;
    if (activeSection === dashboardRef) {
      text = `Welcome ${nameRef.current}, What do you want to do today?`;
    }
    if (activeSection === testParamsRef) {
      text = `Let's EVALuate, Set your parameters`;
    }
    if (activeSection === questionPostRef && !isJson) {
      text = `Found a new question? Add it to the inventory`;
    }
    if (activeSection === questionPostRef && isJson) {
      text = `Paste JSON text in the textbox or upload a JSON file`;
    }
    if (activeSection === clearRepeatedRef) {
      text = `Clearing up the clutter for a sharper focus`;
    }
    if (activeSection === mistakesRef) {
      text = `Conquer your mind. Master your fears`;
    }
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
  }, [userName, activeSection, isJson]);

  //watches Logout
  useEffect(() => {
    if (isLoading) {
      //add spinner
    }

    if (isError) {
      setError(true);
      setErrorMsg(message);
      console.log(message);
    }

    if (isSuccess || !token) {
      navigate("/login");
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch, navigate]);

  //scrolling sections function
  const scrollingIntoSection = (sectionRef) => {
    setActiveSection(sectionRef);
  };

  //Logs user out
  const handleLogout = () => {
    dispatch(logout());
  };

  //start of questionPost component
  const [postQuestions, setPostQuestions] = useState({
    title: "",
    course: "",
    difficulty: 0,
  });

  const [postAnswers, setPostAnswers] = useState([
    {
      answerBody: "",
      isCorrect: false,
    },
  ]);

  const [answerFields, setAnswerFields] = useState(1);
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    if (isPosted) {
      setPostQuestions({
        title: "",
        course: "",
        difficulty: "",
      });
      setPostAnswers([
        {
          answerBody: "",
          isCorrect: false,
        },
      ]);
      setAnswerFields(1);
      setError(false);
      setErrorMsg("");
    }
  }, [isPosted]);

  const handleQuestionPost = (e) => {
    setPostQuestions((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAnswerPost = (e, index) => {
    const updatedAnswers = [...postAnswers];
    updatedAnswers[index].answerBody = e.target.value;
    setPostAnswers(updatedAnswers);
  };

  const handleToggleCorrect = (answerIndex) => {
    const updatedAnswers = [...postAnswers];
    updatedAnswers[answerIndex].isCorrect =
      !updatedAnswers[answerIndex].isCorrect;
    setPostAnswers(updatedAnswers);
    setIsThereCorrectAnswer(true);
  };

  const removeAnswerField = (index) => {
    const updatedAnswers = postAnswers.filter((_, idx) => idx !== index);
    setPostAnswers(updatedAnswers);
    setAnswerFields((prevState) => prevState - 1);
  };

  const addAnswerField = () => {
    setPostAnswers([...postAnswers, { answerBody: "", isCorrect: false }]);
    setAnswerFields((prevState) => prevState + 1);
  };

  const handlePost = (e) => {
    e.preventDefault();
    document.querySelector("#title-input").classList.remove("error");
    document.querySelector("#course-input").classList.remove("error");

    const questionData = {
      title: postQuestions.title,
      answers: postAnswers,
      course: postQuestions.course,
      difficulty: postQuestions.difficulty,
    };
    if (!questionData.title) {
      setError(true);
      setErrorMsg("Please enter the question title");
      document.querySelector("#title-input").classList.add("error");
      return;
    }
    if (!questionData.course) {
      setError(true);
      setErrorMsg("Please enter the course");
      document.querySelector("#course-input").classList.add("error");
      return;
    }
    if (questionData.answers.length < 2) {
      setError(true);
      setErrorMsg("Please enter 2 answer options or more");
      document.querySelector(".post").classList.add("error");
      return;
    }
    if (!isThereCorrectAnswer) {
      setError(true);
      setErrorMsg("Please check the checkbox for the correct answer");
      return;
    }
    dispatch(postQuestion(questionData));
    setIsPosted(true);
  };

  const switchJson = () => {
    setIsJson(true);
  };
  const handleJsonFile = (e) => {
    const jsonFile = e.target.files[0];

    if (jsonFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target.result);
        setJsonFile(jsonData);
      };

      reader.readAsText(jsonFile);
    }
  };

  const handleJsonText = (e) => {
    e.preventDefault();
    if (jsonText) {
      try {
        const jsonData = JSON.parse(jsonText);
        console.log(jsonData);
        dispatch(postQuestion(jsonData));
      } catch (error) {
        console.log("Invalid Format: ", error);
        setError(true);
        setErrorMsg(`Invalid Format: ${error.message}`);
      }
    } else if (jsonFile) {
      try {
        console.log(jsonFile);
        dispatch(postQuestion(jsonFile));
      } catch (error) {
        console.log("Invalid File Format: ", error);
        setError(true);
        setErrorMsg(`Invalid File Format: ${error.message}`);
      }
    } else {
      console.log("an error occured");
    }
  };
  //end of questionPost component

  return (
    <main className="homepage">
      <h1 className="title">EVAL</h1>
      <h3 className="welcome">
        <span ref={typingTextRef}></span>
      </h3>
      {activeSection === dashboardRef ? (
        <>
          <div className="dashboard" ref={dashboardRef}>
            <div
              className="panel"
              onClick={() => scrollingIntoSection(testParamsRef)}
            >
              <h3>Choose Test Parameters</h3>
              <p>
                Select a course and difficulty level, then set the number of
                questions.
              </p>
              <button className="btn">Start Test</button>
            </div>
            <div
              className="panel"
              onClick={() => {
                scrollingIntoSection(questionPostRef);
                setIsPosted(false);
              }}
            >
              <h3>Post New Question</h3>
              <p>
                Add a new question to the database, including answer choices.
              </p>
              <button className="btn">Add Question</button>
            </div>
            <div
              className="panel"
              onClick={() => scrollingIntoSection(clearRepeatedRef)}
            >
              <h3>Clear Repeated Questions</h3>
              <p>Remove duplicate questions from the test pool.</p>
              <button className="btn">Clear Questions</button>
            </div>
            <div
              className="panel"
              onClick={() => scrollingIntoSection(mistakesRef)}
            >
              <h3>See Your Mistakes</h3>
              <p>View mistakes and track your progress over time.</p>
              <button className="btn">View Mistakes</button>
            </div>
            <button onClick={handleLogout} className="button logout">
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          {activeSection === testParamsRef ? (
            <div
              ref={testParamsRef}
              className={`feature-section ${
                activeSection === testParamsRef ? "active" : ""
              }`}
            >
              <TestParams />
              <button
                className="button back"
                onClick={() => scrollingIntoSection(dashboardRef)}
              >
                Go back
              </button>
            </div>
          ) : null}
          {activeSection === questionPostRef ? (
            <div
              ref={questionPostRef}
              className={`feature-section ${
                activeSection === questionPostRef ? "active" : ""
              } post`}
            >
              <>
                {isJson ? (
                  <form
                    className="question-form json"
                    onSubmit={handleJsonText}
                  >
                    <label htmlFor="jsonText">JSON Text</label>
                    <textarea
                      name="jsonText"
                      className="jsonInput"
                      placeholder="Paste JSON Text Here"
                      rows="10"
                      cols="50"
                      onChange={(e) => {
                        setJsonText(e.target.value);
                      }}
                    ></textarea>
                    <label htmlFor="jsonFile">Import JSON File</label>
                    <input
                      name="jsonFile"
                      className="json-file"
                      type="file"
                      accept=".json"
                      onChange={handleJsonFile}
                    ></input>
                    <div className="button-container json">
                      <button type="submit" className="button ">
                        Submit JSON
                      </button>
                      <button
                        type="button"
                        className="button switchBack"
                        onClick={() => {
                          setIsJson(false);
                        }}
                      >
                        Use Question Form
                      </button>
                      <button className="button">Back To Home</button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handlePost} className="question-form">
                    <h2>Post New Question</h2>
                    <div className="parameter post">
                      <label>Question: </label>
                      <input
                        name="title"
                        id="title-input"
                        className="input post-title"
                        type="text"
                        placeholder="Title"
                        value={postQuestions.title}
                        required
                        onChange={handleQuestionPost}
                      />
                      <div>
                        <label>Answers: </label>
                        {postAnswers.map((answer, answerIndex) => (
                          <div key={answerIndex} className="answerdiv">
                            <input
                              className="input answerfield"
                              type="text"
                              name={`Answer ${answerIndex + 1}`}
                              value={answer.answerBody}
                              placeholder={`Answer ${answerIndex + 1}`}
                              onChange={(e) => handleAnswerPost(e, answerIndex)}
                              required
                            />

                            <div className="checkbox-group answer">
                              <input
                                id={answerIndex}
                                name="isCorrect"
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={() =>
                                  handleToggleCorrect(answerIndex)
                                }
                              />
                              <label
                                htmlFor={answerIndex}
                                className="correct-label"
                              >
                                Correct Answer
                              </label>
                              <button
                                type="button"
                                id="removeIcon"
                                // className="button small"
                                onClick={() => removeAnswerField(answerIndex)}
                                disabled={answerFields <= 1}
                              >
                                <img src="../../public/images/minus.png" alt="remove" />
                              </button>
                              <button
                                type="button"
                                id="removeButton"
                                className="button small"
                                onClick={() => removeAnswerField(answerIndex)}
                                disabled={answerFields <= 1}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="button add"
                          onClick={addAnswerField}
                        >
                          Add New Choice
                        </button>
                      </div>
                      <label>Course: </label>
                      <select
                        name="course"
                        id="course-input"
                        className="dropdown postDropdown"
                        value={postQuestions.course}
                        onChange={handleQuestionPost}
                      >
                        <option value={""}>Select a Course</option>
                        <option value={"geo"}>Geo</option>
                        <option value={"OOP"}>OOP</option>
                        <option value={"Data Communication"}>
                          Data Communication
                        </option>
                        <option value={"Information Systems"}>
                          Information Systems
                        </option>
                        <option value={"Discrete Maths"}>Discrete Maths</option>
                        <option value={"Project Management"}>
                          Project Management
                        </option>
                        <option value={"Business Management"}>
                          Business Management
                        </option>
                        <option value={"Technical Writing"}>
                          Technical Writing
                        </option>
                        <option value={"Probability & Statistics"}>
                          Probability & Statistics
                        </option>
                        <option value={"Signals"}>Signals</option>
                      </select>
                      <div className="parameter radio-group">
                        <label className="diff-label">Diffficulty: </label>
                        <div>
                          <input
                            type="radio"
                            value={0}
                            name="difficulty"
                            onChange={handleQuestionPost}
                            checked={postQuestions.difficulty == 0}
                          />{" "}
                          Undefined{" "}
                        </div>
                        <div>
                          <input
                            type="radio"
                            value={1}
                            name="difficulty"
                            onChange={handleQuestionPost}
                            checked={postQuestions.difficulty == 1}
                          />{" "}
                          Easy{" "}
                        </div>
                        <div>
                          <input
                            type="radio"
                            value={2}
                            name="difficulty"
                            onChange={handleQuestionPost}
                            checked={postQuestions.difficulty == 2}
                          />{" "}
                          Intermediate{" "}
                        </div>
                        <div>
                          <input
                            type="radio"
                            value={3}
                            name="difficulty"
                            onChange={handleQuestionPost}
                            checked={postQuestions.difficulty == 3}
                          />{" "}
                          Hard{" "}
                        </div>
                      </div>
                      {error ? (
                        <p className="error-message">{errorMsg}</p>
                      ) : null}
                      <div className="button-container">
                        <button type="submit" className="button add post">
                          Add Question
                        </button>
                        <button
                          className="button import"
                          type="button"
                          onClick={switchJson}
                        >
                          Import JSON File
                        </button>
                        <button
                          className="button backPost"
                          id="backButton"
                          onClick={() => {
                            scrollingIntoSection(dashboardRef);
                            setIsPosted(true);
                          }}
                        >
                          Go back
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            </div>
          ) : null}
          {activeSection === clearRepeatedRef ? (
            <div
              ref={clearRepeatedRef}
              className={`feature-section ${
                activeSection === clearRepeatedRef ? "active" : ""
              }`}
            >
              <ClearRepeated />
              <button
                className="button back"
                onClick={() => scrollingIntoSection(dashboardRef)}
              >
                Go back
              </button>
            </div>
          ) : null}
          {activeSection === mistakesRef ? (
            <div
              ref={mistakesRef}
              className={`feature-section ${
                activeSection === mistakesRef ? "active" : ""
              }`}
            >
              <Mistakes />
              <button
                className="button back"
                onClick={() => scrollingIntoSection(dashboardRef)}
              >
                Go back
              </button>
            </div>
          ) : null}
        </>
      )}
    </main>
  );
};

export default Dashboard;
